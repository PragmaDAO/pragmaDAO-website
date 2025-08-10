import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runLesson3Tests = (compiledResult: CompiledOutput | null): TestCase[] => {
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
  const difference = abi.find((v: AbiItem) => v.name === "difference");
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
      description: "A public function named 'difference' exists",
      passed: !!difference && difference.type === "function",
    },
    {
      description: "'difference' function should take two uint256 parameters",
      passed:
        !!difference &&
        difference.inputs.length === 2 &&
        difference.inputs[0].type.includes("uint") &&
        difference.inputs[1].type.includes("uint"),
    },
    {
      description: "'difference' function should return a uint256",
      passed: !!difference && difference.outputs[0].type.includes("uint"),
    },
    {
      description: "'difference' function should be pure",
      passed: !!difference && difference.stateMutability === "pure",
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
