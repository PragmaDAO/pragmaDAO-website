## Global Variables

Solidity provides several special global variables that are accessible from any function within a smart contract. These variables contain information about the blockchain, the current transaction, and the message sender. They are "global" because they are built-in and do not need to be declared.

### `msg.sender`

`msg.sender` is an `address` type variable that represents the address of the account (EOA or contract) that initiated the current external function call. It's crucial for access control and identifying who is interacting with your contract.

```solidity
function getSender() public view returns (address) {
    return msg.sender;
}
```

### `msg.value`

`msg.value` is a `uint256` type variable that represents the amount of Wei (the smallest denomination of Ether) sent with the current message call. It's used when a function is intended to receive Ether.

```solidity
function receiveEther() public payable {
    // msg.value contains the amount of Ether sent with this call
}
```

### `block.timestamp`

`block.timestamp` is a `uint256` type variable that represents the Unix timestamp (seconds since epoch) of the current block. It's often used for time-based logic, like setting deadlines or creating time-locked contracts.

```solidity
function getTime() public view returns (uint256) {
    return block.timestamp;
}
```

### `block.number`

`block.number` is a `uint256` type variable that represents the number of the current block. It can be used to track the contract's age or to implement logic based on block progression.

```solidity
function getBlockNumber() public view returns (uint256) {
    return block.number;
}
```

### `block.chainid`

`block.chainid` is a `uint256` type variable that represents the ID of the current chain. This is useful for preventing replay attacks across different chains (e.g., mainnet and testnets).

```solidity
function getChainId() public view returns (uint256) {
    return block.chainid;
}
```

---

### Instructions

-   Define a contract named `GlobalVariables`.
    Hint: `contract GlobalVariables { // add your code here }`
-   Create a public view function named `getSenderAddress` that returns the address of the sender (`msg.sender`).
    Hint: Use `msg.sender` to get the address of the sender.
-   Create a public view function named `getBlockNumberValue` that returns the current block number (`block.number`).
    Hint: Use `block.number` to get the current block number.
-   Create a public view function named `getTimestamp` that returns the current block timestamp (`block.timestamp`).
    Hint: Use `block.timestamp` to get the current block timestamp.
-   Create a public view function named `getChainIdValue` that returns the current chain ID (`block.chainid`).
    Hint: Use `block.chainid` to get the current chain ID.
-   Create a public payable function named `receiveEther` that allows the contract to receive Ether.
    Hint: Use the `payable` keyword in the function signature.