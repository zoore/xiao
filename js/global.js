
var WIDTH = 1920;
var HEIGHT = 1080;

var TIME_RATIO = 3;   // 时间比，此数越大，时间越多
var TOTAL_BLOOD = 60*TIME_RATIO;  // 总血量
var LEVEL_TIME_RATIO = 8*TIME_RATIO;  // 每局时间

// 每种垃圾的具体数量管理
var RECOVERABLE_TOTAL = 2;
var KITCHEN_TOTAL = 2;
var HARMFUL_TOTAL = 2;
var OTHER_TOTAL = 2;

// 每一个index对应的图片, 此处应该随机出一个品类下的某个商品
var MissionMap = {
  0: 'missonicon_black',
  1: 'missonicon_blue',
  2: 'missonicon_yellow',
  3: 'missonicon_green',
}

// 粒子发射颜色
var EmitterMap = {
  0: 0x001322,
  1: 0x19B9FF,
  2: 0xFF7537,
  3: 0xB3FB48,
  4: 0xFFED60,
  5: 0xEDEBDA
}

function randInteger(max) {
  var rand = Math.random();
  return Math.ceil(rand * max);
}

// 获取指定品类下的具体垃圾图片名称
function getMissionByCategory(category) {
  var rand = -1;
  var cate = MissionMap[category];

  if (category == 0) {
    rand = randInteger(RECOVERABLE_TOTAL);
  } else if (category == 1) {
    rand = randInteger(KITCHEN_TOTAL);
  } else if (category == 2 ) {
    rand = randInteger(HARMFUL_TOTAL);
  } else if (category == 3) {
    rand = randInteger(OTHER_TOTAL);
  }

  if (rand == -1) {
    return;
  }

  return '' + cate + rand;
}

// 获取垃圾名称
function getRubbishName(rubbishNo) {
  console.log(rubbishNo);
  var length = rubbishNo.length;
  var name = '';

  var cate = rubbishNo.substring(0, length - 1);
  var no = parseInt(rubbishNo.substring(length - 1));

  if (cate == MissionMap[0]){
    switch (no) {
      case 0:
        name = '玻璃瓶';
        break;
      case 1:
        name = '废旧书籍';
        break;
      case 2:
        name = '塑料袋';
        break;
      default:
        name = '无匹配';
    }
  }

  if (cate == MissionMap[1]){
    switch (no) {
      case 0:
        name = '水果皮';
        break;
      case 1:
        name = '剩饭';
        break;
      case 2:
        name = '菜根菜叶';
        break;
      default:
        name = '无匹配';
    }
  }

  if (cate == MissionMap[2]){
    switch (no) {
      case 0:
        name = '果壳';
        break;
      case 1:
        name = '卫生纸';
        break;
      case 2:
        name = '陶瓷';
        break;
      default:
        name = '无匹配';
    }
  }

  if (cate == MissionMap[3]){
    switch (no) {
      case 0:
        name = '油漆桶';
        break;
      case 1:
        name = '电池';
        break;
      case 2:
        name = '灯泡';
        break;
      default:
        name = '无匹配';
    }
  }
  return name;
}
