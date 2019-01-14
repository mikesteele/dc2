import React from 'react';

const Adapter = (props) => {
  const site = 'netflix';
  const { awareness, awarenessIsInDOM } = props;
  let playerCurrentTime = null;
  let videoId = 'TODO';
  let captionText = null;
  const onPopupOpened = () => { console.log('TODO') };
  if (awareness) {
    const { video } = awareness;
    playerCurrentTime = video && video.currentTime;
    captionText = awareness.captionText;
  }
  const adapter = {
    awareness,
    awarenessIsInDOM,
    captionText,
    playerCurrentTime,
    videoId,
    onPopupOpened,
    site
  };
  return props.children(adapter);
};

export default Adapter;
