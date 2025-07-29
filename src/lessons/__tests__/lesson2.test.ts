
import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runLesson2Tests = (compiledResult: CompiledOutput | null): TestCase[] => {
  if (!compiledResult || compiledResult.errors) {
    return [
      {
        description: "Compilation must pass before tests can run.",
        passed: false,
      },
    ];
  }
  const contract = compiledResult.contracts["contract.sol"]?.VariableTypes;
  if (!contract) {
    return [
      { description: "Contract 'VariableTypes' not found.", passed: false },
    ];
  }
  const abi = contract.abi;
  const myUint = abi.find((v: AbiItem) => v.name === "myUint");
  const myString = abi.find((v: AbiItem) => v.name === "myString");
  const myBool = abi.find((v: AbiItem) => v.name === "myBool");

  return [
    {
      description: "Contract must be named 'VariableTypes'",
      passed: !!contract,
    },
    {
      description: "A public uint256 variable named 'myUint' exists",
      passed: !!myUint && myUint.outputs[0].type === "uint256",
    },
    {
      description: "A public string variable named 'myString' exists",
      passed: !!myString && myString.outputs[0].type === "string",
    },
    {
      description: "A public bool variable named 'myBool' exists",
      passed: !!myBool && myBool.outputs[0].type === "bool",
    },
  ];
};
