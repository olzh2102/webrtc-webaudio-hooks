import * as React from 'react';

/**
 * @param    {MediaStream} source
 *           audio source (microphone)
 *
 * @param    {number} fftSize
 *           FFT size to cover certain range of frequencies
 *
 * @return   {boolean}
 *           boolean value indicating if the source active
 *
 * @example
 *   const ExampleComponent = () => {
 *     const [stream, setStream] = React.useState(null)
 *     const isActive = useIsAudioActive({ source: stream });
 *
 *     React.useEffect(() => {
 *       (async function createStream() {
 *          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
 *          setStream(stream)
 *       })()
 *     }, [])
 *
 *     return (
 *       <p>
 *           Am I speaking: {' '} { isActive ? 'yes, you are 🕺' : "seems like ain't 🦻" }
 *       </p>
 *     )
 *  }
 */

export default function useIsAudioActive({
  source,
  fftSize = 1024,
}: {
  source: MediaStream | null;
  fftSize?: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
}) {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!source) return;

    const audioContext = new AudioContext();
    const analyser = new AnalyserNode(audioContext, { fftSize });

    const audioSource = audioContext.createMediaStreamSource(source);
    // * connect your source to output (usually laptop's mic)
    audioSource.connect(analyser);

    // * buffer length gives us how many different frequencies we are going to be measuring
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    update();

    function update() {
      analyser.getByteTimeDomainData(dataArray);

      const sum = dataArray.reduce((a, b) => a + b, 0);

      if (sum / dataArray.length / 128.0 >= 1) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 1000);
      }

      requestAnimationFrame(update);
    }

    return () => {
      setIsActive(false);
    };
  }, [source]);

  return isActive;
}
