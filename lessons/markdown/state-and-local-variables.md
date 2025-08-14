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

### Instructions

1.  Create a public state variable named `myStateVariable` of type `uint256`.
2.  Create an `external` function called `setToTenMore` that takes no arguments and does not return anything. This function should set `myStateVariable` to its current value plus 10.
3.  Create an `external view` function called `localVariableFunc` that takes no arguments and does not return anything. Inside this function, create a `uint` local variable named `localVariable` and set it to `1`.