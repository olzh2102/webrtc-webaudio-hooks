<div align="center">
<h1>webrtc webaudio hooks 🕸 🪝</h1>

<p>It's React Hooks package to handle some core functionalities via hooks</p>
</div>

---
## Why this exists

While working on one project, we have realized that some functionalities from WebRTC and WebAudio APIs can be abstracted in certain hooks for further easier usage.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why this exists](#why-this-exists)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [use-media-stream](#use-media-stream)
  - [use-screen](#use-screen)
  - [use-is-audio-active](#use-is-audio-active)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's dependencies:

```shell
npm install --save webrtc-webaudio-hooks
```

```shell
yarn add webrtc-webaudio-hooks
```

## Usage

### use-media-stream

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { useMediaStream } from 'webrtc-webaudio-hooks'

function ExampleComponent() {
  const {stream, isLoading, muted, toggleVideo} = useMediaStream()

  if (isLoading) return <span>Getting your stream ready...😉</span>

  return (
    <>
      <video srcObject={stream} autoPlay />
      <ControlPanel muted={muted} toggleVideo={toggleVideo} />
    </>
  )
}
```

```typescript
// API

return {
  // MediaStream representing stream of media content
  stream: MediaStream,
  // Boolean value representing whether current stream is muted
  muted: boolean,
  // Boolean value representing whether current stream is visible
  visible: boolean,
  // Function to change "muted" state to opposite
  toggleAudio: () => void,
  // Function to change "visible" state (including webcam light indicator)
  toggleVideo: (onTurnCamOn?: (track: MediaTrack) => void) => void,
  // Boolean status representing MediaStream is getting created
  isLoading: boolean,
  // Boolean status representing whether creating MediaStream is failed
  isError: boolean
  // Boolean status representing whether creating MediaStream is successful
  isSuccess: boolean
}
```

### use-screen
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { useScreen } from 'webrtc-webaudio-hooks'

function ExampleComponent({stream}: {stream: MediaStream}) {
  const {startShare, stopShare} = useScreen(stream)

  return <ControlPanel startShareMyScreen={startShare} stopShareMyScreen={stopShare} />
}
```

```typescript
// API

return {
  // MediaStreamTrack representing stream of media display content
  screenTrack: MediaStreamTrack,
  // Function that creates display media, and takes two callbacks as arguments:
  // @param onstarted - an optional function that is called when screen sharing is started
  // @param onended - an optional function that is called when screen sharing is stopped
  startShare: (
    onstarted?: () => void,
    onended?: () => void
  ) => Promise<void>,
  // Boolean value representing whether current stream is visible
  stopShare: (screenTrack: MediaStreamTrack) => void
}
```
### use-is-audio-active
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { useIsAudioActive } from 'webrtc-webaudio-hooks'

function ExampleComponent() {
  const [stream, setStream] = React.useState(null)
  const isActive = useIsAudioActive({ source: stream });

  React.useEffect(() => {
    (async function createStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream)
    })()
  }, [])  
  
  return (
    <p>
      Am I speaking: {' '} { isActive ? 'yes, you are 🕺' : "seems like ain't 🦻" }
    </p>
  )
}
```
```typescript
// API

// Boolean value representing whether audio stream is active (checks every second)
return isAcive
```


## Other Solutions

[use-is-audio-active](https://github.com/olzh2102/use-is-audio-active)

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/olzh2102/"><img src="https://avatars.githubusercontent.com/u/27337196?v=4?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Olzh K. Kurikov</b></sub></a>
    <td align="center"><a href="https://www.linkedin.com/in/dinmukhamed-sailaubek-9a5a78234/"><img src="https://avatars.githubusercontent.com/u/57768070?v=4?v=4?s=100" width="100px;" alt=""/><br /><sub><b>D. Sailaubek</b></sub></a>
    
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT
