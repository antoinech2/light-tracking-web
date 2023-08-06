import Konva from 'konva';
import React, { useEffect } from 'react';
import { Text } from 'react-konva';

const CoordsText = ({text}) =>{

    return(
        <Text x = {500} text = {text}/>
    )
}

export default CoordsText