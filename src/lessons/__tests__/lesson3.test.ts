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
      passed: !!getNumber && getNumber.outputs[0].type === "uint256",
    },
  ];
};
