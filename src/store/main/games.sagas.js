import axios from 'axios';
import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  getGamePage,
  getGamePageSuccess,
  getGames,
  getGamesError,
  getGamesSuccess,
  getGamesWitchFiltersError,
  getGamesWithFilter,
  getGamesWithFilterSuccess,
  getLastRequestedPage,
  getLastRequestedPageError,
  getLastRequestedPageSuccess,
  getNextPageWithRequestedQueryParams,
  getNextPageWithRequestedQueryParamsError,
  getNextPageWithRequestedQueryParamsSuccess
} from './mainSlice';

const BASE_URL = 'https://api.rawg.io/api/';

function* workFetchGames(action) {
  const axiosFormatted = axios.create({
    baseURL: `${BASE_URL}games?key=58e43edf81094db9b034a89c52461039&page=${action.payload}`
  });
  try {
    const gamesFetch = yield call(() => axiosFormatted.get());
    console.log(gamesFetch.data);
    yield put(getGamesSuccess(gamesFetch.data));
  } catch (error) {
    yield put(getGamesError(error));
  }
}

function* workFetchGamePage(action) {
  const axiosFormatted = axios.create({
    baseURL: `${BASE_URL}games/${action.payload.gameID}?key=58e43edf81094db9b034a89c52461039`
  });
  try {
    const gamePageFetch = yield call(() => axiosFormatted.get());
    console.log(gamePageFetch.data);
    yield put(getGamePageSuccess(gamePageFetch.data));
  } catch (error) {
    yield put(getGamesError(error));
  }
}

function* workFetchGamesWithFilter(action) {
  const params = {
    key: '58e43edf81094db9b034a89c52461039'
    /*page: 1*/
  };
  console.log('selectedPlatform', action.payload.selectedPlatform);

  if (action.payload.selectedGenre === 'none') {
    delete params.genres;
    params.platforms = action.payload.selectedPlatform;
  } else {
    params.genres = action.payload.selectedGenre;
    params.platforms = action.payload.selectedPlatform;
  }

  if (action.payload.selectedPlatform === 'none') {
    delete params.platforms;
    params.genres = action.payload.selectedGenre;
  } else {
    params.platforms = action.payload.selectedPlatform;
  }

  try {
    const gamesWithFilterFetch = yield call(() =>
      axios.get('https://api.rawg.io/api/games', { params })
    );
    console.log(gamesWithFilterFetch.data);
    console.log('RESPONSE', gamesWithFilterFetch.request.responseURL);
    yield put(
      getGamesWithFilterSuccess(
        gamesWithFilterFetch.data,
        gamesWithFilterFetch.request.responseURL
      )
    );
  } catch (error) {
    yield put(getGamesWitchFiltersError(error));
  }
}

function* workFetchLastRequestedPage(action) {
  const axiosFormatted = axios.create({
    baseURL: `${action.payload}`
  });
  try {
    const gamesFetch = yield call(() => axiosFormatted.get());
    console.log(gamesFetch.data);
    yield put(getLastRequestedPageSuccess(gamesFetch.data));
  } catch (error) {
    yield put(getLastRequestedPageError(error));
  }
}

function* workFetchNextPage(action) {
  const axiosFormatted = axios.create({
    baseURL: `${action.payload.nextPageRequestURL}`
  });
  try {
    const nextPageFetch = yield call(() => axiosFormatted.get());
    console.log(nextPageFetch.data);
    yield put(
      getNextPageWithRequestedQueryParamsSuccess(
        nextPageFetch.data,
        nextPageFetch.request.responseURL
      )
    );
  } catch (error) {
    yield put(getNextPageWithRequestedQueryParamsError(error));
  }
}


/*{
  params: {
    key: '58e43edf81094db9b034a89c52461039',
      genres: 'strategy',
      platforms: '21',
      page: 1,
      search: '',
      search_exact: true,
      search_precise: true,
      ordering: '-metacritic'
  }
}*/
function* gamesSaga() {
  yield all([
    yield takeEvery(getGames, workFetchGames),
    yield takeEvery(getGamePage, workFetchGamePage),
    yield takeEvery(getGamesWithFilter, workFetchGamesWithFilter),
    yield takeEvery(getLastRequestedPage, workFetchLastRequestedPage),
    yield takeEvery(getNextPageWithRequestedQueryParams, workFetchNextPage)
  ]);
}

export { gamesSaga };
