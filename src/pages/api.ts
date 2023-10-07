import { getNotionDBItems } from "../components/notionService";

export async function GET() {
  const bookmarksRequest = await getNotionDBItems(
    import.meta.env.NOTION_API_KEY,
    import.meta.env.NOTION_BOOKMARKS_DB
  );
  const categoriesRequest = await getNotionDBItems(
    import.meta.env.NOTION_API_KEY,
    import.meta.env.NOTION_CATS_DB
  );

  const bookmarks = bookmarksRequest.results;
  const categories = categoriesRequest.results;

  if (!bookmarks || !categories) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify({ bookmarks, categories }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
