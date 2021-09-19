const { Feed } = require('feed');
const { Client } = require('@notionhq/client');
const fs = require('fs')

const feed = new Feed({
    title: process.env.RSS_TITLE,
    description: process.env.RSS_DESCRIPTION,
    id: process.env.RSS_WEBSITE,
    link: process.env.RSS_WEBSITE,
    author: {
        name: process.env.RSS_AUTHOR,
    }
});

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
    var next_cursor = ""
    while (true) {
        const pageId = process.env.NOTION_PAGE_ID;
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: next_cursor === "" ? undefined : next_cursor,
        });

        const subPages = response.results.filter(element => element.type === "child_page")
        for (const element of subPages) {
            const subPageResponse = await notion.pages.retrieve({ page_id: element.id });
            const title = subPageResponse.properties.title.title[0].plain_text
            feed.addItem({
                title: title,
                id: element.id,
                link: subPageResponse.url,
                author: [{ name: process.env.RSS_AUTHOR }],
                date: new Date(element.created_time),
            });
        }

        next_cursor = response.next_cursor
        if (next_cursor == null) {
            break
        }
    }
    const rssContent = feed.rss2()
    fs.writeFile(process.env.RSS_FILE_NAME, rssContent, err => {
        if (err) {
            console.error(err)
            return
        }
    })
})();

