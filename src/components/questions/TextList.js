import React from 'react';
import { Button, FormControl, FormLabel, TextField, Box, Stack } from "@mui/material";

export const TextList = (props) => {
    const { question, callbackAnswer, goBackTo } = props;
    const [component, setComponent] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        callbackAnswer(component);
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><h2>{question}</h2>
                </FormLabel>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                    <TextField id="componentName" label="Component Name..." variant="outlined" onChange={(e) => setComponent(e.target.value)} />
                </Box>
                <Stack direction="row" justifyContent={'center'}>
                <Button  color='error' variant="outlined" style={{ "margin": "1em 1em 1em 1em", "":"red" }} onClick={() => goBackTo("end")}>Back</Button>
                <Button color='success' disabled={component === null} variant="outlined" style={{ "margin": "1em 1em 1em 1em" }} type="submit">Next</Button>
                </Stack>            </FormControl>
        </form>
    )
}