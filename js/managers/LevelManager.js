
var Phaser = Phaser || {};
var Tacit = Tacit || {};

Tacit.LevelManager = function(gameState) {
  "use strict";
  Object.call(this);
  this.gameState = gameState;
  
};

Tacit.LevelManager.prototype = Object.create(Object.prototype);
Tacit.LevelManager.prototype.constructor = Tacit.LevelManager;

Tacit.LevelManager.prototype.loadStage = function(stage) {
  // 关卡数据
  this.levelJSON = game.cache.getJSON('level' + stage);
}

Tacit.LevelManager.prototype.loadLevel = function(level) {
  var curLevelArr = this.levelJSON[level];
  this.gameState.missions.splice(0, this.gameState.missions.length);
  this.itemCount = 0;

  //debugger;

  // 解析关卡数据
  for(var i=0; i<curLevelArr.length; i++) {
    var line = curLevelArr[i];
    var totalWidth = line.length * 85;
    var missionLine = [];
    this.itemCount += line.length;
    for(var j=0; j<line.length; j++) {
      var item = line[j];
      var position = {
        x: WIDTH / 2 - totalWidth / 2 + 85/2 + j * 85,
        y: 190 + i * 85
      }
      if(item.length == 1) {
        // 目前此处不能使用池的思想，需要为每个品类准备一个池
        // var mission = this.gameState.groups["mission"].getFirstExists(false);
        var mission = null;
        var missionNo = '';
        var missionName = '';
        if(mission) {
          mission.changeMission(position, MissionMap[item[0]], item[0]);
        } else {
          // 生成对应的垃圾图标，位于icon文件夹
          // 哪一种垃圾是由level1.json文件指定，大品类下的具体哪一个垃圾则由随机数管理
          // 把MissionMap放入到本文件中管理，否则Map中的内容在刚加载时就初始化了。
          missionNo = getMissionByCategory(item[0]);
          mission = new Tacit.Mission(this.gameState, position, missionNo, 'mission', {
            index: item[0]
          });
        }

        // 如果想要显示对应垃圾内容的名称，此处应该放入对应的name属性。
        missionName = getRubbishName(missionNo);
        var missionObj = {
          index: item[0],
          name: missionName,
          sprite: mission
        };
        missionLine.push(missionObj);
      }
    }
    this.gameState.missions.push(missionLine);
    this.gameState.missionTitle.text = this.gameState.missions[0][0].name;
  }
}

Tacit.LevelManager.prototype.nextLevel = function(level) {
  for(var i=0; i<this.gameState.missions.length; i++) {
    for(var j=0; j<this.gameState.missions[i].length; j++) {
      this.gameState.missions[i][j].sprite.kill();
    }
  }
}
