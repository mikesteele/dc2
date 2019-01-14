This is a WIP rewrite of https://github.com/mikesteele/dual-captions/.

Instead of injecting individual content scripts, this rewrite injects a bundled React app into the page.

## Why rewrite?

There are a number of open issues in dual-captions that I think a rewrite would solve.

### Re-rendering on video time change

Even though they are from the same video, caption files of different languages may not match up. Relying on DOM mutations, as v1 does, doesn't always work.

See https://github.com/mikesteele/dual-captions/issues/55 and https://github.com/mikesteele/dual-captions/issues/68

In this rewrite, we re-render second subtitles on DOM mutation and current time changes.

### Utilising third-party positioning libarires

The long-term vision of dual-captions is to support hundreds of video sites. That requires a simple adapter API.

The v1 adapter API works OK in simpler SPAs, like YouTube. See https://github.com/mikesteele/dual-captions/blob/master/public/content-scripts/youtube/adapter.js

It's messier in complex SPAs, like Netflix. See https://github.com/mikesteele/dual-captions/blob/master/public/content-scripts/netflix/adapter.js

The Netflix Adapter is messy because of the lack of third-party positioning libraries, like https://github.com/HubSpot/tether. Re-writing the injected bundle to React will make including third-party libraries easier.


## Running

```
yarn
yarn build
```

Load the extension as an unpacked extension in Chrome. For more information, see https://developer.chrome.com/extensions/getstarted#unpacked.
