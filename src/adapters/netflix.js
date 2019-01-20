const NetflixAdapter = {
  root: document.body,
  uniqueSelector: '.nfp.AkiraPlayer',
  value: (node) => {
    let caption;
    let captionWindow;
    let video;
    video = document.querySelector('video');
    captionWindow = document.querySelector('.player-timedtext-text-container');
    if (captionWindow) {
      caption = captionWindow.querySelector('span'); // TODO - Can use .firstChild?
    }
    return {
      root: node,
      captionWindow: captionWindow ? captionWindow : null,
      captionWindowPosition: captionWindow ? captionWindow.style.cssText : null,
      captionText: captionWindow ? captionWindow.textContent : null,
      captionStyle: caption ? caption.style.cssText : null,
      video: video ? video : null
    };
  }
}

export default NetflixAdapter;
