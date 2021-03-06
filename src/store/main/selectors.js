export const selectResults = (state) => state.games.gamesData.results;
export const selectNextPageURL = (state) => state.games.gamesData.next;
export const selectPreviousPageURL = (state) => state.games.gamesData.previous;
export const selectPage = (state) => state.games.currentPageNumber;
export const selectChosenGenre = (state) => state.games.selectedGenre;
export const selectChosenPlatform = (state) => state.games.selectedPlatform;
export const selectScreenshots = (state) => state.games.currentGameScreenshots;
export const selectGame = (state) => state.games.game;
export const selectStatus = (state) => state.games.status;
