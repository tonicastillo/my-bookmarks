import React from "react";
import s from "./BookmarksPage.module.scss";

const BookmarkLink = ({
  bookmark,
  isEditMode,
}: {
  bookmark: any;
  isEditMode: boolean;
}) => (
  <>
    <a className={s.bookmarkLink} href={bookmark.url} target="_blank">
      {bookmark.imageUrl && <img src={bookmark.imageUrl} />}
      <strong>{bookmark.name}</strong>
    </a>
    {bookmark.alternateUrl && (
      <a className={s.externalLink} href={bookmark.alternateUrl}>
        🌍
      </a>
    )}
    {isEditMode && (
      <a className={s.editLink} href={bookmark.notionUrl} target="_blank">
        ✏️
      </a>
    )}
  </>
);

export default BookmarkLink;
