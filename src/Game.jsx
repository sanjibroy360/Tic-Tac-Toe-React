import React from "react";
import Board from "./drawBoard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick = (i) => {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    var squares = current.squares.slice();

    if (this.getWinner(squares) || squares[i]) {
      //Check winner or already filled
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "0";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  getWinner(squares = []) {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];

      if (squares && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  }

  render() {
    console.log(this.state);
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.getWinner(current.squares);

    let status;

    let moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <>
        {winner
          ? `Winner is : ${winner}`
          : `Next is : ${this.state.xIsNext ? "X" : "0"}`}
        <div className="board_flex">
          <Board
            onClick={this.handleClick}
            squares={current.squares}
            xIsNext={this.state.xIsNext}
          />

          <ol className="move_list">{moves}</ol>
        </div>
      </>
    );
  }
}

export default Game;
