export const getSinger = state => state.singer


export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}

export const getDisc = state => state.disc

export const getTopList = state => state.topList
export const playHistory = state => state.playHistory
export const getSearchHistory = state => state.searchHistory

export const favoriteList = state => state.favoriteList