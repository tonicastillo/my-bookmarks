import { getNotionDBItems } from "../services/notionService_ssr.ts";

export async function GET() {
  const bookmarks = await getNotionDBItems(
    import.meta.env.NOTION_API_KEY,
    import.meta.env.NOTION_BOOKMARKS_DB
  );
  const categories = await getNotionDBItems(
    import.meta.env.NOTION_API_KEY,
    import.meta.env.NOTION_CATS_DB
  );

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


