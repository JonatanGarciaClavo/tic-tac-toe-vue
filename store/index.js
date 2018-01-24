import { X, O, HUMAN, CPU } from "../utils/constants";
import { reset, nextCPUMove, isValidMove, isWin, isDraw } from "../utils/game";

export const actions = {
  START_GAME({ commit, dispatch }) {
    commit("startGame");
    dispatch("CPU_NEXT_MOVE");
  },
  NEXT_MOVE({ commit, state, dispatch }, index) {
    if (isValidMove(state.boardState, index)) {
      const newBoard = [...state.boardState];
      newBoard[index] = state.humanToken;
      const newHistory = [
        ...state.history,
        {
          char: state.humanToken,
          position: index
        }
      ];
      commit("addMove", {newBoard, newHistory, currentPlayer: CPU});
      dispatch("POST_MOVE");
    }
  },
  POST_MOVE({ state, dispatch, commit }) {
    const winCheck = isWin(state.boardState);
    if (winCheck.result) {
      commit("endGame", winCheck);
    }
    if (isDraw(state.boardState, state.history)) {
      commit("endGame", { who: 'tie' });
    }
    if (state.currentPlayer === CPU) {
      dispatch("CPU_NEXT_MOVE");
    }
  },
  CPU_NEXT_MOVE({ commit, state, dispatch }) {
    const move = nextCPUMove(
      state.boardState,
      state.cpuToken,
      state.humanToken
    );
    const newBoard = [...state.boardState];
    newBoard[move.position] = state.cpuToken;
    const newHistory = [...state.history, move];
    commit("addMove", { newBoard, newHistory, currentPlayer: HUMAN });
    dispatch("POST_MOVE");
  }
};

export const mutations = {
  startGame(state) {
    state.boardState = reset();
    state.history = [];
    state.currentPlayer = CPU;
    state.winConditions = null;
  },
  addMove(state, { newBoard, newHistory, currentPlayer }) {
    state.boardState = newBoard;
    state.history = newHistory;
    state.currentPlayer = currentPlayer;
  },
  endGame(state, winConditions) {
    state.winConditions = winConditions;
  }
};

export const state = () => ({
  boardState: null,
  history: [],
  humanToken: X,
  cpuToken: O,
  currentPlayer: CPU,
  winConditions: null,
});
