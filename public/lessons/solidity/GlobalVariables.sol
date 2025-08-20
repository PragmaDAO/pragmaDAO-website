// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract GlobalVariables {
    function getSender() public view returns (address) {
        return msg.sender;
    }

    function getMsgValue() public payable returns (uint256) {
        return msg.value;
    }

    function getBlockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getBlockNumber() public view returns (uint256) {
        return block.number;
    }

    function getChainId() public view returns (uint256) {
        return block.chainid;
    }
}
