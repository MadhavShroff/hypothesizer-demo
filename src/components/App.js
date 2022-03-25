import * as React from "react"
import "./App.css"
import { MultipleChoices } from "./questions/MultipleChoices"
import { Button } from "@mui/material"
import { List } from "./questions/List"
import DecisionTree from "../tree.json";

export const App = () => {
  const [node, setCurrentNode] = React.useState(DecisionTree[0]);
  const answers = React.useRef([]);
  const defectContextGeneral = React.useRef([]);
  const defectContextComponent = React.useRef([]);
  let currentComponent = React.useRef(-1);
  let nodes = React.useRef(DecisionTree);

  const setComponents = (components) => {
    currentComponent.current++
    answers.current.push(components.join(","));
    defectContextComponent.current = components.map(ele => ({ componentName: ele, defectContext: [] }));
    setCurrentNode(node.children[0]);
  }
  const answerQuestion = (answer) => {
    const futureNode = node.children.find(child => child.path.includes(answer));
    answers.current.push(answer);
    if (currentComponent.current === -1) {
      defectContextGeneral.current.push(`${node.infoDesc}${answer}`);
    }
    else {
      defectContextComponent.current[currentComponent.current].defectContext.push(`${node.infoDesc}${answer}`);
    }
    setCurrentNode(futureNode);
  }
  const goBackTo = (index) => {
    answers.current = answers.current.slice(0, index);
    let newNode = nodes.current[0];
    answers.current.forEach((answer, i) => {
      if (newNode.nodeType === "faultLocations") {
        newNode = newNode.children[0]
      } else {
        newNode = newNode.children.find(child => child.path.includes(answer));
      }
    });
    if (index === 0) // rest navigations
    {

      currentComponent.current = -1;
      defectContextGeneral.current = [];
    }
    else {
      currentComponent.current++;
    }
    setCurrentNode(newNode);
  }
  const getQuestion = (node) => {
    if (node.nodeType === "multipleChoice") {
      return <MultipleChoices question={node.question} answers={node.answers} callbackAnswer={answerQuestion} context={defectContextComponent.current[currentComponent.current]?.componentName} />
    }
    if (node.nodeType === "faultLocations") {
      return <List question={node.question} answers={node.answers} callbackAnswer={setComponents} context={defectContextComponent.current[currentComponent.current]?.componentName} />
    }
    if (node.nodeType === "deadEnd") {
      if (defectContextComponent.current.length > currentComponent.current + 1) 
        return (
          <div>
            The <b>{defectContextComponent.current[currentComponent.current].componentName}</b> {" "+node.question}
            <br/>
            <Button variant="contained" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo(2)}>
              Go To {defectContextComponent.current[currentComponent.current + 1].componentName} Component</Button>
          </div>
        )
      return (
        <div>
          {node.question}
          <Button variant="contained" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo(0)}>
            RESTART
          </Button>
        </div>
      )
    }
    if (node.nodeType === "notSupported") {
      return (
        <div>
          {node.question}
          <Button variant="contained" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo(0)}>
            RESTART</Button>
        </div>
      )
    }
    if (node.nodeType === "hypothesis") {
      return <div>{node.question}</div>
    }
  }
  const getGeneralContext = () => {
    if (defectContextGeneral.current.length > 0) {
      return (
        <div>
          <br />
          Generally, we know that:
          <ul>
            {defectContextGeneral.current.map((ele, index) => {
              return <li key={index}>{ele}</li>
            })}
          </ul>
        </div>
      )
    }
  }
  const getComponentContext = () => {
    if (currentComponent.current > -1) {
      return (
        <div>
          For these components, we know that:
          <ul>
            {defectContextComponent.current.map((ele, index) => {
              return (
                <li key={index}>{ele.componentName}
                  <ul>
                    {ele.defectContext.map((ele, index) => {
                      return <li key={index}>{ele}</li>
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
  return (
    <div className="grid-container">
      <div>What we know so far
        {getGeneralContext()}
        {getComponentContext()}
      </div>
      <div className="grid-item">
        {getQuestion(node)}
      </div>
      <div></div>
    </div>
  );
}

