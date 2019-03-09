import Parser from '../../Parser';
const fs = require('fs');
const { expect } = require('chai');
const path = require('path');

const currentSite = 'netflix';

const makeParser = (callback) => {
  Parser({
    children: parser => callback(parser)
  });
};

const enCaptionFile = fs.readFileSync(path.resolve(__dirname, '../assets/netflix/optimized-captions/roma-en.txt'));
const esCaptionFile = fs.readFileSync(path.resolve(__dirname, '../assets/netflix/optimized-captions/roma-es-cc.txt'));

describe('optimized captions', () => {
  it('should merge captions', done => {
    makeParser(parser => {
      const enCaptionFilePromise = parser.parse(enCaptionFile, currentSite);
      const esCaptionFilePromise = parser.parse(esCaptionFile, currentSite);
      Promise.all([ enCaptionFilePromise, esCaptionFilePromise ])
        .then(results => {
          const [ enCaptions, esCaptions ] = results;
          // Sanity tests
          expect(enCaptions[42].text).to.equal('...But I was born poor,\nand you\'ll never love me.');
          expect(esCaptions[87].text).to.equal('âª Pero yo nacÃ­ pobre âª');
          expect(esCaptions[88].text).to.equal('âª Y es por eso que no me puedes querer âª');
          // TODO
          done();
        });
    });
  });
});
