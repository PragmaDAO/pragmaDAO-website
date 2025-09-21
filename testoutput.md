Compiled with problems:
×
ERROR in src/components/SolidityEditor.tsx:51:38
TS2339: Property 'viewPlugin' does not exist on type 'typeof EditorView'.
    49 |
    50 | // Add a view plugin to force DOM updates
  > 51 | const booleanViewPlugin = EditorView.viewPlugin.define(view => {
       |                                      ^^^^^^^^^^
    52 |   return {
    53 |     update(update) {
    54 |       if (update.docChanged) {
ERROR in src/components/SolidityEditor.tsx:51:56
TS7006: Parameter 'view' implicitly has an 'any' type.
    49 |
    50 | // Add a view plugin to force DOM updates
  > 51 | const booleanViewPlugin = EditorView.viewPlugin.define(view => {
       |                                                        ^^^^
    52 |   return {
    53 |     update(update) {
    54 |       if (update.docChanged) {
ERROR in src/components/SolidityEditor.tsx:53:12
TS7006: Parameter 'update' implicitly has an 'any' type.
    51 | const booleanViewPlugin = EditorView.viewPlugin.define(view => {
    52 |   return {
  > 53 |     update(update) {
       |            ^^^^^^
    54 |       if (update.docChanged) {
    55 |         // Force re-render by adding a slight delay
    56 |         setTimeout(() => {
ERROR in src/components/SolidityEditor.tsx:58:28
TS7006: Parameter 'span' implicitly has an 'any' type.
    56 |         setTimeout(() => {
    57 |           const booleans = view.dom.querySelectorAll('.cm-content span');
  > 58 |           booleans.forEach(span => {
       |                            ^^^^
    59 |             if (span.textContent === 'true' || span.textContent === 'false') {
    60 |               span.style.color = '#ffeb3b';
    61 |               span.style.fontWeight = '700';