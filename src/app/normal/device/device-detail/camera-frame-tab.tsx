import { FC } from 'react';
import FlvVideo from '@components/flv-video';

type CameraFrameTabProps = {
    device?: any;
};

export const CameraFrameTab: FC<CameraFrameTabProps> = ({ device }) => {
    return (
        <div>
            <FlvVideo
                url={
                    'https://sample-videos.com/video123/flv/720/big_buck_bunny_720p_20mb.flv'
                }
            />
        </div>
    );
};
