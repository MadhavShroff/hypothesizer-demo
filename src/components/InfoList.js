import {React} from "react";
import { Box } from "@mui/material";

const styles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    bottom: '5rem',
    position: "absolute",
    left: "2rem",
    border: 2,
    width: '450px',
    padding: "0rem 0rem 0rem 1rem"
  };

export const InfoList = (props) => {
    let info = []
    console.log(props);
    let {list} = props;
    if(list.length === 0) return (<></>);

    else list.forEach(item => {
        info.push(
            <h2>{item}</h2>
        );
    })
    return (
        <Box sx={{ ...styles, borderRadius: 1 }} >
            {info}
        </Box>
    )
}