import * as React from "react"
import { Button, Chip, Typography} from "@mui/material";
import { InfoList } from "./InfoList";
import InfoIcon from '@mui/icons-material/Info';
import OrgChartTree from "./Tree";
import { transformNodeToTree } from "../utilities";
const exampleTree = require("../TreeNode/tree.json");

export const App = () => {
  const [node, setCurrentNode] = React.useState(exampleTree);
  const [walk, setCurrentWalk] = React.useState([exampleTree.nodeID]); // List of nodeIDs representing the walk taken from root to leaf node

  let buttons = [];
  node.children.forEach(child => {
    buttons.push(
      <Button 
        key={child.nodeID} 
        variant="contained" 
        style={{"margin": "1em 1em 1em 0em"}}
        onClick={() => {
          const newNode = child;
          const updatedWalk = walk;
          updatedWalk.push(child.nodeID);
          setCurrentNode(newNode);
          setCurrentWalk(updatedWalk);
        }}>
        <Typography variant="button" display="block" component="div" fontWeight={700}>
          {child.thisAnswer}
        </Typography>
      </Button>
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
          <Chip variant="outlined" color="primary" size="small" label="Learn More" icon={<InfoIcon />}
            onClick={() => {
              if(node.infoLink !== null) 
                window.open(node.infoLink, '_blank');
            }}/>
        </div>
      </div>
      {buttons}
      <InfoList list={walk} setInfoList={setCurrentWalk} setNode={setCurrentNode}/>
      <Button onClick={() => {
        setCurrentWalk([]);
        setCurrentNode(exampleTree);
      }}
      style={{"position": "absolute", "bottom": "2em", "left": "2em"}}
      >Back to the Beginning</Button>
      <OrgChartTree tree={transformNodeToTree(node)}/>  {/* Tree Viz */}
    </div>
  );
}