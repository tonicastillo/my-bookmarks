export type BookmarksAPIRAWData = {
  bookmarks: Array<any>;
  categories: Array<any>;
};
export type BookmarkProp = {
  nid: string;
  name: string;
  description: string;
  catId: string;
  imageUrl: string;
  url: string;
  alternateUrl: string;
  notionUrl: string;
  isAtStart: boolean;
  tags: Array<TagProp>;
};
export type TagProp = {
  id: string;
  name: string;
  color: string;
};
export type CategoryProp = {
  nid: string;
  name: string;
  order?: number;
  level?: number;
  children?: Array<CategoryProp>;
};