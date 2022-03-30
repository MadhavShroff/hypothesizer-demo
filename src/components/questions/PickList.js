import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Checkbox, Button, FormGroup } from "@mui/material";;
export const PickList = (props) => {
    const { question, answers, callbackAnswer, context } = props;
    const [answer, setAnswer] = React.useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        callbackAnswer(answer);
    }
    const handleChange = (e) => {
        if (e.target.checked) {
            setAnswer([...answer, e.target.value]);
        } else {
            setAnswer(answer.filter(ele => ele !== e.target.value));
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <FormControl>
                {context !== undefined && <FormLabel style={{
                    "backgroundColor": "red",
                    "color": "white",
                    "fontSize": "1.5rem"
                }}>For the {context} component:</FormLabel>}
                <FormLabel id="demo-radio-buttons-group-label"><h2>
                    {question}
                </h2>
                </FormLabel>
                <FormGroup>
                    {answers.map(answer => <FormControlLabel value={answer} control={<Checkbox />} onChange={handleChange} label={answer}
                        key={answer} />)}
                </FormGroup>
                <Button disabled={answer.length === 0} variant="contained" style={{ "margin": "1em 1em 1em 1em" }} type="submit">Next</Button>
            </FormControl>
        </form>
    )
}