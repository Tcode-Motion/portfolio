import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/primitives/FadeIn';
import { useSound } from '@/core/audio/SoundManager';

const EXAMPLES = [
  {
    name: 'Hello World',
    code: `// Welcome to TechScript!\nfn main() {\n  print("Hello, World!");\n  let x = 42;\n  print("The answer is: " + str(x));\n}`,
  },
  {
    name: 'Fibonacci',
    code: `fn fibonacci(n: int) -> int {\n  if n <= 1 {\n    return n;\n  }\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfn main() {\n  for i in 0..10 {\n    print("fib(" + str(i) + ") = " + str(fibonacci(i)));\n  }\n}`,
  },
  {
    name: 'Structs',
    code: `struct Vector2D {\n  x: float,\n  y: float\n}\n\nimpl Vector2D {\n  fn length(self) -> float {\n    return sqrt(self.x * self.x + self.y * self.y);\n  }\n}\n\nfn main() {\n  let v = Vector2D { x: 3.0, y: 4.0 };\n  print("Length: " + str(v.length()));\n}`,
  },
];

const MOCK_AST = {
  type: 'Program',
  children: [
    { type: 'FunctionDeclaration', name: 'main', body: [
      { type: 'CallExpression', callee: 'print', args: [{ type: 'StringLiteral', value: '"Hello, World!"' }] },
      { type: 'VariableDeclaration', name: 'x', init: { type: 'NumericLiteral', value: '42' } },
    ]},
  ],
};

const MOCK_BYTECODE = [
  { offset: 0, op: 'LOAD_CONST', arg: '"Hello, World!"', color: '#c4ff36' },
  { offset: 1, op: 'CALL', arg: 'print', color: '#8b5cf6' },
  { offset: 2, op: 'LOAD_CONST', arg: '42', color: '#c4ff36' },
  { offset: 3, op: 'STORE_FAST', arg: 'x', color: '#06b6d4' },
  { offset: 4, op: 'LOAD_FAST', arg: 'x', color: '#06b6d4' },
  { offset: 5, op: 'CALL', arg: 'str', color: '#8b5cf6' },
  { offset: 6, op: 'RETURN', arg: '', color: '#f59e0b' },
];

const ARCHITECTURE_STEPS = [
  { label: 'Source Code', color: '#c4ff36', desc: 'Human-readable TechScript code', icon: '{ }' },
  { label: 'Tokenizer', color: '#8b5cf6', desc: 'Breaks code into tokens', icon: '#' },
  { label: 'Parser', color: '#06b6d4', desc: 'Builds Abstract Syntax Tree', icon: '/' },
  { label: 'Compiler', color: '#f59e0b', desc: 'Generates bytecode from AST', icon: '*' },
  { label: 'VM', color: '#ec4899', desc: 'Executes bytecode instructions', icon: '>' },
];

export const TechScriptPlayground: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [activeTab, setActiveTab] = useState<'output' | 'ast' | 'bytecode' | 'arch'>('output');
  const [activeExample, setActiveExample] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleRun = () => {
    playClick();
    setIsRunning(true);
    setOutput([]);
    setPipelineStep(-1);

    // Animate through pipeline steps
    let step = 0;
    const stepInterval = setInterval(() => {
      if (step < ARCHITECTURE_STEPS.length) {
        setPipelineStep(step);
        step++;
      } else {
        clearInterval(stepInterval);

        // Show output
        const lines = [
          'Compiling TechScript...',
          'Tokenizing... OK',
          'Parsing... OK',
          'Generating AST... OK',
          'Compiling to bytecode... OK',
          '',
          '--- Output ---',
          'Hello, World!',
          'The answer is: 42',
          '',
          '✓ Compiled successfully (3ms)',
        ];

        let i = 0;
        const outputInterval = setInterval(() => {
          if (i < lines.length) {
            setOutput((prev) => [...prev, lines[i]]);
            i++;
          } else {
            clearInterval(outputInterval);
            setIsRunning(false);
            setTimeout(() => {
              setPipelineStep(-1);
            }, 2000);
          }
        }, 80);
      }
    }, 200);
  };

  const handleCopy = () => {
    playClick();
    navigator.clipboard.writeText(code);
  };

  const selectExample = (index: number) => {
    playHover();
    setActiveExample(index);
    setCode(EXAMPLES[index].code);
    setOutput([]);
  };

  return (
    <section ref={sectionRef} id="techscript" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-[var(--accent-lime)]" />
            <span className="section-label text-[var(--accent-lime)]">Centerpiece</span>
          </div>
        </FadeIn>

        <motion.div style={{ y }}>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-4">
              Tech<span className="text-gradient-lime">Script</span>
            </h2>
            <p className="text-[var(--text-2)] text-sm max-w-md mb-12">
              A from-scratch programming language with custom AST, bytecode compiler, and in-browser IDE
            </p>
          </FadeIn>
        </motion.div>

        {/* Architecture pipeline — animated */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {ARCHITECTURE_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs magnetic-btn transition-all duration-500 ${
                    pipelineStep === i
                      ? 'border-[var(--accent-lime)] bg-[rgba(196,255,54,0.08)]'
                      : pipelineStep > i
                      ? 'border-[var(--border-hover)]'
                      : 'border-[var(--border)]'
                  }`}
                  data-cursor="hover"
                  animate={pipelineStep === i ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <span
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: pipelineStep >= i ? step.color : 'var(--text-3)',
                      boxShadow: pipelineStep === i ? `0 0 8px ${step.color}40` : 'none',
                    }}
                  />
                  <span className={`transition-colors duration-300 ${
                    pipelineStep >= i ? 'text-[var(--text-1)]' : 'text-[var(--text-3)]'
                  }`}>
                    {step.label}
                  </span>
                </motion.div>
                {i < ARCHITECTURE_STEPS.length - 1 && (
                  <motion.svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    animate={pipelineStep > i ? { color: '#c4ff36' } : { color: '#4a4643' }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </motion.svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>

        {/* Playground */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex gap-2">
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={ex.name}
                      onClick={() => selectExample(i)}
                      className={`px-2.5 py-1 text-[11px] font-code rounded transition-all ${
                        activeExample === i
                          ? 'bg-[var(--surface-3)] text-[var(--text-1)]'
                          : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
                      }`}
                    >
                      {ex.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-[11px] font-code text-[var(--text-3)] border border-[var(--border)] rounded hover:border-[var(--border-hover)] transition-all magnetic-btn"
                >
                  Copy
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-code bg-[var(--accent-lime)] text-[#050505] rounded hover:shadow-[0_0_20px_rgba(196,255,54,0.15)] transition-all magnetic-btn disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {isRunning ? 'Running...' : 'Run'}
                </button>
              </div>
            </div>

            {/* Split view */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              {/* Code editor */}
              <div className="border-b lg:border-b-0 lg:border-r border-[var(--border)]">
                <div className="px-4 py-2 border-b border-[var(--border)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
                  <span className="text-[10px] font-code text-[var(--text-3)] uppercase tracking-widest">main.ts</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-[350px] bg-transparent p-4 font-code text-sm text-[var(--text-1)] leading-[1.7] resize-none focus:outline-none"
                  style={{ tabSize: 2 }}
                />
              </div>

              {/* Output / AST / Bytecode / Arch */}
              <div>
                <div className="px-4 py-2 border-b border-[var(--border)] flex items-center gap-4">
                  {(['output', 'ast', 'bytecode', 'arch'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); playHover(); }}
                      className={`text-[10px] font-code uppercase tracking-widest transition-colors ${
                        activeTab === tab ? 'text-[var(--accent-lime)]' : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-4 h-[350px] overflow-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === 'output' && (
                      <motion.div
                        key="output"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="font-code text-sm space-y-0.5"
                      >
                        {output.length === 0 ? (
                          <span className="text-[var(--text-3)]">Click Run to see output...</span>
                        ) : (
                          output.map((line, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className={`${
                                line.startsWith('✓') ? 'text-[var(--accent-lime)]' :
                                line.startsWith('---') ? 'text-[var(--text-2)]' :
                                line.startsWith('Compiling') || line.startsWith('Tokenizing') || line.startsWith('Parsing') || line.startsWith('Generating') || line.startsWith('Compiling to')
                                  ? 'text-[var(--text-3)]'
                                  : 'text-[var(--text-1)]'
                              }`}
                            >
                              {line}
                            </motion.div>
                          ))
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'ast' && (
                      <motion.pre
                        key="ast"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="font-code text-xs text-[var(--text-2)] leading-relaxed"
                      >
                        {JSON.stringify(MOCK_AST, null, 2)}
                      </motion.pre>
                    )}

                    {activeTab === 'bytecode' && (
                      <motion.div
                        key="bytecode"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1"
                      >
                        {MOCK_BYTECODE.map((instr, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 font-code text-xs py-1 border-b border-[var(--border)]"
                          >
                            <span className="w-8 text-[var(--text-3)]">{String(instr.offset).padStart(3, '0')}</span>
                            <span style={{ color: instr.color }} className="w-28">{instr.op}</span>
                            <span className="text-[var(--text-2)]">{instr.arg}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'arch' && (
                      <motion.div
                        key="arch"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        {ARCHITECTURE_STEPS.map((step, i) => (
                          <motion.div
                            key={step.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="flex flex-col items-center">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-code border"
                                style={{ borderColor: step.color, color: step.color }}
                              >
                                {step.icon}
                              </div>
                              {i < ARCHITECTURE_STEPS.length - 1 && (
                                <div className="w-px h-6 bg-[var(--border)] mt-1" />
                              )}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-[var(--text-1)]">{step.label}</span>
                              <p className="text-xs text-[var(--text-3)] mt-0.5">{step.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
