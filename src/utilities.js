import tree from "./TreeNode/tree.json"

export const transformNodeToTree = function(node) {
    const result = {};
    result.children = []
    node.children.forEach(child => {
      result.children.push(transformNodeToTree(child));
    });
    if(node.nodeType === 'hypothesis') delete result.children;
    result.attributes = {...node};
    delete result.attributes.children;
    delete result.attributes.infoLink;
    delete result.attributes.nodeType;
    delete result.attributes.infoDesc;
    for (const property in result.attributes) // remove null entries
      if(result.attributes[property] === null || result.attributes[property] === undefined)
        delete result.attributes[property];
    result.name = node.infoDesc;
    // console.log(result);/
    // console.log(verify(result));
    return result;
}
  
export const verify = function(node) {
 if(node.attributes === undefined || node.children === undefined || node.name === undefined) return false;
 return true;
}

export const getNodeListFromWalk = function(walk) { // eg: [10, 7, 3]
  let result = [];
  let thisTree = tree;
  for(let i = 0; i<walk.length; i++) {
    if(thisTree.nodeID === walk[i]) result.push(thisTree);
    thisTree = thisTree.children[thisTree.children.findIndex(ele => ele.nodeID === walk[i+1])];
  }
  return result;
}

export const getInfoDescListFromWalk = function(walk) {
  let res = getNodeListFromWalk(walk);
  let result = [];
  res.forEach((val, idx) => {
    result.push(val.infoDesc);
  });
  return res;
}