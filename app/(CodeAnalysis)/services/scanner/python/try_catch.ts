import { scanAssignment } from "./assignment";
import { get_if_condition } from "./conditional";


export function scan_try_catch_blocks(node: any): any {

  const fun_calls = [];
  const block_variables = [];

  const nodeType = node.type;
  const start_point = node.startPosition;
  const end_point = node.endPosition;
  const nested_if_statements_in_try = [];

/*
  for (const child of node.childForFieldName('except_clause').children) {
    console.log("Child.type: ", child.type)
  }
*/

  for (const child of node.children) {
    console.log("Children type-------> ", child.type)
    
    if (child.type === 'except_clause') {
      console.log('PRINTING INSIDE EXCEPT_CLAUSE');
      for (const schild of child.children) {
        if (schild.type == 'block') {
          for (const subchild of schild.children) {
            console.log("HERE :) ", subchild.type);
            if (subchild.type === 'expression_statement') {
              for (const ssubchild of subchild.children) {
                if (ssubchild.type === 'call') {
                  fun_calls.push([{
                    name: ssubchild.text,
                    "startpoint": ssubchild.startPosition,
                    "endpoint": ssubchild.endPosition
                  }]);
                }

                if (ssubchild.type === 'assignment') {
                  const [vars, fcalls] = scanAssignment(ssubchild);
                  block_variables.push(vars);
                  fun_calls.push(fcalls);
                }
              }
            }

            if (subchild.type == 'if_statement') {
                //console.log("INSIDE WHILE IF")
                const [
                    nested_statement_type,
                    statement_startpoint,
                    statement_endpoint,
                    statement_conditions,
                    nested_func_calls,
                    nested_variables    
                ] = get_if_condition(subchild);

                nested_if_statements_in_try.push([{
                    name: nested_statement_type,
                    start_point: statement_startpoint,
                    end_point: statement_endpoint,
                    conditions: statement_conditions,
                    calls: nested_func_calls,
                    variables: nested_variables
                }]);

                console.log("nested_statement_type -> ", nested_statement_type)
                console.log("statement_startpoint", statement_startpoint);
                console.log('statement_endpoint', statement_endpoint);
                console.log("statement_conditions ",statement_conditions)
                console.log("nested_calls", nested_func_calls);
                console.log("nested_variables", nested_variables);
            }
          }
        }
      } 
    }

    else if (child.type === 'finally_clause') {
      console.log('PRINTING INSIDE EXCEPT_CLAUSE');
      for (const schild of child.children) {
        if (schild.type == 'block') {
          for (const subchild of schild.children) {
            console.log("HERE :) ", subchild.type)
            if (subchild.type === 'expression_statement') {
              for (const ssubchild of subchild.children) {
                if (ssubchild.type === 'call') {
                  fun_calls.push([{
                    name: ssubchild.text,
                    "startpoint": ssubchild.startPosition,
                    "endpoint": ssubchild.endPosition
                  }]);
                }

                if (ssubchild.type === 'assignment') {
                  const [vars, fcalls] = scanAssignment(ssubchild);
                  block_variables.push(vars);
                  fun_calls.push(fcalls);
                }
              }
            }

            if (subchild.type == 'if_statement') {
                //console.log("INSIDE WHILE IF")
                const [
                    nested_statement_type,
                    statement_startpoint,
                    statement_endpoint,
                    statement_conditions,
                    nested_func_calls,
                    nested_variables    
                ] = get_if_condition(subchild);

                nested_if_statements_in_try.push([{
                    name: nested_statement_type,
                    start_point: statement_startpoint,
                    end_point: statement_endpoint,
                    conditions: statement_conditions,
                    calls: nested_func_calls,
                    variables: nested_variables
                }]);

                console.log("nested_statement_type -> ", nested_statement_type)
                console.log("statement_startpoint", statement_startpoint);
                console.log('statement_endpoint', statement_endpoint);
                console.log("statement_conditions ",statement_conditions)
                console.log("nested_calls", nested_func_calls);
                console.log("nested_variables", nested_variables);
            }
          }
        }
      }       
    }
  }

  // scanning the body for the try statement

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

          if (subchild.type === 'assignment') {
            const [vars, fcalls] = scanAssignment(subchild);
            block_variables.push(vars);
            fun_calls.push(fcalls);
          }
        }
    }

    if (child.type == 'if_statement') {
        //console.log("INSIDE WHILE IF")
        const [
            nested_statement_type,
            statement_startpoint,
            statement_endpoint,
            statement_conditions,
            nested_func_calls,
            nested_variables    
        ] = get_if_condition(child);

        nested_if_statements_in_try.push([{
            name: nested_statement_type,
            start_point: statement_startpoint,
            end_point: statement_endpoint,
            conditions: statement_conditions,
            calls: nested_func_calls,
            variables: nested_variables
        }]);

        console.log("nested_statement_type -> ", nested_statement_type)
        console.log("statement_startpoint", statement_startpoint);
        console.log('statement_endpoint', statement_endpoint);
        console.log("statement_conditions ",statement_conditions)
        console.log("nested_calls", nested_func_calls);
        console.log("nested_variables", nested_variables);
    }
  }

  return [
    nodeType,
    start_point,
    end_point,
    fun_calls,
    block_variables,
    nested_if_statements_in_try
  ]

}

