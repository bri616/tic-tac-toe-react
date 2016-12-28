import React from 'react';
import Board from './Board.js';
import calculateWinner from './calculateWinner.js';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],  
      playerOneIsNext: true,
      currentPlayer: '⛄️',
      stepNumber: 0,
    }
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerOneIsNext: (step % 2) ? false : true,
      currentPlayer: (step % 2) ? '⛄️':'🐰' , 
    });
  }
  nextPlayer() {
    const nextPlayer = !this.state.playerOneIsNext ? '⛄️': '🐰';
    return nextPlayer;
  }
  handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = this.state.currentPlayer; 
      this.setState({
          history: history.concat([{
              squares: squares
          }]),
          playerOneIsNext: !this.state.playerOneIsNext,
          currentPlayer: this.nextPlayer(),
          stepNumber: history.length,
      });
  }
  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const description = move ? "Move #" + move : "Game start"
        return (
            <li key={move}>
                <a href="#" onClick={() => this.jumpTo(move)}>{description}</a>
            </li>
        );
      });

      let status;
      if (winner) {
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + this.state.currentPlayer;
      }
    return (
      <div className="game">
        <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
