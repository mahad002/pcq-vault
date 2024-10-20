
import Parser from 'web-tree-sitter';


class ParserInstance {

    parser: any;
    language: any;

    constructor() {
        this.parser = null;
        this.language = null;
    }

    async init() {
        console.log("Initializing parser");
        await Parser.init({
            locateFile: (scriptName:'tree-sitter', scriptDirectory:any) => {  
                return scriptName;
            },
        });

        this.parser = new Parser();
        console.log("Parser initialized");

        try {
        this.language = await Parser.Language.load(
            '/tree-sitter-python.wasm'
        );
        this.parser.setLanguage(this.language);
        } catch (error) {
        console.error('Error loading language:', error);
        }
    }

    getParser() {
        return this.parser;
    }

    getLanguage() {
        return this.language;
    }
}

export default new ParserInstance();



  