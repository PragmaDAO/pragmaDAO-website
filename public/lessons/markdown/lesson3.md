## Lesson 3: Understanding Functions

Functions are the building blocks of smart contracts. In this lesson, you'll learn how to define and use a simple function.

### Instructions

-   Define a contract named `SimpleFunctions`.
    Hint: `contract SimpleFunctions { }`
-   Create a public function named `getNumber` that returns the number `1`.
    Hint: `function getNumber() public returns (uint) { return 1; }`
-   The function should be `pure`, meaning it doesn't read or modify the state.
    Hint: `function getNumber() public pure returns (uint) { ... }`