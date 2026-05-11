grammar MiniC;

programa
    : instrucciones EOF
    ;

instrucciones
    : instruccion+
    ;

instruccion
    : bucle
    ;

bucle
    : DO LBRACE sentencia RBRACE WHILE LPAREN condicion RPAREN SEMI
    ;

sentencia
    : (salida | terminar)+
    ;

salida
    : PUTS LPAREN cadena RPAREN SEMI
    ;

terminar
    : BREAK SEMI
    ;

condicion
    : CERO
    | UNO
    ;

cadena
    : STRING
    ;

/* TOKENS */

DO      : 'do';
WHILE   : 'while';
PUTS    : 'puts';
BREAK   : 'break';

LPAREN  : '(';
RPAREN  : ')';

LBRACE  : '{';
RBRACE  : '}';

SEMI    : ';';

CERO    : '0';
UNO     : '1';

STRING
    : '"' (~["\r\n])* '"'
    ;

WS
    : [ \t\r\n]+ -> skip
    ;