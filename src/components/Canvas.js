import {Box} from '@mui/material/';
import Fixture from './Fixture';
import { useRef, useEffect, useState } from 'react';
import ApiService from '../services/api';


const WIDTH = 500
const HEIGHT = 800

export default function Canvas({setCoords}) {
  const refCanvas = useRef()
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    ApiService.getFixtures().then(liste => setFixtures(liste)).then(console.log(fixtures)) 
  }, []) 

  function handleMouseMove(e){
    let x = e.clientX - refCanvas.current.offsetLeft
    let y = e.clientY - refCanvas.current.offsetTop
    setCoords([x, y])
  }

  return (
    <Box ref = {refCanvas}
      onMouseMove = {(e) => {handleMouseMove(e)}}
      sx={{
        position : "relative",
        margin: "1cm",
        padding : 10,
        width: WIDTH,
        height: HEIGHT,
        border: "2px solid black",
        overflow: "hidden"
      }}>
        {fixtures.map((fixture, index) => (
          <Fixture key={index} x={fixture.x} y={fixture.y}/>
        ))}
    </Box>
  );
}