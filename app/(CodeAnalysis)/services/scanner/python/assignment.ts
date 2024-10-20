export function value(node:any, fcalls:any):any {
  
  // Check the type of the right-hand side of the assignment
  if (node.childForFieldName("right").type === "call") {
    // Add the call to the list of function calls
    fcalls.push({
      name: node.childForFieldName("right").text,
      "startpoint": node.childForFieldName("right").startPosition,
      "endpoint": node.childForFieldName("right").endPosition,
    });

    return {
      name: node.childForFieldName("right").text,
      type: "call",
      "startpoint": node.childForFieldName("right").startPosition,
      "endpoint": node.childForFieldName("right").endPosition,
    };
  } 

  else {
    // Return the value as it is
    return {
      name: node.childForFieldName("right").text,
      type: "value",
      "startpoint": node.childForFieldName("right").startPosition,
      "endpoint": node.childForFieldName("right").endPosition,
    };
  }
}

export function scanAssignment(node:any) {
  const vars:any = [];
  const fcalls: never[] = [];

  // vars['name']=node.childForFieldName("left").text
  // vars['startpoint']=node.childForFieldName("left").startPosition
  // vars['endpoint']=node.childForFieldName("left").endPosition
  vars.push({
    name: node.childForFieldName("left").text,
    "startpoint": node.childForFieldName("left").startPosition,
    "endpoint": node.childForFieldName("left").endPosition,
    // Scan the value of the variable
    value: value(node, fcalls),
  });
  return [vars, fcalls];
}
