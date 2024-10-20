import { scanAssignment } from "../scanner/python/assignment";
import { scanFunction } from "../scanner/python/function";
import { scanDecoratedFunction } from "../scanner/python/decorated";
import { scanImport } from "../scanner/python/import";
import { scanImportFrom } from "../scanner/python/import";
import { scanClass } from "../scanner/python/class";
import { Component, Node} from '../scanner/node'

export function Lookup(node:any) {
    


        const root_component = new Component("module", "file.py", 0, 0, 0, null);
        const root = new Node(root_component);
        
      
        for (let child of node.children) {

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
          } else if (child.type === "decorated_definition") {
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
        }

        return root
    }