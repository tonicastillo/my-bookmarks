import { Client } from "@notionhq/client";

export const getNotionDBItems = async (apikey: string, database_id: string) => {
  const notion = new Client({
    auth: apikey,
  });

  return notion.databases.query({
    database_id: database_id,
  });
};
