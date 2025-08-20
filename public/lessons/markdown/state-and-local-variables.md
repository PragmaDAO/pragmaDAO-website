## State vs Local Variables

In Solidity, variables are categorized based on where they are declared and how they are stored. The two main types of variables are **state variables** and **local variables**. Understanding the difference between them is crucial for writing efficient and secure smart contracts.

### State Variables

**State variables** are variables whose values are permanently stored on the blockchain. Think of them as the "memory" of your smart contract. Because they are stored on the blockchain, the data they hold persists across multiple function calls and transactions. You can read the value of a state variable at any time.

State variables are declared directly inside a contract, but outside of any function.

```solidity
contract MyContract {
    uint256 myStateVariable; // This is a state variable
}
```

### Local Variables

**Local variables**, on the other hand, are temporary. Their values are not stored on the blockchain. They are declared inside a function and only exist for the duration of that function's execution. Once the function has finished running, the local variable and its value are no longer accessible.

```solidity
contract MyContract {
    function myFunction() external {
        uint256 myLocalVariable = 10; // This is a local variable
    }
}
```

In this example, `myLocalVariable` can only be used inside `myFunction`.

---

### Global Variables

Solidity provides several special global variables that are accessible from any function within a smart contract. These variables contain information about the blockchain, the current transaction, and the message sender. They are "global" because they are built-in and do not need to be declared.

#### `msg.sender`

`msg.sender` is an `address` type variable that represents the address of the account (EOA or contract) that initiated the current external function call. It's crucial for access control and identifying who is interacting with your contract.

```solidity
function getSender() public view returns (address) {
    return msg.sender;
}
```

#### `msg.value`

`msg.value` is a `uint256` type variable that represents the amount of Wei (the smallest denomination of Ether) sent with the current message call. It's used when a function is intended to receive Ether.

```solidity
function receiveEther() public payable {
    // msg.value contains the amount of Ether sent with this call
}
```

#### `block.timestamp`

`block.timestamp` is a `uint256` type variable that represents the Unix timestamp (seconds since epoch) of the current block. It's often used for time-based logic, like setting deadlines or creating time-locked contracts.

```solidity
function getTime() public view returns (uint256) {
    return block.timestamp;
}
```

#### `block.number`

`block.number` is a `uint256` type variable that represents the number of the current block. It can be used to track the contract's age or to implement logic based on block progression.

```solidity
function getBlockNumber() public view returns (uint256) {
    return block.number;
}
```

#### `block.chainid`

`block.chainid` is a `uint256` type variable that represents the ID of the current chain. This is useful for preventing replay attacks across different chains (e.g., mainnet and testnets).

```solidity
function getChainId() public view returns (uint256) {
    return block.chainid;
}
```

### Instructions

-   Create a public state variable named `myStateVariable` of type `uint256`.
    Hint: State variables are declared directly inside a contract, but outside of any function. Example: `uint256 myStateVariable;`
-   Create an `external` function called `setToTenMore` that takes no arguments and does not return anything. This function should set `myStateVariable` to its current value plus 10.
    Hint: Use the `+=` operator to add 10 to `myStateVariable`. Example: `myStateVariable += 10;`
-   Create an `external view` function called `localVariableFunc` that takes no arguments and does not return anything. Inside this function, create a `uint` local variable named `localVariable` and set it to `1`.
    Hint: Local variables are declared inside a function. Example: `uint localVariable = 1;`
-   Create a public view function named `getSenderAddress` that returns the address of the sender (`msg.sender`).
    Hint: Use `msg.sender` to get the address of the sender.