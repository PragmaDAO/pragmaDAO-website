// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleFunctions {
    // Here is a basic function that will return a number.
    function getNumber() public pure returns (uint256) {
        return 1;
    }

    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    // create a function called subtract, that returns the difference between two unsigned integers a and b, aka a - b
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b;
    }

    // create a function called multiply, that returns the product between two unsigned integers a and b, aka a * b
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    // create a function called divide that returns quotient the between two unsigned integers a and b, aka a / b
    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        return a / b;
    }
}
