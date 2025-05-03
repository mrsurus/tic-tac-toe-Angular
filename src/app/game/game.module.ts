import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';



@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [GamePageComponent]
})
export class GameModule { }
