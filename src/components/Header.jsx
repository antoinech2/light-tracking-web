import {Paper, Button} from '@mui/material/';

export default function Header({coords, hoverCoords, add, addAvailability}){

    const coordsText = `Selected : ${coords.x} ; ${coords.y}; ${coords.z}`
    const hoverCoordsText = `Hovering : ${hoverCoords.x} ; ${hoverCoords.y}`

    return (
        <Paper elevation={10}> 
            <Button variant="contained" onClick={add} disabled={addAvailability}>Add</Button>
            <Button variant="text">{coordsText}</Button>
            <Button variant="text">{hoverCoordsText}</Button>
        </Paper>
    )
}