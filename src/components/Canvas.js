import {Box} from '@mui/material/';
import Fixture from './Fixture';
import { useRef, useEffect, useState } from 'react';
import ApiService from '../services/api';

const ROOM = await ApiService.getRoom()
const LENGTH = window.innerHeight - 100
const WIDTH = LENGTH / ROOM.length * ROOM.width

function getRoomCoords(coords){
  return {
    x : Math.round(coords.x / WIDTH * ROOM.width + ROOM.left),
    y : Math.round(coords.y / LENGTH * ROOM.length  + ROOM.top), 
    z : coords.z || 0
  }
}

function getCanvasCoords(coords){
  return {
    x : Math.round((coords.x - ROOM.left) / ROOM.width * WIDTH ),
    y : Math.round((coords.y - ROOM.top) / ROOM.length * LENGTH ), 
    z : coords.z || 0
  }  
}

export default function Canvas({setCoords}) {
  const refCanvas = useRef()
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    ApiService.getFixtures().then(liste => setFixtures(liste)).then(console.log(fixtures)) 
  }, []) 

  function getInCanvasPosition(e){
    return {x : e.clientX - refCanvas.current.offsetLeft,
     y : e.clientY - refCanvas.current.offsetTop}
  }

  function handleMouseMove(e){
    setCoords(getRoomCoords(getInCanvasPosition(e)))
  }

  function handleClick(e){
    ApiService.setTracking(getRoomCoords(getInCanvasPosition(e)))
  }

  return (
    <Box ref = {refCanvas}
      onClick = {handleClick}
      onMouseMove = {handleMouseMove}
      sx={{
        position : "relative",
        margin: "1cm",
        width: `${WIDTH}px`,
        height: `${LENGTH}px`,
        border: "2px solid black",
        overflow: "hidden"
      }}>
        {fixtures.map((fixture, index) => (
          <Fixture key={index} fixture={fixture} displayX={getCanvasCoords({x : fixture.x}).x} displayY={getCanvasCoords({y : fixture.y}).y}/>
        ))}
    </Box>
  );
}