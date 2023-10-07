import React from "react";
import GeneralContextProvider from "./GeneralContext";
import BookmarksPage from './BookmarksPage.jsx';

const AppContainer = ({children}) => (
  <GeneralContextProvider>
    <BookmarksPage />
  </GeneralContextProvider>
);

export default AppContainer;
