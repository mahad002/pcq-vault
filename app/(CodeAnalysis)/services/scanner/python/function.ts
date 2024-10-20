import { scanAssignment } from "./assignment";
import { scanClass } from "./class";
import { scanDecoratedFunction } from "./decorated";


export function scanFunction(node:any) :any {

    // Get the name of the function
    const function_name = node.childForFieldName("name").text;
    const start_point=node.startPosition
    const end_point=node.endPosition

    // Get the input arguments of the function
    const function_args = [];

    for (const child of node.childForFieldName("parameters").children) {
      //console.log("-----------type---------> ", child)  
      if (child.type === "identifier") {
        function_args.push(child.text);
      }
    }

    // Initialize the lists of variables, calls, returns, nested functions and nested classes in the function
    const variables_in_function = [];
    const calls_in_function = [];
    const returns_in_function = [];
    const nested_functions_in_function = [];
    const nested_classes_in_function = [];
   
    // Scan the body of the function
    for (const child of node.childForFieldName("body").children) {
        
        if (child.type === "expression_statement") {
            for (const subchild of child.children) {
                if (subchild.type === "assignment") {
                    // Scan the assignment and add it to the list of variables
                    const [vars, fcalls] = scanAssignment(subchild);
                    variables_in_function.push(vars);
                    calls_in_function.push(fcalls);
                } else if (subchild.type === "call") {
                    // Add the call to the list of calls
                    calls_in_function.push([{
                    name: subchild.text,
                    "startpoint": subchild.startPosition,
                    "endpoint": subchild.endPosition,
                    }]);
                }
            }
        } else if (child.type === "return_statement") {
            // Add the return statement to the list of returns
            returns_in_function.push({
            name: child.text,
            "startpoint": child.startPosition,
            "endpoint": child.endPosition,
            });
        } else if (child.type === "function_definition") {
            // Scan the nested function and add it to the list of nested functions
            const [
            nested_function_name,
            nested_function_args,
            nested_variables,
            nested_calls,
            nested_returns,
            sub_nested_functions,
            sub_nested_classes,
            start_point,
            end_point
            
            ] = scanFunction(child);
            nested_functions_in_function.push({
            name: nested_function_name,
            args: nested_function_args,
            variables: nested_variables,
            calls: nested_calls,
            returns: nested_returns,
            nested_functions: sub_nested_functions,
            nested_classes: sub_nested_classes,
            static: false, // Non-static function by default
            start_point:start_point,
            end_point:end_point
            });
        } else if (child.type === "decorated_definition") {
            // Scan the nested decorated function and add it to the list of nested functions
            const [
            nested_function_name,
            nested_function_args,
            nested_variables,
            nested_calls,
            nested_returns,
            sub_nested_functions,
            sub_nested_classes,
            start_point,
            end_point
            
            ] = scanDecoratedFunction(child);
            nested_functions_in_function.push({
            name: nested_function_name,
            args: nested_function_args,
            variables: nested_variables,
            calls: nested_calls,
            returns: nested_returns,
            nested_functions: sub_nested_functions,
            nested_classes: sub_nested_classes,
            static: true, // Static function by default
            start_point:start_point,
            end_point:end_point
            
            });
        } else if (child.type === "class_definition") {
            // Scan the nested class and add it to the list of nested classes
            const {
            class_name,
            functions_in_class,
            variables_in_class,
            calls_in_class,
            } = scanClass(child);
            nested_classes_in_function.push({
            name: class_name,
            functions: functions_in_class,
            variables: variables_in_class,
            calls: calls_in_class,
            });
        } else if (child.type === "call") {
            // Add the call to the list of calls
            calls_in_function.push({
            name: child.text,
            "startpoint": child.startPosition,
            "endpoint": child.endPosition,
            });
        } 
        }

    console.log("---------------log---------------> ", function_name, function_args, variables_in_function, calls_in_function, returns_in_function)
  
    return [
      function_name,
      function_args,
      variables_in_function,
      calls_in_function,
      returns_in_function,
      nested_functions_in_function,
      nested_classes_in_function,
      start_point,
      end_point
    ];
  }
  

