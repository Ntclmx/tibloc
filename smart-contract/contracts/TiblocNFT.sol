// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

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
contract TiblocNFT is ERC721, Ownable {
    using Strings for uint256;
    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public holderOf;

    address public artist;
    uint256 public royaltyFee;
    uint256 public i_tokenId = 0;
    uint256 public totalTx = 0;
    uint256 public cost = 0.01 ether;
    
    event NFTMinted(
        uint256 tokenId,
        address indexed owner,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );

    struct TransactionStruct{
        uint256 tokenId;
        address owner;
        uint256 cost;
        string title;
        string description;
        string metadataURI;
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
        uint256 _royaltyFee,
        address _artist
    ) ERC721(_name, _symbol){
        royaltyFee = _royaltyFee;
        artist = _artist;
    }

    function payToMint(string memory title,
        string memory description,
        string memory metadataURI,
        uint256 salesPrice,
        string memory eventCategoryId,
        uint256 eventDate) external payable{
        require(msg.value >= cost, "Ether too low for minting!");
        require(existingURIs[metadataURI] == 0, "This NFT is already minted!");
        require(msg.sender != owner(), "Sales not allowed!");

        uint256 royalty = (msg.value * royaltyFee) / 100;

        //What is the difference between artist and owner?
        payTo(artist, royalty);
        payTo(owner(), (msg.value - royalty));

        i_tokenId++;

        minted.push(
            TransactionStruct(
                i_tokenId,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
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
            metadataURI,
            block.timestamp
        );

        _safeMint(msg.sender, i_tokenId);
        existingURIs[metadataURI] = 1;
        holderOf[i_tokenId] = msg.sender;
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool){
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id-1].owner, "Operations Not Allowed");
        require(block.timestamp <= minted[id-1].eventDate, "Operations Not Allowed");

        minted[id-1].cost = newPrice;
        return true;
    }

    function flagUsed(uint256 tokenId) external returns(bool){
        require(minted[tokenId - 1].isUsed == false, "Tickets already used!");
        require(msg.sender == minted[tokenId - 1].owner, "Operations Not Allowed");

        minted[tokenId - 1].isUsed = true;
        return minted[tokenId - 1].isUsed;
        // return transferNft(tokenId, nftAddress);
    }

    // function transferNft(uint256 tokenId, address nftAddress) internal returns(bool){
    //     require(msg.sender != minted[tokenId - 1].owner, "Can not transfer to self");
    //     IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
    //     return true;
    // }

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

    function getAllTransactions() external view returns(TransactionStruct[] memory){
        return transactions;
    }
}