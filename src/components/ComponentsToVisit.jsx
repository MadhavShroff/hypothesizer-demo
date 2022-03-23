import { React } from "react";
import { Box,  Typography} from "@mui/material";

const styles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    bottom: '5rem',
    position: "absolute",
    right : "2rem",
    border: 2,
    width: 'wrap',
    padding: "0rem 1rem 0rem 1rem"
};

export const ComponentsToVisit = (props) => {
    let info = [];
    let {list} = props;
    if(list.length === 0 ) return (<></>)
    list.forEach(item => { // each item in the list
        item = `<${item} />`
        info.push(
            <h2 style = {{color: "#22a389"}}>{item}</h2>
        );
    })
    return (
        <Box sx={{ ...styles, borderRadius: 1 }} >
            <Typography variant="button" display="block" component="div" fontWeight={700} style={{margin: "1rem 0rem 1rem"}}>
              Components to Visit :
            </Typography>
            {info}
        </Box>
    )
}