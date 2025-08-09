## Lesson 2: Understanding Variables & Types

Smart contracts are all about managing state. In this lesson, you'll learn about the fundamental data types in Solidity.

### Objectives
* Understand the concept of state in smart contracts.
* Learn about fundamental data types in Solidity: `uint`, `string`, and `bool`.
* See how to declare and initialize variables of these types.

### Value Types in Solidity

Value types are the most basic data types in Solidity. They are called "value types" because they are always passed by value, meaning they are copied when they are used as function arguments or in assignments.

#### Unsigned Integers (`uint`)

Unsigned integers, or `uint`, are non-negative numbers. They are used for things like token balances, counters, and any other whole number value. There are also `int` types for signed integers, but `uint` is more common in smart contracts.

`uint` is an alias for `uint256`, a 256-bit unsigned integer. You can specify the number of bits in steps of 8, from `uint8` to `uint256`.

Here's how you declare a `uint` in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract VariableTypes {
    uint public myUint = 123;
    string public myString = "Hello Solidity";
    bool public myBool = true;
}
```

In this example, `myUint` is a public state variable of type `uint` and is initialized to `123`.

#### Strings

Strings are used to store text data. They are a sequence of characters enclosed in double or single quotes.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract VariableTypes {
    uint public myUint = 123;
    string public myString = "Hello Solidity";
    bool public myBool = true;
}
```

In the contract above, `myString` is a public state variable of type `string` and is initialized to `"Hello Solidity"`.

#### Booleans (`bool`)

Booleans are binary values that can be either `true` or `false`. They are often used for access control or to represent a condition.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract VariableTypes {
    uint public myUint = 123;
    string public myString = "Hello Solidity";
    bool public myBool = true;
}
```

Here, `myBool` is a public state variable of type `bool` and is initialized to `true`.


### Instructions

-   Define a contract named `VariableTypes`.
    Hint: `contract VariableTypes {
    // add your code here
}`
-   Create a public `uint` variable named `myUint` and set it to `123`.
    Hint: `uint public myUint = 123;`
-   Create a public `string` variable named `myString` and set it to `"Pragma"`.
    Hint: `string public myString = "Pragma";`
-   Create a public `bool` variable named `myBool` and set it to `true`.
    Hint: `bool public myBool = true;`