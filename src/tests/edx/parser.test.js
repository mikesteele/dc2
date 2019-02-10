import Parser from '../../Parser';
const fs = require('fs');
const { expect } = require('chai');
const path = require('path');

const currentSite = 'edx';

const makeParser = (callback) => {
  Parser({
    children: parser => callback(parser)
  });
}

describe('edX parser', () => {
  it('should correctly parse', done => {
    const captionFile = fs.readFileSync(path.resolve(__dirname, '../assets/edx/caption-file.txt'));
    makeParser(parser => {
      parser.parse(captionFile, currentSite)
        .then(result => {
          expect(result[3]).to.deep.equal({
            startTime: 7990,
            endTime: 21750,
            text: 'So typically, you unwind from minus 11 to plus 3.'
          });
          done();
        })
        .catch(err => { console.error(err) });
    });
  });

  it('should correctly parse - zh captions', done => {
    const captionFile = fs.readFileSync(path.resolve(__dirname, '../assets/edx/caption-file-zh.txt'));
    makeParser(parser => {
      parser.parse(captionFile, currentSite)
        .then(result => {
          expect(result[1]).to.deep.equal({
            startTime: 500,
            endTime: 2370,
            text: '\u6211\u60f3\u591a\u82b1\u70b9\u65f6\u95f4\u8bb2\u8bb2\u8fd9\u4e00\u6b65'
          });
          done();
        })
        .catch(err => { console.error(err) });
    });
  });
});
