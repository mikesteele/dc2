## Creating your first integration

Here's the most barebones integration possible:

`src/integrations/edx.js`

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  UNSTABLE_adapterInDebugMode: true,
  UNSTABLE_providerInDebugMode: true
};
```

What does it do? If you visit any site that matches `edx.org/*`, it renders in the top left corner:

```
Debugging...
```

Don't worry about `UNSTABLE_adapterInDebugMode` and `UNSTABLE_providerInDebugMode` for now. We'll get to that soon.

### Building the app locally

TODO

### Adapter

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  adapter: () => {
    return {}
  },
  UNSTABLE_providerInDebugMode: true
};
```

### captionWindow

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  adapter: () => {
    return {
      captionWindow
    }
  },
  UNSTABLE_providerInDebugMode: true
};
```

### captionStyle

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  adapter: () => {
    return {
      captionWindow,
      captionStyle
    }
  },
  UNSTABLE_providerInDebugMode: true
};
```

### videoId

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  adapter: () => {
    return {
      captionWindow,
      captionStyle,
      videoId
    }
  },
  UNSTABLE_providerInDebugMode: true
};
```


### Parser

#### captionRequestPattern

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  adapter: () => {
    return {
      captionWindow,
      captionStyle
    }
  },
  captionRequestPattern: 'api.edx.org/caption/*',
  parser: (captionRequestBody, url) => {
    return new Promise((resolve, reject) => {
      const captions = [];
      resolve(captions);
    });
  },
  UNSTABLE_providerInDebugMode: true
};
```

### Provider

Removing `UNSTABLE_providerInDebugMode`...

```javascript
export default {
  siteId: 'edx',
  sitePattern: 'edx.org/*',
  adapter: () => {
    return {
      captionWindow,
      captionStyle
    }
  },
  captionRequestPattern: 'api.edx.org/caption/*',
  parser: (captionRequestBody, url) => {
    return new Promise((resolve, reject) => {
      const captions = [];
      resolve(captions);
    });
  }
};
```

### Troubleshooting

#### Nothing is appearing

Open the popup. What languages are loaded? Is that what you expect?

Open the console. Any errors or warnings?

Re-add `UNSTABLE_adapterInDebugMode: true`. Do you see anything?

Remove `UNSTABLE_adapterInDebugMode: true` and add `UNSTABLE_providerInDebugMode: true`. Do you see anything?

Whatever is in debug mode is what is buggy.
