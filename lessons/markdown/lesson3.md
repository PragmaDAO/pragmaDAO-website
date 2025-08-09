## Lesson 3: Understanding Functions

### Objective

Understand the basics of functions in Solidity, including visibility, state mutability, and how to define and use them.

### How Functions Work

A function is a reusable block of code that performs a specific task. Think of it as a recipe: you give it ingredients (parameters), and it gives you back a dish (return value).

Here is an example of a function:

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

#### Function Signature

A function signature is like the title of the recipe. It tells you what the function is called, what ingredients it needs, and what it will give you back. It consists of the function name, the parameters it takes, the visibility (who can call it), the state mutability (what it can do to the contract's data), and the return type.

Here is a generic function signature:

```solidity 
function function_name(parameter_type parameter_name) visibility_modifier state_mutability_modifier returns (return_type)
```

For the `add` function above, the signature is:

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {...}
```

-   `function add`: The name of the function is `add`.
-   `(uint256 a, uint256 b)`: The parameters are `a` and `b`, both of type `uint256`.
-   `public`: This modifier means that the function can be called from anywhere - from within the contract, from other contracts, or from external accounts.
-   `pure`: This modifier means that the function does not read or modify the state of the contract. It only works with the inputs it is given and returns a value.
-   `returns (uint256)`: The function returns a value of type `uint256`.

#### Operators

-   `*` (Multiplication): Multiplies two numbers. `a * b`
-   `/` (Division): Divides two numbers. `a / b`
-   `-` (Subtraction): Subtracts one number from another. `a - b`

### Instructions

-   Define a contract named `SimpleFunctions`.
    Hint: contract SimpleFunctions {...}
-   Create a public function named `getNumber` that returns the number `1`.
    Hint: function getNumber() public pure returns (uint256)
-   Create a function named `difference` that takes two `uint256` parameters and returns their difference.
    Hint: The `-` operator means subtract, a - b 
-   Create a function named `multiply` that takes two `uint256` parameters and returns their product.
    Hint: The `*` operator means multiplication, a * b 
-   Create a function named `divide` that takes two `uint256` parameters and returns their product.
    Hint: The `/` operator means multiplication, a / b 
