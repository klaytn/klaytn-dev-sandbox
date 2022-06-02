// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//import './extensions/KIP17Metadata.sol';
import "@klaytn/contracts/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/contracts/KIP/token/KIP17/extensions/KIP17MetadataMintable.sol";
import "@klaytn/contracts/contracts/access/Ownable.sol";
import "@klaytn/contracts/contracts/utils/Counters.sol";
//import '../../utils/Ownable.sol';
//import '../../utils/Counters.sol';


contract KIP17Token {
    
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;

    // constructor(string memory name, string memory symbol) KIP17MetadataMintable(name, symbol) {}

    // function mintNFT(address recipient, string memory tokenURI)
    //     public onlyOwner
    //     returns (uint256)
    // {
    //     _tokenIds.increment();

    //     uint256 newItemId = _tokenIds.current();
    //    // mintWithTokenURI(recipient, newItemId, tokenURI);
    //     _mint(recipient, newItemId);
    //     _setTokenURI(newItemId, tokenURI);

    //     return newItemId;
    // }
}

