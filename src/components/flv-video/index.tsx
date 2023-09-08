import React, { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

interface FlvVideoProps {
    url: string | undefined;
    onError?: Function;
}

const FlvVideo: React.FC<FlvVideoProps> = ({ url, onError }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const flvPlayerRef = useRef<flvjs.Player | null>(null);

    useEffect(() => {
        if (videoRef.current && flvjs.isSupported()) {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: url,
                isLive: true,
            });
            flvPlayer.attachMediaElement(videoRef.current);
            flvPlayer.load();
            const playPromise = flvPlayer.play();
            flvPlayerRef.current = flvPlayer;

            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }

            flvPlayer.on(flvjs.Events.ERROR, (event, data) => {
                if (onError) {
                    onError();
                }
            });
        } else {
            console.log('flvjs is not support');
        }

        return () => closePlay();
    }, [url]);

    const closePlay = () => {
        if (flvPlayerRef.current) {
            flvPlayerRef.current.pause();
            flvPlayerRef.current.unload();
            flvPlayerRef.current.detachMediaElement();
            flvPlayerRef.current.destroy();
        }
    };

    return (
        <video
            ref={videoRef}
            muted
            autoPlay
            width={640}
            height={360}
            style={{ marginLeft: 8 }}
        />
    );
};

export default FlvVideo;
