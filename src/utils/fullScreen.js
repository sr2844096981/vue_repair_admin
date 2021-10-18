/* 切换全屏显示 */
// elem 要全屏的元素
export function fullScreen(elem) {
    const isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.webkitFullScreen || document.msFullScreen
        // console.log(isFullScreen);
    if (isFullScreen) {
        // true 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCanceltFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullscreen) { /* Chrome, Safari and Opera */
            document.webkitCancelFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    } else {
        // false 进入全屏
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }
}