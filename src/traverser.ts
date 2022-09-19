import { NodeTypes, ChildNode, RootNode, Visitor, ParentNode } from "./types";
export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 深度优先

  function traverserChilds(childNodes: ChildNode[], parentNode?: ParentNode) {
    childNodes.forEach((child) => {
      traverserChild(child, parentNode);
    });
  }

  function traverserChild(node: ChildNode | RootNode, parentNode?: ParentNode) {
    const visitorItem = visitor[node.type];
    visitorItem && visitorItem.enter(node, parentNode);
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        // console.log(node);
        break;
      case NodeTypes.StringLiteral:
        // console.log(node);
        break;
      case NodeTypes.CallExpression:
        traverserChilds(node.params, node);
        break;
      case NodeTypes.Program:
        traverserChilds(node.body, node);
        break;
    }
    visitorItem && visitorItem.exit && visitorItem.exit!(node, parentNode);
  }

  traverserChild(rootNode);
}
