// 基准大小
const baseSize = 16;
// 设置 rem 函数
function setRem () {
    // 当前页面宽度相对于1920宽的缩放比例，基准宽度可根据自己ui设计图修改。
    const scale = document.documentElement.clientWidth / 1440
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
//监听窗口变化 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}