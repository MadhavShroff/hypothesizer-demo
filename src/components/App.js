import * as React from "react"
import { Button, Chip, Typography} from "@mui/material";
import { InfoList } from "./InfoList";
import InfoIcon from '@mui/icons-material/Info';
const exampleTree = require("../tree.json");

export const App = () => {
  const [node, setNode] = React.useState(exampleTree);
  const [infoList, setInfoList] = React.useState([]);

  let buttons = [];
  node.children.forEach(element => {
    buttons.push(
      <Button variant="contained" onClick={() => {
          const newNode = element;
          const newInfoList = infoList;
          newInfoList.push(newNode.infoDesc);
          setNode(newNode);
          setInfoList(newInfoList);
        }}
        style={{"margin": "1em 1em 1em 0em"}}
      ><Typography variant="button" display="block" component="div" fontWeight={700}>
          {element.thisAnswer}
    </Typography></Button>
    )
  });

  return (
    <div 
      className="app"
      style={{"padding": "2em 2em 0em 2em"}}>
      <div style={{"margin": "0em 0em 2em 0em"}}>
        <Typography variant="overline" display="block" fontWeight={700}>{node.nodeType.toUpperCase()}</Typography>
        <h1 style={{"fontSize": "2.5em", "margin": "0em 0em 0.2em 0em"}}>{node.question}</h1>
        <div>
          <Chip variant="outlined" 
            color="primary" 
            size="small" 
            label="Learn More"
            onClick={() => {
              if(node.infoLink !== null) 
                window.open(node.infoLink, '_blank');
              }} 
            icon={<InfoIcon />}
          />
        </div>
      </div>
      {buttons}
      <InfoList list={infoList}/>
      <Button onClick={() => {
        setInfoList([]);
        setNode(exampleTree);
      }}
      style={{"position": "absolute", "bottom": "2em", "left": "2em"}}
      >Back to the Beginning</Button>
    </div>
  );
}
