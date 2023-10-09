# My bookmarks

### WIP 🏗️

Site to put as a home page with your bookmarks.

The idea is that all the editing of the bookmarks and their categories is hosted and edited in your Notion account. The application only accesses that data.

Features:
- Connects to your Bookmarks database and its Categories in Notion
- Bookmarks are organized in two ways: Categories at various levels, and tags. A bookmark only has one category, but can have multiple tags.
- The data is cached in the browser, so the speed is very fast. When entering the page, it first loads the cached data, and when it gets the data from Notion, it updates it (notifying the user that there are changes), and saves the new cache.

To do:
- Nest categories
- Finish the transition from JS to TS
- Fix the number of items that each tag has.
- Improve UI/UX.