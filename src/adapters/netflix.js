const NetflixAdapter = {
  root: document.body,
  uniqueSelector: '.nfp.AkiraPlayer',
  value: (node) => {
    const captionWindow = document.querySelector('.player-timedtext'); // TODO - Remove?
    const captionWindowTextContainer = document.querySelector('.player-timedtext-text-container');
    const video = document.querySelector('video');
    return {
      root: node,
      captionWindow: captionWindowTextContainer ? captionWindowTextContainer : null,
      captionWindowPosition: captionWindowTextContainer ? captionWindowTextContainer.style.cssText : null,
      captionText: captionWindow ? captionWindow.textContent : null,
      video: video ? video : null
    };
  }
}

export default NetflixAdapter;
