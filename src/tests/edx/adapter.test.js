import { convertDisplayTimeToSeconds } from '../../adapters/edx';
import { expect } from 'chai';

describe('edX adapter', () => {
  describe('convertDisplayTimeToSeconds', () => {
    it('should work for times under 1 minute', () => {
      expect(convertDisplayTimeToSeconds('0:45')).to.equal(45);
    });

    it('should work for times under 1 hour', () => {
      expect(convertDisplayTimeToSeconds('56:45')).to.equal(45 + (60 * 56));
    });

    it('should work for times under 24 hours', () => {
      expect(convertDisplayTimeToSeconds('6:01:02')).to.equal(2 + (60 * 1) + (6 * 60 * 60));
    });
  });
});
