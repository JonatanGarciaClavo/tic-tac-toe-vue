import { EMPTY_SPOT, WIN_STATES, MAX_NUM_MOVES, X, O } from "./constants";

export function reset() {
  return [
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT,
    EMPTY_SPOT
  ];
}

export function isValidMove(board, index) {
  if (board[index] === EMPTY_SPOT) {
    return true;
  }
  return false;
}

export function isWin(board) {
  // takes existing board and winning combo and confirms winner or not
  const check = (board, loc1, loc2, loc3) => {
    if (
      ![board[loc1], board[loc2], board[loc3]].includes(EMPTY_SPOT) &&
      board[loc1] === board[loc2] &&
      board[loc1] === board[loc3]
    ) {
      return true;
    }
    return false;
  };
  // loop through combo list and check for the winner
  for (let i = 0; i < WIN_STATES.length; i++) {
    if (check(board, WIN_STATES[i][0], WIN_STATES[i][1], WIN_STATES[i][2])) {
      return { result: true, who: board[WIN_STATES[i][0]], how: WIN_STATES[i] };
    }
  }
  // or return false;
  return { result: false, who: null };
}

export function isDraw(board, history) {
  if (!board.includes(EMPTY_SPOT) && history.length === MAX_NUM_MOVES) {
    return true;
  }
  return false;
}

export function nextCPUMove(currentBoard, maxMe, minMe) {
  let nextMove = null;

  // recursive minimax tree search and scoring function
  const mmRecursiveSearch = function(board, lastPlayer, depth) {
    // This function will simulate all possible variations of the game from the current state and assing scores to any winner state it discovers, passing found win states back up the tree, until the highest value move is discovered.

    // WIN STATE SCORING
    // MinMax scores a board state immediately if it's in a win state, so we don't have to go any deeper on this node. What about draws? Handled later.
    if (isWin(board).who === maxMe) {
      // a winning board state for the machine scores 10, but the deeper it goes, the less certain we are of the value of the win, so we subtract the depth to reduce the value of the winning state.
      return 10 - depth;
    } else if (isWin(board).who === minMe) {
      // a winning board state for a human scores -10, but the deeper it goes, the less certain we are of the value of the win, so we subtract 10 to reduce the impact of the winning state.
      return depth - 10;
    }

    // SWITCH PLAYERS
    // if this wasn't a win, then we need to make the nextplayer different from @param: lastPlayer, then we need to select the next player to simulate moves for
    let nextPlayer = lastPlayer === X ? O : X;

    // SIMULATE MOVES
    // prepare array of all available moves and scores
    let moves = [],
      scores = [];
    // now loop through all available moves and play that move with the nextPlayer. Recursively call this function again to get a score for that board state.
    for (let i = 0; i < board.length; i++) {
      // copy our board
      let nextBoard = board.slice();
      // will only make a recursive play if there are spaces left on the board.
      if (nextBoard[i] === EMPTY_SPOT) {
        nextBoard[i] = nextPlayer;
        // moves[x] will ==== scores [x]. We use this for as a basis of 'pushing' found scores up the tree.
        moves.push(i);
        scores.push(mmRecursiveSearch(nextBoard, nextPlayer, depth + 1)); // we don't know the score until all the possible moves afer it have been evaluated, so go find them!
      }
    }

    // PROCESS THE RECURSIVE RESULTS (i.e. what came back up the tree)
    // back at depth 0, actually make a move
    if (depth === 0) {
      // define the next move by choosing the maximum score from all of moves available
      nextMove = moves[scores.indexOf(Math.max.apply(EMPTY_SPOT, scores))];

      // DEBUG: summarise the result of the search and where the recommended move is
      console.log("Moves were possible at: " + moves);
      console.log("Scores came out at: " + scores);
      console.log("Make your next move at: " + nextMove);
    } else {
      // any other depth
      if (moves.length === 0) {
        // no more moves could be made,
        return 0; //score this game as a draw. Could shortcut this along with win evaluation, but it also works here
      }

      if (nextPlayer === maxMe) {
        // which scores do we want? depends if it's a min or max turn!
        return Math.max.apply(Math, scores); // for the max turns, pass back max scores.
      } else {
        return Math.min.apply(Math, scores); // for the min turns, pass back min scores.
      }
    }
  };

  // find our next move
  mmRecursiveSearch(currentBoard, minMe, 0);
  // play it!
  console.log("OK, making move at: " + nextMove);
  return {
    char: maxMe,
    position: nextMove,
  };
}
