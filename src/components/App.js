import * as React from "react"
import "./App.css"
import { MultipleChoices } from "./questions/MultipleChoices"
import { Button, Stack } from "@mui/material"
import { TextList } from "./questions/TextList"
import { PickList } from "./questions/PickList"

import DecisionTree from "../tree.json";

export const App = () => {
  let nodes = React.useRef(DecisionTree);
  const [node, setNode] = React.useState(DecisionTree[0]);
  const answers = React.useRef([]);
  const defectContextGeneral = React.useRef([]);
  let currentComponent = React.useRef(null);
  const currentUIElements = React.useRef(null);

  const answerQuestion = (answer) => {
    let futureNode = node.children.find(child => child.path.includes(answer))
    if (futureNode === undefined) {
      if (node.children[0].path.includes("*")) {
        futureNode = node.children[0];
      } else {
        futureNode = nodes.current[1];
      }
    }
    answers.current.push({ answer: node.infoDesc + answer, node });
    if (node.answerType === "componentName") {

      currentComponent.current = answer;
    }
    if (node.answerType === "UIElementName") {
      currentUIElements.current = answer;
    }
    setNode(futureNode);
  }

  const goBackTo = (position, index) => {
    if (position === "start") {
      currentUIElements.current = null;
      answers.current = answers.current.slice(0, index);
      if (index === 0) {
        currentComponent.current = null;
        setNode(nodes.current[0]);

      }
      else
        setNode(answers.current.pop().node);
    } else if (position === "end") {
      setNode(answers.current.pop().node);
    }
  }



  const getQuestion = (node) => {
    if (node.nodeType === "multipleChoice") {
      return <MultipleChoices question={node.question} answers={node.answers} callbackAnswer={answerQuestion} context={currentComponent.current} goBackTo={goBackTo} first={answers.current.length === 0} />
    }
    if (node.nodeType === "textList") {
      return <TextList question={node.question} answers={node.answers} callbackAnswer={answerQuestion} context={currentComponent.current} goBackTo={goBackTo} />
    }
    if (node.nodeType === "pickList") {
      return <PickList question={node.question} answers={node.answers} callbackAnswer={answerQuestion} context={currentComponent.current} goBackTo={goBackTo} />
    }
    if (node.nodeType === "deadEnd") {


    }
    if (node.nodeType === "notSupported") {
      return (
        <div>
          {node.question}
          <Stack direction="row" justifyContent={'center'}>
            <Button color='error' variant="outlined" style={{ "margin": "1em 1em 1em 1em", "": "red" }} onClick={() => goBackTo("end")}>Back</Button>
            <Button variant="outlined" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo("start", 0)}>
              RESTART</Button>
          </Stack>

        </div>
      )
    }
     // hypothesis and deadEnd
      return (
        <div>
          {node.question}
          <Stack direction="row" justifyContent={'center'}>

            <Button color='error' variant="outlined" style={{ "margin": "1em 1em 1em 1em", "": "red" }} onClick={() => goBackTo("end")}>Back</Button>
            <Button variant="outlined" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo("start", 0)}>
              RESTART</Button>
            <Button variant="outlined" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo("start", 5)}>
              Debug Different UI Element</Button>
            <Button variant="outlined" style={{ "margin": "1em 1em 1em 1em" }} onClick={() => goBackTo("start", 4)}>
              Debug Different Component</Button>
          </Stack>

        </div>
      )
    
  }


  const getGeneralContext = () => {
    return (
      <div>
        <ul>
          {answers.current.map((ele, index) => {
            return <li key={index}>{ele.answer}</li>
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className="grid-container">
      <div className="grid-item">
        {getQuestion(node)}
      </div>
      <div>What we know so far
        {getGeneralContext()}
      </div>
      <div></div>
    </div>
  );
}

