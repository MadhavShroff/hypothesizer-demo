import {React} from "react";
import { Box, Link } from "@mui/material";
import flatTree from "../TreeNode/flattenedNodeStructure"

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
    let info = [];
    let {list, setInfoList, setNode} = props;
    if(list.length <= 1) return (<></>);
    else list.forEach(item => { // each item in the list
        info.push(
            <Link key={item} href="#" onClick={() => {
                const newInfoList = list.slice(0, list.indexOf(item))
                setInfoList(newInfoList);
                setNode(flatTree.find(ele => ele.nodeID === newInfoList[newInfoList.length - 1])); // Find node that has nodeID as item               
            }} underline="hover"><h2>{flatTree.find(ele => ele.nodeID === item).infoDesc}</h2></Link>
        );
    })
    return (
        <Box sx={{ ...styles, borderRadius: 1 }} >
            {info}
        </Box>
    )
}