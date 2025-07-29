
import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runLesson1Tests = (compiledResult: CompiledOutput | null): TestCase[] => {
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
  let greetFunctionExistsTest: TestCase = {
    description:
      "Contract contains a public state variable or function named 'greet'",
    passed: false,
  };
  let greetFunctionReturnsStringTest: TestCase = {
    description: "'greet' function should return a string",
    passed: false,
  };
  if (contract) {
    const abi = contract.abi as AbiItem[];
    const greetFunction = abi.find((func) => func.name === "greet");
    greetFunctionExistsTest.passed = !!greetFunction;
    greetFunctionReturnsStringTest.passed = 
      !!greetFunction && greetFunction.outputs[0].type === "string";
  }
  return [
    contractExistsTest,
    greetFunctionExistsTest,
    greetFunctionReturnsStringTest,
  ];
};
