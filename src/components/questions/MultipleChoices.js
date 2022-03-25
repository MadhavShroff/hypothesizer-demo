import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Button} from "@mui/material";;
export const MultipleChoices = (props) => {
    const { question, answers, callbackAnswer, context } = props;
    const [answer, setAnswer] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        callbackAnswer(answer);
    }
    return (

       <form onSubmit={handleSubmit}>
        <FormControl>
           {context !== undefined&& <FormLabel style={{
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
            <Button disabled={answer=== null} variant="contained" style={{ "margin": "1em 1em 1em 1em" }} type="submit">Next</Button>
        </FormControl>
        </form>
    )
}