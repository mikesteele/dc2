import '../../public/background';
import match from 'url-match-patterns';
import { expect } from 'chai';

const background = window.background;

describe('Background page', () => {
  it('should match edx caption requests', () => {
    const matches = match(background.edxCaptionRequestPattern);
    const edxCaptionRequest = `https://courses.edx.org/courses/course-v1:MITx+7.28.2x+3T2018/xblock/block-v1:MITx+7.28.2x+3T2018+type@video+block@48859b89fde0wewr3b021895da2e/handler/transcript/translation/en?videoId=oVwZeeK0F_o`;
    expect(matches(edxCaptionRequest)).to.be.true;
  });
});
