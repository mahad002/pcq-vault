import { scanAssignment } from "./assignment";
import { get_if_condition } from "./conditional";


export function scan_with_statement(node: any): any {

  const fun_calls = [];
  const block_variables = [];
  const nested_if_statements_in_with = [];

  const nodeType = node.type;
  const start_point = node.startPosition;
  const end_point = node.endPosition;
  

/*
  for (const child of node.childForFieldName('except_clause').children) {
    console.log("Child.type: ", child.type)
  }
*/
  for (const child of node.children) {
    if (child.type === 'with_clause') {
      for (const subchild of child.children) {
        if (subchild.type === 'with_item') {
          for (const ssubchild of subchild.children) {
            if (ssubchild.type === 'call') {
              fun_calls.push([{
                name: ssubchild.text,
                "startpoint": ssubchild.startPosition,
                "endpoint": ssubchild.endPosition
                }]);
            }
          }
        }
      }
    }
  }
/*
  for (const child of node.childForFieldName('with').children) {
    if (child.type === "call") {
        fun_calls.push([{
        name: child.text,
        "startpoint": child.startPosition,
        "endpoint": child.endPosition
        }]);
    }
  }
  */

  for (const child of node.childForFieldName('body').children) {
    if (child.type === 'expression_statement') {
      for (const subchild of child.children) {
        if (subchild.type === 'call') {
          fun_calls.push([{
            name: subchild.text,
            "startpoint": subchild.startPosition,
            "endpoint": subchild.endPosition
          }]);
        }

        else if (subchild.type === 'assignment') {
          const [vars, fcalls] = scanAssignment(subchild);
          block_variables.push(vars);
          fun_calls.push(fcalls);
        }
      }
    }

    else if (child.type === 'call') {
      fun_calls.push([{
        name: child.text,
        "startpoint": child.startPosition,
        "endpoint": child.endPosition
      }]);
    }

    else if (child.type === 'if_statement') {
      //console.log("INSIDE WHILE IF")
      const [
          nested_statement_type,
          statement_startpoint,
          statement_endpoint,
          statement_conditions,
          nested_func_calls,
          nested_variables    
      ] = get_if_condition(child);

      nested_if_statements_in_with.push([{
          name: nested_statement_type,
          start_point: statement_startpoint,
          end_point: statement_endpoint,
          conditions: statement_conditions,
          calls: nested_func_calls,
          variables: nested_variables
      }]);
    }
  }



  return [
    nodeType,
    start_point,
    end_point,
    fun_calls,
    block_variables,
    nested_if_statements_in_with
  ]

}

