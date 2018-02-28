
var Phaser = Phaser || {};
var Tacit = Tacit || {};

Tacit.StartState = function () {
  "use strict";
  Tacit.BaseState.call(this);
};

Tacit.StartState.prototype = Object.create(Tacit.BaseState.prototype);
Tacit.StartState.prototype.constructor = Tacit.StartState;

Tacit.StartState.prototype.create = function () {
  "use strict";

  this.gOver = false;
  this.canButton = false;

  // 关卡
  this.levelNum = 0;

  this.missions = [];
  this.curLine = 0;
  this.curLineCount = 0;
  
  this.LevelTime = 0;
  this.blood = TOTAL_BLOOD;
  this.timeCount = 0;


  // 背景，遮罩，实现
  game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');
  game.add.image(0, 0, 'mask');

  // 各种组，组的顺序决定层级的顺序
  this.groups = {};
  this.groups["circleMask"] = game.add.group();
  this.groups["mission"] = game.add.group();
  this.groups["pointer"] = game.add.group();
  this.groups["tree"] = game.add.group();
  this.groups["emitter"] = game.add.group();
  this.groups["error"] = game.add.group();
  this.groups["graphic"] = game.add.group();
  this.groups["button"] = game.add.group();
  
  // 中间的圆
  this.circleMask = new Tacit.CircleMask(this, {x: WIDTH/2, y: HEIGHT/2}, 'circleMask', 'circleMask');
  this.circleMask.show();

  // 黑色的圈
  this.blackCircle = new Tacit.BlackCircle(this, {x: WIDTH/2, y: HEIGHT/2}, 'graphic');
  this.blackCircle.show(function() {
    this.loadLevel(this.levelNum);
  });

  // 蓝色的虚线圈
  this.dashCircle = new Tacit.DashCircle(this, {x: WIDTH/2, y: HEIGHT/2}, 'graphic');

  // 代表时间的白色圈
  this.timeCircle = new Tacit.TimeCircle(this, {x: WIDTH/2, y: HEIGHT/2}, 'graphic');

  // 代表血条的圈
  this.bloodCircle = new Tacit.BloodCircle(this, {x: WIDTH/2, y: HEIGHT/2}, 'graphic');

  this.emitter = new Tacit.Emitter(this, {
    x: 0,
    y: 0
  }, 200, 'emitter');

  this.treeManager = new Tacit.TreeManager(this);
  this.pointerManager = new Tacit.PointerManager(this);
  this.scoreManager = new Tacit.ScoreManager(this);
  this.titleManager = new Tacit.TitleManager(this);
  this.levelManager = new Tacit.LevelManager(this);

  // 错误
  this.leftError = new Tacit.Error(this, {x: 0, y: 0}, 'redError', 'error', {dir: 1});
  this.rightError = new Tacit.Error(this, {x: WIDTH, y: 0}, 'redError', 'error', {dir: -1});

  // 按钮的圈
  this.buttonCircleGroup = game.add.group();
  this.buttonCircleGroup.createMultiple(12, 'button_circle');

  // Mission的特效
  this.missionEffectGroup = game.add.group();

  // mission组
  this.missionGroup = game.add.group();

  // 左侧部分
  //var leftDash = game.add.image(0, 138, 'dash');
  this.leftBtn1 = new Tacit.MissionButton(this, {x: 20+205/2, y: 230+145/2}, 'button_black', this.clickButton, {'side': 'left', 'index': 0, 'game': this, 'btn': 'leftBtn1'}, 'button', {keyCode: Phaser.KeyCode.Q});
  //this.leftBtn2 = new Tacit.MissionButton(this, {x: 60+145/2, y: 480+145/2}, 'button_red', this.clickButton, {'side': 'left', 'index': 2, 'game': this, 'btn': 'leftBtn2'}, 'button', {keyCode: Phaser.KeyCode.A});
  this.leftBtn3 = new Tacit.MissionButton(this, {x: 20+205/2, y: 730+145/2}, 'button_yellow', this.clickButton, {'side': 'left', 'index': 2, 'game': this, 'btn': 'leftBtn3'}, 'button', {keyCode: Phaser.KeyCode.Z});
  this.leftBtn1.scale.setTo(0.8);
  this.leftBtn3.scale.setTo(0.8);
  this.leftScore = game.add.bitmapText(20, 10, 'TacitNum', game.leftScore + "", 64);

  // 浮在中间的垃圾精灵组
  this.yoyoMissions = game.add.group();
  this.curMission;



  // 覆盖组
  this.covers = game.add.group();

  // yoyo组
  this.yoyos = game.add.group();

  // 垃圾标题
  //this.missionTitle = game.add.text(game.world.centerY, 80, '', { font: "65px 楷体", fill: "#fff", align: "center"});
  //this.missionTitle.anchor.set(0.5);
  //this.missionTitle.fontWeight = 'bold';

  this.leftPart = game.add.sprite(0, 0);
  //this.leftPart.addChild(leftDash);
  this.leftPart.addChild(this.leftBtn1);
  //this.leftPart.addChild(this.leftBtn2);
  this.leftPart.addChild(this.leftBtn3);
  this.leftAll = game.add.sprite(0, 0);
  this.leftAll.addChild(this.leftPart);
  this.leftAll.addChild(this.leftScore);

  this.leftAll.x = -300;
  game.add.tween(this.leftAll).to({x: 0}, 0, Phaser.Easing.Exponential.Out, true);

  // 右侧部分
  //var rightDash = game.add.image(1920, 138, 'dash');
  //rightDash.scale.x = -1;
  this.rightBtn1 = new Tacit.MissionButton(this, {x: 1770-20+85/2, y: 230+145/2}, 'button_blue', this.clickButton, {'side': 'right', 'index': 1, 'game': this, 'btn': 'rightBtn1'}, 'button', {keyCode: Phaser.KeyCode.O});
  //this.rightBtn2 = new Tacit.MissionButton(this, {x: 1770-60+145/2, y: 480+145/2}, 'button_red', this.clickButton, {'side': 'right', 'index': 2, 'game': this, 'btn': 'rightBtn2'}, 'button', {keyCode: Phaser.KeyCode.K});
  this.rightBtn3 = new Tacit.MissionButton(this, {x: 1770-20+85/2, y: 730+145/2}, 'button_green', this.clickButton,{'side': 'right', 'index': 3, 'game': this, 'btn': 'rightBtn3'}, 'button', {keyCode: Phaser.KeyCode.M});
  this.rightBtn1.scale.setTo(0.8);
  this.rightBtn3.scale.setTo(0.8);
  this.rightScore = game.add.bitmapText(0, 10, 'TacitNum', game.rightScore + "", 64);
  this.rightScore.x = 1920 - this.rightScore.width - 20;

  this.rightPart = game.add.sprite(0, 0);
  //this.rightPart.addChild(rightDash);
  this.rightPart.addChild(this.rightBtn1);
  //this.rightPart.addChild(this.rightBtn2);
  this.rightPart.addChild(this.rightBtn3);
  this.rightAll = game.add.sprite(0, 0);
  this.rightAll.addChild(this.rightPart);
  this.rightAll.addChild(this.rightScore);

  this.rightAll.x = 300;
  game.add.tween(this.rightAll).to({x: 0}, 0, Phaser.Easing.Exponential.Out, true);

  // gameover
  var gameover = game.add.sprite(WIDTH/2, HEIGHT/2 - 100, 'gameover');
  gameover.anchor.setTo(0.5, 0.5);
  gameover.animations.add('shake');
  gameover.animations.play('shake', 3, true);
  //this.totalScore = game.add.bitmapText(WIDTH/2, HEIGHT/2 + 100, 'TacitNum', "", 64);
  //this.totalScore.x = WIDTH/2 - this.totalScore.width/2;
  this.gameoverAll = game.add.sprite(0, 0);
  this.gameoverAll.addChild(gameover);
  //this.gameoverAll.addChild(this.totalScore);
  this.gameoverAll.y = -1080;

  // 通关
  this.brain = game.add.sprite(435 + 1043/2, 1041/2 + 10, 'brain');
  this.brain.anchor.setTo(0.5, 0.5);
  this.brain.alpha = 0;

  this.bloodCircle.setBlood(this.blood);

  this.levelManager.loadStage(1);

};

Tacit.StartState.prototype.clickButton = function() {
  var clickIndex = this.index;
  var clickSide = this.side;
  var missions = this.game.missions;
  var curLine = this.game.curLine;
  var btn = this.game[this.btn];

  //debugger;

  var correct = false;
  var rowIndex = 0; // 默认校队行的第一个Mission
  if(!missions[curLine]){return;}

  // TODO 点击对应垃圾桶后，将垃圾用tween动画放入垃圾桶

  // 原算法是循环该行，找到没有Done的item的index和clickIndex比较就可以，不会根据顺序比较
  // 现在的算法是找出第一个没有被标记过的进行比较
  for(var i=0; i<missions[curLine].length; i++) {

    if(!missions[curLine][i].sprite.isDone) { // false, to judge

      if(!missions[curLine][i].sprite.isDone && missions[curLine][i].index == clickIndex) {
        missions[curLine][i].sprite.done();
        correct = true;
        // 正确后所需做的操作
        game.soundManager.playSoundRight();
        this.game.scoreManager.updateScore(clickSide, 20);
        this.game.curLineCount++;

        //debugger;
        if (this.game.curMission) {
          console.log('current length of yoyo sprite: ' + this.game.yoyoMissions.length);
          // TODO 如何回收
          this.game.curMission.kill();
        }

        if (this.game.cover) {
          console.log('current length of yoyo sprite: ' + this.game.yoyoMissions.length);
          // TODO 如何回收
          this.game.cover.kill();
        }

        if(this.game.curLineCount === missions[curLine].length) {
          this.game.curLineCount = 0;
          this.game.curLine++;
          this.game.pointerManager.posPointer(this.game.curLine);
          if(this.game.curLine == missions.length) { // 本关结束
            game.time.events.remove(this.game.timer);
            //this.game.missionTitle.text = '';
            this.game.nextLevel();
          } else { // 下一行
            var item = missions[this.game.curLine][0];
            //this.game.missionTitle.text = item.name;
            this.game.curMission = this.game.generateYoyo(item);

            var x = item.position.x;
            var y = item.position.y;
            // cover
            this.game.cover = game.add.image(x, y, 'cover');
            this.game.cover.anchor.set(0.5, 0.5);

            this.game.yoyos.addChild(this.game.curMission);
            this.game.covers.addChild(this.game.cover);

            // 最后执行动画，否则直接按组的方式添加到stage
            // http://club.phaser-china.com/topic/59a2a799484a53dd723f424c
            game.add.tween(this.game.cover).from( { x: x, y: y, alpha: 0}, 200, Phaser.Easing.Linear.None, true);
            game.add.tween(this.game.curMission).from( { x: x, y: y, alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
          }
        } else { // 下一个
          if (i + 1 <= missions[curLine].length) {
            var missionItem = missions[curLine][i + 1];
            if (missionItem) {
              //this.game.missionTitle.text = missionItem.name;
              this.game.curMission = this.game.generateYoyo(missionItem);

              // new一个空白的图片进行遮盖
              var x = missionItem.position.x;
              var y = missionItem.position.y;

              this.game.cover = game.add.image(x, y, 'cover');
              this.game.cover.anchor.set(0.5, 0.5);

              this.game.yoyos.addChild(this.game.curMission);
              this.game.covers.addChild(this.game.cover);

              game.add.tween(this.game.cover).from( { x: x, y: y, alpha: 0}, 200, Phaser.Easing.Linear.None, true);
              game.add.tween(this.game.curMission).from( { x: missionItem.position.x, y: missionItem.position.y, alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }
          }
        }
      }
      break; // 只比较第一个标记为false, 如果比较结果对与不对都不在比较，认为是答案错误
    } else { // true, next to judge
      continue; // 操作的mission如果是判断过的，直接continue到下一个
    }
  }

  if(!correct) {
    this.game.blood = this.game.blood - TIME_RATIO * 2;
    // 错了减血量
    this.game.bloodCircle.setBlood(this.game.blood);
    // 错了减10分
    this.game.scoreManager.updateScore(clickSide, -10);
    game.soundManager.playSoundError();
    if(clickSide == "left") {
      this.game.leftError.blink();
    } else {
      this.game.rightError.blink();
    }

    // 没血了，game over
    if(this.game.blood <= 0) {
      this.game.gOver = true;
      this.game.gameOver();
      game.time.events.remove(this.game.timer);
    }
  }
}

/**
 * 生成浮现的Mission
 */
Tacit.StartState.prototype.generateYoyo = function(missionItem) {
  var realKey = missionItem.missionName + '-yoyo' + '';
  var width = game.cache.getImage(realKey).width;

  var x = WIDTH / 2;
  var y = HEIGHT / 2;

  var yoyoMission = this.yoyoMissions.getFirstExists(false, true, x, y, realKey);
  yoyoMission.anchor.setTo(0.5, 0.5);
  yoyoMission.scale.setTo(1.5);
  yoyoMission.alpha = 1;
  return yoyoMission;
};

/**
 * 根据关卡载入游戏内容
 */
Tacit.StartState.prototype.loadLevel = function(level) {

  this.levelManager.loadLevel(level);

  var item = this.missions[0][0];
  this.curMission = this.generateYoyo(item);

  var x = item.position.x;
  var y = item.position.y;

  this.cover = game.add.image(x, y, 'cover');
  this.cover.anchor.set(0.5, 0.5);

  this.yoyos.addChild(this.curMission);
  this.covers.addChild(this.cover);

  game.add.tween(this.cover).from( { x: x, y: y, alpha: 0}, 900, Phaser.Easing.Linear.None, true);
  game.add.tween(this.curMission).from( { x: x, y: y, alpha: 0}, 1000, Phaser.Easing.Linear.None, true);


  this.pointerManager.posPointer(this.curLine);

  // 游戏时间 = Mission数量 *
  this.LevelTime = Math.round(this.levelManager.itemCount * LEVEL_TIME_RATIO);
  console.log('本局游戏时间*****************： ' + this.LevelTime);
  console.log('本局ItemCount*****************： ' + this.levelManager.itemCount);
  console.log('LEVEL_TIME_RATIO*****************： ' + LEVEL_TIME_RATIO);

  game.soundManager.playSoundStartLevel();

  this.groups["mission"].y = -400;

  var spriteTween = game.add.tween(this.groups["mission"]).to( { y: 0 }, 500, Phaser.Easing.Bounce.Out, true);
  spriteTween.onComplete.add(function() {

    //debugger;
    this.pointerManager.showPointer();

    if(level == 0) {
      this.dashCircle.show();
    }

    this.canButton = true;

    this.timeCount = 0;

    // Phaser.Timer.SECOND * 0.1 / TIME_RATIO 表示多久调用一次（ms）
    this.timer = game.time.events.loop(Phaser.Timer.SECOND * 0.1 / TIME_RATIO, function() {
      // 没血了或者时间到了， game over.
      //debugger;
      if(this.timeCount < this.LevelTime) {
        this.timeCount++;
        this.timeCircle.setTime(this.timeCount);
      } else if(this.blood > 0) {
        this.blood--;// 血量--
        this.bloodCircle.setBlood(this.blood);
      } else {
        this.gOver = true;
        this.gameOver();
        //this.missionTitle.text = '';
        game.time.events.remove(this.timer);
      }
    }, this);

  }, this);

}

Tacit.StartState.prototype.nextLevel = function() {
  var goNext = function() {
    this.curLine = 0;
    this.loadLevel(this.levelNum);
  }

  this.canButton = false;

  this.scoreManager.levelScore();

  this.levelManager.nextLevel();

  this.pointerManager.hidePointer();
  
  this.levelNum++;
  
  if(this.levelNum < this.levelManager.levelJSON.length) {
    game.soundManager.playSoundNextLevel();
    this.treeManager.winLevel(this.levelNum, function() {
      goNext.call(this);
    })
  } else {
    // 通关
    this.treeManager.through(this.levelNum);
    this.gOver = true;
    this.through();
  }
}

Tacit.StartState.prototype.allLeft = function(callback) {
  this.bloodCircle.kill();
  this.timeCircle.kill();
  this.dashCircle.kill();
  this.groups["mission"].destroy(true);
  this.pointerManager.killPointer();
  game.add.tween(this.leftPart).to({x: -300}, 0, Phaser.Easing.Exponential.Out, true);
  game.add.tween(this.rightPart).to({x: 300}, 0, Phaser.Easing.Exponential.Out, true);
  this.blackCircle.hide(callback);
}

/**
 * 游戏失败
 */
Tacit.StartState.prototype.gameOver = function() {
  game.soundManager.playSoundGameOver();
  //this.totalScore.x = WIDTH/2 - this.totalScore.width/2;
  this.circleMask.disappear();
  if (this.curMission) {
    this.curMission.kill();
  }

  this.allLeft(function() {
    //game.add.tween(this.gameoverAll).to({y: 0}, 500, Phaser.Easing.Exponential.In, true);
    //this.missionTitle.text = '';
    // 引导分享逻辑
    this.award = game.add.sprite(960 - 425, 540 - 284, 'award');
    //this.award.inputEnabled = true;
    //this.award.input.enableDrag();
    var style = { font: "100px Arial", fill: "#EA7643", wordWrap: true, wordWrapWidth: this.award.width, align: "center" };
    this.share = game.add.text(0, 0, "", style);
    this.share.anchor.set(0.5);

    var gameScore = game.leftScore + game.rightScore;
    this.share.text = (gameScore) + "";

    // 分享部分
    //var bar = game.add.graphics();
    //bar.beginFill(0x000000, 0.2);
    //bar.drawRect(0, 850, game.width, game.width);

    var style = { font: "bold 50px Arial", fill: "#fff", align: "center" };
    var text = game.add.text(WIDTH / 2, HEIGHT / 2 + 400, '', style);
    if (gameScore <= 100) {
      text.text = '加油努力啊！！';
    } else {
      text.text = '玩的这么好，赶快分享给好友一起吧！！';
    }
    text.anchor.set(0.5);
    //text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    //text.setTextBounds(game.width / 2 - 400, 910, 800, 100);

    // 修改网页title ==》 分享标题
    document.title = this.makeTitle(gameScore);

    game.input.onTap.add(function() {
      document.title = this.makeTitleOrigin();
      game.state.start('MenuState');
    }, this);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.space.onDown.add(function() {
      document.title = this.makeTitleOrigin();
      game.state.start('MenuState');
    }, this);
  });
}

/**
 * 通关
 */
Tacit.StartState.prototype.through = function() {
  game.soundManager.playSoundWin();
  this.timeCircle.kill();
  this.bloodCircle.kill();
  this.allLeft(function() {
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
      this.circleMask.big();
      var brainTween = game.add.tween(this.brain).to({alpha: 1}, 1000, Phaser.Easing.Exponential.In, true);
      brainTween.onComplete.add(function() {
        this.circleMask.small();
        game.add.tween(this.brain.scale).to({x: 0.5, y: 0.5}, 1500, Phaser.Easing.Exponential.In, true);
        this.treeManager.disappearCurrentTree(function() {
          var totalSc = game.add.bitmapText(20, 10, 'TacitNum', (game.leftScore + game.rightScore) + "", 64);
          totalSc.x = WIDTH / 2 - totalSc.width / 2;
          totalSc.y = 100;
          game.soundManager.playSoundMenu();
          game.input.onTap.addOnce(function() {
            game.state.start('WinState');
          }, this);

          this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          this.space.onDown.addOnce(function() {
            game.state.start('WinState');
          }, this);
        });
        
      }, this);
    }, this);
  });
}

/**
 * 生成分享标题
 */
Tacit.StartState.prototype.makeTitle = function(score) {
  if (score < 4000) {
    return '垃圾分类小游戏，还挺难的，我才' + score + '分，你能得多少分呢？';
  } else {
    return '垃圾分类小游戏，我是天才，得了' + score + '分，你能得多少分呢？';
  }
};

/**
 * 还原标题
 */
Tacit.StartState.prototype.makeTitleOrigin = function() {
  return '科普小游戏-垃圾分类';
};

Tacit.StartState.prototype.update = function() {
  if (this.share && this.award) {
    this.share.x = Math.floor(this.award.x + this.award.width / 2);
    this.share.y = Math.floor(this.award.y + this.award.height / 2);
  }
};