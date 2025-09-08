Message: Command failed: forge test --match-path "*state-and-local-variables.t.sol" -vvv
Error: Compilation failed


STDOUT:
Compiler run failed:
Error (9582): Member "myStateVariable" not found or not visible after argument-dependent lookup in contract StateAndLocalVariables.
  --> test/state-and-local-variables.t.sol:16:18:
   |
16 |         assertEq(contractInstance.myStateVariable(), 0);
   |                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



STDERR:
Error: Compilation failed