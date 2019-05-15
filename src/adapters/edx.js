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

const EdxAdapterCreator = () => {
  let canRenderInCaptionWindow = false; // TODO - Should be true?
  let captionWindow = null;
  let playerCurrentTime = null;

  // Edx allows user to follow along with captions in the sidebar or captions in a video.
  const captionsInVideo = document.querySelector('.closed-captions.is-visible');
  if (captionsInVideo) {
    // If user toggled captions on in video, let's render them there.
    captionWindow = document.querySelector('.closed-captions.is-visible');
  } else {
    // If not, we'll render the second captions in the sidebar.
    captionWindow = document.querySelector('li.current');
  }

  let videoTime = document.querySelector('.vidtime');
  if (videoTime) {
    const displayTimes = videoTime.textContent.split('/'); // Ex. 0:45 / 6:00
    playerCurrentTime = convertDisplayTimeToSeconds(displayTimes[0]);
  }

  return {
    canRenderInCaptionWindow,
    captionWindow,
    playerCurrentTime
  };
}

const EdxAdapter = {
  root: document.body,
  uniqueSelector: '.xblock',
  value: EdxAdapterCreator
}

export { EdxAdapterCreator };
export default EdxAdapter;
