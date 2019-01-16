const YoutubeAdapter = {
  root: document.body,
  uniqueSelector: '#movie_player',
  value: (node) => {
    const captionWindow = document.querySelector('.ytp-caption-window-bottom');
    const video = document.querySelector('video');
    return {
      root: node,
      captionText: captionWindow ? captionWindow.textContent : null,
      video: video ? video : null
    };
  }
}

export default YoutubeAdapter;
