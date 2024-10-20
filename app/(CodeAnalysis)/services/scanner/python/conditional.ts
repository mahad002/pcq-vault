import { scanClass } from "./class";
import { scanDecoratedFunction } from "./decorated";
import { scanAssignment } from "./assignment";
//import { scanFunction } from "./function";    Possible case if there is a function defenition inside the if-else blocks


export function get_if_condition(node: any): any {
  const conditionType = node.type;
  const start_point=node.startPosition
  const end_point=node.endPosition

  //console.log("conditionNode: ", conditionType)

  //Get details inside the if-block

  const conditions: any = [];
  const block_variables = [];
  const fun_calls = [];
  //const block_functions = [];
  //const block_calls = [];
  //const block_returns = [];

  const values: Record<string, any> = {};

  //testing code


///////////////////////////



  if (node.children) {
    console.log("STARTING HERE");

    for (const child of node.children) {
      if (child.type === 'comparison_operator') {
        conditions.push([{
          name: child.text,
          "startpoint": child.startPosition,
          "endpoint": child.endPosition
        }]);
      }
    }

    /*
    for (const child of node.childForFieldName('consequence').children) {
      //console.log("inside consequence--------")
      //console.log("child of node -> ", child)

      //console.log("type of childs -> ", typeof child.type);

      if (child.type === "if_statement") {
        //console.log("INSIDE IF_STATEMENT");
        values["if"] = get_if_condition(child);
      }

      else if (child.type === 'expression_statement') {
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
    } */

    // Adding condition for elif and else blocks
    if (node.childForFieldName('alternative')) {

      for (const child of node.childForFieldName('alternative').children) {
        
        //console.log("checking type of alternative block --- > ", child.type)
        console.log("INSIDE nested if")

        if (child.type === 'comparison_operator') {
          conditions.push([{
            name: child.text,
            "startpoint": child.startPosition,
            "endpoint": child.endPosition
          }]);
        }


        else if (child.type === 'block') {
          for (const subchild of child.children) {
            if (subchild.type === "if_statement") {
              //console.log("INSIDE IF_STATEMENT");
              values["if"] = get_if_condition(child);
            }
      
            if (subchild.type === 'expression_statement') {
              for (const schild of subchild.children) {
                if (schild.type === 'call') {
                  fun_calls.push([{
                    name: schild.text,
                    "startpoint": schild.startPosition,
                    "endpoint": schild.endPosition
                  }]);
                }
      
                if (schild.type === 'assignment') {
                  const [vars, fcalls] = scanAssignment(schild);
                  block_variables.push(vars);
                  fun_calls.push(fcalls);
                }
              }
            }
          }
        }

        else if (child.type == 'body') {
          for (const subchild of child.children) {
            if (subchild.type === "if_statement") {
              //console.log("INSIDE IF_STATEMENT");
              values["if"] = get_if_condition(child);
            }
      
            if (subchild.type === 'expression_statement') {
              for (const schild of subchild.children) {
                if (schild.type === 'call') {
                  fun_calls.push([{
                    name: schild.text,
                    "startpoint": schild.startPosition,
                    "endpoint": schild.endPosition
                  }]);
                }
      
                if (schild.type === 'assignment') {
                  const [vars, fcalls] = scanAssignment(schild);
                  block_variables.push(vars);
                  fun_calls.push(fcalls);
                }
              }
            }
          }
        }
        
      }
    }

  }

  //console.log("values['block'] -> ", values["block"]);

  //console.log("WHAT's IN conditions -> ", conditions)

  return [
    conditionType,
    //values["comparison"],
    //values["block"],
    start_point,
    end_point,
    conditions,
    //conditions["value"],
    //conditions["startpoint"],
    //conditions["endpoint"],
    fun_calls,
    //values["startpoint"],
    //values["endpoint"],
    //values["start"],
    //values["end"],
    block_variables
  ]
}

/*
  export function detectConditionsInIfElse(node: any) {
    let conditions:any = [];
    if (node.type === 'if_statement' || node.type === 'while_statement') {
      //let abc = "Print this statement"
      //console.log(abc)
      const conditionNode = node.childForFieldName('condition');
      const start_point = node.startPosition
      const end_point = node.endPosition
      const blockNode = node.childForFieldName('consequence');

      console.log("condition node type: ",typeof conditionNode)
      if (conditionNode === "condition") {
        console.log("here")
        for (const subchild of conditionNode.children) {
          console.log("subchild: ", subchild)
          if (subchild.type === "identifier") {
            conditions.push(subchild.text);
          }
          else {console.log("nothing to push")}
        }
      }

      

// Main function to convert the Python-like AST to TypeScript-like AST
export function get_node_values(node: any): Record<string, any> {
  const node_values: Record<string, any> = {};
  const values: Record<string, any> = {};

  const block_value = []
  let elif_count = 0;

  if (node.children) {
    for (const child of node.children) {

      //console.log("HERE 1")

      if (child.type === "if") {
        values["type"] = "if";
        values["startpoint"] = child.startPosition;
      } else if (child.type === "elif") {
        values["type"] = "elif";
        values["startpoint"] = child.startPosition;
      } else if (child.type === "else") {
        values["type"] = "else";
        values["startpoint"] = child.startPosition;
      }

      if (child.type === "comparison_operator") {
        values["comparison"] = child.text;
      }
      if (child.type === "block") {
        values["block"] = child.text;
        values["endpoint"] = child.endPosition;
      }
      if (child.type === "elif_clause") {
        const elif_value = get_node_values(child);
        values["elif_" + elif_count] = elif_value;
        elif_count++;
      }
      if (child.type === "else_clause") {
        const else_value = get_node_values(child);
        values["else"] = else_value;
      }

      if (child.type === "class_definition") {
        values["class"] = scanClass(child);
      }
      if (child.type === "function_definition") {
        values["function"] = scanFunction(child);
      }
      if (child.type === "decorated_definition") {
        values["decorated_function"] = scanDecoratedFunction(
          child
        );
      }
      //if (child.type === "try_statement") {
      //  values["try_catch"] = try_catch_scanner.scan_try_catch(child);
      
      if (child.type === "return_statement") {
        values["return"] = child.text;
      }
      if (child.type === "expression_statement") {
        values["variable"] = scanAssignment(child);
      }
      if (child.type === "if_statement") {
        values["if"] = scan_conditions(child);
      }

      if (Object.keys(values).length > 0) {
        Object.assign(node_values, values);
      }
    }
  }

  console.log("node values -> ", node_values)
  console.log("--end--")

  console.log("Values---------> ", values)


  return [values["type"], 
          values["comparison"], 
          values["startpoint"],
          values["endpoint"], 
          values["block"] 
        ];
}

export function scan_conditions(node: any): any {
  return get_node_values(node)
}

/*
      //printing statements
      
      console.log("conditionNode:", conditionNode);
      console.log("start_point:", start_point);
      console.log("end_point:", end_point);
      console.log("blockNode: ", blockNode);
      console.log('conditions: ', conditions);

      //return conditions;




      if (conditionNode) {
        console.log(`Condition detected: ${conditionNode}`);
        conditions.push(conditionNode);
        console.log('conditions: ', conditions)
        console.log('conditionCode: ', conditionNode)
      }
    }
    const ifElseBlocks: string[] = [];

    if (node.type === 'if_statement') {
      const conditionNode = node.childForFieldName('condition');
      const blockNode = node.childForFieldName('consequence');

      if (conditionNode && blockNode) {
        const condition = pythonCode.substring(conditionNode.startIndex, conditionNode.endIndex);
        const block = pythonCode.substring(blockNode.startIndex, blockNode.endIndex);
        ifElseBlocks.push(`if ${condition}:\n${block}`);
      }

      const elseNode = node.childForFieldName('alternative');
      if (elseNode) {
        const elseBlockNode = elseNode.childForFieldName('consequence');
        if (elseBlockNode) {
          const elseBlock = pythonCode.substring(elseBlockNode.startIndex, elseBlockNode.endIndex);
          ifElseBlocks.push(`else:\n${elseBlock}`);
        }
      }
    }

    for (let i = 0; i < node.childCount; i++) {
      traverse(node.child(i));
    }
  }
  
    for (let i = 0; i < node.childCount; i++) {
      const childNode = node.child(i);
      detectConditionsInIfElse(childNode);
    }
    return conditions;
  }


  async function main() {
    await Parser.init();
    const pythonParser = new Parser();
    pythonParser.setLanguage(Python);
  
    const pythonCode = `
      x = 10
      if x > 5:
          print("x is greater than 5")
      else:
          print("x is less than or equal to 5")
    `;
  
    const rootNode = pythonParser.parse(pythonCode);
    const ifElseBlocks: string[] = [];
  
    function traverse(node: Parser.SyntaxNode) {
      if (node.type === 'if_statement') {
        const conditionNode = node.childForFieldName('condition');
        const blockNode = node.childForFieldName('consequence');
  
        if (conditionNode && blockNode) {
          const condition = pythonCode.substring(conditionNode.startIndex, conditionNode.endIndex);
          const block = pythonCode.substring(blockNode.startIndex, blockNode.endIndex);
          ifElseBlocks.push(`if ${condition}:\n${block}`);
        }
  
        const elseNode = node.childForFieldName('alternative');
        if (elseNode) {
          const elseBlockNode = elseNode.childForFieldName('consequence');
          if (elseBlockNode) {
            const elseBlock = pythonCode.substring(elseBlockNode.startIndex, elseBlockNode.endIndex);
            ifElseBlocks.push(`else:\n${elseBlock}`);
          }
        }
      }
  
      for (let i = 0; i < node.childCount; i++) {
        traverse(node.child(i));
      }
    }
  
    if (rootNode) {
      traverse(rootNode);
      console.log(ifElseBlocks);
    }
  }
  
  main();
  

  // Example Python code to analyze
  //const pythonCode = 
  //x = 10
  //if x > 5:
  //    print("x is greater than 5")
  //elif x == 5:
  //    print("x is equal to 5")
  //else:
  //    print("x is less than 5")
  //`;

*/

