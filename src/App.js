import Canvas from './components/Canvas'
import Header from './components/Header';
import HeightSlider from './components/HeightSlider'
import Stack from '@mui/material/Stack';
import FixtureCard from './components/FixtureCard';
import ApiService from './services/api';
import { useState, useEffect } from 'react';

const defaultFixture = {
  name : "Test",
  x : 0,
  y : 0,
  z : 500,
  isNew : true
}

export default function App() {
  const [coords, setCoords] = useState({x : 0, y : 0, z : 0})
  const [hoverCoords, setHoverCoords] = useState({x : 0, y : 0})
  const [fixtures, setFixtures] = useState([{}])
  const [selectedFixture, setSelectedFixture] = useState()

  useEffect(() => {
    ApiService.getFixtures().then(liste => setFixtures(liste))
  }, []) 

  function addFixture(){
    setFixtures(() => {
      fixtures.push(defaultFixture)
      setSelectedFixture({...fixtures[fixtures.length -1], id : fixtures.length -1})
      return fixtures
    })
  }

  return (
    <div>
      <Stack spacing={3}>
        <Header add={addFixture} addAvailability={fixtures[fixtures.length-1]?.isNew} coords={coords} hoverCoords={hoverCoords}/>
        <Stack direction="row" spacing={3}>
          <Canvas selectFixture={setSelectedFixture} fixtures={fixtures} setHoverCoords={setHoverCoords} coords={coords} setCoords={setCoords}/>
          <HeightSlider value={coords} setValue = {setCoords}/>
          {
            selectedFixture ? <FixtureCard setFixtures={setFixtures} closeForm={setSelectedFixture} fixture={selectedFixture}/>
            : null
          }
        </Stack>
      </Stack>
    </div>
  );
}