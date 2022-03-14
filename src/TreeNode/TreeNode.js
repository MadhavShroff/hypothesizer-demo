"use strict";
exports.__esModule = true;
exports.generateExampleTree = void 0;
var fs = require('fs');
var TreeNode = /** @class */ (function () {
    function TreeNode(question, thisAnswer, nodeType, infoLink, infoDesc, children) {
        var _this = this;
        this.nodeID = TreeNode.nodeCount++;
        this.children = [];
        children.forEach(function (child) { return _this.children.push(child); });
        this.question = question;
        this.thisAnswer = thisAnswer;
        this.nodeType = nodeType;
        this.infoLink = infoLink;
        this.infoDesc = infoDesc;
    }
    //  returns the next node in the graph, when answer is selected
    TreeNode.prototype.branch = function (answer) {
        return this.children.forEach(function (child) {
            if (answer === child.thisAnswer) {
                return child;
            }
        });
    };
    TreeNode.nodeCount = 0;
    return TreeNode;
}());
function generateExampleTree() {
    // Level 0
    var root = new TreeNode("What framework or technology is being used?", null, "question", "https://en.wikipedia.org/wiki/Web_framework", null, [
        new TreeNode("Is the bug in a function component or a class component?", "React", "question", "https://reactjs.org/docs/components-and-props.html#function-and-class-components", "Framework used: React", [
            new TreeNode("Is this component mutating the state?", "Function", "question", "https://reactjs.org/docs/state-and-lifecycle.html", "Component Type: Function", [
                new TreeNode("Is a render expected to take place?", "Yes", "question", "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper", "Component mutates state", [
                    new TreeNode("Since you are mutating the state, and you expect a render to take place, please check the location of the state update for any potential bugs in the implementation", "Yes", "hypothesis", "https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper", "Render call expected", []),
                    new TreeNode("Since you are mutating the state and you do not expect a render to take place, consider removing the state update call to resolve the bug", "No", "hypothesis", "https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper", "Render call not expected", [])
                ]),
                new TreeNode("Is a render expected to take place?", "No", "question", "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper", "Component does not mutates state", [])
            ]),
            new TreeNode("Is this component mutating the state?", "Class", "question", "https://reactjs.org/docs/state-and-lifecycle.html", "Component Type: Class", []),
        ]),
        new TreeNode("This is not supported yet", "Angular", "question", null, "Framework used: Angular", []),
        new TreeNode("This is not supported yet", "Vue.js", "question", null, "Framework used: Vue.js", []),
        new TreeNode("This is not supported yet", "Gatsby.js", "question", null, "Framework used: Gatsby.js", [])
    ]);
    // print JSON representation of the tree
    fs.writeFile("tree.json", JSON.stringify(root), function (err) {
        if (err)
            console.log(err);
    });
    fs.writeFile("flattenedNodeStructure.json", JSON.stringify(flattenTree(root)), function (err) {
        if (err)
            console.log(err);
    });
}
exports.generateExampleTree = generateExampleTree;
;
var flattenTree = function (tree) {
    var result = [];
    result.push(tree);
    tree.children.forEach(function (child) {
        result = result.concat(flattenTree(child));
    });
    return result;
};
generateExampleTree();
