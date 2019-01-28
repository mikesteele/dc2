import Parser from '../../Parser';
const fs = require('fs');
const { expect } = require('chai');
const path = require('path');

const currentSite = 'netflix';

const makeParser = (callback) => {
  Parser({
    children: parser => callback(parser)
  });
}

describe('Netflix parser', () => {
  it('should correctly handle embedded <br>s', done => {
    const captionFile = fs.readFileSync(path.resolve(__dirname, '../assets/netflix/caption-file-with-embedded-brs.txt'));
    makeParser(parser => {
      parser.parse(captionFile, currentSite)
        .then(result => {
          expect(result[2].text).to.equal(`That was lame, right? I'm sitting here\nin a hospital bed and all...`);
          done();
        })
        .catch(err => { console.error(err) });
    });
  });
});
