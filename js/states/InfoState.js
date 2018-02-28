
var Phaser = Phaser || {};
var Tacit = Tacit || {};

Tacit.InfoState = function () {
  "use strict";
  Tacit.BaseState.call(this);
};

Tacit.InfoState.prototype = Object.create(Tacit.BaseState.prototype);
Tacit.InfoState.prototype.constructor = Tacit.InfoState;

Tacit.InfoState.prototype.create = function () {
  "use strict";
  var background = this.game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');

  var mask = game.add.sprite(WIDTH/2, HEIGHT/2, "mask");
  mask.anchor.setTo(0.5, 0.5);

  var info = game.add.image(WIDTH/2, HEIGHT/2 - 30, "game_info");
  info.anchor.setTo(0.5, 0.5);

  var logoText = game.add.text(WIDTH/2, HEIGHT * 0.95, "触摸屏幕开始", {
      fontSize: "48px",
      fill: "#ffffff",
      fontWeight: '100'
  });
  logoText.anchor.setTo(0.5, 0.5);
  logoText.alpha = 0.5;

  game.soundManager.playSoundMenu();

  // 动画完毕之后添加事件
  this.spriteAll = game.add.sprite(0, 0);
  this.spriteAll.addChild(info);
  this.spriteAll.addChild(logoText);
  this.spriteAll.y = -1080;
  var allTween = game.add.tween(this.spriteAll).to({y: 0}, 0, Phaser.Easing.Exponential.Out, true);
  allTween.onComplete.add(function() {

    // '触摸屏幕开始'明暗变化实现
    var tween = game.add.tween(logoText).to({alpha: 1}, 500, "Linear", true, 0, -1);
    tween.yoyo(true, 500);

    // 触摸屏幕开始功能
    game.input.onTap.add(this.onNextState, this);
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.onNextState, this);
  }, this);

};

Tacit.InfoState.prototype.onNextState = function() {
  var allTween = game.add.tween(this.spriteAll).to({y: -1080}, 0, Phaser.Easing.Exponential.Out, true);
  allTween.onComplete.add(function() {
    game.soundManager.stopSoundMenu();
    game.state.start("StartState");
  }, this);
}
