import * as React from "react"
const exampleTree = require("../tree.json");

export const App = () => {
  const [node, setNode] = React.useState(exampleTree);

  console.log(exampleTree);
  console.log(node);

  let question = node.question;
  let buttons = [];
  node.children.forEach(element => {
    buttons.push(
      <button onClick={() => {
        const newNode = element;
        setNode(newNode);
      }}
      style={{"margin": "1em 1em 1em 0em", "fontSize": "2.5em"}}
      >{element.thisAnswer}</button>
    )
  });

  return (
    <div 
      className="app"
      style={{"padding": "2em 2em 0em 2em"}}>
      <div>
        <h4>{node.nodeType.toUpperCase()}</h4>
        <h1>{question}</h1>
        {buttons}
      </div>
      <button onClick={() => setNode(exampleTree)}
      >Back to the Beginning</button>
    </div>
  );
}
