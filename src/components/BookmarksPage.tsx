import React, {useContext, useState, useEffect, useRef} from 'react'
import { GeneralContext } from "./GeneralContext";
import classNames from "classnames";

import HomeLinks from './BookmarksPageHomeLinks'
import FilteredLinks from './BookmarksFilteredLinks'

import Loading from './Loading'
import s from "./BookmarksPage.module.scss"

function App() {
  const searchElementRef = useRef()

  const [ isEditMode, setEditMode ] = useState(false)
  const [ isSearchFocused, setIsSearchFocused ] = useState(true)
  const generalContext = useContext(GeneralContext)
  const { isLoading, filters, filteredBookmarks, bookmarks, bookmarksAtStart, categories, tags, updateCategoryFilter, updateTagsFilterToggle, updateSearchFilter, reloadData } = generalContext
  const editModeToggle = () =>{
    setEditMode(!isEditMode)
  }
// console.log({filteredBookmarks})
  const updateSearchInputFocused = (isFocused) =>{
    setIsSearchFocused(isFocused)
  }
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      window.open(`https://www.google.es/search?q=${filters.searchString}`,'_blank')
    }
  };
  const editModeReload = () =>{
    reloadData()
  }
  const hasResults = bookmarks.length !== filteredBookmarks.length

  // Check url params
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const searchStringInUrl = hashParams.get('s')
    if(searchStringInUrl){
      updateSearchFilter({searchString:searchStringInUrl})
      if(searchElementRef.current){
        searchElementRef.current.value = searchStringInUrl
      }
    }
  }, [])

  // onsole.log(categories)
  // onsole.log(filteredBookmarks)
  return (
    <div className={s.bigContainer}>
      <Loading active={isLoading} />
      <div className={s.editModeActions}>
        { isEditMode && (<div className={s.editModeRefreshButton} onClick={editModeReload}>🔁️</div>)}
        <div className={s.editModeToggleButton}
        onClick={editModeToggle}>✏️</div>
      </div>
      <div className={s.bigSearchContainer}>
        <input
          ref={searchElementRef}
          autoFocus={true}
          className={s.bigSearch}
          type="search"
          onChange={(e) => updateSearchFilter({searchString:e.target.value})}
          onFocus={() => updateSearchInputFocused(true)}
          onBlur={() => updateSearchInputFocused(false)}
          onKeyUp={handleKeyUp}
        />
      </div>

      {
        //   ____  __    ___  ____
        //  (_  _)/ _\  / __)/ ___)
        //    )( /    \( (_ \\___ \
        //   (__)\_/\_/ \___/(____/
      }
      <ul className={s.tags}>
        {
          tags.sort((a,b) => a.name.localeCompare(b.name)).map((tag, key) => {
            //todo if(tags[tag].count === 0) return null
            return (
              <li  key={key} className={classNames(s.tag, {
                //todo
                [s.tagActive]: filters.tags.includes(tag),
                // [s.size1]: tags[tag].count > 8 && tags[tag].count<= 16,
                // [s.size2]: tags[tag].count > 16 && tags[tag].count<= 24,
                // [s.size3]: tags[tag].count > 24,
              })}>
                <button onClick={() => updateTagsFilterToggle({tag:tag})}>
                <strong>{tag.name}</strong>
                {/* //todo <span> {tags[tag].count}</span> */}
              </button>
              </li>
            )})
        }
      </ul>

      {
        //   _  _   __   _  _  ____    __    __  __ _  __ _  ____
        //  / )( \ /  \ ( \/ )(  __)  (  )  (  )(  ( \(  / )/ ___)
        //  ) __ ((  O )/ \/ \ ) _)   / (_/\ )( /    / )  ( \___ \
        //  \_)(_/ \__/ \_)(_/(____)  \____/(__)\_)__)(__\_)(____/
      }
      {!hasResults && bookmarksAtStart.length>0 && (
      
      <HomeLinks categories={categories} bookmarksAtStart={bookmarksAtStart} isEditMode={isEditMode} />
      )}

      {

        //   ____  __  __   ____  ____  ____  ____  ____    __    __  __ _  __ _  ____
        //  (  __)(  )(  ) (_  _)(  __)(  _ \(  __)(    \  (  )  (  )(  ( \(  / )/ ___)
        //   ) _)  )( / (_/\ )(   ) _)  )   / ) _)  ) D (  / (_/\ )( /    / )  ( \___ \
        //  (__)  (__)\____/(__) (____)(__\_)(____)(____/  \____/(__)\_)__)(__\_)(____/
      }
      
      {
        filteredBookmarks.length>0 && hasResults && 
      (<FilteredLinks bookmarks={filteredBookmarks} isEditMode={isEditMode} />)
      
      }


      {

        //   ____  __  ____
        //  (_  _)(  )(  _ \
        //    )(   )(  ) __/
        //   (__) (__)(__)
      }
      { isSearchFocused && filters.searchString?.length > 0 && (<div className={s.tipBox}><span className={s.tipIcon}>💁‍️</span><span className={s.tipText}>Press ENTER to search in Google</span></div>) }

    </div>
  );
}

export default App;
