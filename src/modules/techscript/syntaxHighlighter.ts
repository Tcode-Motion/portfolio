export interface CodeSample {
  id: string;
  name: string;
  filename: string;
  code: string;
  ast: object;
  bytecode: Array<{ offset: number; op: string; arg: string; color: string }>;
  defaultOutput: string[];
}

export function highlightTechScript(code: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  html = html.replace(/(\/\/.*)/g, '___COMMENT___$1___ENDCOMMENT___');

  // Strings
  html = html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span style="color: #0df28b; font-weight: 500;">$1</span>');

  // Keywords (TechScript 2.0 grammar)
  const keywords = ['do', 'end', 'when', 'else', 'for', 'in', 'try', 'catch', 'const', 'send', 'say', 'and', 'or', 'true', 'false'];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(keywordRegex, '<span style="color: #c4ff36; font-weight: 700;">$1</span>');

  // Function calls
  html = html.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span style="color: #38bdf8; font-weight: 600;">$1</span>');

  // Restore comments
  html = html.replace(/___COMMENT___(.*?)___ENDCOMMENT___/g, '<span style="color: #6b7280; font-style: italic;">$1</span>');

  return html;
}

export function highlightASTJson(jsonObj: object): string {
  const jsonStr = JSON.stringify(jsonObj, null, 2);
  let html = jsonStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Keys
  html = html.replace(/"([^"]+)":/g, '<span style="color: #38bdf8; font-weight: 600;">"$1"</span>:');

  // AST Node Type values
  html = html.replace(
    /: "(Program|DoBlock|ConstantDeclaration|VariableAssignment|SayExpression|SendStatement|CallExpression|WhenStatement|ForLoop|TryCatchBlock|IfStatement|ReturnStatement|StructDeclaration|ImplBlock)"/g,
    ': <span style="color: #c4ff36; font-weight: 700; background: rgba(196,255,54,0.12); padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(196,255,54,0.3); font-size: 11px;">"$1"</span>'
  );

  // Strings
  html = html.replace(/: "([^"]*)"/g, ': <span style="color: #0df28b;">"$1"</span>');

  // Numbers
  html = html.replace(/: (\d+(?:\.\d+)?)/g, ': <span style="color: #ec4899; font-weight: 600;">$1</span>');

  // Booleans / null
  html = html.replace(/: (true|false|null)/g, ': <span style="color: #f59e0b; font-weight: 700;">$1</span>');

  return html;
}

