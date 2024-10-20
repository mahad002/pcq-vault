import { input_list } from "../utils/keywords";
import { gradedict1 , GradeDict} from "../utils/grading";

export class Component {
    type: string;
    name: string;
    startPoint: number;
    endPoint: number;
    cryptoInterest: number;
    others: any;
    grade:any;
    algorithm:any;
  
    constructor(
      type: string,
      name: string,
      startPoint: number,
      endPoint: number,
      cryptoInterest: number,
      others: any
    ) {
      this.type = type;
      this.name = name;
      this.startPoint = startPoint;
      this.endPoint = endPoint;
      this.cryptoInterest = cryptoInterest;
      this.others = others;
    }
}
  
  
export class Node {
    data: Component;
    children: Node[];
    parent: Node | null;
    lowerCaseInputList:any;
    
  
    constructor(component: Component) {
      this.data = component;
      this.children = [];
      this.parent = null;
      this.lowerCaseInputList = input_list.map(keyword => keyword.toLowerCase()); // Convert input keywords to lowercase
    }
  
    add_child(obj: Node) {
      this.children.push(obj);
    }

    traverse(res:any,indent: string = '') {
      if (this.lowerCaseInputList.some((keyword:string) => this.data.name.toLowerCase().includes(keyword))) {
        this.data.cryptoInterest = 1;
        console.log(indent + this.data.type, this.data.name, this.data.startPoint, this.data.endPoint, this.data.cryptoInterest); // Print the current node with indentation
       
        const matchedKeywords = Object.keys(gradedict1).filter((key) => this.data.name.toLowerCase().includes(key));
        // gives us matched algorithms
        // matchedKeywords.forEach((matchedKey) => {
          const matchedKey = matchedKeywords[0];
          const keywordGrades = gradedict1[matchedKey];
      
          const matchedGrades = keywordGrades.filter((grade) => {
            const variantMatched = this.data.name.toLowerCase().includes(grade.Variant.toString());
            let modeMatched = false
            if (grade.Type==='SKE'){
            modeMatched = this.data.name.toLowerCase().includes(grade.Mode.toLowerCase());}
            else{
              modeMatched=true
            }
            return variantMatched && modeMatched;
          });
          
          // Process the matched grades accordingly
          if (matchedGrades.length > 0) {
            this.data.grade = matchedGrades
            this.data.algorithm = matchedKeywords[0]
          }
        res[this.data.name]={
          grade:JSON.stringify(this.data.grade),
          algorithm:this.data.algorithm,
          startpoint:this.data.startPoint,
          endpoint:this.data.endPoint}
        // this.response[this.data.algorithm].append((this.data))
        console.log(matchedKeywords[0],this.data.grade)

      }
      if (this.data.type==='variable' && this.data.others["value"]["type"]==='value'  && this.lowerCaseInputList.some((keyword: string) => this.data.others['value']['name'].toLowerCase().includes(keyword))) {
        this.data.cryptoInterest = 1;
        console.log(this.data.type, this.data.name, this.data.others,this.data.startPoint, this.data.endPoint, this.data.cryptoInterest); // Print the current node
        const matchedKeywords = Object.keys(gradedict1).filter((key) => this.data.others['value']['name'].toLowerCase().includes(key));
        // gives us matched algorithms
        // matchedKeywords.forEach((matchedKey) => {
          const matchedKey = matchedKeywords[0];
          const keywordGrades = gradedict1[matchedKey];
      
          const matchedGrades = keywordGrades.filter((grade) => {
            const variantMatched = this.data.others['value']['name'].toLowerCase().includes(grade.Variant.toString());
            let modeMatched = false
            if (grade.Type==='SKE'){
            modeMatched = this.data.others['value']['name'].toLowerCase().includes(grade.Mode.toLowerCase());}
            else{
              modeMatched=true
            }
          
            return variantMatched && modeMatched;
          });
          
          // Process the matched grades accordingly
          if (matchedGrades.length > 0) {
            this.data.grade = matchedGrades
            this.data.algorithm = matchedKeywords[0]
          }
        
        // this.response[this.data.algorithm].append((this.data))
        // gradelist =
        res[this.data.name]={
          grade:JSON.stringify(this.data.grade),
          algorithm:this.data.algorithm,
          startpoint:this.data.startPoint,
          endpoint:this.data.endPoint}
        console.log(matchedKeywords[0],this.data.grade)

      }
      for (const child of this.children) {
        child.traverse(res,indent + '       '); // Recursively traverse each child with increased indentation
      }
      return res
    }

    // testtraverse1(res:any) {
    //   if (this.lowerCaseInputList.some((keyword: string) => this.data.name.toLowerCase().includes(keyword))) {
    //     this.data.cryptoInterest = 1;
    //     console.log(this.data.type, this.data.name, this.data.startPoint, this.data.endPoint, this.data.cryptoInterest); // Print the current node
      
    //   }
      
    //   if (this.data.type==='variable' && this.data.others["value"]["type"]==='value'  && this.lowerCaseInputList.some((keyword: string) => this.data.others['value']['name'].toLowerCase().includes(keyword))) {
    //     this.data.cryptoInterest = 1;
    //     console.log(this.data.type, this.data.name, this.data.others,this.data.startPoint, this.data.endPoint, this.data.cryptoInterest); // Print the current node
      
    //   }
    //   for (const child of this.children) {
    //     child.testtraverse(res);
    //   }
    //   return res
      
    // }

  }
  