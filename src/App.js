import { Stage, Layer, Text, Rect } from 'react-konva';
import { useState } from 'react';
import ColoredRect from './Canvas'
import CoordsText from './Coords'

const App = () => {

  const [coords, setCoords] = useState([0,0]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <div onMouseMove={(e) => {
          setCoords([e.evt.x, e.evt.y])}}>
          <Text text="Try click on rect" />
          <CoordsText 
          text={coords[0].toString() + " , " + coords[1].toString()}
          />
          <ColoredRect/>
          <Rect x={100} y={100} width={50} height={50} fill={'blue'} />
        </div>
      </Layer>
    </Stage>
  );
};

export default App