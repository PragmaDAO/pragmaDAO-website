// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract StateAndLocalVariables {
    // Create a public state variable named myStateVariable of type uint256
    uint256 public myStateVariable = 0;

    // Create an external function called setToTenMore that takes no arguments and does not return anything.
    // This function should set myStateVariable to its current value plus 10.
    function setToTenMore() external {
        myStateVariable += 10;
    }

    // Create an external view function called localVariableFunc that takes no arguments and does not return anything.
    // Inside this function, create a uint local variable named localVariable and set it to 1.
    function localVariableFunc() external {
        uint256 localVariable = 1;
    }
}
