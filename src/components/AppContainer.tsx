import React from "react";
import GeneralContextProvider from "./GeneralContext";
import BookmarksPage from './BookmarksPage';

const AppContainer = () => (
  <GeneralContextProvider>
    <BookmarksPage />
  </GeneralContextProvider>
);

export default AppContainer;
