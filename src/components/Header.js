import {Paper, Button} from '@mui/material/';

export default function Header({coords}){

    const text = `${coords.x} ; ${coords.y}`

    return (
        <Paper elevation={10}> 
            <Button variant="text">{text}</Button>
        </Paper>
    )
}