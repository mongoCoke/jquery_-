var curDisplay = 0; //记录当前展示图片索引
// 锁  防止连续点击
var flag = true;
var timer;
var imgLen = $('img').length;
// 初始化函数
function init() {
    move();
    bindEvent();
}
init();

function move() {
    var hLen = $('img').length / 2;
    // 记录分散在左右得图片索引
    var lNum, rNum;
    // 利用for循环与中间值为左右索引赋值
    for (var i = 0; i < hLen; i++) {
        // 左侧图片索引赋值
        lNum = curDisplay - i - 1;
        // 左侧图片平移
        $('img').eq(lNum).css({
            transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px)'
        });
        // 计算右侧图片索引值
        rNum = curDisplay + i + 1;
        // 临界值判断
        if (rNum > imgLen - 1) {
            rNum -= imgLen;
        }
        // 右侧图片向右平移
        $('img').eq(rNum).css({
            transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px)'
        });
    }
    // 中间显示图片向前平移
    $('img').eq(curDisplay).css({
        transform: 'translateZ(200px)'
    });
    // 绑定动画运动结束事件  当一次动画结束后才能进行下一次运动
    $('img').on('transitionend', function () {
        flag = true;
    });
    changeStyle();

}

function bindEvent(){
    $('img').add('.list li').on('click', function (e) {
        if (flag) {
            flag = false;
            // 将当前显示图片切换为当前点击图片
            curDisplay = $(this).index();
            console.log($(this).index());
            move();
        }
    }).hover(function () {
        // 鼠标覆盖清除定时器
        clearInterval(timer);
    }, function () {
        // 鼠标移走设置定时器
        timer = setInterval(function () {
            play();
        }, 2000);
    });
    timer = setInterval(function () {
        play();
    }, 2000);
}


// 自动播放
function play(){
    if (curDisplay == imgLen - 1) {
        curDisplay = 0;
    } else {
        curDisplay++;
    }
    move();
}

// 改变list小圆点选中状态
function changeStyle(){
    $('.active').removeClass('active');
    // 将当前选中得图片对应得小圆点设置为选中状态
    $('.list li').eq(curDisplay).addClass('active');
}
