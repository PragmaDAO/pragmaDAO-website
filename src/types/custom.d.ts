declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.sol?raw' {
  const content: string;
  export default content;
}

declare module '*.sol' {
  const content: string;
  export default content;
}
