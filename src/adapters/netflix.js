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
      canRenderInCaptionWindow: true,
      captionWindow: captionWindow ? captionWindow : null,
      captionWindowPosition: captionWindow ? captionWindow.style.cssText : null,
      captionWindowStyle: { textAlign: 'center', width: '700px' },
      captionStyle: caption ? {
        background: caption.style.background,
        backgroundColor: caption.style.backgroundColor,
        color: caption.style.color,
        fontFamily: caption.style.fontFamily,
        fontSize: caption.style.fontSize,
        fontWeight: caption.style.fontWeight,
        textShadow: caption.style.textShadow
      } : null,
      video: video ? video : null
    };
  }
}

export default NetflixAdapter;
