Compiled with problems:
×
ERROR in ./src/lessons/IntegersAndUnsignedIntegers.tsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/anthonyalbertorio/Desktop/pragmaDAO-website/src/lessons/IntegersAndUnsignedIntegers.tsx: Unexpected token (174:44)

  172 | import { lessons } from "../lessons"; // Import lessons array
  173 |
> 174 | const IntegersAndUnsignedIntegers: React.FC<{
      |                                             ^
  175 |   setCurrentPage: (page: string) => void;
  176 |   lessonId: string; // Add lessonId as a prop
  177 | }> = ({ setCurrentPage, lessonId }) => {
    at constructor (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:367:19)
    at TypeScriptParserMixin.raise (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:6630:19)
    at TypeScriptParserMixin.unexpected (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:6650:16)
    at TypeScriptParserMixin.jsxParseIdentifier (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4602:12)
    at TypeScriptParserMixin.jsxParseNamespacedName (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4609:23)
    at TypeScriptParserMixin.jsxParseElementName (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4618:21)
    at TypeScriptParserMixin.jsxParseOpeningElementAt (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4694:22)
    at TypeScriptParserMixin.jsxParseElementAt (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4719:33)
    at TypeScriptParserMixin.jsxParseElementAt (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4731:32)
    at TypeScriptParserMixin.jsxParseElementAt (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4731:32)
    at TypeScriptParserMixin.jsxParseElementAt (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4731:32)
    at TypeScriptParserMixin.jsxParseElementAt (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4731:32)
    at TypeScriptParserMixin.jsxParseElement (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4782:17)
    at TypeScriptParserMixin.parseExprAtom (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:4792:19)
    at TypeScriptParserMixin.parseExprSubscripts (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11085:23)
    at TypeScriptParserMixin.parseUpdate (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11070:21)
    at TypeScriptParserMixin.parseMaybeUnary (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11050:23)
    at TypeScriptParserMixin.parseMaybeUnary (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9857:18)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10903:61)
    at TypeScriptParserMixin.parseExprOps (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10908:23)
    at TypeScriptParserMixin.parseMaybeConditional (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10885:23)
    at TypeScriptParserMixin.parseMaybeAssign (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10835:21)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9795:39
    at TypeScriptParserMixin.tryParse (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:6938:20)
    at TypeScriptParserMixin.parseMaybeAssign (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9795:18)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10804:39
    at TypeScriptParserMixin.allowInAnd (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12436:12)
    at TypeScriptParserMixin.parseMaybeAssignAllowIn (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10804:17)
    at TypeScriptParserMixin.parseMaybeAssignAllowInOrVoidPattern (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12503:17)
    at TypeScriptParserMixin.parseParenAndDistinguishExpression (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:11683:28)
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
    at TypeScriptParserMixin.parseExpressionBase (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10788:23)
    at /Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10784:39
    at TypeScriptParserMixin.allowInAnd (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12431:16)
    at TypeScriptParserMixin.parseExpression (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:10784:17)
    at TypeScriptParserMixin.parseReturnStatement (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:13151:28)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12807:21)
    at TypeScriptParserMixin.parseStatementContent (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:9532:18)
    at TypeScriptParserMixin.parseStatementLike (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12776:17)
    at TypeScriptParserMixin.parseStatementListItem (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@babel/parser/lib/index.js:12756:17)
ERROR
[eslint] 
src/lessons/IntegersAndUnsignedIntegers.tsx
  Line 174:44:  Parsing error: Identifier expected

ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:166:29
TS2695: Left side of comma operator is unused and has no side effects.
    164 |               className={`form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out ${isLessonCompleted ? 'lesson-completed-checkbox' : ''}`}
    165 |             />
  > 166 |             import React, { useState, useRef, useEffect, useCallback } from "react";
        |                             ^^^^^^^^
    167 | import SolidityEditor from "../components/SolidityEditor";
    168 | import { CompiledOutput, TestCase } from "../types";
    169 | import Lesson from "../components/Lesson";
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:166:29
TS2695: Left side of comma operator is unused and has no side effects.
    164 |               className={`form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out ${isLessonCompleted ? 'lesson-completed-checkbox' : ''}`}
    165 |             />
  > 166 |             import React, { useState, useRef, useEffect, useCallback } from "react";
        |                             ^^^^^^^^^^^^^^^^
    167 | import SolidityEditor from "../components/SolidityEditor";
    168 | import { CompiledOutput, TestCase } from "../types";
    169 | import Lesson from "../components/Lesson";
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:166:29
TS2695: Left side of comma operator is unused and has no side effects.
    164 |               className={`form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out ${isLessonCompleted ? 'lesson-completed-checkbox' : ''}`}
    165 |             />
  > 166 |             import React, { useState, useRef, useEffect, useCallback } from "react";
        |                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    167 | import SolidityEditor from "../components/SolidityEditor";
    168 | import { CompiledOutput, TestCase } from "../types";
    169 | import Lesson from "../components/Lesson";
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:168:10
TS2693: 'CompiledOutput' only refers to a type, but is being used as a value here.
    166 |             import React, { useState, useRef, useEffect, useCallback } from "react";
    167 | import SolidityEditor from "../components/SolidityEditor";
  > 168 | import { CompiledOutput, TestCase } from "../types";
        |          ^^^^^^^^^^^^^^
    169 | import Lesson from "../components/Lesson";
    170 | import ScrollIndicator from "../components/ScrollIndicator";
    171 | import { useAuth } from "../context/AuthContext"; // Import useAuth
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:168:10
TS2695: Left side of comma operator is unused and has no side effects.
    166 |             import React, { useState, useRef, useEffect, useCallback } from "react";
    167 | import SolidityEditor from "../components/SolidityEditor";
  > 168 | import { CompiledOutput, TestCase } from "../types";
        |          ^^^^^^^^^^^^^^
    169 | import Lesson from "../components/Lesson";
    170 | import ScrollIndicator from "../components/ScrollIndicator";
    171 | import { useAuth } from "../context/AuthContext"; // Import useAuth
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:168:26
TS2693: 'TestCase' only refers to a type, but is being used as a value here.
    166 |             import React, { useState, useRef, useEffect, useCallback } from "react";
    167 | import SolidityEditor from "../components/SolidityEditor";
  > 168 | import { CompiledOutput, TestCase } from "../types";
        |                          ^^^^^^^^
    169 | import Lesson from "../components/Lesson";
    170 | import ScrollIndicator from "../components/ScrollIndicator";
    171 | import { useAuth } from "../context/AuthContext"; // Import useAuth
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:174:45
TS1003: Identifier expected.
    172 | import { lessons } from "../lessons"; // Import lessons array
    173 |
  > 174 | const IntegersAndUnsignedIntegers: React.FC<{
        |                                             ^
    175 |   setCurrentPage: (page: string) => void;
    176 |   lessonId: string; // Add lessonId as a prop
    177 | }> = ({ setCurrentPage, lessonId }) => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:175:3
TS1005: '...' expected.
    173 |
    174 | const IntegersAndUnsignedIntegers: React.FC<{
  > 175 |   setCurrentPage: (page: string) => void;
        |   ^^^^^^^^^^^^^^
    176 |   lessonId: string; // Add lessonId as a prop
    177 | }> = ({ setCurrentPage, lessonId }) => {
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:175:17
TS1005: '}' expected.
    173 |
    174 | const IntegersAndUnsignedIntegers: React.FC<{
  > 175 |   setCurrentPage: (page: string) => void;
        |                 ^
    176 |   lessonId: string; // Add lessonId as a prop
    177 | }> = ({ setCurrentPage, lessonId }) => {
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:175:35
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    173 |
    174 | const IntegersAndUnsignedIntegers: React.FC<{
  > 175 |   setCurrentPage: (page: string) => void;
        |                                   ^
    176 |   lessonId: string; // Add lessonId as a prop
    177 | }> = ({ setCurrentPage, lessonId }) => {
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:177:1
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    175 |   setCurrentPage: (page: string) => void;
    176 |   lessonId: string; // Add lessonId as a prop
  > 177 | }> = ({ setCurrentPage, lessonId }) => {
        | ^
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
    179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    180 |     null,
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:177:2
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    175 |   setCurrentPage: (page: string) => void;
    176 |   lessonId: string; // Add lessonId as a prop
  > 177 | }> = ({ setCurrentPage, lessonId }) => {
        |  ^
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
    179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    180 |     null,
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:177:9
TS2695: Left side of comma operator is unused and has no side effects.
    175 |   setCurrentPage: (page: string) => void;
    176 |   lessonId: string; // Add lessonId as a prop
  > 177 | }> = ({ setCurrentPage, lessonId }) => {
        |         ^^^^^^^^^^^^^^
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
    179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    180 |     null,
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:177:38
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    175 |   setCurrentPage: (page: string) => void;
    176 |   lessonId: string; // Add lessonId as a prop
  > 177 | }> = ({ setCurrentPage, lessonId }) => {
        |                                      ^
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
    179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    180 |     null,
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:178:3
TS1109: Expression expected.
    176 |   lessonId: string; // Add lessonId as a prop
    177 | }> = ({ setCurrentPage, lessonId }) => {
  > 178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
        |   ^^^^^
    179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    180 |     null,
    181 |   );
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:178:11
TS2695: Left side of comma operator is unused and has no side effects.
    176 |   lessonId: string; // Add lessonId as a prop
    177 | }> = ({ setCurrentPage, lessonId }) => {
  > 178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
        |           ^^^^
    179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
    180 |     null,
    181 |   );
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:179:56
TS2693: 'CompiledOutput' only refers to a type, but is being used as a value here.
    177 | }> = ({ setCurrentPage, lessonId }) => {
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
  > 179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
        |                                                        ^^^^^^^^^^^^^^
    180 |     null,
    181 |   );
    182 |   const [testResults, setTestResults] = useState<TestCase[]>([]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:179:71
TS1003: Identifier expected.
    177 | }> = ({ setCurrentPage, lessonId }) => {
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
  > 179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
        |                                                                       ^
    180 |     null,
    181 |   );
    182 |   const [testResults, setTestResults] = useState<TestCase[]>([]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:179:77
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    177 | }> = ({ setCurrentPage, lessonId }) => {
    178 |   const { user, token } = useAuth(); // Get user and token from AuthContext
  > 179 |   const [compiledResult, setCompiledResult] = useState<CompiledOutput | null>(
        |                                                                             ^
    180 |     null,
    181 |   );
    182 |   const [testResults, setTestResults] = useState<TestCase[]>([]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:182:50
TS2693: 'TestCase' only refers to a type, but is being used as a value here.
    180 |     null,
    181 |   );
  > 182 |   const [testResults, setTestResults] = useState<TestCase[]>([]);
        |                                                  ^^^^^^^^
    183 |   const [isScrollable, setIsScrollable] = useState(false);
    184 |   const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    185 |   const testResultsContainerRef = useRef<HTMLDivElement>(null);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:182:58
TS1003: Identifier expected.
    180 |     null,
    181 |   );
  > 182 |   const [testResults, setTestResults] = useState<TestCase[]>([]);
        |                                                          ^
    183 |   const [isScrollable, setIsScrollable] = useState(false);
    184 |   const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    185 |   const testResultsContainerRef = useRef<HTMLDivElement>(null);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:182:60
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    180 |     null,
    181 |   );
  > 182 |   const [testResults, setTestResults] = useState<TestCase[]>([]);
        |                                                            ^
    183 |   const [isScrollable, setIsScrollable] = useState(false);
    184 |   const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    185 |   const testResultsContainerRef = useRef<HTMLDivElement>(null);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:185:42
TS17008: JSX element 'HTMLDivElement' has no corresponding closing tag.
    183 |   const [isScrollable, setIsScrollable] = useState(false);
    184 |   const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  > 185 |   const testResultsContainerRef = useRef<HTMLDivElement>(null);
        |                                          ^^^^^^^^^^^^^^
    186 |   const [isLessonCompleted, setIsLessonCompleted] = useState(false); // New state for completion
    187 |   const [canMarkComplete, setCanMarkComplete] = useState(false); // New state for test pass status
    188 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:185:42
TS2786: 'HTMLDivElement' cannot be used as a JSX component.
  Its instance type 'HTMLDivElement' is not a valid JSX element.
    Type 'HTMLDivElement' is missing the following properties from type 'ElementClass': render, context, setState, forceUpdate, and 3 more.
    183 |   const [isScrollable, setIsScrollable] = useState(false);
    184 |   const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  > 185 |   const testResultsContainerRef = useRef<HTMLDivElement>(null);
        |                                          ^^^^^^^^^^^^^^
    186 |   const [isLessonCompleted, setIsLessonCompleted] = useState(false); // New state for completion
    187 |   const [canMarkComplete, setCanMarkComplete] = useState(false); // New state for test pass status
    188 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:189:80
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    187 |   const [canMarkComplete, setCanMarkComplete] = useState(false); // New state for test pass status
    188 |
  > 189 |   const handleToggleLessonCompletion = useCallback(async (completed: boolean) => {
        |                                                                                ^
    190 |     if (!user || !token) {
    191 |       setCurrentPage('login');
    192 |       return;
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:190:5
TS1109: Expression expected.
    188 |
    189 |   const handleToggleLessonCompletion = useCallback(async (completed: boolean) => {
  > 190 |     if (!user || !token) {
        |     ^^
    191 |       setCurrentPage('login');
    192 |       return;
    193 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:191:30
TS1005: '}' expected.
    189 |   const handleToggleLessonCompletion = useCallback(async (completed: boolean) => {
    190 |     if (!user || !token) {
  > 191 |       setCurrentPage('login');
        |                              ^
    192 |       return;
    193 |     }
    194 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:193:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    191 |       setCurrentPage('login');
    192 |       return;
  > 193 |     }
        |     ^
    194 |
    195 |     try {
    196 |       const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:196:7
TS1109: Expression expected.
    194 |
    195 |     try {
  > 196 |       const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        |       ^^^^^
    197 |       const response = await fetch(`${backendUrl}/api/progress`, {
    198 |         method: 'POST',
    199 |         headers: {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:197:39
TS2304: Cannot find name 'backendUrl'.
    195 |     try {
    196 |       const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
  > 197 |       const response = await fetch(`${backendUrl}/api/progress`, {
        |                                       ^^^^^^^^^^
    198 |         method: 'POST',
    199 |         headers: {
    200 |           'Content-Type': 'application/json',
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:198:9
TS2304: Cannot find name 'method'.
    196 |       const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    197 |       const response = await fetch(`${backendUrl}/api/progress`, {
  > 198 |         method: 'POST',
        |         ^^^^^^
    199 |         headers: {
    200 |           'Content-Type': 'application/json',
    201 |           'Authorization': `Bearer ${token}`
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:198:15
TS1005: '}' expected.
    196 |       const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    197 |       const response = await fetch(`${backendUrl}/api/progress`, {
  > 198 |         method: 'POST',
        |               ^
    199 |         headers: {
    200 |           'Content-Type': 'application/json',
    201 |           'Authorization': `Bearer ${token}`
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:200:25
TS1005: '}' expected.
    198 |         method: 'POST',
    199 |         headers: {
  > 200 |           'Content-Type': 'application/json',
        |                         ^
    201 |           'Authorization': `Bearer ${token}`
    202 |         },
    203 |         body: JSON.stringify({ lessonId: lessonId, completed: completed }),
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:202:9
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    200 |           'Content-Type': 'application/json',
    201 |           'Authorization': `Bearer ${token}`
  > 202 |         },
        |         ^
    203 |         body: JSON.stringify({ lessonId: lessonId, completed: completed }),
    204 |       });
    205 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:203:40
TS1005: '}' expected.
    201 |           'Authorization': `Bearer ${token}`
    202 |         },
  > 203 |         body: JSON.stringify({ lessonId: lessonId, completed: completed }),
        |                                        ^
    204 |       });
    205 |
    206 |       if (response.ok) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:203:73
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    201 |           'Authorization': `Bearer ${token}`
    202 |         },
  > 203 |         body: JSON.stringify({ lessonId: lessonId, completed: completed }),
        |                                                                         ^
    204 |       });
    205 |
    206 |       if (response.ok) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:204:7
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    202 |         },
    203 |         body: JSON.stringify({ lessonId: lessonId, completed: completed }),
  > 204 |       });
        |       ^
    205 |
    206 |       if (response.ok) {
    207 |         setIsLessonCompleted(completed); // Update local state on success
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:207:30
TS2304: Cannot find name 'completed'.
    205 |
    206 |       if (response.ok) {
  > 207 |         setIsLessonCompleted(completed); // Update local state on success
        |                              ^^^^^^^^^
    208 |       } else {
    209 |         const errorData = await response.json();
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:207:40
TS1005: '}' expected.
    205 |
    206 |       if (response.ok) {
  > 207 |         setIsLessonCompleted(completed); // Update local state on success
        |                                        ^
    208 |       } else {
    209 |         const errorData = await response.json();
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:208:7
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    206 |       if (response.ok) {
    207 |         setIsLessonCompleted(completed); // Update local state on success
  > 208 |       } else {
        |       ^
    209 |         const errorData = await response.json();
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:209:9
TS1109: Expression expected.
    207 |         setIsLessonCompleted(completed); // Update local state on success
    208 |       } else {
  > 209 |         const errorData = await response.json();
        |         ^^^^^
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    212 |       }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:210:58
TS2304: Cannot find name 'errorData'.
    208 |       } else {
    209 |         const errorData = await response.json();
  > 210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
        |                                                          ^^^^^^^^^
    211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    212 |       }
    213 |     } catch (error) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:210:79
TS2552: Cannot find name 'response'. Did you mean 'Response'?
    208 |       } else {
    209 |         const errorData = await response.json();
  > 210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
        |                                                                               ^^^^^^^^
    211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    212 |       }
    213 |     } catch (error) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:211:50
TS2304: Cannot find name 'errorData'.
    209 |         const errorData = await response.json();
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
  > 211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
        |                                                  ^^^^^^^^^
    212 |       }
    213 |     } catch (error) {
    214 |       console.error("Error updating lesson status:", error);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:211:71
TS2552: Cannot find name 'response'. Did you mean 'Response'?
    209 |         const errorData = await response.json();
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
  > 211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
        |                                                                       ^^^^^^^^
    212 |       }
    213 |     } catch (error) {
    214 |       console.error("Error updating lesson status:", error);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:212:7
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    210 |         console.error(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
  > 212 |       }
        |       ^
    213 |     } catch (error) {
    214 |       console.error("Error updating lesson status:", error);
    215 |       alert("An error occurred while updating the lesson status.");
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:213:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    211 |         alert(`Failed to update lesson status: ${errorData.message || response.statusText}`);
    212 |       }
  > 213 |     } catch (error) {
        |     ^
    214 |       console.error("Error updating lesson status:", error);
    215 |       alert("An error occurred while updating the lesson status.");
    216 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:214:54
TS2552: Cannot find name 'error'. Did you mean 'Error'?
    212 |       }
    213 |     } catch (error) {
  > 214 |       console.error("Error updating lesson status:", error);
        |                                                      ^^^^^
    215 |       alert("An error occurred while updating the lesson status.");
    216 |     }
    217 |   }, [user, token, lessonId, setCurrentPage]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:214:60
TS1005: '}' expected.
    212 |       }
    213 |     } catch (error) {
  > 214 |       console.error("Error updating lesson status:", error);
        |                                                            ^
    215 |       alert("An error occurred while updating the lesson status.");
    216 |     }
    217 |   }, [user, token, lessonId, setCurrentPage]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:216:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    214 |       console.error("Error updating lesson status:", error);
    215 |       alert("An error occurred while updating the lesson status.");
  > 216 |     }
        |     ^
    217 |   }, [user, token, lessonId, setCurrentPage]);
    218 |
    219 |   useEffect(() => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:217:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    215 |       alert("An error occurred while updating the lesson status.");
    216 |     }
  > 217 |   }, [user, token, lessonId, setCurrentPage]);
        |   ^
    218 |
    219 |   useEffect(() => {
    220 |     const container = testResultsContainerRef.current;
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:219:17
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    217 |   }, [user, token, lessonId, setCurrentPage]);
    218 |
  > 219 |   useEffect(() => {
        |                 ^
    220 |     const container = testResultsContainerRef.current;
    221 |     if (container) {
    222 |       const isNowScrollable = container.scrollHeight > container.clientHeight;
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:220:5
TS1109: Expression expected.
    218 |
    219 |   useEffect(() => {
  > 220 |     const container = testResultsContainerRef.current;
        |     ^^^^^
    221 |     if (container) {
    222 |       const isNowScrollable = container.scrollHeight > container.clientHeight;
    223 |       setIsScrollable(isNowScrollable);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:222:7
TS1109: Expression expected.
    220 |     const container = testResultsContainerRef.current;
    221 |     if (container) {
  > 222 |       const isNowScrollable = container.scrollHeight > container.clientHeight;
        |       ^^^^^
    223 |       setIsScrollable(isNowScrollable);
    224 |       setShowScrollIndicator(isNowScrollable);
    225 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:222:54
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    220 |     const container = testResultsContainerRef.current;
    221 |     if (container) {
  > 222 |       const isNowScrollable = container.scrollHeight > container.clientHeight;
        |                                                      ^
    223 |       setIsScrollable(isNowScrollable);
    224 |       setShowScrollIndicator(isNowScrollable);
    225 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:225:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    223 |       setIsScrollable(isNowScrollable);
    224 |       setShowScrollIndicator(isNowScrollable);
  > 225 |     }
        |     ^
    226 |   }, [testResults]);
    227 |
    228 |   useEffect(() => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:226:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    224 |       setShowScrollIndicator(isNowScrollable);
    225 |     }
  > 226 |   }, [testResults]);
        |   ^
    227 |
    228 |   useEffect(() => {
    229 |     if (testResults.length > 0) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:228:17
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    226 |   }, [testResults]);
    227 |
  > 228 |   useEffect(() => {
        |                 ^
    229 |     if (testResults.length > 0) {
    230 |       const allTestsPassed = testResults.every(test => test.passed);
    231 |       setCanMarkComplete(allTestsPassed);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:229:5
TS1109: Expression expected.
    227 |
    228 |   useEffect(() => {
  > 229 |     if (testResults.length > 0) {
        |     ^^
    230 |       const allTestsPassed = testResults.every(test => test.passed);
    231 |       setCanMarkComplete(allTestsPassed);
    232 |     } else {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:229:28
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    227 |
    228 |   useEffect(() => {
  > 229 |     if (testResults.length > 0) {
        |                            ^
    230 |       const allTestsPassed = testResults.every(test => test.passed);
    231 |       setCanMarkComplete(allTestsPassed);
    232 |     } else {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:230:7
TS1109: Expression expected.
    228 |   useEffect(() => {
    229 |     if (testResults.length > 0) {
  > 230 |       const allTestsPassed = testResults.every(test => test.passed);
        |       ^^^^^
    231 |       setCanMarkComplete(allTestsPassed);
    232 |     } else {
    233 |       setCanMarkComplete(false); // No tests run yet or no tests defined
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:230:54
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    228 |   useEffect(() => {
    229 |     if (testResults.length > 0) {
  > 230 |       const allTestsPassed = testResults.every(test => test.passed);
        |                                                      ^
    231 |       setCanMarkComplete(allTestsPassed);
    232 |     } else {
    233 |       setCanMarkComplete(false); // No tests run yet or no tests defined
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:232:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    230 |       const allTestsPassed = testResults.every(test => test.passed);
    231 |       setCanMarkComplete(allTestsPassed);
  > 232 |     } else {
        |     ^
    233 |       setCanMarkComplete(false); // No tests run yet or no tests defined
    234 |     }
    235 |   }, [testResults]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:233:32
TS1005: '}' expected.
    231 |       setCanMarkComplete(allTestsPassed);
    232 |     } else {
  > 233 |       setCanMarkComplete(false); // No tests run yet or no tests defined
        |                                ^
    234 |     }
    235 |   }, [testResults]);
    236 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:234:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    232 |     } else {
    233 |       setCanMarkComplete(false); // No tests run yet or no tests defined
  > 234 |     }
        |     ^
    235 |   }, [testResults]);
    236 |
    237 |   useEffect(() => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:235:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    233 |       setCanMarkComplete(false); // No tests run yet or no tests defined
    234 |     }
  > 235 |   }, [testResults]);
        |   ^
    236 |
    237 |   useEffect(() => {
    238 |     // Automatically mark lesson complete if all tests pass and it's not already completed
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:237:17
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    235 |   }, [testResults]);
    236 |
  > 237 |   useEffect(() => {
        |                 ^
    238 |     // Automatically mark lesson complete if all tests pass and it's not already completed
    239 |     if (canMarkComplete && !isLessonCompleted) {
    240 |       handleToggleLessonCompletion(true);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:239:5
TS1109: Expression expected.
    237 |   useEffect(() => {
    238 |     // Automatically mark lesson complete if all tests pass and it's not already completed
  > 239 |     if (canMarkComplete && !isLessonCompleted) {
        |     ^^
    240 |       handleToggleLessonCompletion(true);
    241 |     }
    242 |   }, [canMarkComplete, isLessonCompleted, handleToggleLessonCompletion]);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:240:41
TS1005: '}' expected.
    238 |     // Automatically mark lesson complete if all tests pass and it's not already completed
    239 |     if (canMarkComplete && !isLessonCompleted) {
  > 240 |       handleToggleLessonCompletion(true);
        |                                         ^
    241 |     }
    242 |   }, [canMarkComplete, isLessonCompleted, handleToggleLessonCompletion]);
    243 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:241:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    239 |     if (canMarkComplete && !isLessonCompleted) {
    240 |       handleToggleLessonCompletion(true);
  > 241 |     }
        |     ^
    242 |   }, [canMarkComplete, isLessonCompleted, handleToggleLessonCompletion]);
    243 |
    244 |   const handleScroll = () => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:242:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    240 |       handleToggleLessonCompletion(true);
    241 |     }
  > 242 |   }, [canMarkComplete, isLessonCompleted, handleToggleLessonCompletion]);
        |   ^
    243 |
    244 |   const handleScroll = () => {
    245 |     const container = testResultsContainerRef.current;
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:244:28
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    242 |   }, [canMarkComplete, isLessonCompleted, handleToggleLessonCompletion]);
    243 |
  > 244 |   const handleScroll = () => {
        |                            ^
    245 |     const container = testResultsContainerRef.current;
    246 |     if (container) {
    247 |       const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:245:5
TS1109: Expression expected.
    243 |
    244 |   const handleScroll = () => {
  > 245 |     const container = testResultsContainerRef.current;
        |     ^^^^^
    246 |     if (container) {
    247 |       const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
    248 |       setShowScrollIndicator(!isAtBottom);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:247:7
TS1109: Expression expected.
    245 |     const container = testResultsContainerRef.current;
    246 |     if (container) {
  > 247 |       const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
        |       ^^^^^
    248 |       setShowScrollIndicator(!isAtBottom);
    249 |     }
    250 |   };
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:247:71
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    245 |     const container = testResultsContainerRef.current;
    246 |     if (container) {
  > 247 |       const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
        |                                                                       ^
    248 |       setShowScrollIndicator(!isAtBottom);
    249 |     }
    250 |   };
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:249:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    247 |       const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5; // 5px buffer
    248 |       setShowScrollIndicator(!isAtBottom);
  > 249 |     }
        |     ^
    250 |   };
    251 |
    252 |   useEffect(() => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:250:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    248 |       setShowScrollIndicator(!isAtBottom);
    249 |     }
  > 250 |   };
        |   ^
    251 |
    252 |   useEffect(() => {
    253 |     const fetchLessonStatus = async () => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:252:17
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    250 |   };
    251 |
  > 252 |   useEffect(() => {
        |                 ^
    253 |     const fetchLessonStatus = async () => {
    254 |       if (user && token) {
    255 |         try {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:253:5
TS1109: Expression expected.
    251 |
    252 |   useEffect(() => {
  > 253 |     const fetchLessonStatus = async () => {
        |     ^^^^^
    254 |       if (user && token) {
    255 |         try {
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:253:41
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    251 |
    252 |   useEffect(() => {
  > 253 |     const fetchLessonStatus = async () => {
        |                                         ^
    254 |       if (user && token) {
    255 |         try {
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:254:7
TS1109: Expression expected.
    252 |   useEffect(() => {
    253 |     const fetchLessonStatus = async () => {
  > 254 |       if (user && token) {
        |       ^^
    255 |         try {
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    257 |           const response = await fetch(`${backendUrl}/api/progress`, {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:255:9
TS1109: Expression expected.
    253 |     const fetchLessonStatus = async () => {
    254 |       if (user && token) {
  > 255 |         try {
        |         ^^^
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    257 |           const response = await fetch(`${backendUrl}/api/progress`, {
    258 |             headers: {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:256:11
TS1109: Expression expected.
    254 |       if (user && token) {
    255 |         try {
  > 256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        |           ^^^^^
    257 |           const response = await fetch(`${backendUrl}/api/progress`, {
    258 |             headers: {
    259 |               'Authorization': `Bearer ${token}`
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:257:43
TS2304: Cannot find name 'backendUrl'.
    255 |         try {
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
  > 257 |           const response = await fetch(`${backendUrl}/api/progress`, {
        |                                           ^^^^^^^^^^
    258 |             headers: {
    259 |               'Authorization': `Bearer ${token}`
    260 |             }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:258:13
TS2552: Cannot find name 'headers'. Did you mean 'Headers'?
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    257 |           const response = await fetch(`${backendUrl}/api/progress`, {
  > 258 |             headers: {
        |             ^^^^^^^
    259 |               'Authorization': `Bearer ${token}`
    260 |             }
    261 |           });
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:258:20
TS1005: '}' expected.
    256 |           const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    257 |           const response = await fetch(`${backendUrl}/api/progress`, {
  > 258 |             headers: {
        |                    ^
    259 |               'Authorization': `Bearer ${token}`
    260 |             }
    261 |           });
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:259:30
TS1005: '}' expected.
    257 |           const response = await fetch(`${backendUrl}/api/progress`, {
    258 |             headers: {
  > 259 |               'Authorization': `Bearer ${token}`
        |                              ^
    260 |             }
    261 |           });
    262 |           if (response.ok) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:260:13
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    258 |             headers: {
    259 |               'Authorization': `Bearer ${token}`
  > 260 |             }
        |             ^
    261 |           });
    262 |           if (response.ok) {
    263 |             const progressData = await response.json();
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:261:11
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    259 |               'Authorization': `Bearer ${token}`
    260 |             }
  > 261 |           });
        |           ^
    262 |           if (response.ok) {
    263 |             const progressData = await response.json();
    264 |             const completed = progressData.some((p: any) => p.lessonId === lessonId && p.completed);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:263:13
TS1109: Expression expected.
    261 |           });
    262 |           if (response.ok) {
  > 263 |             const progressData = await response.json();
        |             ^^^^^
    264 |             const completed = progressData.some((p: any) => p.lessonId === lessonId && p.completed);
    265 |             setIsLessonCompleted(completed);
    266 |           } else {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:264:59
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    262 |           if (response.ok) {
    263 |             const progressData = await response.json();
  > 264 |             const completed = progressData.some((p: any) => p.lessonId === lessonId && p.completed);
        |                                                           ^
    265 |             setIsLessonCompleted(completed);
    266 |           } else {
    267 |             console.error('Failed to fetch progress:', response.statusText);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:266:11
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    264 |             const completed = progressData.some((p: any) => p.lessonId === lessonId && p.completed);
    265 |             setIsLessonCompleted(completed);
  > 266 |           } else {
        |           ^
    267 |             console.error('Failed to fetch progress:', response.statusText);
    268 |           }
    269 |         } catch (error) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:267:56
TS2304: Cannot find name 'response'.
    265 |             setIsLessonCompleted(completed);
    266 |           } else {
  > 267 |             console.error('Failed to fetch progress:', response.statusText);
        |                                                        ^^^^^^^^
    268 |           }
    269 |         } catch (error) {
    270 |           console.error('Error fetching progress:', error);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:267:76
TS1005: '}' expected.
    265 |             setIsLessonCompleted(completed);
    266 |           } else {
  > 267 |             console.error('Failed to fetch progress:', response.statusText);
        |                                                                            ^
    268 |           }
    269 |         } catch (error) {
    270 |           console.error('Error fetching progress:', error);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:268:11
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    266 |           } else {
    267 |             console.error('Failed to fetch progress:', response.statusText);
  > 268 |           }
        |           ^
    269 |         } catch (error) {
    270 |           console.error('Error fetching progress:', error);
    271 |         }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:269:9
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    267 |             console.error('Failed to fetch progress:', response.statusText);
    268 |           }
  > 269 |         } catch (error) {
        |         ^
    270 |           console.error('Error fetching progress:', error);
    271 |         }
    272 |       } else {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:270:53
TS2304: Cannot find name 'error'.
    268 |           }
    269 |         } catch (error) {
  > 270 |           console.error('Error fetching progress:', error);
        |                                                     ^^^^^
    271 |         }
    272 |       } else {
    273 |         setIsLessonCompleted(false); // Not completed if no user
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:270:59
TS1005: '}' expected.
    268 |           }
    269 |         } catch (error) {
  > 270 |           console.error('Error fetching progress:', error);
        |                                                           ^
    271 |         }
    272 |       } else {
    273 |         setIsLessonCompleted(false); // Not completed if no user
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:271:9
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    269 |         } catch (error) {
    270 |           console.error('Error fetching progress:', error);
  > 271 |         }
        |         ^
    272 |       } else {
    273 |         setIsLessonCompleted(false); // Not completed if no user
    274 |       }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:272:7
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    270 |           console.error('Error fetching progress:', error);
    271 |         }
  > 272 |       } else {
        |       ^
    273 |         setIsLessonCompleted(false); // Not completed if no user
    274 |       }
    275 |     };
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:273:36
TS1005: '}' expected.
    271 |         }
    272 |       } else {
  > 273 |         setIsLessonCompleted(false); // Not completed if no user
        |                                    ^
    274 |       }
    275 |     };
    276 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:274:7
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    272 |       } else {
    273 |         setIsLessonCompleted(false); // Not completed if no user
  > 274 |       }
        |       ^
    275 |     };
    276 |
    277 |     fetchLessonStatus();
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:275:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    273 |         setIsLessonCompleted(false); // Not completed if no user
    274 |       }
  > 275 |     };
        |     ^
    276 |
    277 |     fetchLessonStatus();
    278 |   }, [user, token, lessonId]); // Re-fetch when user or lessonId changes
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:278:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    276 |
    277 |     fetchLessonStatus();
  > 278 |   }, [user, token, lessonId]); // Re-fetch when user or lessonId changes
        |   ^
    279 |
    280 |   const handleGoToPreviousLesson = () => {
    281 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:280:40
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    278 |   }, [user, token, lessonId]); // Re-fetch when user or lessonId changes
    279 |
  > 280 |   const handleGoToPreviousLesson = () => {
        |                                        ^
    281 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
    282 |     const previousLessonIndex = currentLessonIndex - 1;
    283 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:281:5
TS1109: Expression expected.
    279 |
    280 |   const handleGoToPreviousLesson = () => {
  > 281 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
        |     ^^^^^
    282 |     const previousLessonIndex = currentLessonIndex - 1;
    283 |
    284 |     if (previousLessonIndex >= 0) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:281:58
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    279 |
    280 |   const handleGoToPreviousLesson = () => {
  > 281 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
        |                                                          ^
    282 |     const previousLessonIndex = currentLessonIndex - 1;
    283 |
    284 |     if (previousLessonIndex >= 0) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:284:29
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    282 |     const previousLessonIndex = currentLessonIndex - 1;
    283 |
  > 284 |     if (previousLessonIndex >= 0) {
        |                             ^
    285 |       const previousLesson = lessons[previousLessonIndex];
    286 |       setCurrentPage(previousLesson.id);
    287 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:285:7
TS1109: Expression expected.
    283 |
    284 |     if (previousLessonIndex >= 0) {
  > 285 |       const previousLesson = lessons[previousLessonIndex];
        |       ^^^^^
    286 |       setCurrentPage(previousLesson.id);
    287 |     }
    288 |   };
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:287:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    285 |       const previousLesson = lessons[previousLessonIndex];
    286 |       setCurrentPage(previousLesson.id);
  > 287 |     }
        |     ^
    288 |   };
    289 |
    290 |   const handleGoToNextLesson = () => {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:288:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    286 |       setCurrentPage(previousLesson.id);
    287 |     }
  > 288 |   };
        |   ^
    289 |
    290 |   const handleGoToNextLesson = () => {
    291 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:290:36
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    288 |   };
    289 |
  > 290 |   const handleGoToNextLesson = () => {
        |                                    ^
    291 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
    292 |     const nextLessonIndex = currentLessonIndex + 1;
    293 |
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:291:5
TS1109: Expression expected.
    289 |
    290 |   const handleGoToNextLesson = () => {
  > 291 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
        |     ^^^^^
    292 |     const nextLessonIndex = currentLessonIndex + 1;
    293 |
    294 |     if (nextLessonIndex < lessons.length) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:291:58
TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
    289 |
    290 |   const handleGoToNextLesson = () => {
  > 291 |     const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
        |                                                          ^
    292 |     const nextLessonIndex = currentLessonIndex + 1;
    293 |
    294 |     if (nextLessonIndex < lessons.length) {
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:294:27
TS2604: JSX element type 'lessons.length' does not have any construct or call signatures.
    292 |     const nextLessonIndex = currentLessonIndex + 1;
    293 |
  > 294 |     if (nextLessonIndex < lessons.length) {
        |                           ^^^^^^^^^^^^^^
    295 |       const nextLesson = lessons[nextLessonIndex];
    296 |       setCurrentPage(nextLesson.id);
    297 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:294:41
TS1003: Identifier expected.
    292 |     const nextLessonIndex = currentLessonIndex + 1;
    293 |
  > 294 |     if (nextLessonIndex < lessons.length) {
        |                                         ^
    295 |       const nextLesson = lessons[nextLessonIndex];
    296 |       setCurrentPage(nextLesson.id);
    297 |     }
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:295:7
TS1109: Expression expected.
    293 |
    294 |     if (nextLessonIndex < lessons.length) {
  > 295 |       const nextLesson = lessons[nextLessonIndex];
        |       ^^^^^
    296 |       setCurrentPage(nextLesson.id);
    297 |     }
    298 |   };
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:297:5
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    295 |       const nextLesson = lessons[nextLessonIndex];
    296 |       setCurrentPage(nextLesson.id);
  > 297 |     }
        |     ^
    298 |   };
    299 |
    300 |   return (
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:298:3
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    296 |       setCurrentPage(nextLesson.id);
    297 |     }
  > 298 |   };
        |   ^
    299 |
    300 |   return (
    301 |     <main className="pt-32 pb-20 flex-grow">
ERROR in src/lessons/IntegersAndUnsignedIntegers.tsx:356:1
TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    354 |     </main>
    355 |   );
  > 356 | };
        | ^
    357 |
    358 | export default IntegersAndUnsignedIntegers;
    359 |             <button