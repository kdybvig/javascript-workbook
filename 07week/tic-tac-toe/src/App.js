import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    board: ['','','','','','','','',''],
    curPlayer: 'X',
    gameOver: false,
    canvasCoordinates: []
  }

  handleClick = (idx) => {
    if (this.state.gameOver || this.state.board[idx]) return
    const newBoard = this.state.board.slice(); //create a copy of the board
    newBoard[idx] = this.state.curPlayer;
    const newPlayer = this.state.curPlayer === 'X' ? 'O' : 'X' //switch player
    const checkForWinArr = this.checkForWin(newBoard)
    const gameOver = checkForWinArr[0];
    const newCoordinates = checkForWinArr[1];
    if (gameOver) {
      this.setState ({
        board: newBoard,
        gameOver: gameOver,
        canvasCoordinates: newCoordinates
      });
    }
    else {
      this.setState({
        board: newBoard,
        curPlayer: newPlayer //if nobody wins, switch players
      })
    }
  }

  checkForWin = (board) => {
    const winCombos = [
      [0,1,2], [3,4,5], [6,7,8], //rows
      [0,3,6], [1,4,7], [2,5,8], //columns
      [0,4,8], [2,4,6] //diaganols
    ]
    let gameOver = false;
    const newCoordinates = []
    const startPos = 2;
    const endPos = 158;
    winCombos.forEach((combo, comboIdx) => {
      let hasCombo = true;
      combo.forEach(idx => {
        if(board[idx] !== this.state.curPlayer) hasCombo= false;
      }); //hasCombo is false if any squares lack the current player's symbol
      if (hasCombo) {
        gameOver = 'win';
        if(comboIdx < 3) {
          const yPos = 27 + 52*comboIdx
          newCoordinates.push(startPos, yPos, endPos, yPos)
        }
        else if (comboIdx < 6) {
          const xPos = 27 + 52*(comboIdx-3)
          newCoordinates.push(xPos, startPos, xPos, endPos)
        }
        else if (comboIdx === 6) {
          newCoordinates.push(startPos,startPos,endPos,endPos)
        }
        else if (comboIdx === 7) {
          newCoordinates.push(startPos,endPos,endPos,startPos)
        }
      };
    });
    if(!gameOver) { //if the game is not won
      if(board.indexOf('') === -1) gameOver = 'tie'; //if every square is occupied
    }
    return [gameOver, newCoordinates];
  }

  endOfGame = () => {
    const endMessage = this.state.gameOver === 'tie' ? 'The game is a tie.' : `${this.state.curPlayer} wins!`
    return (
      <div>
      <p>{endMessage}</p>
      <PlayAgain onClick={this.handlePlayAgainClick}/>
      </div>
    )
  }

  handlePlayAgainClick = () => {
    this.setState ({
      board: ['','','','','','','','',''],
      curPlayer: 'X',
      gameOver: false
    }) //reset state to the original state
  }

  renderSquare = (idx) => {
    let className = ''
    if (Math.floor(idx/3) === 0) {className += 'top' } // first row
    else if (Math.floor(idx/3) === 2) {className += 'bottom'} //last row
    if (idx%3 === 0) {className += ' left'} //first column
    else if (idx%3 === 2) {className += ' right'} //last column
    return (
      <Square
      value = {this.state.board[idx]}
      onClick = {()=>this.handleClick(idx)}
      className = {className}
      />
    )
  }

  render() {
    return (
      <div>
         <h2>Up next: {this.state.curPlayer}</h2>
         <div id = 'tic-tac-toe'>
         {this.state.gameOver === 'win' && <Canvas coordinates = {this.state.canvasCoordinates}/>}
         <table>
           <tbody>
             <tr>
             {this.renderSquare(0)}
             {this.renderSquare(1)}
             {this.renderSquare(2)}
             </tr>
             <tr>
             {this.renderSquare(3)}
             {this.renderSquare(4)}
             {this.renderSquare(5)}
             </tr>
             <tr>
             {this.renderSquare(6)}
             {this.renderSquare(7)}
             {this.renderSquare(8)}
             </tr>
           </tbody>
         </table>
         </div>
         {this.state.gameOver && this.endOfGame()}
      </div>
    );
  }
}

const Square = (props) => {
  return (
    <td
    onClick= {props.onClick}
    className = {props.className}>
    {props.value}
    </td>)
}

const PlayAgain = (props) => {
  return (
    <button onClick={props.onClick}>Play Again</button>
  )
}

class Canvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const coordinates = this.props.coordinates
    ctx.beginPath();
    ctx.moveTo(coordinates[0],coordinates[1]);
    ctx.lineTo(coordinates[2],coordinates[3]);
    ctx.lineWidth = 5;
    ctx.stroke();
    }
  render() {
    return(
        <canvas ref="canvas" width={160} height={160} />
    )
  }
}


export default App;
