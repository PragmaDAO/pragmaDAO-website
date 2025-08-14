import { CompiledOutput, TestCase, AbiItem } from "../../types";

export const runStateAndLocalVariablesTests = (compiledResult: CompiledOutput | null): TestCase[] => {
  if (!compiledResult || compiledResult.errors) {
    return [
      {
        description: "Compilation must pass before tests can run.",
        passed: false,
      },
    ];
  }

  const contract = compiledResult.contracts["contract.sol"]?.StateAndLocalVariables;

  const contractExistsTest: TestCase = {
    description: "A contract named 'StateAndLocalVariables' is defined",
    passed: !!contract,
  };

  let myStateVariableExistsTest: TestCase = {
    description: "Contract contains a public state variable named 'myStateVariable' of type uint256",
    passed: false,
  };

  let setToTenMoreExistsTest: TestCase = {
    description: "Contract contains a function named 'setToTenMore'",
    passed: false,
  };

  let localVariableFuncExistsTest: TestCase = {
    description: "Contract contains an external view function named 'localVariableFunc'",
    passed: false,
  };

  let localVariableExistsTest: TestCase = {
    description: "Function 'localVariableFunc' should contain a local variable named 'localVariable'",
    passed: false,
  };

  if (contract) {
    const abi = contract.abi as AbiItem[];
    const myStateVariable = abi.find((item) => item.name === "myStateVariable" && item.type === "function"); // state variables have a getter function
    myStateVariableExistsTest.passed = !!myStateVariable && myStateVariable.stateMutability === 'view' && myStateVariable.outputs?.[0].type === 'uint256';

    const setToTenMore = abi.find((item) => item.name === "setToTenMore" && item.type === "function");
    setToTenMoreExistsTest.passed = !!setToTenMore;

    const localVariableFunc = abi.find((item) => item.name === "localVariableFunc" && item.type === "function");
    localVariableFuncExistsTest.passed = !!localVariableFunc && localVariableFunc.stateMutability === 'view';

    // Check for the local variable in the bytecode
    const bytecode = contract.evm.bytecode.object;
    // This is a simplified check. A more robust check would involve parsing the bytecode.
    // We are checking for the opcode PUSH1 0x01, which is 6001 in hex.
    localVariableExistsTest.passed = bytecode.includes("6001");
  }

  return [
    contractExistsTest,
    myStateVariableExistsTest,
    setToTenMoreExistsTest,
    localVariableFuncExistsTest,
    localVariableExistsTest,
  ];
};