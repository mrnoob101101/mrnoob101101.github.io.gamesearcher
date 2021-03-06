import { createSlice } from '@reduxjs/toolkit';

export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    gamesData: {},
    game: {},
    currentGameScreenshots: [],
    status: 'idle',
    currentPageNumber: 1,
    lastRequestURL: '',
    selectedGenre: '',
    selectedPlatform: '',
    searchQuery: '',
    favorite: [],
  },
  reducers: {
    getGames(state, action) {
      state.currentPageNumber = action.payload;
      state.status = 'loading';
      state.selectedPlatform = '';
      state.selectedGenre = '';
      console.log(state.status);
    },
    getGamesSuccess(state, action) {
      state.status = 'success';
      state.gamesData = action.payload;
      console.log(state.status);
    },
    getGamesError(state, action) {
      state.status = 'error';
      console.log(action.payload);
    },
    getGameDetails(state) {
      state.status = 'loading';
      console.log(state.status);
    },
    getGameDetailsSuccess(state, action) {
      state.status = 'success';
      state.game = action.payload;
      console.log('лог из саги', action.payload);
    },
    getGameDetailsError(state, action) {
      state.status = 'error';
      console.log(action.payload);
    },
    getLastRequestedPage(state) {
      state.status = 'loading';
      console.log(state.status);
    },
    getLastRequestedPageSuccess(state, action) {
      state.status = 'success';
      state.gamesData = action.payload;
      console.log(state.status);
    },
    getLastRequestedPageError(state, action) {
      state.status = 'error';
      console.log(action.payload);
    },
    setGameScreenshots(state, action) {
      state.currentGameScreenshots = action.payload;
    },
    getGamesWithFilter: {
      reducer: (state, action) => {
        state.status = 'loading';
        state.selectedGenre = action.payload.selectedGenre;
        state.selectedPlatform = action.payload.selectedPlatform;
        state.currentPageNumber = 1;
      },
      prepare: (selectedGenre, selectedPlatform) => {
        return { payload: { selectedGenre, selectedPlatform } };
      },
    },
    getGamesWithFilterSuccess: {
      reducer: (state, action) => {
        state.status = 'success';
        console.log(state.status);
        state.gamesData = action.payload.gamesData;
        state.lastRequestURL = action.payload.requestURL;
        console.log(action.payload);
      },
      prepare: (gamesData, requestURL) => {
        return { payload: { gamesData, requestURL } };
      },
    },
    getGamesWitchFiltersError(state, action) {
      state.status = 'error';
      console.log(action.payload);
    },
    getPaginationPageWithRequestedQueryParams: {
      reducer: (state, action) => {
        state.status = 'loading';
        console.log(state.status);
        state.currentPageNumber = action.payload.page;
      },
      prepare: (paginationPageRequestURL, page) => {
        return { payload: { paginationPageRequestURL, page } };
      },
    },
    getPaginationPageWithRequestedQueryParamsSuccess: {
      reducer: (state, action) => {
        state.status = 'success';
        console.log(state.status);
        state.gamesData = action.payload.gamesData;
        state.lastRequestURL = action.payload.lastRequestURL;

        console.log(action.payload);
      },
      prepare: (gamesData, lastRequestURL) => {
        return { payload: { gamesData, lastRequestURL } };
      },
    },
    getPaginationPageWithRequestedQueryParamsError(state, action) {
      state.status = 'error';
      console.log(action.payload);
    },
    getSearchedGames(state, action) {
      state.status = 'loading';
      state.searchQuery = action.payload;
      state.currentPageNumber = 1;
      console.log(state.status);
    },
    getSearchedGamesSuccess: {
      reducer: (state, action) => {
        state.status = 'success';
        console.log(state.status);
        state.gamesData = action.payload.gamesData;
        state.lastRequestURL = action.payload.requestURL;
      },
      prepare: (gamesData, requestURL) => {
        return { payload: { gamesData, requestURL } };
      },
    },

    /* reducer: (state, action) => {
       state.status = 'success';
       console.log(state.status);
       state.gamesData = action.payload.gamesData;
       state.lastRequestURL = action.payload.requestURL;
     },
     prepare: (gamesData, requestURL) => {
       return { payload: { gamesData, requestURL } };
     },*/

    getSearchedGamesError(state, action) {
      state.status = 'error';
      console.log(action.payload);
    },
  },
});

export const {
  getGames,
  getGamesSuccess,
  getGamesError,
  getGameDetails,
  getGameDetailsError,
  getGameDetailsSuccess,
  getLastRequestedPage,
  getLastRequestedPageSuccess,
  getLastRequestedPageError,
  setGameScreenshots,
  getGamesWithFilter,
  getGamesWithFilterSuccess,
  getGamesWitchFiltersError,
  getPaginationPageWithRequestedQueryParams,
  getPaginationPageWithRequestedQueryParamsSuccess,
  getPaginationPageWithRequestedQueryParamsError,
  getSearchedGames,
  getSearchedGamesSuccess,
  getSearchedGamesError,
} = gamesSlice.actions;
