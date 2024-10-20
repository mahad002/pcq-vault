
import { scanAssignment } from "../scanner/python/assignment";
import { scanFunction } from "../scanner/python/function";
import { scanDecoratedFunction } from "../scanner/python/decorated";
import { scanImport } from "../scanner/python/import";
import { scanImportFrom } from "../scanner/python/import";
import { scanClass } from "../scanner/python/class";
import { Component, Node} from '../scanner/node'
import { get_if_condition } from "../scanner/python/conditional";
import { scan_while_loop } from "../scanner/python/loops";
import { scan_for_loop } from "../scanner/python/loops";
import { scan_try_catch_blocks } from "../scanner/python/try_catch";
import { scan_with_statement } from "../scanner/python/with_statement";


export function Lookup(node:any) {
    
        const root_component = new Component("module", "file.py", 0, 0, 0, null);
        const root = new Node(root_component);
        
      
        for (let child of node.children) {

          //console.log("\n---------------childs------------- >", child.type)

          if (child.type === "expression_statement") {

            for (let subchild of child.children) {

                if (subchild.type === "assignment") {
                    let [v, f] = scanAssignment(subchild);
                    for (let variable of v) {
                    let component = new Component(
                        "variable",
                        variable["name"],
                        variable["startpoint"],
                        variable["endpoint"],
                        0,
                        { value: variable["value"] }
                      );
                    let newNode = new Node(component);
                    newNode.parent = root;
                    root.add_child(newNode);
                    }
                    for (let call of f) {
                    let  component = new Component(
                        "call",
                        call["name"],
                        call["startpoint"],
                        call["endpoint"],
                        0,
                        null
                    );
                    let newNode = new Node(component);
                    newNode.parent = root;
                    root.add_child(newNode);
                    }
                }
            }
          } 
          
          else if (
            child.type === "import_statement" ||
            child.type === "import_from_statement"
          ) {
            let component = new Component(
              "package",
              child.text,
              child.startPosition,
              child.endPosition,
              0,
              null
            );
            let newNode = new Node(component);
            newNode.parent = root;
            root.add_child(newNode);
          } 
          
          else if (child.type === "class_definition") {
            let [
              class_name,
              functions_in_class,
              variables_in_class,
              calls_in_class,
            ] = scanClass(child);
      
            let component = new Component(
              "class",
              String(class_name),
              child.startPosition,
              child.endPosition,
              0,
              null
            );
            let classnode = new Node(component);
            classnode.parent = root;
            root.add_child(classnode);
      
            for (let variable of variables_in_class) {

            
              let component = new Component(
                "variable",
                variable[0].name,
                variable[0].startpoint,
                variable[0].endpoint,
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = classnode;
              classnode.add_child(newNode);
            }
      
            for (let call of calls_in_class) {
             
             if (call.length!=0){
              component = new Component(
                "call",
                call[0]["name"],
                call[0]["startpoint"],
                call[0]["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = classnode;
              classnode.add_child(newNode);
              }
            }
      
            for (let func of functions_in_class) {
              let funcnode = null
                
              if (func["static"]) {
                component = new Component(
                  "FuncDef",
                  func["name"],
                  func["name"].startPosition,
                  func["name"].endPosition,
                  0,
                  { args: func["args"] }
                );
                funcnode = new Node(component);
                funcnode.parent = classnode;
                classnode.add_child(funcnode);
              } else {
                component = new Component(
                  "FuncDef",
                  func["name"],
                  func["start-point"],
                  func["end-point"],
                  0,
                  { args: func["args"] }
                );
                funcnode = new Node(component);
                funcnode.parent = classnode;
                classnode.add_child(funcnode);
              }
      
              for (let variable of func["variables"]) {
                let component = new Component(
                  "variable",
                  variable[0]["name"],
                  variable[0]["startpoint"],
                  variable[0]["endpoint"],
                  0,
                  { value: variable[0]["value"] }
                );
                let newNode = new Node(component);
                newNode.parent = funcnode;
                funcnode.add_child(newNode);
              }
      
              for (let call of func["calls"]) {
                // console.log("bug4",call)
                if (call.length!=0){
                component = new Component(
                  "call",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = funcnode;
                funcnode.add_child(newNode);
                }
              }
      
              for (let ret of func["returns"]) {
                component = new Component(
                  "returns",
                  ret["name"],
                  ret["startpoint"],
                  ret["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = funcnode;
                funcnode.add_child(newNode);
              }
            }
          } 
          
          else if (child.type === "function_definition") {


    // function_name,
      // function_args,
      // variables_in_function,
      // calls_in_function,
      // returns_in_function,
      // nested_functions_in_function,
      // nested_classes_in_function,
      // start_point,
      // end_point
            let [
              function_name,
              function_args,
              variables,
              calls,
              returns,
              nested_functions_in_function,
              nested_classes_in_function,
              start_point,
              end_point,
            ] = scanFunction(child);
      
            let component = new Component(
              "FuncDef",
              function_name,
              start_point,
              end_point,
              0,
              { args: function_args }
            );
            let funcnode = new Node(component);
            funcnode.parent = root;
            root.add_child(funcnode);
      
            for (let variable of variables) {
              // console.log("bug5",variable)
              if (variable.length!=0){
              component = new Component(
                "variable",
                variable[0]["name"],
                variable[0]["startpoint"],
                variable[0]["endpoint"],
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = funcnode;
              funcnode.add_child(newNode);
              }
            }
      
            for (let call of calls) {
              if (call.length!=0){
              component = new Component(
                "call",
                call[0]["name"],
                call[0]["startpoint"],
                call[0]["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = funcnode;
              funcnode.add_child(newNode);}
            }
      
            for (let ret of returns) {
              component = new Component(
                "returns",
                ret["name"],
                ret["startpoint"],
                ret["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = funcnode;
              funcnode.add_child(newNode);
            }
            
            for (let func of nested_functions_in_function) {
              for (let fun of func) {
                component = new Component(
                  "nested_functions",
                  func[0]["name"],
                  func[0]["startpoint"],
                  func[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = funcnode;
                funcnode.add_child(newNode);
              }
            } 
          } 

          else if (child.type === "decorated_definition") {
            let [
              function_name,
              function_args,
              variables,
              calls,
              returns,
              nested_functions_in_function,
              nested_classes_in_function,
              start_point,
              end_point,
            ] = scanDecoratedFunction(child);
      
            let component = new Component(
              "FuncDef",
              function_name,
              start_point,
              end_point,
              0,
              { args: function_args }
            );
            let funcnode = new Node(component);
            funcnode.parent = root;
            root.add_child(funcnode);
      
            for (let variable of variables) {
              component = new Component(
                "variable",
                variable[0]["name"],
                variable[0]["startpoint"],
                variable[0]["endpoint"],
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = funcnode;
              funcnode.add_child(newNode);
            }
      
            for (let call of calls) {
              // console.log("bug5",call)
              if (call.length!=0){
              component = new Component(
                "call",
                call[0]["name"],
                call[0]["startpoint"],
                call[0]["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = funcnode;
              funcnode.add_child(newNode);
            }}
      
            for (let ret of returns) {
              component = new Component(
                "returns",
                ret["name"],
                ret["startpoint"],
                ret["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = funcnode;
              funcnode.add_child(newNode);
            }
          }


          //added for testing
          else if(child.type == 'if_statement') {
            let [type, start_point, end_point, conditions, calls, variables] = get_if_condition(child)
            
            let component = new Component(
              "if_statement",
              type,
              start_point,
              end_point,
              0,
              null    //the others section for if_statement can contain additional information if required. Like the block of the statement in string format.
            );
                
            let if_node = new Node(component);
            if_node.parent = root;
            root.add_child(if_node);

            for (let condition of conditions) {

              //console.log("checking values here ----> ", condition["startpoint"])

              let component1 = new Component(
                "conditions",
                //conditions,
                condition[0]["name"],
                condition[0]["startpoint"],
                condition[0]["endpoint"],
                //start,
                //end,
                0,
                null
              );

              let newNode = new Node(component1);
              newNode.parent = if_node;
              if_node.add_child(newNode);
            }

            for (let call of calls) {
              if (call.length!=0){
                let component = new Component(
                  "call",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = if_node;
                if_node.add_child(newNode);
              }
            }

            for (let variable of variables) {
              // console.log("bug5",variable)
              if (variable.length!=0){
              component = new Component(
                "variable",
                variable[0]["name"],
                variable[0]["startpoint"],
                variable[0]["endpoint"],
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = if_node;
              if_node.add_child(newNode);
              }
            }
          
          }

          else if (child.type === 'while_statement') {
            console.log("INSIDE THE WHILE LOOP")
            let [type, start_point, end_point, conditions, calls, variables, nested_if_statements] = scan_while_loop(child);
            
            let component = new Component(
              "while_statement",
              type,
              start_point,
              end_point,
              0,
              null    //the others section for if_statement can contain additional information if required. Like the block of the statement in string format.
            );
                
            let while_node = new Node(component);
            while_node.parent = root;
            root.add_child(while_node);


            for (let condition of conditions) {

              //console.log("checking values here ----> ", condition["startpoint"])

              let component1 = new Component(
                "conditions",
                //conditions,
                condition[0]["name"],
                condition[0]["startpoint"],
                condition[0]["endpoint"],
                //start,
                //end,
                0,
                null
              );

              let newNode = new Node(component1);
              newNode.parent = while_node;
              while_node.add_child(newNode);
            }

            for (let call of calls) {
              if (call.length!=0){
                let component = new Component(
                  "call",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = while_node;
                while_node.add_child(newNode);
              }
            }

            for (let variable of variables) {
              // console.log("bug5",variable)
              if (variable.length!=0){
              component = new Component(
                "variable",
                variable[0]["name"],
                variable[0]["startpoint"],
                variable[0]["endpoint"],
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = while_node;
              while_node.add_child(newNode);
              }
            }

            /* Extracting nested statements */
            

            for (let nested_if of nested_if_statements) {
             
              component = new Component(
                "nested_if_statement",
                nested_if[0]["name"],
                nested_if[0]["start_point"],
                nested_if[0]["end_point"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = while_node;
              while_node.add_child(newNode);
            }

            

            for (let nested_call of nested_if_statements) {
              calls = nested_call[0]["calls"]

              for (let call of calls) {
                console.log("NAMES OF CALLS: ", call[0]["startpoint"]);
                component = new Component(
                  "nested_calls",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = while_node;
                while_node.add_child(newNode);
              }
            }

          }

          else if (child.type == 'for_statement') {
            let [type, start_point, end_point, calls, variables, nested_if_statements] = scan_for_loop(child);
            
            let component = new Component(
              "for_statement",
              type,
              start_point,
              end_point,
              0,
              null    //the others section for if_statement can contain additional information if required. Like the block of the statement in string format.
            );
                
            let for_node = new Node(component);
            for_node.parent = root;
            root.add_child(for_node);


            for (let call of calls) {
              if (call.length!=0){
                let component = new Component(
                  "call",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = for_node;
                for_node.add_child(newNode);
              }
            }

            for (let variable of variables) {
              // console.log("bug5",variable)
              if (variable.length!=0){
              component = new Component(
                "variable",
                variable[0]["name"],
                variable[0]["startpoint"],
                variable[0]["endpoint"],
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = for_node;
              for_node.add_child(newNode);
              }
            }

            /* Extracting components of nested if statements */
            

            for (let nested_if of nested_if_statements) {
             
              component = new Component(
                "nested_if_statement",
                nested_if[0]["name"],
                nested_if[0]["start_point"],
                nested_if[0]["end_point"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = for_node;
              for_node.add_child(newNode);
            }

            

            for (let nested_call of nested_if_statements) {
              const calls = nested_call[0]["calls"]

              for (let call of calls) {
                //console.log("NAMES OF CALLS: ", call[0]["startpoint"]);
                component = new Component(
                  "nested_calls",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = for_node;
                for_node.add_child(newNode);
              }
            }

            for (let condition of nested_if_statements) {
              const conditions = condition[0]["conditions"];

              for (let cond of conditions) {
                component = new Component(
                  "nested_conditions",
                  cond[0]["name"],
                  cond[0]["startpoint"],
                  cond[0]["endpoint"],
                  0,
                  null
                );

                let newNode = new Node(component);
                newNode.parent = for_node;
                for_node.add_child(newNode);
              }
            }

          }
          
          else if (child.type == 'try_statement') {
            console.log("INSIDE THE TRY_STATEMENT")
            let [type, start_point, end_point, calls, variables, nested_if_statements] = scan_try_catch_blocks(child);
            
            let component = new Component(
              "try_statement",
              type,
              start_point,
              end_point,
              0,
              null    //the others section for if_statement can contain additional information if required. Like the block of the statement in string format.
            );
                
            let try_node = new Node(component);
            try_node.parent = root;
            root.add_child(try_node);


            for (let call of calls) {
              if (call.length!=0){
                let component = new Component(
                  "call",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = try_node;
                try_node.add_child(newNode);
              }
            }

            for (let variable of variables) {
              // console.log("bug5",variable)
              if (variable.length!=0){
              component = new Component(
                "variable",
                variable[0]["name"],
                variable[0]["startpoint"],
                variable[0]["endpoint"],
                0,
                { value: variable[0]["value"] }
              );
              let newNode = new Node(component);
              newNode.parent = try_node;
              try_node.add_child(newNode);
              }
            }

            /* Extracting components of nested if statements */
            

            for (let nested_if of nested_if_statements) {
             
              component = new Component(
                "nested_if_statement",
                nested_if[0]["name"],
                nested_if[0]["start_point"],
                nested_if[0]["end_point"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = try_node;
              try_node.add_child(newNode);
            }

            

            for (let nested_call of nested_if_statements) {
              const calls = nested_call[0]["calls"]

              for (let call of calls) {
                //console.log("NAMES OF CALLS: ", call[0]["startpoint"]);
                component = new Component(
                  "nested_calls",
                  call[0]["name"],
                  call[0]["startpoint"],
                  call[0]["endpoint"],
                  0,
                  null
                );
                let newNode = new Node(component);
                newNode.parent = try_node;
                try_node.add_child(newNode);
              }
            }

            for (let condition of nested_if_statements) {
              const conditions = condition[0]["conditions"];

              for (let cond of conditions) {
                component = new Component(
                  "nested_conditions",
                  cond[0]["name"],
                  cond[0]["startpoint"],
                  cond[0]["endpoint"],
                  0,
                  null
                );

                let newNode = new Node(component);
                newNode.parent = try_node;
                try_node.add_child(newNode);
              }
            }

          
        }

        else if (child.type == 'with_statement') {
          console.log("INSIDE THE WITH_STATEMENT")
          let [type, start_point, end_point, calls, variables, nested_if_statements] = scan_with_statement(child);
          
          let component = new Component(
            "try_statement",
            type,
            start_point,
            end_point,
            0,
            null    //the others section for if_statement can contain additional information if required. Like the block of the statement in string format.
          );
              
          let try_node = new Node(component);
          try_node.parent = root;
          root.add_child(try_node);


          for (let call of calls) {
            if (call.length!=0){
              let component = new Component(
                "call",
                call[0]["name"],
                call[0]["startpoint"],
                call[0]["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = try_node;
              try_node.add_child(newNode);
            }
          }

          for (let variable of variables) {
            // console.log("bug5",variable)
            if (variable.length!=0){
            component = new Component(
              "variable",
              variable[0]["name"],
              variable[0]["startpoint"],
              variable[0]["endpoint"],
              0,
              { value: variable[0]["value"] }
            );
            let newNode = new Node(component);
            newNode.parent = try_node;
            try_node.add_child(newNode);
            }
          }

          /* Extracting components of nested if statements */
          

          for (let nested_if of nested_if_statements) {
           
            component = new Component(
              "nested_if_statement",
              nested_if[0]["name"],
              nested_if[0]["start_point"],
              nested_if[0]["end_point"],
              0,
              null
            );
            let newNode = new Node(component);
            newNode.parent = try_node;
            try_node.add_child(newNode);
          }

          

          for (let nested_call of nested_if_statements) {
            const calls = nested_call[0]["calls"]

            for (let call of calls) {
              //console.log("NAMES OF CALLS: ", call[0]["startpoint"]);
              component = new Component(
                "nested_calls",
                call[0]["name"],
                call[0]["startpoint"],
                call[0]["endpoint"],
                0,
                null
              );
              let newNode = new Node(component);
              newNode.parent = try_node;
              try_node.add_child(newNode);
            }
          }

          for (let condition of nested_if_statements) {
            const conditions = condition[0]["conditions"];

            for (let cond of conditions) {
              component = new Component(
                "nested_conditions",
                cond[0]["name"],
                cond[0]["startpoint"],
                cond[0]["endpoint"],
                0,
                null
              );

              let newNode = new Node(component);
              newNode.parent = try_node;
              try_node.add_child(newNode);
            }
          }

        
      }
      }

      return root
  }
