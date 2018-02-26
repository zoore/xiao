
var Phaser = Phaser || {};
var Tacit = Tacit || {};

Tacit.TitleManager = function(gameState) {
  "use strict";
  Object.call(this);
  this.gameState = gameState;

  // 垃圾标题
  game.missionTitle = '88';
};

Tacit.TitleManager.prototype = Object.create(Object.prototype);
Tacit.TitleManager.prototype.constructor = Tacit.TitleManager;

Tacit.TitleManager.prototype.levelScore = function() {
  this.updateScore('left', (this.gameState.levelManager.itemCount + this.gameState.LevelTime - this.gameState.timeCount) * 10);
  this.updateScore('right', (this.gameState.levelManager.itemCount + this.gameState.LevelTime - this.gameState.timeCount) * 10);
}

Tacit.TitleManager.prototype.updateScore = function(side, score) {
  this.gameState.missionTitle.text = game.leftScore + "";
}
