// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@klaytn/contracts/contracts/KIP/token/KIP37/KIP37.sol";
import "@klaytn/contracts/contracts/utils/Counters.sol";

contract KIP37Token is KIP37 {

    mapping (uint256 => string) private _tokenURIs;
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds; 

    constructor() KIP37("MultiTokenNFT") {} 

    function mintToken(string memory tokenURI, uint256 amount)
    public returns(uint256) { 
        uint256 newItemId = _tokenIds.current(); 
        _mint(msg.sender, newItemId, amount, "");
        _setTokenUri(newItemId, tokenURI); 
        _tokenIds.increment(); 
        return newItemId; 
    } 

    function uri(uint256 tokenId) override public view 
    returns (string memory) { 
        return(_tokenURIs[tokenId]); 
    } 
    
    function _setTokenUri(uint256 tokenId, string memory tokenURI)
    private {
         _tokenURIs[tokenId] = tokenURI; 
    } 
}