import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import {App} from "./components/App"

// global.a = () => { /* test function */ };

//   const s = new (require('inspector').Session)();
//   s.connect();

//   let objectId;
//   s.post('Runtime.evaluate', { expression: 'a' }, (err, { result }) => {
//     objectId = result.objectId;
//   });
//   s.post('Runtime.getProperties', { objectId }, (err, { internalProperties }) => {
//     console.log(internalProperties);
//   });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);