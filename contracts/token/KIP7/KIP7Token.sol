// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/contracts/KIP/token/KIP7/KIP7.sol";

contract KIP7Token is KIP7 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) KIP7(name, symbol) { 
        //_setupDecimals(decimals);       
        _mint(msg.sender, initialSupply);
        
    }
}
