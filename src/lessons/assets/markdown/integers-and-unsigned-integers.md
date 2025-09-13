## Integers and Unsigned Integer Values

In Solidity, integer types are used to store whole numbers. There are two main categories: **signed integers** (`int`) and **unsigned integers** (`uint`).

### Signed vs. Unsigned Integers

*   **Unsigned Integers (`uint`)**: These can only store non-negative values (zero and positive numbers). They are declared with the `uint` keyword, optionally followed by a number indicating their size in bits (e.g., `uint8`, `uint256`).

*   **Signed Integers (`int`)**: These can store both positive and negative values, as well as zero. They are declared with the `int` keyword, also optionally followed by a number indicating their size in bits (e.g., `int8`, `int256`).

### Size Differences

Both `uint` and `int` types come in various sizes, increasing in increments of 8 bits, from 8 to 256. This means you can declare types like:

*   `uint8`, `uint16`, `uint24`, ..., `uint256`
*   `int8`, `int16`, `int24`, ..., `int256`

**Default Sizes:**

*   If you declare an `int` without specifying a size (e.g., `int myNumber;`), it defaults to `int256`.
*   Similarly, if you declare a `uint` without specifying a size (e.g., `uint myPositiveNumber;`), it defaults to `uint256`.

### Conversion Between `uint` and `int`

Direct implicit conversion between `uint` and `int` is not allowed in Solidity to prevent unexpected behavior and potential vulnerabilities (like negative numbers becoming very large positive numbers, or vice-versa, due to overflow/underflow). You must use **explicit type casting**.

**Example:**

```solidity
uint256 myUint = 100;
int256 myInt = int256(myUint); // Explicitly cast uint to int

int256 anotherInt = -50;
uint256 anotherUint = uint256(anotherInt); // Explicitly cast int to uint (be careful with negative values!)
```

When casting a negative `int` to a `uint`, the value will wrap around. For example, `uint8(-1)` would become `255`.

### Maximum and Minimum Values

The range of values an integer type can hold depends on its size. For an `N`-bit integer:

*   **`uintN`**: The range is from `0` to `2^N - 1`.
    *   `uint8`: 0 to 255
    *   `uint256`: 0 to `2^256 - 1` (a very large number!)

*   **`intN`**: The range is from `-2^(N-1)` to `2^(N-1) - 1`.
    *   `int8`: -128 to 127
    *   `int256`: `-2^255` to `2^255 - 1`

Understanding these ranges is crucial to prevent integer overflow and underflow vulnerabilities in your smart contracts.
