import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runGlobalVariablesTests = (compiledResult: CompiledOutput | null): TestCase[] => {
  if (!compiledResult || compiledResult.errors) {
    return [
      {
        description: "Compilation must pass before tests can run.",
        passed: false,
      },
    ];
  }

  const contract = compiledResult.contracts["contract.sol"]?.GlobalVariables;

  const contractExistsTest: TestCase = {
    description: "A contract named 'GlobalVariables' is defined",
    passed: !!contract,
  };

  let getSenderAddressExistsTest: TestCase = {
    description: "Contract contains a public view function named 'getSenderAddress'",
    passed: false,
  };

  let getBlockNumberValueExistsTest: TestCase = {
    description: "Contract contains a public view function named 'getBlockNumberValue'",
    passed: false,
  };

  let getTimestampExistsTest: TestCase = {
    description: "Contract contains a public view function named 'getTimestamp'",
    passed: false,
  };

  let getChainIdValueExistsTest: TestCase = {
    description: "Contract contains a public view function named 'getChainIdValue'",
    passed: false,
  };

  let receiveEtherExistsTest: TestCase = {
    description: "Contract contains a public payable function named 'receiveEther'",
    passed: false,
  };

  if (contract) {
    const abi = contract.abi as AbiItem[];

    const getSenderAddress = abi.find((item) => item.name === "getSenderAddress" && item.type === "function");
    getSenderAddressExistsTest.passed = !!getSenderAddress && getSenderAddress.stateMutability === 'view' && getSenderAddress.outputs?.[0].type === 'address';

    const getBlockNumberValue = abi.find((item) => item.name === "getBlockNumberValue" && item.type === "function");
    getBlockNumberValueExistsTest.passed = !!getBlockNumberValue && getBlockNumberValue.stateMutability === 'view' && getBlockNumberValue.outputs?.[0].type === 'uint256';

    const getTimestamp = abi.find((item) => item.name === "getTimestamp" && item.type === "function");
    getTimestampExistsTest.passed = !!getTimestamp && getTimestamp.stateMutability === 'view' && getTimestamp.outputs?.[0].type === 'uint256';

    const getChainIdValue = abi.find((item) => item.name === "getChainIdValue" && item.type === "function");
    getChainIdValueExistsTest.passed = !!getChainIdValue && getChainIdValue.stateMutability === 'view' && getChainIdValue.outputs?.[0].type === 'uint256';

    const receiveEther = abi.find((item) => item.name === "receiveEther" && item.type === "function");
    receiveEtherExistsTest.passed = !!receiveEther && receiveEther.stateMutability === 'payable';
  }

  return [
    contractExistsTest,
    getSenderAddressExistsTest,
    getBlockNumberValueExistsTest,
    getTimestampExistsTest,
    getChainIdValueExistsTest,
    receiveEtherExistsTest,
  ];
};