import { FC, useState } from "react";

import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    playbackInfo: "",
  });

  return (
    <div>
      <ReactPlayer url={videoUrl} controls={true} width="80%" height="80%" />
    </div>
  );
};

export default CoursePlayer;
