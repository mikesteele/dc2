const parse = (captionFile) => {
  return new Promise((resolve, reject) => {
    const parsedCaptionFile = JSON.parse(captionFile);
    if (parsedCaptionFile.start && parsedCaptionFile.end && parsedCaptionFile.text) {
      if (parsedCaptionFile.start.length === parsedCaptionFile.end.length && parsedCaptionFile.end.length === parsedCaptionFile.text.length) {
        const captions = parsedCaptionFile.text.map((caption, index) => {
          return {
            startTime: parsedCaptionFile.start[index],
            endTime: parsedCaptionFile.end[index],
            text: caption
          };
        });
        resolve(captions);
      } else {
        reject(`Invalid edX caption file`);
      }
    } else {
      reject(`Invalid edX caption file`);
    }
  });
}

export default { parse };
