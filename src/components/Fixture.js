import StarsIcon from '@mui/icons-material/Stars';
import Tooltip from '@mui/material/Tooltip';

export default function Fixture({fixture, displayX, displayY, size = 25}){
    const tooltipText = `Name : ${fixture.name}
                        X : ${fixture.x}
                        Y : ${fixture.y}
                        Z : ${fixture.z}
                        Pan offset : ${fixture.pan}
                        Tilt offset : ${fixture.tilt}`
    return (
        <Tooltip 
            title = <div style={{ whiteSpace: 'pre-line' }}>{tooltipText}</div>
            placement = "right" 
            enterDelay = {800}
            arrow>
        <StarsIcon sx={
            {position : "absolute", 
            top : displayY, 
            left : displayX, 
            fontSize: size, 
            transform: "translate(-50%, -50%)"}}/>
        </Tooltip>
    )
}