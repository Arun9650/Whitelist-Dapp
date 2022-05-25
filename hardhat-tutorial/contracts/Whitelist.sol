//SPDX-License-Identifier: Unlicense

pragma solidity  ^0.8.0;
import '../library/safemath.sol';

contract Whitelist{
   


    uint8 public maxWhitelistedAddress;

    mapping(address => bool) public whitelistedAddress;

    uint8 public numAddressWhitelisted;

    constructor(uint8 _maxWhitelistAddress){
        maxWhitelistedAddress = _maxWhitelistAddress;

    }

    function addAddressWhitelist() public {
        require(!whitelistedAddress[msg.sender],"sender has been already whitelisted" );

        require(numAddressWhitelisted < maxWhitelistedAddress, "More address cant be added, limit reached");

        whitelistedAddress[msg.sender] = true;

           numAddressWhitelisted += 1;

    }

}