Generate RSS file from a notion page(each subpage is a post.)

It uses the time when the block(page) was created as the publish time of the post.

No article content, only title and link.

[Notion API](https://developers.notion.com/) is required.

useage:
```
export NOTION_API_KEY="<your-API-key>"
export NOTION_PAGE_ID="<page-id>"

# config
export RSS_WEBSITE="http://finctive.com/"
export RSS_AUTHOR="FINCTIVE"
export RSS_TITLE="造物指南"
export RSS_DESCRIPTION="造物指南博客更新通知。"
export RSS_FILE_NAME="index.xml"

node ./index.js
```
