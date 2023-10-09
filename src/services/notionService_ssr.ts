import { Client, collectPaginatedAPI } from "@notionhq/client";

export const getNotionDBItems = async (apikey: string, database_id: string) => {
  const notion = new Client({
    auth: apikey,
  });

  const items = await collectPaginatedAPI(notion.databases.query, {
    database_id: database_id,
  })
  return items
};
