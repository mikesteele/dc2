const NetflixAdapter = {
  root: document.body,
  uniqueSelector: '.nfp.AkiraPlayer',
  value: (node) => {
    const captionWindow = document.querySelector('.player-timedtext');
    const video = document.querySelector('video');
    return {
      root: node,
      captionWindow: captionWindow ? captionWindow : null,
      captionText: captionWindow ? captionWindow.textContent : null,
      video: video ? video : null
    };
  }
}

export default NetflixAdapter;
