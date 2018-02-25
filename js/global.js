
var WIDTH = 1920;
var HEIGHT = 1080;

var TIME_RATIO = 5;   // 时间比，此数越大，时间越多
var TOTAL_BLOOD = 60*TIME_RATIO;  // 总血量
var LEVEL_TIME_RATIO = 8*TIME_RATIO;  // 每局时间

// 每种垃圾的具体数量管理
var RECOVERABLE_TOTAL = 2;
var KITCHEN_TOTAL = 2;
var HARMFUL_TOTAL = 2;
var OTHER_TOTAL = 2;

// 每一个index对应的图片, 此处应该随机出一个品类下的某个商品
var MissionMap = {
  0: 'missonicon_black' + randCategory(RECOVERABLE_TOTAL),
  1: 'missonicon_blue' + randCategory(KITCHEN_TOTAL),
  2: 'missonicon_red' + randCategory(HARMFUL_TOTAL),
  3: 'missonicon_green' + randCategory(OTHER_TOTAL),
  4: 'missonicon_yellow' + randCategory(OTHER_TOTAL),
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

function randCategory(max) {
  var rand = Math.random();
  return Math.ceil(rand * max);
}
