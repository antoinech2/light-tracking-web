import StarsIcon from '@mui/icons-material/Stars';

export default function Fixture({x, y, size = 35}){
    return (
        <StarsIcon sx={{position : "absolute", top : y, left : x, fontSize: size, transform: "translate(-50%, -50%)"}}/>
    )
}