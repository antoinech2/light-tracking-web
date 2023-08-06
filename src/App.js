import Canvas from './components/Canvas'
import Header from './components/Header';

import { useState } from 'react';

export default function App() {
  const [coords, setCoords] = useState([0, 0])


  return (
    <div>
      <Header coords={coords}/>
      <Canvas setCoords={setCoords}/>
    </div>
  );
}