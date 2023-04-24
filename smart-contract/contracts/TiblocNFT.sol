// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

//tibloc is not an NFT marketplace, so users are free to choose what platform to list or sell their NFT
//our contract is only to mint the NFT
contract TiblocNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    using Strings for uint256;
    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public holderOf;

    address public contractOwner;
    uint256 public totalTx = 0;
    uint256 public adminCost = 0.001 ether;
    
    event NFTMinted(
        uint256 tokenId,
        address indexed owner,
        uint256 cost,
        string tokenURI,
        uint256 timestamp
    );

    struct TransactionStruct{
        uint256 tokenId;
        address holderOf;
        uint256 salesPrice;
        string title;
        string description;
        string tokenURI;
        uint256 timestamp;
        bool isUsed;
        string eventCategoryId;
        uint256 eventDate;
    }

    TransactionStruct[] transactions;
    TransactionStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _adminCost,
        address _owner
    ) ERC721(_name, _symbol){
        adminCost = _adminCost;
        contractOwner = _owner;
    }

    function payToMint(string memory title,
        string memory description,
        string memory tokenURI,
        uint256 salesPrice,
        string memory eventCategoryId,
        uint256 eventDate) external payable{
        require(msg.value >= adminCost, "Ether too low for minting!");
        require(msg.value >= adminCost + salesPrice, "Ether too low to buy NFT!");
        require(existingURIs[tokenURI] == 0, "This NFT is already minted!");
        require(msg.sender != owner(), "Sales not allowed!");

        payTo(contractOwner, msg.value);

        _tokenIds.increment();
        uint256 i_tokenId = _tokenIds.current();

        minted.push(
            TransactionStruct(
                i_tokenId,
                msg.sender,
                salesPrice,
                title,
                description,
                tokenURI,
                block.timestamp,
                false,
                eventCategoryId,
                eventDate
            )
        );

        emit NFTMinted(
            i_tokenId,
            msg.sender,
            msg.value,
            tokenURI,
            block.timestamp
        );

        _safeMint(msg.sender, i_tokenId);
        _setTokenURI(i_tokenId, tokenURI);
        existingURIs[tokenURI] = 1;
        holderOf[i_tokenId] = msg.sender;
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool){
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id-1].holderOf, "Operations Not Allowed");
        require(block.timestamp <= minted[id-1].eventDate, "Operations Not Allowed");

        minted[id-1].salesPrice = newPrice;
        return true;
    }

    function flagUsed(uint256 tokenId) external returns(bool){
        require(minted[tokenId - 1].isUsed == false, "Tickets already used!");
        require(msg.sender == minted[tokenId - 1].holderOf, "Operations Not Allowed");

        minted[tokenId - 1].isUsed = true;
        return minted[tokenId - 1].isUsed;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getAllNFTs() external view returns (TransactionStruct[] memory){
        return minted;
    }

    function getNFT(uint256 tokenId) external view returns(TransactionStruct memory){
        return minted[tokenId - 1];
    }
}