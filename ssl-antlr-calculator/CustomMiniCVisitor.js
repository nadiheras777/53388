import MiniCVisitor from "./generated/MiniCVisitor.js";

export default class CustomMiniCVisitor extends MiniCVisitor {

    visitSalida(ctx) {

        const texto = ctx.cadena().getText();

        return `console.log(${texto});`;
    }

    visitTerminar(ctx) {
        return "break;";
    }

    visitCondicion(ctx) {
        return ctx.getText();
    }

    visitSentencia(ctx) {

        let resultado = "";

        for(let child of ctx.children) {

            if(child.accept) {
                resultado += child.accept(this) + "\n";
            }
        }

        return resultado;
    }

    visitBucle(ctx) {

        const sentencias = this.visit(ctx.sentencia());

        const condicion = this.visit(ctx.condicion());

        return `
do {
${sentencias}
} while(${condicion});
`;
    }

    visitPrograma(ctx) {

        let codigo = "";

        for(let inst of ctx.instrucciones().children) {

            if(inst.accept) {
                codigo += inst.accept(this);
            }
        }

        return codigo;
    }
}