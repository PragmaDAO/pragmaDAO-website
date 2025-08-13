import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runHelloWorldTests = (compiledResult: CompiledOutput | null): TestCase[] => {
  if (!compiledResult || compiledResult.errors) {
    return [
      {
        description: "Compilation must pass before tests can run.",
        passed: false,
      },
    ];
  }

  const contract = compiledResult.contracts["contract.sol"]?.HelloWorld;
  
  const contractExistsTest: TestCase = {
    description: "A contract named 'HelloWorld' is defined",
    passed: !!contract,
  };
  let greetingFunctionExistsTest: TestCase = {
    description:
      "Contract contains a public state variable or function named 'greeting'",
    passed: false,
  };
  let greetingFunctionReturnsStringTest: TestCase = {
    description: "'greeting' function should return a string",
    passed: false,
  };
  if (contract) {
    const abi = contract.abi as AbiItem[];
    const greetingFunction = abi.find((func) => func.name === "greeting");
    greetingFunctionExistsTest.passed = !!greetingFunction;
    greetingFunctionReturnsStringTest.passed = 
      !!greetingFunction && greetingFunction.outputs[0].type === "string";
  }
  return [
    contractExistsTest,
    greetingFunctionExistsTest,
    greetingFunctionReturnsStringTest,
  ];
};