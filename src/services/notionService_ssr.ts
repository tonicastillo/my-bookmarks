import { Client } from "@notionhq/client";

export const getNotionDBItems = async (apikey: string, database_id: string) => {
  const notion = new Client({
    auth: apikey,
  });

  const query = await notion.databases.query({
    database_id: database_id,
  });
  const items:Array<any> = query?.results.map(i => {
    return i
  })
  return items
};
