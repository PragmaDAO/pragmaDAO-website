Compiled with problems:
×
ERROR in src/pages/HomePage.tsx:16:89
TS2322: Type '{ onCompile: () => void; solidityFilePath: string; lessonId: string; onTestResults: () => void; onAllTestsPassed: () => void; }' is not assignable to type 'IntrinsicAttributes & { onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; onCodeChange?: ((code: string) => void) | undefined; }'.
  Property 'solidityFilePath' does not exist on type 'IntrinsicAttributes & { onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; onCodeChange?: ((code: string) => void) | undefined; }'.
    14 |         <div className="mt-20 relative hero-glow w-full max-w-5xl mx-auto h-[750px] md:h-[690px] rounded-2xl overflow-hidden p-4">
    15 |              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50"></div>
  > 16 |              <div className="relative z-10 h-full"><SolidityEditor onCompile={() => {}} solidityFilePath="/pragmaDAO-website/lessons/solidity/HelloWorld.sol" lessonId="HelloWorld" onTestResults={() => {}} onAllTestsPassed={() => {}} /></div>
       |                                                                                         ^^^^^^^^^^^^^^^^
    17 |         </div>
    18 |     </section>
    19 | );