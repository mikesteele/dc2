import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Captions from '../Captions'

const mockAdapter = {
  captionClassName: null,
  captionStyle: null,
  captionWindow: null,
  captionWindowPosition: null,
  captionWindowStyle: null,
  playerCurrentTime: null,
  videoId: null,
  onPopupOpened: null,
  site: null
};

const mockSettings = {
  isOn: true,
  extraSpace: false
};

const mockCaptionToRender = 'This is a test!';

describe('Captions', () => {
  describe('settings', () => {
    it('should use settings.isOn - true', () => {
      const wrapper = mount(
        <Captions
          settings={{
            ...mockSettings,
            isOn: true
          }}
          adapter={mockAdapter}
          captionToRender={mockCaptionToRender}
        />
      );
      expect(wrapper.find('.dc-caption')).to.exist;
    });

    it('should use settings.isOn - false', () => {
      const wrapper = mount(
        <Captions
          settings={{
            ...mockSettings,
            isOn: false
          }}
          adapter={mockAdapter}
          captionToRender={mockCaptionToRender}
        />
      );
      expect(wrapper).to.be.empty;
    });

    it('should use settings.extraSpace - true', () => {
      // TODO
    });

    it('should use settings.extraSpace - false', () => {
      // TODO
    });

  });

  describe('adapter', () => {
    // TODO
  });

  describe('captionToRender', () => {
    it('should handle new lines correctly', () => {
      // TODO
    });
  });
});
