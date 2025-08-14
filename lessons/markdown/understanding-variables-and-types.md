## Understanding Variables & Types

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
pragma solidity ^0.8.26;

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

#### Address (`address`)

The `address` type is a 20-byte value (160 bits) that represents an Ethereum address. This can be an address of an Externally Owned Account (EOA) or a contract account. It's commonly used to store who owns a contract, who sent a transaction, or to interact with other contracts.

There are two flavors of address:
*   `address`: Holds a 20-byte value.
*   `address payable`: Same as `address`, but with the additional ability to send Ether.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract AddressExample {
    address public owner;
    address payable public recipient;

    constructor() {
        owner = msg.sender; // The address that deployed the contract
        recipient = payable(0xAb84835CE4BDe5b14ab989F061559c79Ea4921Bf); // Example address
    }
}
```
In this example, `owner` stores the address of the contract deployer, and `recipient` is a payable address that can receive Ether.

#### Fixed-size byte arrays (`bytes1` to `bytes32`)

Fixed-size byte arrays are used to store a sequence of bytes of a specific length. `bytes1` stores 1 byte, `bytes2` stores 2 bytes, up to `bytes32` which stores 32 bytes. They are useful for storing hashes, short identifiers, or any fixed-length binary data.

`bytes32` is particularly common as it can store a 256-bit hash value (like a Keccak-256 hash).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract BytesExample {
    bytes4 public functionSelector;
    bytes32 public myHash;

    constructor() {
        functionSelector = 0x12345678; // Example 4-byte function selector
        myHash = 0x0123456789012345678901234567890123456789012345678901234567890123; // Example 32-byte hash
    }
}
```
Here, `functionSelector` stores a 4-byte value, and `myHash` stores a 32-byte hash.

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
-   Create a public `address` variable named `myAddress` and set it to `0xAb84835CE4BDe5b14ab989F061559c79Ea4921Bf`.
    Hint: `address public myAddress = 0xAb84835CE4BDe5b14ab989F061559c79Ea4921Bf;`
-   Create a public `bytes32` variable named `myBytes32` and set it to `0x0123456789012345678901234567890123456789012345678901234567890123`.
    Hint: `bytes32 public myBytes32 = 0x0123456789012345678901234567890123456789012345678901234567890123;`
