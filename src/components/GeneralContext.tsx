
import React, {createContext, useState, useEffect} from 'react'
import Fuse from 'fuse.js'
import { removeEmoji } from '../helpers/cleaningTools'
import useCache from '../services/useCache'
// import type { BookmarkProp, TagProp, BookmarksAPIRAWData } from '../types'
import categoriesDataTransform from '../helpers/categoriesDataTransform'
import bookmarksDataTransform from '../helpers/bookmarksDataTransform'

// @ts-ignore
export const GeneralContext = createContext()
// @ts-ignore
const GeneralContextProvider = ({ children }) => {
	const [ isLoading, setIsLoading ] = useState(false)
	



	const [ bookmarks, setBookmarks ] = useState([])
	const [ categories, setCategories ] = useState([])
	const [ tags, setTags ] = useState([])

	const [ filteredBookmarks, setFilteredBookmarks ] = useState([])
	const [ bookmarksAtStart, setBookmarksAtStart ] = useState([])

	const [ filters, setFilters ] = useState({
		searchString: '',
		category: '',
		tags: [],
	})
	const [ searchBookmarksIdx, setSearchBookmarksIdx ] = useState(null)



//    ___  ____  ____    ____   __  ____  __
//   / __)(  __)(_  _)  (    \ / _\(_  _)/ _\
//  ( (_ \ ) _)   )(     ) D (/    \ )( /    \
//   \___/(____) (__)   (____/\_/\_/(__)\_/\_/


	const [ bookmarksAPIDataQuery, bookmarksAPIDataResult] = useCache()

	useEffect(() => {
		// @ts-ignore
		bookmarksAPIDataQuery('/api')
	}, [])

	useEffect(() => {
		console.log('bookmarksAPIDataResult')
		console.log(bookmarksAPIDataResult)
		// if(Array.isArray(BookmarksAPIDataResult))
		//Transform and extraxt necesary data of RAW API data
		//Bookmarks
		// @ts-ignore
		if(!!bookmarksAPIDataResult?.bookmarks && !!bookmarksAPIDataResult?.categories){
			// @ts-ignore
			setBookmarks(bookmarksDataTransform(bookmarksAPIDataResult?.bookmarks))
			// @ts-ignore
			setCategories(categoriesDataTransform(bookmarksAPIDataResult?.categories))
		}
	}, [bookmarksAPIDataResult])

	// @ts-ignore
	const updateBookmarks = ({newBookmarks, cached}) => {
		if(!cached){
			localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
			setIsLoading(false);
		}

		setBookmarks(newBookmarks)
	}
	
	// @ts-ignore
	const updateCategories = ({newCategories, cached}) => {
		if(!cached){
			localStorage.setItem("categories", JSON.stringify(newCategories))
			setIsLoading(false);
		}
		setCategories(newCategories)
	}

	useEffect(() => {
		if(!!bookmarks?.length  &&  !!categories?.length){

			// const newTags = {}
			// bookmarks.forEach((bookmark) => {
			// 	// @ts-ignore
			// 	bookmark.tags.forEach(tag => {
			// 		if(tag.name!==""){
			// 			// @ts-ignore
			// 			if(!newTags[tag]){
			// 				// @ts-ignore
			// 				newTags[tag] = {
			// 					count: 1,
			// 				}
			// 			} else {
			// 				// @ts-ignore
			// 				newTags[tag].count++;
			// 			}
			// 		}
			// 	})
			// })


			const newTags:Array<any> = []
			bookmarks.forEach((bookmark) => {
				console.log({newTags})
				// @ts-ignore
				bookmark.tags.forEach(tag => {
					if(tag.name!==""){
						// @ts-ignore
						
						if(newTags.find(newTag => newTag.id === tag.id)){
							// @ts-ignore
							newTags.find(newTag => newTag.id === tag.id).count=newTags.find(newTag => newTag.nid === tag.nid).count + 1
						} else {
							// @ts-ignore
							newTags.push({
								...tag,
								count: 1
							})
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
		// @ts-ignore
		setBookmarksAtStart(bookmarks.filter(b => b.isAtStart))
	}


//   ____  __  __   ____  ____  ____  ____
//  (  __)(  )(  ) (_  _)(  __)(  _ \/ ___)
//   ) _)  )( / (_/\ )(   ) _)  )   /\___ \
//  (__)  (__)\____/(__) (____)(__\_)(____/

	const updateCategoryFilter = ({catId = ''}) => {
		const newCatId = catId === filters.category ? '' : catId
		setFilters(filters => ({ ...filters, category: newCatId}))
	}
	// @ts-ignore
	const updateTagsFilterAdd = ({tag}) => {
		setFilters(filters => ({ ...filters, tags: [...filters.tags, tag]}))
	}
	// @ts-ignore
	const updateTagsFilterRemove = ({tag}) => {
		setFilters(filters => ({ ...filters, tags: filters.tags.filter(currentTag => currentTag !== tag)}))
	}
	// @ts-ignore
	const updateTagsFilterToggle = ({tag}) => {
		// @ts-ignore
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
			// @ts-ignore
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
				// @ts-ignore
				const indexesResult = searchBookmarksIdx.search(filters.searchString)
				// @ts-ignore
				newFilteredBookmarks = indexesResult.map(index => index.item)
			}
		}
		setFilteredBookmarks(newFilteredBookmarks)
	}

	useEffect(() => {
		filtersRefresh()
	},[filters])

	const updateBookmarksByTags = () =>{ //todo
		// const newTags = tags.map((tag) => ({
		// 	...tag,
		// 	count: 0
		// }))
		// filteredBookmarks.forEach((bookmark) => {
		// 	// @ts-ignore
		// 	bookmark.tags.forEach(tag => {
		// 		if(tag.name!=="") {
		// 			// @ts-ignore
		// 			if(!newTags[tag]) newTags[tag] = { count: 0}
		// 			// @ts-ignore
		// 			newTags[tag].count++;

		// 		}
		// 	})
		// })
		// setTags(newTags)
	}

	useEffect(() => {
		updateBookmarksByTags()
	},[filteredBookmarks])


	// @ts-ignore
	// const getTagsSortedAsArray = (ts) => {
	// 	const tagsAsArray = Object.entries(ts);

	// 	return tagsAsArray.sort((a,b) => {

	// 		//Por nombre
	// 		if (removeEmoji(a[0].toLowerCase()) > removeEmoji(b[0].toLowerCase())) {
	// 			return 1;
	// 		}
	// 		if (removeEmoji(a[0].toLowerCase()) < removeEmoji(b[0].toLowerCase())) {
	// 			return -1;
	// 		}

	// 		return 0;
	// 	})
	// }


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


				updateCategoryFilter: updateCategoryFilter,
				updateTagsFilterToggle: updateTagsFilterToggle,
				// updateTagsFilterRemove: updateTagsFilterRemove,
				// updateTagsFilterClean: updateTagsFilterClean,
				updateSearchFilter: updateSearchFilter,

				//helperts
				// getTagsSortedAsArray: getTagsSortedAsArray,

			}}
		>
			{children}
		</GeneralContext.Provider>
	)

}

export default GeneralContextProvider;