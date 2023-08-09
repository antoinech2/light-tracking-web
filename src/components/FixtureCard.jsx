import { useCallback, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import ApiService from '../services/api';
import RemoveFixture from './RemoveFixture';

const room = await ApiService.getRoom()

export default function FixtureCard({ setFixtures, fixture, closeForm }) {

    const [visualize, setVisualize] = useState(true)
    const [currentFixture, setCurrentFixture] = useState(fixture)

    const handleRemove = useCallback(async () => {
        setFixtures(await ApiService.deleteFixture(fixture.id))
        closeForm()
    }, [setFixtures, fixture, closeForm])

    async function handleSubmit(e){
        e.preventDefault()
        const formValues = e.target
        const newFixture = {...fixture, x : formValues.x.value, y:formValues.y.value, z:formValues.z.value, pan:formValues.pan.value, tilt:formValues.tilt.value}
        delete newFixture.isNew
        setFixtures(await ApiService.updateFixture(newFixture))
        closeForm()
    }

    function cancel(){
        if (fixture.isNew){
            setFixtures((fixtures) => {fixtures.pop(); return fixtures})
        }
        else{
            UpdateFixtures(fixture)
        }
        closeForm()
    }

    function handleInputChange(e){
        const newFixture = {...currentFixture, [e.target.name] : e.target.value}
        setCurrentFixture(newFixture)
        if (visualize){
            UpdateFixtures(newFixture)
        }
    }

    function UpdateFixtures(newFixture){
        setFixtures((fixtures) => {
            fixtures[fixture.id] = {...newFixture}
            delete fixtures[fixture.id].id
            return [...fixtures]})
    }

    function handleVisualizeChange(){
        if (visualize){
            setVisualize(false)
            UpdateFixtures(fixture)
        }
        else{
            setVisualize(true)
            UpdateFixtures(currentFixture)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card variant="outlined" sx={{width : 400}}>
                <CardHeader title={fixture.name} action={<RemoveFixture onConfirm={handleRemove} />}>
                </CardHeader>
                <CardContent>
                    <Stack direction="row" spacing={2} mb={3}>
                        <TextField
                            required
                            name="x"
                            variant="outlined"
                            type="number"
                            label="X position"
                            defaultValue={fixture.x}
                            sx={{ m: 1}}
                            onChange={(e) => {handleInputChange(e)}}
                            inputProps={{
                                type : "number",
                                min : room.left,
                                max : room.left + room.width
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                        />
                        <TextField
                            required
                            name="y"
                            variant="outlined"
                            type="number"
                            label="Y position"
                            defaultValue={fixture.y}
                            sx={{ m: 1}}
                            onChange={(e) => {handleInputChange(e)}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                            inputProps={{
                                type : "number",
                                min : room.top,
                                max : room.top + room.length
                            }}
                        />
                        <TextField
                            required
                            name="z"
                            variant="outlined"
                            type="number"
                            label="Z position"
                            defaultValue={fixture.z}
                            sx={{ m: 1}}
                            onChange={(e) => {handleInputChange(e)}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                            inputProps={{
                                type : "number",
                                min : 0,
                                max : room.height
                            }}
                            />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            name='pan'
                            variant="outlined"
                            type="number"
                            label="Pan offset"
                            defaultValue={fixture.pan}
                            sx={{m: 1}}
                            fullWidth={true}
                            onChange={(e) => {handleInputChange(e)}}
                            inputProps={{
                                type : "number",
                                min : -90,
                                max : 90,
                                step : 0.05,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">°</InputAdornment>,
                            }}
                        />
                        <TextField
                            name='tilt'
                            variant="outlined"
                            type="number"
                            label="Tilt offset"
                            defaultValue={fixture.tilt}
                            sx={{m: 1}}
                            onChange={(e) => {handleInputChange(e)}}
                            fullWidth={true}
                            InputProps={{endAdornment: <InputAdornment position="end">°</InputAdornment>}}
                            inputProps={{
                                type : "number",
                                min : -90,
                                max : 90,
                                step : 0.05,
                            }}
                        />
                    </Stack>
                </CardContent>
                <CardActions >
                    <Button onClick={handleVisualizeChange} 
                            style={{ marginRight: "auto", color: '#5d8f00'}} 
                            variant="outlined" startIcon={visualize ? <VisibilityIcon /> : <VisibilityOffIcon />}>
                    Visualize</Button>

                    <Button onClick={cancel} color='error' style={{ marginLeft: "auto" }} variant="outlined" startIcon={<CloseIcon />}>
                    Cancel
                    </Button>
                    <Button variant="contained" type="submit" endIcon={<CheckIcon />}>
                    Apply
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}