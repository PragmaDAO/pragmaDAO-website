import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runUnderstandingFunctionsTests = (compiledResult: CompiledOutput | null): TestCase[] => {
  if (!compiledResult || compiledResult.errors) {
    return [
      {
        description: "Compilation must pass before tests can run.",
        passed: false,
      },
    ];
  }
  const contract = compiledResult.contracts["contract.sol"]?.SimpleFunctions;
  if (!contract) {
    return [
      { description: "Contract 'SimpleFunctions' not found.", passed: false },
    ];
  }
  const abi = contract.abi;
  const getNumber = abi.find((v: AbiItem) => v.name === "getNumber");
  const subtract = abi.find((v: AbiItem) => v.name === "subtract");
  const multiply = abi.find((v: AbiItem) => v.name === "multiply");
  console.log('abi:', abi);

  return [
    {
      description: "Contract must be named 'SimpleFunctions'",
      passed: !!contract,
    },
    {
      description: "A public function named 'getNumber' exists",
      passed: !!getNumber && getNumber.type === "function",
    },
    {
      description: "'getNumber' function should be pure",
      passed: !!getNumber && getNumber.stateMutability === "pure",
    },
    {
      description: "'getNumber' function should return a uint256",
      passed: !!getNumber && getNumber.outputs[0].type.includes("uint"),
    },
    {
      description: "A public function named 'subtract' exists",
      passed: !!subtract && subtract.type === "function",
    },
    {
      description: "'subtract' function should take two uint256 parameters",
      passed:
        !!subtract &&
        subtract.inputs.length === 2 &&
        subtract.inputs[0].type.includes("uint") &&
        subtract.inputs[1].type.includes("uint"),
    },
    {
      description: "'subtract' function should return a uint256",
      passed: !!subtract && subtract.outputs[0].type.includes("uint"),
    },
    {
      description: "'subtract' function should be pure",
      passed: !!subtract && subtract.stateMutability === "pure",
    },
    {
      description: "A public function named 'multiply' exists",
      passed: !!multiply && multiply.type === "function",
    },
    {
      description: "'multiply' function should take two uint256 parameters",
      passed:
        !!multiply &&
        multiply.inputs.length === 2 &&
        multiply.inputs[0].type.includes("uint") &&
        multiply.inputs[1].type.includes("uint"),
    },
    {
      description: "'multiply' function should return a uint256",
      passed: !!multiply && multiply.outputs[0].type.includes("uint"),
    },
    {
      description: "'multiply' function should be pure",
      passed: !!multiply && multiply.stateMutability === "pure",
    },
  ];
};
