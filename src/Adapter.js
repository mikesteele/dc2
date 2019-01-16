const Adapter = (props) => {
  const site = 'netflix';
  const { awareness, awarenessIsInDOM } = props;
  let playerCurrentTime = null;
  let videoId = 'TODO';
  let captionText = null;
  let captionWindow = null;
  let captionWindowPosition = null;
  const onPopupOpened = () => { console.log('TODO') };
  if (awareness) {
    const { video } = awareness;
    playerCurrentTime = video && video.currentTime;
    captionText = awareness.captionText;
    captionWindow = awareness.captionWindow;
    captionWindowPosition = awareness.captionWindowPosition;
  }
  const adapter = {
    awareness,
    awarenessIsInDOM,
    captionText,
    captionWindow,
    captionWindowPosition,
    playerCurrentTime,
    videoId,
    onPopupOpened,
    site
  };
  return props.children(adapter);
};

export default Adapter;
