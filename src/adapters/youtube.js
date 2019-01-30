const YoutubeAdapter = {
  root: document.body,
  uniqueSelector: '#movie_player',
  value: (node) => {
    let caption;
    let captionWindow;
    let video;
    video = document.querySelector('video');
    captionWindow = document.querySelector('.ytp-caption-window-bottom') || document.querySelector('.caption-window');
    caption = document.querySelector('.captions-text > span');
    return {
      captionWindow: captionWindow ? captionWindow : null,
      captionWindowPosition: captionWindow ? captionWindow.style.cssText : null,
      captionStyle: caption ? caption.style.cssText : null,  // TODO - Rename to CaptionCSSText?
      captionClassName: 'captions-text',
      video: video ? video : null
    };
  }
}

export default YoutubeAdapter;
