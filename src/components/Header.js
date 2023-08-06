import {Paper, Button} from '@mui/material/';

export default function Header({coords}){

    const text = `${coords[0]} ; ${coords[1]}`

    return (
        <Paper elevation={10}> 
            <Button variant="text">{text}</Button>
        </Paper>
    )
}