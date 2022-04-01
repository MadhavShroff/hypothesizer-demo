import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Button, Stack } from "@mui/material";;
export const MultipleChoices = (props) => {
    const { question, answers, callbackAnswer, context, goBackTo, first } = props;
    const [answer, setAnswer] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        callbackAnswer(answer);
        setAnswer(null);
    }
    return (

        <form onSubmit={handleSubmit}>
            <FormControl>
                {context !== null && <FormLabel style={{
                    "backgroundColor": "red",
                    "color": "white",
                    "fontSize": "1.5rem"
                }}>For the {context} component:</FormLabel>}
                <FormLabel id="demo-radio-buttons-group-label"><h2>
                    {question}
                </h2>
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(e) => setAnswer(e.target.value)}
                >
                    {
                        answers.map(answer => <FormControlLabel value={answer} control={<Radio />} label={answer}
                            key={answer}
                        />)
                    }
                </RadioGroup>
                <Stack direction="row" justifyContent={'center'}>
                    <Button disabled = {first} color='error' variant="outlined" style={{ "margin": "1em 1em 1em 1em", "": "red" }} onClick={() => goBackTo("end")}>Back</Button>
                    <Button color='success' disabled={answer === null} variant="outlined" style={{ "margin": "1em 1em 1em 1em" }} type="submit">Next</Button>
                </Stack>        </FormControl>
        </form>
    )
}