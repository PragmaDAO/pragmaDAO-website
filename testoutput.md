Compiled with problems:
×
ERROR in ./src/lessons/UnderstandingFunctions.tsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/anthonyalbertorio/Desktop/pragmaDAO-website/src/lessons/UnderstandingFunctions.tsx: 'import' and 'export' may only appear at the top level. (68:2)

  66 |   };
  67 |
> 68 |   import React, { useState, useRef, useEffect } from "react";
     |   ^
  69 | import SolidityEditor from "../components/SolidityEditor";
  70 | import { CompiledOutput, TestCase } from "../types";
  71 | import Lesson from "../components/Lesson";
    at constructor (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:367:19)
    at TypeScriptParserMixin.raise (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:6630:19)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12880:18)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9532:18)
    at TypeScriptParserMixin.parseStatementLike (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12776:17)
    at TypeScriptParserMixin.parseStatementListItem (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12756:17)
    at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13325:61)
    at TypeScriptParserMixin.parseBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13318:10)
    at TypeScriptParserMixin.parseBlock (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13306:10)
    at TypeScriptParserMixin.parseFunctionBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12110:24)
    at TypeScriptParserMixin.parseArrowExpression (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12085:10)
    at TypeScriptParserMixin.parseParenAndDistinguishExpression (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11695:12)
    at TypeScriptParserMixin.parseExprAtom (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11335:23)
    at TypeScriptParserMixin.parseExprAtom (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4797:20)
    at TypeScriptParserMixin.parseExprSubscripts (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11085:23)
    at TypeScriptParserMixin.parseUpdate (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11070:21)
    at TypeScriptParserMixin.parseMaybeUnary (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11050:23)
    at TypeScriptParserMixin.parseMaybeUnary (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9857:18)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10903:61)
    at TypeScriptParserMixin.parseExprOps (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10908:23)
    at TypeScriptParserMixin.parseMaybeConditional (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10885:23)
    at TypeScriptParserMixin.parseMaybeAssign (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10835:21)
    at TypeScriptParserMixin.parseMaybeAssign (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9806:20)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10804:39
    at TypeScriptParserMixin.allowInAnd (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12431:16)
    at TypeScriptParserMixin.parseMaybeAssignAllowIn (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10804:17)
    at TypeScriptParserMixin.parseVar (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13393:91)
    at TypeScriptParserMixin.parseVarStatement (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13239:10)
    at TypeScriptParserMixin.parseVarStatement (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9498:31)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12860:23)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9532:18)
    at TypeScriptParserMixin.parseStatementLike (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12776:17)
    at TypeScriptParserMixin.parseModuleItem (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12753:17)
    at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13325:36)
    at TypeScriptParserMixin.parseBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13318:10)
    at TypeScriptParserMixin.parseProgram (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12634:10)
    at TypeScriptParserMixin.parseTopLevel (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12624:25)
    at TypeScriptParserMixin.parse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:14501:10)
    at TypeScriptParserMixin.parse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10149:18)
    at parse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:14535:38)
    at parser (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/parser/index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/transformation/normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/transformation/index.js:22:50)
    at run.next (<anonymous>)
    at transform (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/transform.js:22:33)
    at transform.next (<anonymous>)
    at step (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/gensync/index.js:261:32)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/gensync/index.js:273:13
ERROR in ./src/lessons/UnderstandingFunctions.tsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/anthonyalbertorio/Desktop/pragmaDAO-website/src/lessons/UnderstandingFunctions.tsx: 'import' and 'export' may only appear at the top level. (68:2)

  66 |   };
  67 |
> 68 |   import React, { useState, useRef, useEffect } from "react";
     |   ^
  69 | import SolidityEditor from "../components/SolidityEditor";
  70 | import { CompiledOutput, TestCase } from "../types";
  71 | import Lesson from "../components/Lesson";
    at constructor (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:367:19)
    at TypeScriptParserMixin.raise (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:6630:19)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12880:18)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9532:18)
    at TypeScriptParserMixin.parseStatementLike (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12776:17)
    at TypeScriptParserMixin.parseStatementListItem (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12756:17)
    at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13325:61)
    at TypeScriptParserMixin.parseBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13318:10)
    at TypeScriptParserMixin.parseBlock (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13306:10)
    at TypeScriptParserMixin.parseFunctionBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12110:24)
    at TypeScriptParserMixin.parseArrowExpression (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12085:10)
    at TypeScriptParserMixin.parseParenAndDistinguishExpression (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11695:12)
    at TypeScriptParserMixin.parseExprAtom (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11335:23)
    at TypeScriptParserMixin.parseExprAtom (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4797:20)
    at TypeScriptParserMixin.parseExprSubscripts (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11085:23)
    at TypeScriptParserMixin.parseUpdate (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11070:21)
    at TypeScriptParserMixin.parseMaybeUnary (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11050:23)
    at TypeScriptParserMixin.parseMaybeUnary (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9857:18)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10903:61)
    at TypeScriptParserMixin.parseExprOps (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10908:23)
    at TypeScriptParserMixin.parseMaybeConditional (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10885:23)
    at TypeScriptParserMixin.parseMaybeAssign (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10835:21)
    at TypeScriptParserMixin.parseMaybeAssign (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9806:20)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10804:39
    at TypeScriptParserMixin.allowInAnd (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12431:16)
    at TypeScriptParserMixin.parseMaybeAssignAllowIn (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10804:17)
    at TypeScriptParserMixin.parseVar (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13393:91)
    at TypeScriptParserMixin.parseVarStatement (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13239:10)
    at TypeScriptParserMixin.parseVarStatement (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9498:31)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12860:23)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9532:18)
    at TypeScriptParserMixin.parseStatementLike (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12776:17)
    at TypeScriptParserMixin.parseModuleItem (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12753:17)
    at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13325:36)
    at TypeScriptParserMixin.parseBlockBody (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13318:10)
    at TypeScriptParserMixin.parseProgram (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12634:10)
    at TypeScriptParserMixin.parseTopLevel (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12624:25)
    at TypeScriptParserMixin.parse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:14501:10)
    at TypeScriptParserMixin.parse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10149:18)
    at parse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:14535:38)
    at parser (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/parser/index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/transformation/normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/transformation/index.js:22:50)
    at run.next (<anonymous>)
    at transform (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/core/lib/transform.js:22:33)
    at transform.next (<anonymous>)
    at step (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/gensync/index.js:261:32)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/gensync/index.js:273:13
ERROR in src/lessons/GlobalVariables.tsx:126:54
TS2304: Cannot find name 'setCanMarkComplete'.
    124 |               lessonId="global-variables"
    125 |               onTestResults={setTestResults}
  > 126 |               onAllTestsPassed={(passed: boolean) => setCanMarkComplete(passed)} // New prop
        |                                                      ^^^^^^^^^^^^^^^^^^
    127 |             />
    128 |             <button
    129 |               onClick={handleMarkComplete}
ERROR in src/lessons/GlobalVariables.tsx:130:26
TS2552: Cannot find name 'canMarkComplete'. Did you mean 'handleMarkComplete'?
    128 |             <button
    129 |               onClick={handleMarkComplete}
  > 130 |               disabled={!canMarkComplete} // Disable if not all tests passed
        |                          ^^^^^^^^^^^^^^^
    131 |               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4"
    132 |             >
    133 |               Mark as Complete
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:131:14
TS2741: Property 'onAllTestsPassed' is missing in type '{ onCompile: Dispatch<SetStateAction<CompiledOutput | null>>; solidityFilePath: string; lessonId: string; onTestResults: Dispatch<SetStateAction<TestCase[]>>; }' but required in type '{ onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; solidityFilePath?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; }'.
    129 |           <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/integers-and-unsigned-integers.md" />
    130 |           <div className="flex flex-col gap-4 h-[700px]">
  > 131 |             <SolidityEditor
        |              ^^^^^^^^^^^^^^
    132 |               onCompile={setCompiledResult}
    133 |               solidityFilePath="/pragmaDAO-website/lessons/solidity/IntegersAndUnsignedIntegers.sol"
    134 |               lessonId="integers-and-unsigned-integers"
ERROR in src/lessons/StateAndLocalVariables.tsx:131:14
TS2741: Property 'onAllTestsPassed' is missing in type '{ onCompile: Dispatch<SetStateAction<CompiledOutput | null>>; solidityFilePath: string; lessonId: string; onTestResults: Dispatch<SetStateAction<TestCase[]>>; }' but required in type '{ onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; solidityFilePath?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; }'.
    129 |           <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/state-and-local-variables.md" />
    130 |           <div className="flex flex-col gap-4 h-[700px]">
  > 131 |             <SolidityEditor
        |              ^^^^^^^^^^^^^^
    132 |               onCompile={setCompiledResult}
    133 |               solidityFilePath="/pragmaDAO-website/lessons/solidity/StateAndLocalVariables.sol"
    134 |               lessonId="state-and-local-variables"
ERROR in src/lessons/UnderstandingFunctions.tsx:68:3
TS1232: An import declaration can only be used at the top level of a namespace or module.
    66 |   };
    67 |
  > 68 |   import React, { useState, useRef, useEffect } from "react";
       |   ^^^^^^
    69 | import SolidityEditor from "../components/SolidityEditor";
    70 | import { CompiledOutput, TestCase } from "../types";
    71 | import Lesson from "../components/Lesson";
ERROR in src/lessons/UnderstandingFunctions.tsx:69:1
TS1232: An import declaration can only be used at the top level of a namespace or module.
    67 |
    68 |   import React, { useState, useRef, useEffect } from "react";
  > 69 | import SolidityEditor from "../components/SolidityEditor";
       | ^^^^^^
    70 | import { CompiledOutput, TestCase } from "../types";
    71 | import Lesson from "../components/Lesson";
    72 | import ScrollIndicator from "../components/ScrollIndicator";
ERROR in src/lessons/UnderstandingFunctions.tsx:70:1
TS1232: An import declaration can only be used at the top level of a namespace or module.
    68 |   import React, { useState, useRef, useEffect } from "react";
    69 | import SolidityEditor from "../components/SolidityEditor";
  > 70 | import { CompiledOutput, TestCase } from "../types";
       | ^^^^^^
    71 | import Lesson from "../components/Lesson";
    72 | import ScrollIndicator from "../components/ScrollIndicator";
    73 | import { useAuth } from "../context/AuthContext"; // Import useAuth
ERROR in src/lessons/UnderstandingFunctions.tsx:71:1
TS1232: An import declaration can only be used at the top level of a namespace or module.
    69 | import SolidityEditor from "../components/SolidityEditor";
    70 | import { CompiledOutput, TestCase } from "../types";
  > 71 | import Lesson from "../components/Lesson";
       | ^^^^^^
    72 | import ScrollIndicator from "../components/ScrollIndicator";
    73 | import { useAuth } from "../context/AuthContext"; // Import useAuth
    74 | import { lessons } from "../lessons"; // Import lessons array
ERROR in src/lessons/UnderstandingFunctions.tsx:72:1
TS1232: An import declaration can only be used at the top level of a namespace or module.
    70 | import { CompiledOutput, TestCase } from "../types";
    71 | import Lesson from "../components/Lesson";
  > 72 | import ScrollIndicator from "../components/ScrollIndicator";
       | ^^^^^^
    73 | import { useAuth } from "../context/AuthContext"; // Import useAuth
    74 | import { lessons } from "../lessons"; // Import lessons array
    75 |
ERROR in src/lessons/UnderstandingFunctions.tsx:73:1
TS1232: An import declaration can only be used at the top level of a namespace or module.
    71 | import Lesson from "../components/Lesson";
    72 | import ScrollIndicator from "../components/ScrollIndicator";
  > 73 | import { useAuth } from "../context/AuthContext"; // Import useAuth
       | ^^^^^^
    74 | import { lessons } from "../lessons"; // Import lessons array
    75 |
    76 | const UnderstandingFunctions: React.FC<{
ERROR in src/lessons/UnderstandingFunctions.tsx:74:1
TS1232: An import declaration can only be used at the top level of a namespace or module.
    72 | import ScrollIndicator from "../components/ScrollIndicator";
    73 | import { useAuth } from "../context/AuthContext"; // Import useAuth
  > 74 | import { lessons } from "../lessons"; // Import lessons array
       | ^^^^^^
    75 |
    76 | const UnderstandingFunctions: React.FC<{
    77 |   setCurrentPage: (page: string) => void;
ERROR in src/lessons/UnderstandingFunctions.tsx:198:14
TS2741: Property 'onAllTestsPassed' is missing in type '{ onCompile: Dispatch<SetStateAction<CompiledOutput | null>>; solidityFilePath: string; lessonId: string; onTestResults: Dispatch<SetStateAction<TestCase[]>>; }' but required in type '{ onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; solidityFilePath?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; }'.
    196 |           <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/understanding-functions.md" />
    197 |           <div className="flex flex-col gap-4 h-[700px]">
  > 198 |             <SolidityEditor
        |              ^^^^^^^^^^^^^^
    199 |               onCompile={setCompiledResult}
    200 |               solidityFilePath="/pragmaDAO-website/lessons/solidity/UnderstandingFunctions.sol"
    201 |               lessonId="understanding-functions"
ERROR in src/lessons/UnderstandingFunctions.tsx:217:1
TS1258: A default export must be at the top level of a file or module declaration.
    215 | };
    216 |
  > 217 | export default UnderstandingFunctions;
        | ^^^^^^
    218 |
    219 |
    220 |   const handleGoToNextLesson = () => {
ERROR in src/lessons/UnderstandingFunctions.tsx:245:24
TS2304: Cannot find name 'handleGoToPreviousLesson'.
    243 |           <div className="flex items-center space-x-4">
    244 |             <button
  > 245 |               onClick={handleGoToPreviousLesson}
        |                        ^^^^^^^^^^^^^^^^^^^^^^^^
    246 |               className="text-indigo-400 hover:text-indigo-300 font-semibold text-2xl"
    247 |             >
    248 |               &lt;
ERROR in src/lessons/UnderstandingFunctions.tsx:261:14
TS2741: Property 'onAllTestsPassed' is missing in type '{ onCompile: Dispatch<SetStateAction<CompiledOutput | null>>; solidityFilePath: string; lessonId: string; onTestResults: Dispatch<SetStateAction<TestCase[]>>; }' but required in type '{ onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; solidityFilePath?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; }'.
    259 |           <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/understanding-functions.md" />
    260 |           <div className="flex flex-col gap-4 h-[700px]">
  > 261 |             <SolidityEditor
        |              ^^^^^^^^^^^^^^
    262 |               onCompile={setCompiledResult}
    263 |               solidityFilePath="/pragmaDAO-website/lessons/solidity/UnderstandingFunctions.sol"
    264 |               lessonId="understanding-functions"
ERROR in src/lessons/VariablesTypes.tsx:121:14
TS2741: Property 'onAllTestsPassed' is missing in type '{ onCompile: Dispatch<SetStateAction<CompiledOutput | null>>; solidityFilePath: string; lessonId: string; onTestResults: Dispatch<SetStateAction<TestCase[]>>; }' but required in type '{ onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; solidityFilePath?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; }'.
    119 |           <Lesson markdownPath="/pragmaDAO-website/lessons/markdown/understanding-variables-and-types.md" />
    120 |           <div className="flex flex-col gap-4 h-[700px]">
  > 121 |             <SolidityEditor
        |              ^^^^^^^^^^^^^^
    122 |               onCompile={setCompiledResult}
    123 |               solidityFilePath="/pragmaDAO-website/lessons/solidity/VariableTypes.sol"
    124 |               lessonId="understanding-variables-and-types"
ERROR in src/pages/HomePage.tsx:16:53
TS2741: Property 'onAllTestsPassed' is missing in type '{ onCompile: () => void; solidityFilePath: string; lessonId: string; onTestResults: () => void; }' but required in type '{ onCompile?: ((result: CompiledOutput | null) => void) | undefined; initialCode?: string | undefined; solidityFilePath?: string | undefined; lessonId?: string | undefined; onTestResults: (testCases: TestCase[]) => void; onAllTestsPassed: (passed: boolean) => void; }'.
    14 |         <div className="mt-20 relative hero-glow w-full max-w-5xl mx-auto h-[750px] md:h-[690px] rounded-2xl overflow-hidden p-4">
    15 |              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50"></div>
  > 16 |              <div className="relative z-10 h-full"><SolidityEditor onCompile={() => {}} solidityFilePath="/pragmaDAO-website/lessons/solidity/HelloWorld.sol" lessonId="HelloWorld" onTestResults={() => {}} /></div>
       |                                                     ^^^^^^^^^^^^^^
    17 |         </div>
    18 |     </section>
    19 | );