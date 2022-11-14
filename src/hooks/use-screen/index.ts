import { useState } from 'react';

/**
 * @param    {MediaStream | null} stream
 *           stream of media content
 *
 * @returns   an object containing screenTrack, isIdle, isLoading, isSuccess, isError,
 *            as well as functions to start and stop screen sharing
 *
 * @example
 *   const ExampleComponent = () => {
 *     const [stream, setStream] = React.useState(null);
 *     const { startShare, screenTrack } = useScreen(stream);
 *
 *     React.useEffect(() => {
 *       (async function createStream() {
 *          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
 *          setStream(stream)
 *       })()
 *     }, []);
 *
 *     return (
 *       <>
 *         <button onClick={startShare}>Start share</button>
 *         {screenTrack && <video
 *           ref={(node) => {
 *             if (node) node.srcObject = new MediaStream([screenTrack]);
 *           }}
 *           autoplay
 *         />}
 *       </>
 *    );
 *  }
 */

type Status = 'idle' | 'loading' | 'success' | 'rejected';

export default function useScreen(stream: MediaStream | null) {
  const [status, setStatus] = useState<Status>('idle');
  const [screenTrack, setScreenTrack] = useState<MediaStreamTrack | null>(null);

  /**
   * @param onstarted an optional function that is called when screen sharing is started
   * @param onended an optional function that is called when screen sharing is stopped
   */
  async function startShare(
    onstarted: () => void = () => {},
    onended: () => void = () => {},
  ) {
    setStatus('loading');

    try {
      if (!stream) return;

      // @ts-ignore
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const [screenTrack] = screenStream.getTracks();

      setScreenTrack(screenTrack);
      stream.addTrack(screenTrack);
      setStatus('success');

      onstarted();

      screenTrack.onended = () => {
        stopShare(screenTrack);
        onended();
      };
    } catch (e) {
      console.error('Failed to share screen');
      console.error(e);
      setStatus('rejected');
    }
  }

  function stopShare(screenTrack: MediaStreamTrack) {
    if (!stream) return;

    screenTrack.stop();
    stream.removeTrack(screenTrack);
    setScreenTrack(null);
    setStatus('idle');
  }

  return {
    screenTrack,
    startShare,
    stopShare,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'rejected',
  };
}
