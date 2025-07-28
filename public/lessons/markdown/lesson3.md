## Lesson 3: ERC20 Token

The ERC20 standard is the foundation for most cryptocurrencies on Ethereum. In this lesson, you'll build the basic state variables for your own token.

### Instructions

-   Define a contract named `MyToken`.
    Hint: Just like the last lesson, use the `contract` keyword.
-   Create a public `string` variable for the token's `name`.
    Hint: Example: `string public name = "My First Token";`
-   Create a public `string` variable for the token's `symbol`.
    Hint: Symbols are usually short, like "MFT".
-   Create a public `uint8` variable for `decimals` and set it to `18`.
    Hint: 18 is the standard for most ERC20 tokens, as it matches Ether.
-   Create a public `uint256` for the `totalSupply`.
    Hint: This will represent the total number of tokens in existence.
-   Create a public `mapping` called `balanceOf` to track balances.
    Hint: The mapping should go from an `address` to a `uint256`.