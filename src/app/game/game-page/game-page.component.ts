import { Component, OnInit } from '@angular/core';
type Cell = string | null

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  boardSize = 5;
  winCondition = 4;
  players = ['X', 'O', 'Y'];
  board: Cell[][] = [];
  currentPlayerIndex = 0;
  winner: string | null = null;
  movesCount = 0;
  isDraw = false;

  ngOnInit() {
    this.initBoard();
  }
  initBoard() {
    this.board = Array(this.boardSize).fill(null).map(() =>
      Array(this.boardSize).fill(null)
    );
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.movesCount = 0;
  this.isDraw = false;
  }

  playMove(row: number, col: number) {
    if (this.board[row][col] || this.winner || this.isDraw) return;

  this.board[row][col] = this.players[this.currentPlayerIndex];
  this.movesCount++;

  if (this.checkWinner(row, col)) {
    this.winner = this.players[this.currentPlayerIndex];
  } else if (this.movesCount === this.boardSize * this.boardSize) {
    this.isDraw = true;
  } else {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }
  }

  resetGame() {
    this.initBoard();
  }

  checkWinner(row: number, col: number): boolean {
    const player = this.players[this.currentPlayerIndex];
    return (
      this.countContinuous(row, col, 0, 1, player) + this.countContinuous(row, col, 0, -1, player) - 1 >= this.winCondition ||
      this.countContinuous(row, col, 1, 0, player) + this.countContinuous(row, col, -1, 0, player) - 1 >= this.winCondition ||
      this.countContinuous(row, col, 1, 1, player) + this.countContinuous(row, col, -1, -1, player) - 1 >= this.winCondition ||
      this.countContinuous(row, col, 1, -1, player) + this.countContinuous(row, col, -1, 1, player) - 1 >= this.winCondition
    );
  }

  countContinuous(row: number, col: number, dRow: number, dCol: number, player: string): number {
    let count = 0;
    let r = row, c = col;

    while (
      r >= 0 && r < this.boardSize &&
      c >= 0 && c < this.boardSize &&
      this.board[r][c] === player
    ) {
      count++;
      r += dRow;
      c += dCol;
    }

    return count;
  }

}
