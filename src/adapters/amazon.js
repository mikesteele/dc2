const AmazonAdapter = {
  root: document.body,
  uniqueSelector: '#dv-web-player', // TODO
  value: (node) => {
  const captionWindow = document.querySelector('.timedTextBackground');
  let captionWindowPosition = null;
  let captionStyle = null;
  if (captionWindow) {
    const container = document.querySelector('.captions');
    if (container) {
      captionWindowPosition = container.firstChild.style.cssText;
    }
  }
    return {
      captionWindow: captionWindow ? captionWindow : null,
      captionWindowPosition: captionWindowPosition,
      captionStyle: null, // TODO - Should be captionStyleCSSText?
      captionClassName: null,
      video: null
    }
  }
}

export default AmazonAdapter;
