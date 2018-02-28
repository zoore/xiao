
var WIDTH = 1920;
var HEIGHT = 1080;

//积分规则是这样的：
//  1. 每关结束后统计奖励分数，分数由(‘关卡总垃圾数量’ + ‘游戏分配所剩余的时间’) * 5 所得(ScoreManage.js)
//  2. 游戏中点击了错误的箱子会有两个惩罚(减少外圈的剩余血量、分数 -10)
//  3. 每次点击正确 +20
var TIME_RATIO = 10;   // 时间比，此数越大，时间越多
var TOTAL_BLOOD = 80*TIME_RATIO;  // 总血量
var LEVEL_TIME_RATIO = 12*TIME_RATIO;  // 每局时间  其实是程序一定间隔 从0‘++’到通过该值设定的LevelTime

// 每种垃圾的具体数量管理
var RECOVERABLE_TOTAL = 3;
var KITCHEN_TOTAL = 3;
var HARMFUL_TOTAL = 3;
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
  return Math.ceil(rand * max) - 1;
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
        name = '旧报纸';
        break;
      case 1:
        name = '旧书刊';
        break;
      case 2:
        name = '废铁锅';
        break;
      default:
        name = '无匹配';
    }
  }

  if (cate == MissionMap[1]){
    switch (no) {
      case 0:
        name = '菜叶';
        break;
      case 1:
        name = '果皮';
        break;
      case 2:
        name = '植物落叶';
        break;
      default:
        name = '无匹配';
    }
  }

  if (cate == MissionMap[2]){
    switch (no) {
      case 0:
        name = '尿不湿';
        break;
      case 1:
        name = '烟头';
        break;
      case 2:
        name = '尿不湿';
        break;
      default:
        name = '无匹配';
    }
  }

  if (cate == MissionMap[3]){
    switch (no) {
      case 0:
        name = '废灯管';
        break;
      case 1:
        name = '废电池';
        break;
      case 2:
        name = '过期药品';
        break;
      default:
        name = '无匹配';
    }
  }
  return name;
}
