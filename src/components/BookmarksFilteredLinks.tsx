import React, { useContext, useState } from "react";
import classNames from "classnames";
import s from "./BookmarksPage.module.scss";
import BookmarkLink from './BookmarkLink'

const FilteredLinks = ({bookmarks, isEditMode}) => (
	
					<ul className={s.bookmarks}>
						{bookmarks.map((bookmark, idx) => (
							<li key={idx} className={classNames(s.bookmark)}>
								<BookmarkLink
									bookmark={bookmark}
									isEditMode={isEditMode}
								/>
							</li>
						))}
					</ul>
			
);
export default FilteredLinks