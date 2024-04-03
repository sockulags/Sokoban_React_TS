import "./Sounds.css";

interface ISoundsProps {
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  musicVolumeChange: (volume: number) => void;
}

const Sounds = ({
  toggleAudio,
  isAudioPlaying,
  isMusicPlaying,
  toggleMusic,
  volume,
  musicVolumeChange,
}: ISoundsProps) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    musicVolumeChange(parseFloat(e.target.value));
  };
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
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={volume}
          onChange={handleVolumeChange}
        />
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