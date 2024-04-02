import "./Sounds.css";

interface ISoundsProps {
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const Sounds = ({ toggleAudio, isAudioPlaying,isMusicPlaying, toggleMusic }: ISoundsProps) => {
  return (
    <div className="sounds">
      <div className="music-toggle">
        <h4>Music</h4>
        <button className="audio-btn" onClick={toggleMusic}>
          {isMusicPlaying ? (
            <span className="material-symbols-outlined">volume_up</span>
          ) : (
            <span className="material-symbols-outlined">volume_off</span>
          )}
        </button>
      </div>
      <div className="music-toggle">
        <h4>Sound effects</h4>
        <button className="audio-btn" onClick={toggleAudio}>
          {isAudioPlaying ? (
            <span className="material-symbols-outlined">volume_up</span>
          ) : (
            <span className="material-symbols-outlined">volume_off</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sounds