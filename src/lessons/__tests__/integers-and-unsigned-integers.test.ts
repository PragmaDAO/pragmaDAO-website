import { CompiledOutput, TestCase } from "../../types";

export const runIntegersAndUnsignedIntegersTests = (compiledResult: CompiledOutput | null): TestCase[] => {
  if (!compiledResult || compiledResult.errors) {
    return [
      {
        description: "Compilation must pass before tests can run.",
        passed: false,
      },
    ];
  }

  const contract = compiledResult.contracts["contract.sol"]?.IntegerBasics;

  return [
    {
      description: "Contract 'IntegerBasics' should be defined",
      passed: !!contract,
    },
  ];
};
