const YoutubeAdapter = {
  root: document.body,
  uniqueSelector: '#movie_player',
  value: (node) => {
    let caption;
    let captionWindow;
    let video;
    video = document.querySelector('video');
    captionWindow = document.querySelector('.ytp-caption-window-bottom');
    caption = document.querySelector('.captions-text > span');
    return {
      root: node,
      captionWindow: captionWindow ? captionWindow : null,
      captionWindowPosition: captionWindow ? captionWindow.style.cssText : null,
      captionText: captionWindow ? captionWindow.textContent : null,
      captionStyle: caption ? caption.style.cssText : null,
      captionClassName: 'captions-text',
      video: video ? video : null
    };
  }
}

export default YoutubeAdapter;
