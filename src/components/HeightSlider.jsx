import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Box';
import Item from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import HeightIcon from '@mui/icons-material/Height';
import ApiService from '../services/api';
import InputAdornment from '@mui/material/InputAdornment';


const Input = styled(MuiInput)`
  width: 75px;
`;

export default function InputSlider({value, setValue}) {
    //const [value, setValue] = React.useState(0);

    const handleSliderChange = (event, newValue) => {
        let newCoords = {...value, z : newValue}
        setValue(newCoords);
        ApiService.setTracking(newCoords)
    };

    const handleInputChange = (event) => {
        let z = (event.target.value === '' ? '' : Number(event.target.value))
        let newCoords = {...value, z : z}
        setValue(newCoords);
        ApiService.setTracking(newCoords)
    };

    const handleBlur = () => {
        if (value.z < 0) {
            setValue({...value, z : 0});
        } else if (value.z > 500) {
            setValue({...value, z : 500});
        }
    };

    return (
        <Stack sx={{ width: "75px", textAlign: 'center' }}>
            <Item><Typography id="input-slider">
                Height
            </Typography></Item>
            <Item><HeightIcon sx={{fontSize : 33}}/></Item>
            <Item><Slider
                sx={{ height: "200px", my: "7px"}}
                orientation="vertical"
                value={typeof value.z === 'number' ? value.z : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                max={500}
                valueLabelDisplay="auto"
            /></Item>
            <Item><Input
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                value={value.z}
                size="medium"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    min: 0,
                    step : 20,
                    max: 500,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
            </Item>
        </Stack>
    );
}