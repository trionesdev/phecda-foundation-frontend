import React, { useEffect, useRef, useState } from 'react';
import flvjs from 'flv.js';

interface FlvVideoProps {
    url: string | undefined;
}

const FlvVideo: React.FC<FlvVideoProps> = ({ url }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const flvPlayerRef = useRef<flvjs.Player | null>(null);
    const [readState, setReadState] = useState<number>();

    useEffect(() => {
        closePlay();
        if (videoRef.current) {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: url,
                isLive: true,
            });
            flvPlayer.attachMediaElement(videoRef.current);
            flvPlayer.load();
            flvPlayer.play();
            flvPlayerRef.current = flvPlayer;
        }

        return () => closePlay();
    }, [url]);

    useEffect(() => {
        setReadState(videoRef.current?.readyState);
        console.log('readyState : ', url, videoRef.current?.readyState);
    }, [videoRef.current?.readyState]);

    const closePlay = () => {
        if (flvPlayerRef.current) {
            console.log(flvPlayerRef.current);
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
