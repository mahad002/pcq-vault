export function scanImport(node:any) {
  const module_name = node.text;
  const imported_names = [];

  if (node.childForFieldname("alias")) {
    imported_names.push({
      name: node.childForFieldName("alias").text,
      startPoint: node.startPosition,
      endPoint: node.endPosition,

    });
  } else {
    imported_names.push({
      name: module_name,
      startPoint: node.startPosition,
      endPoint: node.endPosition,
    });
  }

  return imported_names;
}

export function scanImportFrom(node:any) {
  const module_name = node.childForFieldName("module_name").text;
  const imported_names = [];
  //console.log("-----------module_name---------> ", module_name)

  for (const child of node.childForFieldName("names").children) {
    if (child.type === "aliased_import") {
      if (child.has_child_with_field_name("alias")) {
        imported_names.push(child.childForFieldName("alias").text);
      } else {
        imported_names.push(child.childForFieldName("name").text);
      }
    } else if (child.type === "wildcard_import") {
      imported_names.push(child.text);
    }
  }

  return [module_name, imported_names];
}


