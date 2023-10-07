import React, { useContext, useState } from "react";
import classNames from "classnames";
import s from "./BookmarksPage.module.scss";

const HomeLinks = () => (
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
								<a
									className={s.bookmarkLink}
									href={bookmark.url}
									target="_blank"
								>
									{bookmark.imageUrl && <img src={bookmark.imageUrl} />}
									<strong>{bookmark.name}</strong>
								</a>
								{bookmark.alternateUrl && (
									<a className={s.externalLink} href={bookmark.alternateUrl}>
										🌍
									</a>
								)}
								{editMode && (
									<a
										className={s.editLink}
										href={bookmark.notionUrl}
										target="_blank"
									>
										✏️
									</a>
								)}
							</li>
						))}
					</ul>
				</li>
			);
		})}
	</ul>
);
export default HomeLinks