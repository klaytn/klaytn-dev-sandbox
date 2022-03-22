// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './extensions/KIP17Metadata.sol';
import '../../utils/Ownable.sol';
import '../../utils/Counters.sol';


contract KIP17Token is KIP17Metadata, Ownable {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory name, string memory symbol) KIP17Metadata(name, symbol) {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

