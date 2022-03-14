import React from 'react';
import Tree from 'react-d3-tree';

export default function OrgChartTree(props) {
    const {tree} = props;
    return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '500em', height: '200em' }}>
        <Tree data={tree}
            translate={{ x: 100, y: 300 }}
            leafNodeClassName="node__leaf"
            nodeSize={{ x: 250, y: 120 }}
        />
      </div>
    );
  }