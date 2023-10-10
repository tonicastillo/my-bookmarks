import React, { useContext, useState } from "react";
import classNames from "classnames";
import s from "./BookmarksPage.module.scss";
import BookmarkLink from './BookmarkLink'

const HomeLinks = ({categories, bookmarksAtStart, isEditMode}) => (
	<ul className={classNames(s.startLinks)}>
		{categories.map((cat, idx) => {
			// onsole.log("filteredBookmarks.filter(b => b.catId === cat.nid)")
			// onsole.log(bookmarksAtStart.filter(b => b.catId === cat.nid))
			const currentCatBookmarks = bookmarksAtStart.filter(
				(b) => b.catId === cat.nid
			);
			if (currentCatBookmarks.length === 0) return null;
			return (
				<li key={cat.nid} className={classNames(s.startCategory)}>
					<h2>{cat.name}</h2>
					<ul className={s.bookmarks}>
						{currentCatBookmarks.map((bookmark, idx) => (
							<li key={idx} className={classNames(s.bookmark)}>
								<BookmarkLink
									bookmark={bookmark}
									isEditMode={isEditMode}
								/>
							</li>
						))}
					</ul>
				</li>
			);
		})}
	</ul>
);
export default HomeLinks