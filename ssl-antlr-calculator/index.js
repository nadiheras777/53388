import MiniCLexer from "./generated/MiniCLexer.js";
import MiniCParser from "./generated/MiniCParser.js";
import CustomMiniCVisitor from "./CustomMiniCVisitor.js";
import antlr4, { CharStreams, CommonTokenStream, ParseTreeWalker } from "antlr4";
import readline from 'readline';
import fs from 'fs';

async function main() {
    let input;

    // Intento leer la entrada desde el archivo input - en forma sincrona.
    try {
        input = fs.readFileSync('input.txt', 'utf8');
    } catch (err) {
        // Si no es posible leer el archivo, solicitar la entrada del usuario por teclado
        input = await leerCadena(); // Simula lectura síncrona
        console.log(input);
    }

    // Proceso la entrada con el analizador e imprimo el arbol de analisis en formato texto
    let inputStream = CharStreams.fromString(input);
    let lexer = new MiniCLexer(inputStream);
  console.log("\nTABLA DE TOKENS:");

    let token = lexer.nextToken();

    while (token.type !== -1) {

    console.log(
    `Lexema: ${token.text} -> Token: ${MiniCLexer.symbolicNames[token.type]}`
);

    token = lexer.nextToken();
}

    lexer.reset();
//Muestra los errores sintacticos
lexer.reset();
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new MiniCParser(tokenStream);
    parser.removeErrorListeners();

    parser.addErrorListener({

    syntaxError(recognizer, offendingSymbol, line, column, msg) {

        console.error(
            `Error sintáctico en línea ${line}, columna ${column}: ${msg}`
        );
    }
});

    let tree = parser.programa();
    
    // Verifico si se produjeron errores
    if (parser.syntaxErrorsCount > 0) {

    console.error("Se encontraron errores");

} else {

    console.log("\nEntrada válida.");

    const cadena_tree = tree.toStringTree(parser.ruleNames);

    console.log("\nARBOL SINTACTICO:");
    console.log(cadena_tree);

    const visitor = new CustomMiniCVisitor();

    const codigoJS = visitor.visit(tree);

    console.log("\nCODIGO JAVASCRIPT:");
    console.log(codigoJS);

    console.log("\nEJECUCION:");
    eval(codigoJS);
}
}

function leerCadena() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question("Ingrese una cadena: ", (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Ejecuta la función principal
main();
