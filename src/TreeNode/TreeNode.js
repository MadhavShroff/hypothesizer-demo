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
    TreeNode.nodeCount = 0; // static counter for numbering nodes
    return TreeNode;
}());
function generateExampleTree() {
    // Level 0
    var root = new TreeNode("What framework or technology is being used?", null, "question", "https://en.wikipedia.org/wiki/Web_framework", null, [
        new TreeNode("Please enter all components where you suspect there may be a bug.", "React", "question: list components", "https://reactjs.org/docs/components-and-props.html#function-and-class-components", "Framework used: React", [
            new TreeNode("Is this component a function component or a class component?", "Done", "question", "https://reactjs.org/docs/components-and-props.html#function-and-class-components", "Obtained Component List", [
                new TreeNode("Is this component a pure component?", "Function", "question", "https://medium.com/technofunnel/working-with-react-pure-components-166ded26ae48", "Component Type: Function", [
                    new TreeNode("Are all JSX elements defined in this component being drawn on screen?", "Yes", "question", null, "Pure Component", [
                        new TreeNode("This component is performing as expected. The defect is likely in a different component.", "Yes", "hypothesis", null, "All JSX Elements Drawn", [new TreeNode(null, "Analyze next Component", "return", null, "return", [])]),
                        new TreeNode("This component is performing as expected. The defect is likely in a different component. This component might have styling that prevents some elements from being rendered on screen. Please check the styling applied to verify.", "No", "hypothesis", null, "Likely Incorrect Styling", [new TreeNode(null, "Analyze next Component", "return", null, "return", [])]),
                    ]),
                    new TreeNode("Are all JSX elements defined in this component being drawn on screen?", "No", "question", null, "Impure Component", [
                        new TreeNode("Is the data or its behavior shown on the screen as expected?", "Yes", "question", "", "All JSX Elements Drawn", [
                            new TreeNode("This component is performing as expected. The defect is likely in a different component.", "Yes", "hypothesis", "", "Data in view is Accurate", [new TreeNode(null, "Analyze next Component", "return", null, "return", [])]),
                            new TreeNode("Is the state update performed using hooks?", "No", "question", "", "Data in view is Not Accurate", [
                                new TreeNode("In an impure functional component, state updates must be performed using React Hooks. (Learn more about correct usage of hooks)", "No", "hypothesis", "", "State not updated using Hooks", [new TreeNode(null, "Analyze next Component", "return", null, "return", [])]),
                                new TreeNode("Are you creating a new copy of the existing state object, modifying it and passing it to the hook? (Learn more about correct usage of hooks)", "Yes", "question", "", "State updated using Hooks", [
                                    new TreeNode("This component is performing as expected. The defect is likely in a different component.", "Yes", "hypothesis", "", "Correctly updated state with Hooks", [new TreeNode(null, "Analyze next Component", "return", null, "return", [])]),
                                    new TreeNode("This component does not use React hooks as expected. Please create a copy of the state object and pass it to your created hook. ", "No", "hypothesis", "https://reactjs.org/docs/hooks-rules.html", "Incorrectly updated state with Hooks", [new TreeNode(null, "Analyze next Component", "return", null, "return", [])]),
                                ]),
                            ]),
                        ]),
                    ]),
                ]),
            ])
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
