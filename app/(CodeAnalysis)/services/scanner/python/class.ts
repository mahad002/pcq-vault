import { scanAssignment } from "./assignment";
import { scanFunction } from "./function"
import { scanDecoratedFunction } from "./decorated";

export function scanClass(node:any):any {
  const class_name = node.childForFieldName("name").text;
  const functions_in_class = [];
  const variables_in_class = [];
  const calls_in_class = [];
 
  for (const child of node.childForFieldName("body").children) {
    if (child.type === "function_definition") {
      const [
        function_name,
        function_args,
        variables,
        calls,
        returns,
        nested_functions,
        nested_classes,
        start_point,
        end_point
      ] = scanFunction(child);

      functions_in_class.push({
        name: function_name,
        args: function_args,
        variables: variables,
        calls: calls,
        returns: returns,
        nested_functions: nested_functions,
        nested_classes: nested_classes,
        static: false,
        start_point:start_point,
        end_point:end_point
      });
    } else if (child.type === "decorated_definition") {
      const [
        function_name,
        function_args,
        variables,
        calls,
        returns,
        nested_functions,
        nested_classes,
        start_point,
        end_point
        
      ] = scanDecoratedFunction(child);

      functions_in_class.push({
        name: function_name,
        args: function_args,
        variables: variables,
        calls: calls,
        returns: returns,
        nested_functions: nested_functions,
        nested_classes: nested_classes,
        static: true,
        start_point:start_point,
        end_point:end_point
        
      });
    } else if (child.type === "expression_statement") {
      for (const subchild of child.children) {
        if (subchild.type === "assignment") {
          const [vars, fcalls] = scanAssignment(subchild);
          variables_in_class.push(vars);
          calls_in_class.push(fcalls);
        }
      }
    } else if (child.type === "call") {
      calls_in_class.push({
        name: child.text,
        "start-point": child.startPosition,
        "end-point": child.endPosition,
      });
    } else if (child.type === "class_definition") {
      const [
        nested_class_name,
        functions,
        variables,
        calls,
      ] = scanClass(child);

      functions_in_class.push(functions);
      variables_in_class.push(variables);
      calls_in_class.push(calls);
      
    } 
  }

  return [
    class_name,
    functions_in_class,
    variables_in_class,
    calls_in_class,
  ];
}