````
const IntegrationWithCustomSetting = {
  adapter: (customSettings) => {
    let captionStyle = {};
    if (customSettings.bigText) {
      captionStyle.fontSize = '36px';
    }
    return {
      captionStyle
    }
  },
  customSettings: {
    bigText: {
      label: 'Big text?',
      type: 'boolean',
      defaultValue: false
    }
  }
}
````
