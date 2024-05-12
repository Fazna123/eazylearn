import { FC, useState } from "react";

import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    playbackInfo: "",
  });

  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="80%"
        style={{ height: "300px", backgroundColor: "black" }}
      />
    </div>
  );
};

export default CoursePlayer;
