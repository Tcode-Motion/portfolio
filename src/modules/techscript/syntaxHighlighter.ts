export interface CodeSample {
  id: string;
  name: string;
  code: string;
  ast: object;
  bytecode: string[];
  output: string;
}

export const TECHSCRIPT_SAMPLES: CodeSample[] = [
  {
    id: 'hello-compiler',
    name: 'Hello Compiler',
    code: `// TechScript v1.0 Syntax Example
fn main() {
    let message: string = "Hello, TechScript Engine!";
    let version: f64 = 1.0;
    println("\${message} (v\${version})");
}`,
    ast: {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          name: 'main',
          params: [],
          body: [
            {
              type: 'VariableDeclaration',
              identifier: 'message',
              typeAnnotation: 'string',
              init: { type: 'Literal', value: 'Hello, TechScript Engine!' },
            },
            {
              type: 'VariableDeclaration',
              identifier: 'version',
              typeAnnotation: 'f64',
              init: { type: 'Literal', value: 1.0 },
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: 'println',
                arguments: [{ type: 'InterpolatedString', template: '${message} (v${version})' }],
              },
            },
          ],
        },
      ],
    },
    bytecode: [
      '0001: PUSH_STR "Hello, TechScript Engine!"',
      '0002: STORE_LOCAL 0 [message]',
      '0003: PUSH_F64 1.0',
      '0004: STORE_LOCAL 1 [version]',
      '0005: LOAD_LOCAL 0',
      '0006: LOAD_LOCAL 1',
      '0007: CALL_NATIVE println, 2',
      '0008: RETURN_VOID',
    ],
    output: `Hello, TechScript Engine! (v1.0)\nProcess finished with exit code 0`,
  },
  {
    id: 'fibonacci-vm',
    name: 'Fibonacci Recursion',
    code: `fn fib(n: i32) -> i32 {
    if (n <= 1) { return n; }
    return fib(n - 1) + fib(n - 2);
}

fn main() {
    let result = fib(10);
    println("Fibonacci(10) =", result);
}`,
    ast: {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          name: 'fib',
          params: [{ name: 'n', type: 'i32' }],
          returnType: 'i32',
          body: [
            {
              type: 'IfStatement',
              test: { type: 'BinaryExpression', operator: '<=', left: 'n', right: 1 },
              consequent: { type: 'ReturnStatement', argument: 'n' },
            },
            {
              type: 'ReturnStatement',
              argument: {
                type: 'BinaryExpression',
                operator: '+',
                left: { type: 'CallExpression', callee: 'fib', args: ['n - 1'] },
                right: { type: 'CallExpression', callee: 'fib', args: ['n - 2'] },
              },
            },
          ],
        },
      ],
    },
    bytecode: [
      '0010: LOAD_ARG 0 [n]',
      '0011: PUSH_I32 1',
      '0012: CMP_LE',
      '0013: JUMP_IF_FALSE 0016',
      '0014: LOAD_ARG 0',
      '0015: RETURN',
      '0016: LOAD_ARG 0',
      '0017: PUSH_I32 1',
      '0018: SUB',
      '0019: RECURSE fib, 1',
      '0020: ADD',
      '0021: RETURN',
    ],
    output: `Fibonacci(10) = 55\nExecution time: 0.12ms (Stack VM)`,
  },
];
