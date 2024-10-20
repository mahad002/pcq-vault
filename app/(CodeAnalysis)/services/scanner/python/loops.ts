import { scanAssignment } from "./assignment";
import { get_if_condition } from "./conditional";

export function scan_while_loop(node: any): any {
    const conditionType = node.type;
    const start_point=node.startPosition
    const end_point=node.endPosition
  
    console.log("conditionNode: ", conditionType)
  
    //Get details inside the if-block
  
    const conditions: any = [];
    const block_variables = [];
    const fun_calls = [];
    const nested_if_statements_in_while = [];
    //const block_functions = [];
    //const block_calls = [];
    //const block_returns = [];
  
    const values: Record<string, any> = {};

    for (const child of node.children) {
        if (child.type == 'comparison_operator') {
            conditions.push([{
                name: child.text,
                "startpoint": child.startPosition,
                "endpoint": child.endPosition
              }]);
        }
    }

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

            nested_if_statements_in_while.push([{
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
        conditionType,
        start_point,
        end_point,
        conditions,
        fun_calls,
        block_variables,
        nested_if_statements_in_while
    ]
}

export function scan_for_loop(node: any) :any {
    const nodeType = node.type;
    const start_point=node.startPosition;
    const end_point=node.endPosition;
  
    console.log("conditionNode: ", nodeType);
  
    //Get details inside the if-block
  
    //const conditions: any = [];
    const block_variables = [];
    const fun_calls = [];
    const nested_if_statements_in_for = [];
    //const block_functions = [];
    //const block_calls = [];
    //const block_returns = [];
  
    //const values: Record<string, any> = {};


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

            nested_if_statements_in_for.push([{
                name: nested_statement_type,
                start_point: statement_startpoint,
                end_point: statement_endpoint,
                conditions: statement_conditions,
                calls: nested_func_calls,
                variables: nested_variables
            }]);

            console.log("nested_statement_type -> ", nested_statement_type);
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
        nested_if_statements_in_for
    ]
}
