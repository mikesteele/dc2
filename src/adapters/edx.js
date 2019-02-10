export const convertDisplayTimeToSeconds = (displayTime) => {
  // TODO - Bail out if doesn't match what we expect?
  displayTime = displayTime.trim();
  const parts = displayTime.split(':').reverse();
  const seconds = parts.reduce((sum, part, index) => {
    const intPart = parseInt(part);
    // TODO - Reject / error if over 3 parts?
    switch (index) {
      case 0:
      sum = sum + intPart;
      break;

      case 1:
      sum = sum + (intPart * 60);
      break;

      case 2:
      sum = sum + (intPart * 60 * 60);
      break;

      default:
      break;
    }
    return sum + 0;
  }, 0);
  return seconds;
}

const EdxAdapter = {
  root: document.body,
  uniqueSelector: '.xblock',
  value: () => {
    let canRenderInCaptionWindow = true;
    let captionWindow = document.querySelector('li.current');
    let playerCurrentTime = null;

    let videoTime = document.querySelector('.vidtime');
    if (videoTime) {
      // 0:45 / 6:00
      const displayTimes = videoTime.textContent.split('/');
      playerCurrentTime = convertDisplayTimeToSeconds(displayTimes[0]);
    }
    return {
      canRenderInCaptionWindow,
      captionWindow,
      playerCurrentTime
    };
  }
}

export default EdxAdapter;
