import howToPlayVideo from "../video/How-to-play.mp4";

const Video = () => {
  return (
    <div>
      <h2>Watch the Video</h2>
      <video controls width="600" height="400">
        <source src={howToPlayVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
