// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//import './extensions/KIP17Metadata.sol';
import "@klaytn/contracts/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/contracts/KIP/token/KIP17/extensions/KIP17MetadataMintable.sol";
import "@klaytn/contracts/contracts/access/Ownable.sol";
import "@klaytn/contracts/contracts/utils/Counters.sol";
//import '../../utils/Ownable.sol';
//import '../../utils/Counters.sol';


contract KIP17Token is KIP17, Ownable {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (uint256 => string) private _tokenURIs;
    string private _baseURIextended;

    constructor(string memory name, string memory symbol) KIP17(name, symbol) {}

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
       // mintWithTokenURI(recipient, newItemId, tokenURI);
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(
            _exists(tokenId),
            'KIP17Metadata: URI set of nonexistent token'
        );
        _tokenURIs[tokenId] = uri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }
}

