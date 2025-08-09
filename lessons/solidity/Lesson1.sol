// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract HelloWorld {
    // Declare a public state variable of type string named greeting
    string public greeting;

    function greet() public returns (string memory) {
        // Initialize the greeting variable with a value
        greeting = "Hello, World!";
        return greeting;
    }
}
