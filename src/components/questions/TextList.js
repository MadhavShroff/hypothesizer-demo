import React from 'react';
import { Button, FormControl, FormLabel, Typography, TextField, Box } from "@mui/material";

export const TextList = (props) => {
    const { question, callbackAnswer } = props;
    const [answer, setAnswer] = React.useState([]);
    const component = React.useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        callbackAnswer(answer);
    }
   const handleChange = () => {
       if(component.current.value === "") return;
        setAnswer([...answer,component.current.value]);
   }
    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><h2>{question}</h2>
                </FormLabel>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                    <TextField id="componentName" label="Component Name..." variant="outlined" inputRef={component} />
                    <Button
                        variant="contained" style={{ "margin": "1em 1em 1em 1em" }}
                        onClick={handleChange}
                        >
                        <Typography variant="button" display="block" component="div" fontWeight={700}>
                            Add +
                        </Typography>
                    </Button>
                    { }
                </Box>
                <ul style={{"textAlign": "left", "fontSize": ".75em"}}>
                    {
                        answer.map(ele => <li key={ele}>{ele}</li>)
                    }
                </ul>
                <Button disabled={answer.length === 0} variant="contained" style={{ "margin": "1em 1em 1em 1em" }} type="submit">Next</Button>
            </FormControl>
        </form>
    )
}