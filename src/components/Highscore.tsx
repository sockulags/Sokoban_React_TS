import Moves from "./Moves";
import Pushes from "./Pushes";
import Time from "./Time";


const Highscore = () => {
   

  return (
    <>
      <div className="highscore-data">
        <Moves />
        <Pushes />
        <Time/>
      </div>
    </>
  );
};

export default Highscore;
