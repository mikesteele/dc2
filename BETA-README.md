## dual-captions Version 2 Beta

Thanks for joining the dual-captions Version 2 Beta.

This rewrite fixes many issues with v1 dual-captions and makes it easier to integrate new sites into dual-captions.

## Major changes from v1

### Japanese, Chinese, Arabic and Korean support on Netflix

You can now render second subtitles underneath Japanese, Chinese, Arabic or Korean.

Note that these languages still cannot be loaded into the app. See ISSUE.

As an example, choosing Chinese on Netflix and English in dual-captions works:

IMAGE.

But you cannot choose English on Netflix and Chinese in dual-captions.

### Auto-generated caption support on YouTube

TODO

### Automatic language detection of subtitle files

TODO

### Not working in full screen

TODO


## Changelog

### v2.0.0-beta.1 [Staged]

### Adapter API

```
canRenderInCaptionWindow - Unstable (false recommended)
captionClassName - Stable
captionStyle - Stable
captionWindow - Stable
captionWindowPosition - To be deprecated (not needed)
captionWindowStyle - Stable
defaultCaptionStyle - Unstable
providerInDebugMode - Stable
video - To be deprecated (in favor of playerCurrentTime)
```
