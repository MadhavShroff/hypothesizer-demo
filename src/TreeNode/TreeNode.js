"use strict";
exports.__esModule = true;
exports.generateExampleTree = void 0;
var TreeNode = /** @class */ (function () {
    function TreeNode(q, a, qorh, link, i) {
        this.children = [];
        this.question = q;
        this.thisAnswer = a;
        this.nodeType = qorh;
        this.infoLink = link;
        this.infoDesc = i;
    }
    //  returns the next node in the graph, when answer is selected
    TreeNode.prototype.branch = function (answer) {
        return this.children.forEach(function (child) {
            if (answer === child.thisAnswer) {
                return child;
            }
        });
    };
    return TreeNode;
}());
function generateExampleTree() {
    // Level 0
    var root = new TreeNode("What framework or technology is being used here?", null, "question", "https://en.wikipedia.org/wiki/Web_framework", null);
    // Level 1
    root.children.push(new TreeNode("Is the bug in a function component or a class component?", "React", "question", "https://reactjs.org/docs/components-and-props.html#function-and-class-components", "Framework used: React"));
    root.children.push(new TreeNode("This is not supported yet", "Angular", "question", null, "Framework used: Angular"));
    root.children.push(new TreeNode("This is not supported yet", "Vue.js", "question", null, "Framework used: Vue.js"));
    root.children.push(new TreeNode("This is not supported yet", "Gatsby.js", "question", null, "Framework used: Gatsby.js"));
    // Level 2
    var current = root.children[0];
    current.children.push(new TreeNode("Is this component mutating the state?", "Function", "question", "https://reactjs.org/docs/state-and-lifecycle.html", "Component Type: Function"));
    current.children.push(new TreeNode("Is this component mutating the state?", "Class", "question", "https://reactjs.org/docs/state-and-lifecycle.html", "Component Type: Class"));
    // Level 3
    current = current.children[0];
    current.children.push(new TreeNode("Is a render expected to take place?", "Yes", "question", "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper", "Component mutates state"));
    current.children.push(new TreeNode("Is a render expected to take place?", "No", "question", "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper", "Component does not mutates state"));
    // Level 4
    // let current2 = current.children[1];
    current = current.children[0];
    current.children.push(new TreeNode("Since you are mutating the state, and you expect a render to take place, please check the location of the state update for any potential bugs in the implementation", "Yes", "hypothesis", "https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper", "Render call expected"));
    current.children.push(new TreeNode("Since you are mutating the state and you do not expect a render to take place, consider removing the state update call to resolve the bug", "No", "hypothesis", "https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper", "Render call not expected"));
    // print JSON representation of the tree
    console.log(JSON.stringify(root));
    return root;
}
exports.generateExampleTree = generateExampleTree;
;
generateExampleTree();
