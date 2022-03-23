import * as React from "react"
import { Button, Chip, Typography, TextField, Box} from "@mui/material";
import { InfoList } from "./InfoList";
import InfoIcon from '@mui/icons-material/Info';
import OrgChartTree from "./Tree";
import { transformNodeToTree } from "../utilities";
import { ComponentsToVisit } from "./ComponentsToVisit"
import flatTree from "../TreeNode/flattenedNodeStructure.json"
const exampleTree = require("../TreeNode/tree.json");

export const App = () => {
  const [node, setCurrentNode] = React.useState(exampleTree);
  const [walk, setCurrentWalk] = React.useState([exampleTree.nodeID]); // List of nodeIDs representing the walk taken from root to leaf node
  const [componentsToVisit, setComponentsToVisit] = React.useState([]); // List of Strings containing the name of a component as entered by the user
  const [input, setInput] = React.useState(""); // List of Strings containing the name of a component as entered by the user
  const [componentInContext, setComponentInContext] = React.useState(""); // Current Debuging context

  let buttons = [];
  node.children.forEach(child => {
    buttons.push(
      <Button 
        key={child.nodeID} 
        variant="contained" 
        style={{"margin": "1em 1em 1em 0em"}}
        onClick={() => {
          if(node.nodeType === "question: list components") {
            if(componentsToVisit.length === 0) {
              alert("Please enter at least one component to perform analysis."); return;
            } else setComponentInContext(componentsToVisit[0]); // Set the first entered component as current debugging context
          }
          if(child.nodeType === "return") {
            console.log(componentInContext);
            const newComponentsToVisit = componentsToVisit;
            const newInfoList = walk.slice(0, 3)
            newComponentsToVisit.shift();
            setComponentInContext(componentsToVisit[0]);
            setCurrentWalk(newInfoList);
            if(componentsToVisit.length === 0) setCurrentNode(flatTree.find(ele => ele.nodeID === 19)); // Set node to ask user to input component list (nodeID 19)
            else setCurrentNode(flatTree.find(ele => ele.nodeID === 18)); // Set node to "Obtained Component List" node to recurse through the questions in a different context. ()
            return;
          }
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

  if(node.nodeType === "question: list components") { // Modified UI for List Components Question
    return (
      <div 
        className="app" style={{"padding": "2em 2em 0em 2em"}}>
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
        <Box style={{display: "flex", flexDirection: "row"}}>
          <TextField id="componentName" label="Component Name..." variant="outlined"  onChange={(e) => {
            setInput(e.target.value);
          }}/>
          <Button
            variant="contained" style={{"margin": "1em 1em 1em 1em"}}
            onClick={() => {
              if(componentsToVisit.indexOf(input) >= 0) {
                alert("Duplicates not allowed"); return;
              } else if(input === "") return;
              let newComponentsToVisit = componentsToVisit;
              newComponentsToVisit = [...componentsToVisit, input];
              setComponentsToVisit(newComponentsToVisit);
            }}> 
            <Typography variant="button" display="block" component="div" fontWeight={700}>
              Add + 
            </Typography>
          </Button>
          {buttons}
        </Box>
        <div>
          <InfoList list={walk} setInfoList={setCurrentWalk} setNode={setCurrentNode}/>
          <ComponentsToVisit list={componentsToVisit} />
        </div>
        <Button onClick={() => {
          setCurrentWalk([]);
          setCurrentNode(exampleTree);
        }}
        style={{"position": "absolute", "bottom": "2em", "left": "2em"}}
        >Back to the Beginning</Button>
        <OrgChartTree tree={transformNodeToTree(node)}/>  
        {/* Tree Viz */}
      </div>
    );
  } else return (
    <div 
      className="app" style={{"padding": "2em 2em 0em 2em"}}>
      <div style={{"margin": "0em 0em 2em 0em"}}>
        <Typography variant="overline" display="block" fontWeight={700}>{node.nodeType.toUpperCase()}</Typography>
        {walk.length > 1 && <h2 style={{"fontSize": "2.5em", "margin": "0.2em 0em 0.2rem 0em", "color":"#22a389"}}> {`<${componentInContext} />`}</h2>}
        <h1 style={{"fontSize": "2.5em", "margin": "0em 0em 0.2em 0em"}}>{node.question}</h1>
        <div>
          <Chip variant="outlined" color="primary" size="small" label="Learn More" icon={<InfoIcon />}
            onClick={() => {
              if(node.infoLink !== null) window.open(node.infoLink, '_blank');
            }}/>
        </div>
      </div>
      {buttons}
      <InfoList list={walk} setInfoList={setCurrentWalk} setNode={setCurrentNode}/>
      <ComponentsToVisit list={componentsToVisit} />
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

const changeContext = () => {

}