class TreeNode {
    children: TreeNode[]; 
    question: string; // Question that leads to other nodes
    thisAnswer: string; // The answer to the previous question that lead to this node
    nodeType: string; // hypothesis or question
    infoLink: string; // Link to information about the questions or answers
    infoDesc: string; // Text description of information gathered at that node

    constructor(q: string, a: string, qorh: string, link: string, i: string) {
        this.children = [];
        this.question = q;
        this.thisAnswer = a;
        this.nodeType = qorh;
        this.infoLink = link;
        this.infoDesc = i;
    }

    //  returns the next node in the graph, when answer is selected
    branch(answer: string) {
        return this.children.forEach(child => {
            if(answer === child.thisAnswer) {
                return child;
            }
        });
    }
}

export function generateExampleTree() : TreeNode {
    // Level 0
    let root = new TreeNode(
        "What framework or technology is being used here?", 
        null, 
        "question", 
        "https://en.wikipedia.org/wiki/Web_framework",
        null
    );

    // Level 1
    root.children.push(new TreeNode(
        "Is the bug in a function component or a class component?",
        "React",
        "question",
        "https://reactjs.org/docs/components-and-props.html#function-and-class-components",
        "Framework used: React"
    ));
    root.children.push(new TreeNode(
        "This is not supported yet",
        "Angular",
        "question",
        null,
        "Framework used: Angular"
    ))
    root.children.push(new TreeNode(
        "This is not supported yet",
        "Vue.js",
        "question",
        null,
        "Framework used: Vue.js"
    ))
    root.children.push(new TreeNode(
        "This is not supported yet",
        "Gatsby.js",
        "question",
        null,
        "Framework used: Gatsby.js"
    ))

    // Level 2
    let current = root.children[0];
    current.children.push(new TreeNode(
        "Is this component mutating the state?", 
        "Function",
        "question",
        "https://reactjs.org/docs/state-and-lifecycle.html",
        "Component Type: Function"
    ));
    current.children.push(new TreeNode(
        "Is this component mutating the state?", 
        "Class",
        "question",
        "https://reactjs.org/docs/state-and-lifecycle.html",
        "Component Type: Class"
    ));

    // Level 3
    current = current.children[0];
    current.children.push(new TreeNode(
        "Is a render expected to take place?",
        "Yes",
        "question",
        "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper",
        "Component mutates state"
    ))
    current.children.push(new TreeNode(
        "Is a render expected to take place?",
        "No",
        "question",
        "https://reactjs.org/docs/conditional-rendering.html#gatsby-focus-wrapper",
        "Component does not mutates state"
    ))
    
    // Level 4
    // let current2 = current.children[1];
    current = current.children[0];
    current.children.push(new TreeNode(
        "Since you are mutating the state, and you expect a render to take place, please check the location of the state update for any potential bugs in the implementation",
        "Yes",
        "hypothesis",
        "https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper",
        "Render call expected"
    ))
    current.children.push(new TreeNode(
        "Since you are mutating the state and you do not expect a render to take place, consider removing the state update call to resolve the bug",
        "No",
        "hypothesis",
        "https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper",
        "Render call not expected"
    ))

    // print JSON representation of the tree
    console.log(JSON.stringify(root));
    return root;
};

generateExampleTree();