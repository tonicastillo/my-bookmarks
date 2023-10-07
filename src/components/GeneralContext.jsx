import React, {createContext, useState, useEffect} from 'react'
// import { getNotionItems } from './notionService'
import Fuse from 'fuse.js'

const removeEmoji = str => {
	return str.replaceAll(' ','').replaceAll(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

}

export const GeneralContext = createContext()

const GeneralContextProvider = ({ children }) => {
	const [ isLoading, setIsLoading ] = useState(false)

	const [ bookmarks, setBookmarks ] = useState([])
	const [ categories, setCategories ] = useState([])
	const [ tags, setTags ] = useState({})

	const [ filteredBookmarks, setFilteredBookmarks ] = useState([])
	const [ bookmarksAtStart, setBookmarksAtStart ] = useState([])

	const [ filters, setFilters ] = useState({
		searchString: '',
		category: '',
		tags: [],
	})
	const [ searchBookmarksIdx, setSearchBookmarksIdx ] = useState(null)


//    ___   __    ___  _  _  ____
//   / __) / _\  / __)/ )( \(  __)
//  ( (__ /    \( (__ ) __ ( ) _)
//   \___)\_/\_/ \___)\_)(_/(____)

	const getCache = () => {
		if (typeof(Storage) !== "undefined") {
			const cachedBookmarks = localStorage.getItem("bookmarks");
			if(!!cachedBookmarks){
				updateBookmarks({ newBookmarks: JSON.parse(cachedBookmarks), cached: true} )
			}
			const cachedCategories = localStorage.getItem("categories");
			if(!!cachedCategories){
				updateCategories({ newCategories: JSON.parse(cachedCategories), cached: true} )
			}
		}
	}

//    ___  ____  ____    ____   __  ____  __
//   / __)(  __)(_  _)  (    \ / _\(_  _)/ _\
//  ( (_ \ ) _)   )(     ) D (/    \ )( /    \
//   \___/(____) (__)   (____/\_/\_/(__)\_/\_/


	const getData = async () => {
		setIsLoading(true);
		fetch('/api')
			.then(res => res.json())
			.then(data => {
				updateBookmarks({ newBookmarks: data.bookmarks.map(bookmark => bookmark.json)})
				updateCategories({newCategories: data.categories.map(category => category.json)})
			});
	}

	const updateBookmarks = ({newBookmarks, cached}) => {
		if(!cached){
			localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
			setIsLoading(false);
		}

		setBookmarks(newBookmarks)
	}
	const updateCategories = ({newCategories, cached}) => {
		if(!cached){
			localStorage.setItem("categories", JSON.stringify(newCategories))
			setIsLoading(false);
		}
		setCategories(newCategories)
	}
	useEffect(() => {

		getCache();
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if(!!bookmarks?.length  &&  !!categories?.length){

			const newTags = {}
			bookmarks.forEach((bookmark) => {
				bookmark.tags.forEach(tag => {
					if(tag!==""){
						if(!newTags[tag]){
							newTags[tag] = {
								count: 1,
							}
						} else {
							newTags[tag].count++;
						}
					}
				})
			})


			setTags(newTags)
			filtersRefresh()
			updateSearchIndex()
			updateBookmarksAtStart()
		}


	},[bookmarks, categories])


	const updateBookmarksAtStart = () => {
		setBookmarksAtStart(bookmarks.filter(b => b.isVisibleAtStart))
	}


//   ____  __  __   ____  ____  ____  ____
//  (  __)(  )(  ) (_  _)(  __)(  _ \/ ___)
//   ) _)  )( / (_/\ )(   ) _)  )   /\___ \
//  (__)  (__)\____/(__) (____)(__\_)(____/

	const updateCategoryFilter = ({catId = ''}) => {
		const newCatId = catId === filters.category ? '' : catId
		setFilters(filters => ({ ...filters, category: newCatId}))
	}
	const updateTagsFilterAdd = ({tag}) => {
		setFilters(filters => ({ ...filters, tags: [...filters.tags, tag]}))
	}
	const updateTagsFilterRemove = ({tag}) => {
		setFilters(filters => ({ ...filters, tags: filters.tags.filter(currentTag => currentTag !== tag)}))
	}

	const updateTagsFilterToggle = ({tag}) => {
		if(filters.tags.includes(tag)){
			updateTagsFilterRemove({tag:tag})
		} else {
			updateTagsFilterAdd({tag:tag})
		}
	}

	const updateSearchFilter = ({searchString = ''}) => {
		const newSearchString = searchString === filters.searchString ? '' : searchString
		setFilters(filters => ({ ...filters, searchString: newSearchString}))
	}

	const updateSearchIndex = () => {
		const fuseOptions = {
			isCaseSensitive: false,
			threshold: 0.2,
			ignoreLocation: true,
			keys: ['name', 'subtitle', 'tags', 'url'],
		}
		if(bookmarks.length > 0 && searchBookmarksIdx===null){
			setSearchBookmarksIdx(new Fuse(bookmarks, fuseOptions))
		}
	}

	const filtersRefresh = () => {
		//Category
		let newFilteredBookmarks = bookmarks
		if(filters.category !== ''){
			newFilteredBookmarks = newFilteredBookmarks.filter(bookmark => bookmark.catId === filters.category)
		}
		//Tag
		if(filters.tags.length){
			filters.tags.map(tag => {
				newFilteredBookmarks = newFilteredBookmarks.filter(bookmark => bookmark.tags.includes(tag))
			})
		}
		//String
		if(filters.searchString !== ''){
			if(searchBookmarksIdx!==null){
				const indexesResult = searchBookmarksIdx.search(filters.searchString)
				newFilteredBookmarks = indexesResult.map(index => index.item)
			}
		}
		setFilteredBookmarks(newFilteredBookmarks)
	}

	useEffect(() => {
		filtersRefresh()
	},[filters])

	const updateBookmarksByTags = () =>{
		const newTags = {}
		Object.keys(tags).map((tag) => {
			newTags[tag] = {count: 0}
		})
		filteredBookmarks.forEach((bookmark) => {
			bookmark.tags.forEach(tag => {
				if(tag!=="") {
					if(!newTags[tag]) newTags[tag] = { count: 0}

					newTags[tag].count++;

				}
			})
		})
		setTags(newTags)
	}

	useEffect(() => {
		updateBookmarksByTags()
	},[filteredBookmarks])


	const getTagsSortedAsArray = (ts) => {
		const tagsAsArray = Object.entries(ts);

		return tagsAsArray.sort((a,b) => {

			//Por nombre
			if (removeEmoji(a[0].toLowerCase()) > removeEmoji(b[0].toLowerCase())) {
				return 1;
			}
			if (removeEmoji(a[0].toLowerCase()) < removeEmoji(b[0].toLowerCase())) {
				return -1;
			}

			return 0;
		})
	}


	return (
		<GeneralContext.Provider
			value={{
				bookmarks: bookmarks,
				filteredBookmarks: filteredBookmarks,
				categories: categories,
				tags: tags,
				filters: filters,
				bookmarksAtStart: bookmarksAtStart,

				isLoading: isLoading,

				reloadData: getData,

				updateCategoryFilter: updateCategoryFilter,
				updateTagsFilterToggle: updateTagsFilterToggle,
				// updateTagsFilterRemove: updateTagsFilterRemove,
				// updateTagsFilterClean: updateTagsFilterClean,
				updateSearchFilter: updateSearchFilter,

				//helperts
				getTagsSortedAsArray: getTagsSortedAsArray,

			}}
		>
			{children}
		</GeneralContext.Provider>
	)

}

export default GeneralContextProvider