import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const availableLetters = ['D', 'A', 'R', 'T', 'S'];

export default new Vuex.Store({
  state: {
    currentGame: {
      isActive: false,
      players: []
    }
  },
  mutations: { //synchronous
    setCurrentGame(state, payload) {
      state.currentGame = Object.assign({}, payload);
    },
    // eslint-disable-next-line no-unused-vars
    deleteCurrentGame(state, payload) {
      state.currentGame = {
        isActive: false,
        players: []
      }
    },
    addPlayerToGame(state, payload) {
      state.currentGame.players.push({ name: payload, isUp: false, isOut: false, progress: [] });
    },
    removePlayerFromGame(state, payload) {
      state.currentGame.players.splice(payload, 1);
    },
    setPlayerActive(state, payload) {
      if (state.currentGame.players.find(x => x.isUp))
        state.currentGame.players[state.currentGame.players.findIndex(x => x.isUp)].isUp = false;
      state.currentGame.players[payload].isUp = true;
    },
    addPlayerLetter(state, payload) {
      if(state.currentGame.players[payload].progress.length !== availableLetters.length) {
        state.currentGame.players[payload].progress.push(availableLetters[state.currentGame.players[payload].progress.length]);
        if(state.currentGame.players[payload].progress.length === availableLetters.length)
          state.currentGame.players[payload].isOut = true;
      }
    },
    // eslint-disable-next-line no-unused-vars
    resetPlayers(state, payload) {
      state.currentGame.players.forEach(player => { player.isUp = false; player.isOut = false; player.progress = []})
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getCurrentGame: state => state.currentGame
  }

})
