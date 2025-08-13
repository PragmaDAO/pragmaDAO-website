// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract IntegerBasics {
    // Declare some integer variables here
    uint8 public myUint8;
    int8 public myInt8;
    uint256 public myUint256;
    int256 public myInt256;

    function setValues(uint8 _myUint8, int8 _myInt8) public {
        myUint8 = _myUint8;
        myInt8 = _myInt8;
    }

    function convertUintToInt(uint256 _value) public pure returns (int256) {
        return int256(_value);
    }

    function convertIntToUint(int256 _value) public pure returns (uint256) {
        return uint256(_value);
    }
}
