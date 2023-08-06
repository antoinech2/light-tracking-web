import Konva from 'konva';
import React, { useState } from 'react';
import { Rect } from 'react-konva';


const ColoredRect = () => {
    const [color, setColor] = useState('green');
  
    const handleClick = () => {
      setColor(Konva.Util.getRandomColor());
    };

    const handeMouseHover = () => {
        console.log("ok")
    }
  
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={color}
        shadowBlur={5}
        onClick={handleClick}
        onMouseEnter={handeMouseHover}
      />
    );
  };
  
  export default ColoredRect