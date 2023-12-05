class ValidateFNC {
    constructor() {
        this.stack = ['$'];
        this.states = []
    }

    validate(input) {

        this.add(['S']);
        let pointer = 0;

        while (true) {
            console.log(this.stack);
            this.states.push([...this.stack]);
            const stackTop = this.topOfStack();
            const inputSymbol = input[pointer];

            if (stackTop === '$' && inputSymbol === undefined) {
                return { isValid: true, stack: this.states };
            }

            if (stackTop.length > 1 && this.isTerminal(stackTop)) {
                for (let i = 0; i < stackTop.length - 1; i++) {
                    if (stackTop[i] === input[pointer]) {
                    } else {
                        break;
                    }
                    this.remove();
                    pointer += stackTop.length;
                }
            } else if (stackTop === inputSymbol) {
                this.remove();
                pointer++;
            } else {
                const production = this.getProduction(stackTop, inputSymbol);
                if (production) {
                    this.remove();
                    this.add(production);
                } else {
                    return { isValid: false, stack: this.states };
                }
            }
        }
    }

    add(symbols) {
        for (let i = symbols.length - 1; i >= 0; i--) {
            this.stack.push(symbols[i]);
        }
    }

    remove() {
        return this.stack.pop();
    }

    topOfStack() {
        return this.stack[this.stack.length - 1];
    }

    isTerminal(symbol) {
        return symbol === symbol.toLowerCase();
    }


    getProduction(nonTerminal, terminal) {
        const ruleMappings = {
            'S': () => {
                const mappings = {
                    'v': () => ['R9', 'V1'],
                    'f': () => ['R7', 'T'],
                    'i': () => ['R3', 'P1'],
                    's': () => ['R1', 'C1'],
                    'c': () => ['H', 'P4'],
                };
                return mappings[terminal] ? mappings[terminal]() : null;
            },

            //tipo de funcion
            'T': () => {
                const mappings = {
                    'p': () => ['R5', 'M2'],
                    'default': () => ['L', 'N2']
                };
                
                const mappingFunction = mappings[terminal] || mappings['default'];
                return mappingFunction ? mappingFunction() : null;
            },

            // Variables
            'V1': () => ['L', 'V2'],
            'V2': () => ['O4', 'V3'],
            'V3': () => ['Y', 'S1'],
            'Y': () => {
                if (/[a-zA-Z]/.test(terminal)) {
                    return ['F1', 'Y'];
                } else if (/[0-9]/.test(terminal)) {
                    return ['F2', 'Y'];
                }
                else {
                    return ' '
                }
            },

            // Funciones
            'N1': () => ['L', 'N2'],
            'N2': () => ['S2', 'N3'],
            'N3': () => ['S3', 'N4'],
            'N4': () => ['L', 'N5'],
            'N5': () => ['O2', 'N6'],
            'N6': () => ['D', 'N7'],
            'N7': () => ['S1', 'N8'],
            'N8': () => ['S4', 'N9'],
            'N9': () => ['R8', 'N10'],
            'N10': () => ['S5', 'N11'],
            'N11': () => ['L', 'N12'],
            'N12': () => ['S6', 'S1'],

            // Main
            'M2': () => ['R6', 'M3'],
            'M3': () => ['S2', 'M4'],
            'M4': () => ['S3', 'M5'],
            'M5': () => ['S2', 'M6'],
            'M6': () => ['L', 'M7'],
            'M7': () => ['S1', 'S4'],

            // Ciclo
            'P1': () => ['D', 'P2'],
            'P2': () => ['R4', 'P3'],
            'P3': () => ['S2', 'P4'],
            'P4': () => ['L', 'P5'],
            'P5': () => ['O2', 'D'],

            // Condicional
            'C1': () => ['L', 'C2'],
            'C2': () => ['O3', 'C3'],
            'C3': () => ['D', 'C4'],
            'C4': () => ['R2', 'C5'],
            'C5': () => ['S3', 'C6'],
            'C6': () => ['L', 'C7'],
            'C7': () => ['O1', 'C8'],
            'C8': () => ['D', 'C9'],
            'C9': () => ['S1', 'S4'],

            // Operadores
            'O1': () => ['- '],
            'O2': () => ['+ '],
            'O3': () => ['> '],
            'O4': () => ['= '],

            // Reservadas
            'R1': () => ['si '],
            'R2': () => ['realizar '],
            'R3': () => ['iterar '],
            'R4': () => ['veces '],
            'R5': () => ['principal '],
            'R6': () => ['correr '],
            'R7': () => ['funcion '],
            'R8': () => ['imprimir '],
            'R9': () => ['variable '],

            // Formación
            'F1': () => /[a-zA-Z]/.test(terminal) ? [terminal] : ' ',
            'F2': () => /[0-9]/.test(terminal) ? [terminal] : ' ',
            'L': () => /[a-zA-Z]/.test(terminal) ? [terminal, 'L'] : ' ',
            'D': () => /[0-9]/.test(terminal) ? [terminal, 'D'] : ' ',

            // Símbolos
            'S1': () => [';'],
            'S2': () => ['>>'],
            'S3': () => ['{ '],
            'S4': () => [' }'],
            'S5': () => ['('],
            'S6': () => [')'],
        }
        return ruleMappings[nonTerminal] ? ruleMappings[nonTerminal]() : null;
    }


}

const automaton = new ValidateFNC();
const result = automaton.validate('si suma > 4 realizar { suma - 2 ; }');

export default function validateAutomaton(inputString) {
    const automaton = new ValidateFNC();
    const result = automaton.validate(inputString);
    return result;
}



