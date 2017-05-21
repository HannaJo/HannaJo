
let lastTopPosition = -1;
const ANIMATION = 200;

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function lerp(v1, v2, amount) {
  return v1 + (v2 - v1) * clamp(amount, 0, 1);
}


function onUpdate() {
  requestAnimationFrame(onUpdate);

  const topPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (topPosition !== lastTopPosition)
  {
    lastTopPosition = topPosition;

    const bgElm = document.getElementById('bg');
    bgElm.style.opacity = 1 - clamp(topPosition, 0, 200) / 200;

    const topbarElm = document.getElementById('topbar');
    topbarElm.style.opacity = clamp(topPosition - 200, 0, 200) / 200;

    const logoElm = document.getElementById('topbar-logo');
    const nameElm = document.getElementById('topbar-name');

    const windowWidth = window.innerWidth;

    const HEADER_HEIGHT = 350;
    const logoAnim = clamp(topPosition, 0, HEADER_HEIGHT) / HEADER_HEIGHT;
    const textAnim = clamp(topPosition, 0, HEADER_HEIGHT) / HEADER_HEIGHT;
    const textColorAnim = clamp(topPosition - 150, 0, 200) / 200;


    const bigLogoSize = clamp(windowWidth / 2, 0, 225);
    const smallLogoSize = 40;
    const logoSize = lerp(bigLogoSize, smallLogoSize, logoAnim);
    logoElm.style.width = logoSize + 'px';
    logoElm.style.height = logoSize + 'px';

    const bigLogoLeft = windowWidth / 2 - logoSize / 2;
    const smallLogoLeft = 16;
    logoElm.style.left = lerp(bigLogoLeft, smallLogoLeft, logoAnim) + 'px';
    logoElm.style.top = lerp(60, 5, logoAnim) + 'px';


    const bigTextSize = clamp(windowWidth * 0.08, 14, 40);
    const smallTextSize = 14;
    const textSize = lerp(bigTextSize, smallTextSize, textAnim);

    nameElm.style.fontSize = textSize + 'px';
    nameElm.style.top = lerp(100 + logoSize, 1, textAnim) + 'px';
    const nameWidth2 = nameElm.clientWidth / 2;
    nameElm.style.right = lerp(windowWidth / 2 - nameWidth2, 16, textAnim) + 'px';

    const lightness = Math.floor(lerp(255, 50, textColorAnim));
    nameElm.style.color = `rgb(${lightness},${lightness},${lightness})`;
  }
}

requestAnimationFrame(onUpdate);
window.onresize = function() {
  lastTopPosition = -1;
};
