## Lesson 1: Your First Smart Contract

Welcome to Solidity! In this first lesson, you'll write and compile your very first smart contract. This is the "Hello, World!" of the Ethereum Blockchain world.

Let us look at the different parts of the contract to understand them.

### Objectives

- Understand the basic structure of a Solidity file.
- Declare a contract.
- Create a public state variable.
- Compile your contract and see the output.

### Breakdown
### The contract License. 

```solidity
// SPDX-License-Identifier: MIT
```
This is a comment, but a special one. In Solidity, // marks the rest of the line as a comment that the compiler ignores.

This specific comment is the SPDX License Identifier. It’s a machine-readable way to declare that your source code is open-source and under what license. Using "MIT" is very common and permissive. It’s a best practice that builds trust and can prevent legal issues. Most Solidity compilers will warn you if you don't include it.

Think of it as the copyright page in a book. It tells everyone how they are legally allowed to copy and share your work.

### The contract `pragma`
```solidity 
pragma solidity ^0.8.26;
```

This is a "pragma," a directive for the compiler.

This line tells the compiler which version of the Solidity language this code is written for. The ^ (caret) symbol means that the code is compatible with version 0.8.26 and any newer patch or minor release within the 0.8 series (like 0.8.27). It will won't work with a major new version (like 0.9.0). This prevents your code from being compiled with a future version of Solidity that might have breaking changes.

This is like labeling a recipe "For Air Fryer Model X (2025)." It ensures no one tries to use it with a completely different appliance, which could lead to a mess.

### The Contract Declaration
```solidity
contract HelloWorld { ... }
```

This is the beginning of the smart contract itself.

The `contract` keyword is how you declare a new smart contract, similar to how you might use class in other programming languages. `HelloWorld` contract name. The opening and closing curly brace contain all the `HelloWorld` contract's code.

This is like the title on a house blueprint. The name is "HelloWorld House," and everything inside the braces describes the layout and features of that specific house.

### The State Variable
```solidity 
string public greeting;
```

This is a "state variable" declaration. It's a piece of data that will be permanently stored on the blockchain.

`string`: This is the data type. We are creating a variable that can hold text.

`public`: This is a visibility keyword. Making a variable public does something amazing: the compiler automatically creates a "getter" function for it. This means anyone can read the value of greeting from the blockchain without us having to write any extra code.

`greeting`: This is the name of our variable.

In our "HelloWorld House" blueprint, this line adds a room called `greeting`. The `public` keyword is like installing a large window on that room, so anyone outside can look in and see what's stored there.

### The Constructor
```solidity 
constructor() {}
```

This is a special, optional function called the `constructor`.

The `constructor` is a piece of code that runs only once, at the exact moment the smart contract is deployed to the blockchain. Its purpose is to set up the contract's initial state.

This is the instruction list for the construction crew building the house. They follow these steps once to set everything up (like painting the walls and installing the fixtures), and then the job is done.

### Setting the Initial State
```solidity
greeting = "Hello, World!";
```
An assignment statement inside the `constructor`.

Here, we are giving our state variable greeting its initial value. We are assigning the text `Hello, World!` to it. Since this is inside the constructor, this value gets written to the blockchain when the contract is deployed.

This is a specific instruction for the construction crew: "Go to the room named `greeting` and place a sign inside that says `Hello, World!`.


### Instructions

-   Delete the contract to rewrite it.
    Hint: use the instructions to rewrite the contract from scratch
-   In the editor on the right, define a contract named `HelloWorld`.
    Hint: `contract MyContract { ... }`
-   Define a function named `greet`, that is `public` and `returns` a `string` of `memory` type. Feel free to check the hint.
    Hint: function greet() public returns (string memory) {...}
-   Inside the function, set the value of `greeting` to `Hello, World!`. 
    Hint: greeting = 'Hello, World!';
-   Return the variable `greeting` from the function.
    Hint: return greeting;
-   Click the "Compile" button. If there are no errors, click "Run Tests" to check your work!
    Hint: Once the 'Compile' button shows a success message, you're ready to run the tests!
-   Join our discord and give your feedback.
    Hint: Join: https://discord.gg/KspzcBMysa