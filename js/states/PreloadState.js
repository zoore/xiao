
var Phaser = Phaser || {};
var Tacit = Tacit || {};

Tacit.PreloadState = function () {
  "use strict";
  Tacit.BaseState.call(this);
};

Tacit.PreloadState.prototype = Object.create(Tacit.BaseState.prototype);
Tacit.PreloadState.prototype.constructor = Tacit.PreloadState;

Tacit.PreloadState.prototype.preload = function () {
  "use strict";
  game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');
  var preloadSprite = this.game.add.sprite(WIDTH/2, HEIGHT/2, 'loading');
  preloadSprite.anchor.setTo(0.5, 0.5);
  var dian = this.game.add.sprite(WIDTH/2 + 170, HEIGHT/2 - 230, 'dian');
  dian.anchor.setTo(0.5, 0.5);
  dian.animations.add('loading');
  dian.animations.play('loading', 3, true);
  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  var text = game.add.text(WIDTH/2 - 30, HEIGHT/2 - 200, "0%", style);
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
  
  game.load.image('serial', 'assets/serial.png');
  game.load.image('tech-support', 'assets/tech-support.png');
  game.load.image('menu_word', 'assets/menu_word.png');
  game.load.image('brain', 'assets/brain.png');
  game.load.spritesheet('theme', 'assets/theme.png', 658, 200);
  game.load.image('mask', 'assets/mask.png');
  game.load.image('redError', 'assets/redError.png');
  game.load.image('dash', 'assets/dash.png');
  game.load.image('pointer', 'assets/pointer.png');
  game.load.image('circleMask', 'assets/circle_mask.png');
  game.load.bitmapFont('TacitNum', 'assets/num.png', 'assets/num.xml');
  game.load.spritesheet('button_black', 'assets/button_black.png', 265, 358);
  game.load.spritesheet('button_blue', 'assets/button_blue.png', 265, 358);
  game.load.spritesheet('button_green', 'assets/button_green.png', 265, 358);
  //game.load.spritesheet('button_red', 'assets/button_red.png', 265, 358);
  game.load.spritesheet('button_yellow', 'assets/button_yellow.png', 265, 358);
  game.load.image('button_circle', 'assets/button_circle.png');
  game.load.image('award', 'assets/award.png');

  game.load.image('game_info1', 'assets/game_info1.png');
  game.load.image('game_info2', 'assets/game_info2.png');
  game.load.image('pass', 'assets/pass.png');

  game.load.image('tree-anim-lray', 'assets/tree-anim-lray.png');
  game.load.image('tree-anim-sray', 'assets/tree-anim-sray.png');
  game.load.image('tree-anim-circle', 'assets/tree-anim-circle.png');

  game.load.spritesheet('missonicon_black0', 'assets/icons/missonicon_black0.png', 100, 99);
  game.load.spritesheet('missonicon_black1', 'assets/icons/missonicon_black1.png', 100, 99);
  game.load.spritesheet('missonicon_black2', 'assets/icons/missonicon_black2.png', 100, 99);
  game.load.spritesheet('missonicon_blue0', 'assets/icons/missonicon_blue0.png', 100, 99);
  game.load.spritesheet('missonicon_blue1', 'assets/icons/missonicon_blue1.png', 100, 99);
  game.load.spritesheet('missonicon_blue2', 'assets/icons/missonicon_blue2.png', 100, 99);
  game.load.spritesheet('missonicon_green', 'assets/icons/missonicon_green.png', 100, 99);
  game.load.spritesheet('missonicon_green0', 'assets/icons/missonicon_green0.png', 100, 99);
  game.load.spritesheet('missonicon_green1', 'assets/icons/missonicon_green1.png', 100, 99);
  game.load.spritesheet('missonicon_green2', 'assets/icons/missonicon_green2.png', 100, 99);
  game.load.spritesheet('missonicon_yellow', 'assets/icons/missonicon_yellow.png', 100, 99);
  game.load.spritesheet('missonicon_yellow0', 'assets/icons/missonicon_yellow0.png', 100, 99);
  game.load.spritesheet('missonicon_yellow1', 'assets/icons/missonicon_yellow1.png', 100, 99);
  game.load.spritesheet('missonicon_yellow2', 'assets/icons/missonicon_yellow2.png', 100, 99);
  game.load.image("missonicon_black0-yoyo", "assets/icons/missonicon_black0-yoyo.png");
  game.load.image("missonicon_black1-yoyo", "assets/icons/missonicon_black1-yoyo.png");
  game.load.image("missonicon_black2-yoyo", "assets/icons/missonicon_black2-yoyo.png");
  game.load.image("missonicon_blue0-yoyo", "assets/icons/missonicon_blue0-yoyo.png");
  game.load.image("missonicon_blue1-yoyo", "assets/icons/missonicon_blue1-yoyo.png");
  game.load.image("missonicon_blue2-yoyo", "assets/icons/missonicon_blue2-yoyo.png");
  game.load.image("missonicon_green0-yoyo", "assets/icons/missonicon_green0-yoyo.png");
  game.load.image("missonicon_green1-yoyo", "assets/icons/missonicon_green1-yoyo.png");
  game.load.image("missonicon_green2-yoyo", "assets/icons/missonicon_green2-yoyo.png");
  game.load.image("missonicon_yellow0-yoyo", "assets/icons/missonicon_yellow0-yoyo.png");
  game.load.image("missonicon_yellow1-yoyo", "assets/icons/missonicon_yellow1-yoyo.png");
  game.load.image("missonicon_yellow2-yoyo", "assets/icons/missonicon_yellow2-yoyo.png");
  game.load.image("cover", "assets/cover.png");
  game.load.image("plusScore", "assets/plusScore.png");
  game.load.image("descScore", "assets/descScore.png");
  game.load.image("gesture_left", "assets/gesture_left.png");
  game.load.image("gesture_right", "assets/gesture_right.png");

  for(var i=1; i<=12; i++) {
    game.load.image("tree" + i, "assets/tree/tree" + i + ".png");
  }

  game.load.spritesheet('gameover', 'assets/gameover.png', 743, 112);

  game.load.image("tree_left", "assets/tree_left.png");
  game.load.image("tree_right", "assets/tree_right.png");
  game.load.image("name", "assets/name.png");
  game.load.image("org", "assets/org.png");
  game.load.image("small_theme", "assets/small_theme.png");

  game.load.audio("sound-menu", ["assets/sound/menu.wav"], true);
  game.load.audio("sound-win", ["assets/sound/win.wav"], true);
  game.load.audio("sound-right", ["assets/sound/right.wav"], true);
  game.load.audio("sound-eat", ["assets/sound/eat.mp3"], true);
  game.load.audio("sound-nextlevel", ["assets/sound/nextlevel.wav"], true);
  game.load.audio("sound-gameover", ["assets/sound/gameover.wav"], true);
  game.load.audio("sound-error", ["assets/sound/error.wav"], true);
  game.load.audio("sound-startlevel", ["assets/sound/startlevel.wav"], true);

  game.load.json('level1', 'js/levels/level1.json');

  game.load.onFileComplete.add(function(process) {
    text.text = process + "%";
  });

};

Tacit.PreloadState.prototype.create = function () {
  "use strict";
  // 初始化全局对象
  game.soundManager = new Tacit.SoundManager();
  game.sound.setDecodedCallback(["sound-menu", "sound-win", "sound-right", "sound-nextlevel", "sound-gameover", "sound-error", "sound-startlevel"], function() {
    game.state.start('StartState');
  }, this);
};
