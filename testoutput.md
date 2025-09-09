tempSrcDir exists: true
tempTestDir exists: true
Extracted contract name: HelloWorld

--- Forge Config Output ---
[profile.default]
src = "src"
test = "test"
script = "script"
out = "out"
libs = ["lib"]
remappings = [
    "user_contract/=/var/folders/zz/wvh_hrfj4p167d0__j0brk800000gn/T/pragma-forge-jmKT7Q/src/",
    "forge-std/=lib/forge-std/src/",
]
auto_detect_remappings = true
libraries = []
cache = true
dynamic_test_linking = false
cache_path = "cache"
snapshots = "snapshots"
gas_snapshot_check = false
gas_snapshot_emit = true
broadcast = "broadcast"
allow_paths = []
include_paths = []
skip = []
force = false
evm_version = "prague"
gas_reports = ["*"]
gas_reports_ignore = []
gas_reports_include_tests = false
auto_detect_solc = true
offline = false
optimizer = false
optimizer_runs = 200
verbosity = 0
eth_rpc_accept_invalid_certs = false
ignored_error_codes = [
    "license",
    "code-size",
    "init-code-size",
    "transient-storage",
]
ignored_warnings_from = []
deny_warnings = false
test_failures_file = "cache/test-failures"
show_progress = false
ffi = false
allow_internal_expect_revert = false
always_use_create_2_factory = false
prompt_timeout = 120
sender = "0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38"
tx_origin = "0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38"
initial_balance = "0xffffffffffffffffffffffff"
block_number = 1
gas_limit = 1073741824
block_base_fee_per_gas = 0
block_coinbase = "0x0000000000000000000000000000000000000000"
block_timestamp = 1
block_difficulty = 0
block_prevrandao = "0x0000000000000000000000000000000000000000000000000000000000000000"
memory_limit = 134217728
extra_output = []
extra_output_files = []
names = false
sizes = false
via_ir = false
ast = false
no_storage_caching = false
no_rpc_rate_limit = false
use_literal_content = false
bytecode_hash = "ipfs"
cbor_metadata = true
sparse_mode = false
build_info = false
isolate = false
disable_block_gas_limit = false
unchecked_cheatcode_artifacts = false
create2_library_salt = "0x0000000000000000000000000000000000000000000000000000000000000000"
create2_deployer = "0x4e59b44847b379578588920ca78fbf26c0b4956c"
assertions_revert = true
legacy_assertions = false
odyssey = false
transaction_timeout = 120
additional_compiler_profiles = []
compilation_restrictions = []
script_execution_protection = true

[profile.default.rpc_storage_caching]
chains = "all"
endpoints = "all"

[[profile.default.fs_permissions]]
access = "read"
path = "out"

[fmt]
line_length = 120
tab_width = 4
style = "space"
bracket_spacing = false
int_types = "long"
multiline_func_header = "attributes_first"
quote_style = "double"
number_underscore = "preserve"
hex_underscore = "remove"
single_line_statement_blocks = "preserve"
override_spacing = false
wrap_comments = false
ignore = []
contract_new_lines = false
sort_imports = false

[lint]
severity = []
exclude_lints = []
ignore = []
lint_on_build = true

[doc]
out = "docs"
title = ""
book = "book.toml"
homepage = "README.md"
ignore = []

[fuzz]
runs = 256
fail_on_revert = true
max_test_rejects = 65536
dictionary_weight = 40
include_storage = true
include_push_bytes = true
max_fuzz_dictionary_addresses = 15728640
max_fuzz_dictionary_values = 6553600
gas_report_samples = 256
failure_persist_dir = "cache/fuzz"
failure_persist_file = "failures"
show_logs = false

[invariant]
runs = 256
depth = 500
fail_on_revert = false
call_override = false
dictionary_weight = 80
include_storage = true
include_push_bytes = true
max_fuzz_dictionary_addresses = 15728640
max_fuzz_dictionary_values = 6553600
shrink_run_limit = 5000
max_assume_rejects = 65536
gas_report_samples = 256
corpus_gzip = true
corpus_min_mutations = 5
corpus_min_size = 0
failure_persist_dir = "cache/invariant"
show_metrics = true
show_solidity = false
show_edge_coverage = false

[labels]

[vyper]

[bind_json]
out = "utils/JsonBindings.sol"
include = []
exclude = []


--- End Forge Config Output ---


--- Original Test Code Content ---
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "user_contract/HelloWorld.sol";

contract HelloWorldTest is Test {
    HelloWorld public helloWorld;

    function setUp() public {
        helloWorld = new HelloWorld();
    }

    /// @dev Tests that the greet() function returns the correct string.
    function test_greetReturnsHelloWorld() public view {
        assertEq(helloWorld.greet(), "Hello, World!", "greet() should return 'Hello, World!'");
    }

    /// @dev Tests that the contract includes a public state variable named 'greeting'.
    /// The compiler automatically creates a getter function for public state variables.
    function test_greetingStateVariableIsPublic() public view {
        // We test this by trying to access the state variable.
        // If the variable is public, the getter `greeting()` will exist.
        // While this test seems redundant with the constructor logic, it ensures
        // the user has correctly declared the state variable as public.
        string memory currentGreeting = helloWorld.greeting();
        assertEq(currentGreeting, "Hello, World!", "The 'greeting' state variable should be public and initialized.");
    }
}

--- End Original Test Code Content ---


--- Updated Test Code Content (after replace) ---
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "user_contract/HelloWorld.sol";

contract HelloWorldTest is Test {
    HelloWorld public helloWorld;

    function setUp() public {
        helloWorld = new HelloWorld();
    }

    /// @dev Tests that the greet() function returns the correct string.
    function test_greetReturnsHelloWorld() public view {
        assertEq(helloWorld.greet(), "Hello, World!", "greet() should return 'Hello, World!'");
    }

    /// @dev Tests that the contract includes a public state variable named 'greeting'.
    /// The compiler automatically creates a getter function for public state variables.
    function test_greetingStateVariableIsPublic() public view {
        // We test this by trying to access the state variable.
        // If the variable is public, the getter `greeting()` will exist.
        // While this test seems redundant with the constructor logic, it ensures
        // the user has correctly declared the state variable as public.
        string memory currentGreeting = helloWorld.greeting();
        assertEq(currentGreeting, "Hello, World!", "The 'greeting' state variable should be public and initialized.");
    }
}

--- End Updated Test Code Content (after replace) ---

Updated Test Code (before writing to file): // SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "user_contract/HelloWorld.sol";

contract HelloWorldTest is Test {
    HelloWorld public helloWorld;

    function setUp() public {
        helloWorld = new HelloWorld();
    }

    /// @dev Tests that the greet() function returns the correct string.
    function test_greetReturnsHelloWorld() public view {
        assertEq(helloWorld.greet(), "Hello, World!", "greet() should return 'Hello, World!'");
    }

    /// @dev Tests that the contract includes a public state variable named 'greeting'.
    /// The compiler automatically creates a getter function for public state variables.
    function test_greetingStateVariableIsPublic() public view {
        // We test this by trying to access the state variable.
        // If the variable is public, the getter `greeting()` will exist.
        // While this test seems redundant with the constructor logic, it ensures
        // the user has correctly declared the state variable as public.
        string memory currentGreeting = helloWorld.greeting();
        assertEq(currentGreeting, "Hello, World!", "The 'greeting' state variable should be public and initialized.");
    }
}

--- Debugging Test Run for lessonId: solidity-101 ---
Temporary directory: /var/folders/zz/wvh_hrfj4p167d0__j0brk800000gn/T/pragma-forge-jmKT7Q

--- Temporary Contract File Content ---
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract HelloWorld {
    // Declare a public state variable of type string named greeting
    string public greeting;

    constructor() {
        greeting = "Hello, World!";
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}


--- Temporary Test File Content ---
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "user_contract/HelloWorld.sol";

contract HelloWorldTest is Test {
    HelloWorld public helloWorld;

    function setUp() public {
        helloWorld = new HelloWorld();
    }

    /// @dev Tests that the greet() function returns the correct string.
    function test_greetReturnsHelloWorld() public view {
        assertEq(helloWorld.greet(), "Hello, World!", "greet() should return 'Hello, World!'");
    }

    /// @dev Tests that the contract includes a public state variable named 'greeting'.
    /// The compiler automatically creates a getter function for public state variables.
    function test_greetingStateVariableIsPublic() public view {
        // We test this by trying to access the state variable.
        // If the variable is public, the getter `greeting()` will exist.
        // While this test seems redundant with the constructor logic, it ensures
        // the user has correctly declared the state variable as public.
        string memory currentGreeting = helloWorld.greeting();
        assertEq(currentGreeting, "Hello, World!", "The 'greeting' state variable should be public and initialized.");
    }
}


--- Temporary foundry.toml Content (Modified) ---
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

# See more config options https://github.com/foundry-rs/foundry/blob/master/crates/config/README.md#all-options

remappings = ["user_contract/=/var/folders/zz/wvh_hrfj4p167d0__j0brk800000gn/T/pragma-forge-jmKT7Q/src/"]

--- Running Forge Test... ---
User ID not found in request. Code submission not saved.
Forge Test Output (backend): Compiling 23 files with Solc 0.8.29
Solc 0.8.29 finished in 549.50ms
Compiler run successful!

Ran 2 tests for test/solidity-101.t.sol:HelloWorldTest
[PASS] test_greetReturnsHelloWorld() (gas: 13366)
[PASS] test_greetingStateVariableIsPublic() (gas: 13418)
Suite result: ok. 2 passed; 0 failed; 0 skipped; finished in 3.68ms (2.43ms CPU time)

Ran 1 test suite in 142.72ms (3.68ms CPU time): 2 tests passed, 0 failed, 0 skipped (2 total tests)

Error updating user progress: PrismaClientKnownRequestError: 
Invalid `prisma.userLessonProgress.upsert()` invocation in
/Users/anthonyalbertorio/Desktop/pragmaDAO-website/backend/dist/routes/progress.js:54:65

  51     return res.status(400).json({ message: 'lessonId and completed status are required.' });
  52 }
  53 try {
→ 54     const updatedProgress = yield prisma.userLessonProgress.upsert(
Foreign key constraint violated: `UserLessonProgress_userId_fkey (index)`
    at $n.handleRequestError (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@prisma/client/runtime/library.js:121:7315)
    at $n.handleAndLogRequestError (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@prisma/client/runtime/library.js:121:6623)
    at $n.request (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@prisma/client/runtime/library.js:121:6307)
    at l (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/@prisma/client/runtime/library.js:130:9633) {
  code: 'P2003',
  clientVersion: '5.22.0',
  meta: {
    modelName: 'UserLessonProgress',
    field_name: 'UserLessonProgress_userId_fkey (index)'
  }
}