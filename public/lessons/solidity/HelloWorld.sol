// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract HelloWorld {
    // Declare a public state variable of type string named greeting
    string public greeting;

    constructor() {
        greeting = "Hello, World!";
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
