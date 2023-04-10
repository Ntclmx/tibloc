// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

//tibloc is not an NFT marketplace, so users are free to choose what platform to list or sell their NFT
//our contract is only to mint the NFT
contract TiblocNFT is Ownable {
    using Strings for uint256;
    mapping(string -> uint8) existingURIs;
    mapping(uint256 -> address) public holderOf;

    address public artist;
    uint256 public royaltyFee;
    uint256 public supply = 0;
    uint256 public totalTx = 0;
    uint256 public cost = 0.01 ether;
    
    event Sale(
        uint256 id,
        address indexed owner,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );

    struct TransactionStruct{
        uint256 id;
        address owner;
        uint256 cost;
        string title;
        string description;
        string metadataURI;
        uint256 timestamp;
        bool isUsed;
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

    function payToMint{
        string memory title,
        string memory description,
        string memory metadataURI,
        uint256 salesPrice
    } external payable{
        require(msg.value >= cost, "Ether too low for minting!");
        require(existingsURIs[metadataURI] == 0, "This NFT is already minted!");
        require(msg.sender != owner(), "Sales not allowed!");

        uint256 royalty = (msg.value * royaltyFee) / 100;

        //What is the difference between artist and owner?
        payTo(artist, royalty);
        payTo(owner(), (msg.value - royalty));

        supply++;

        minted.push(
            TransactionStruct(
                supply,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
                block.timestamp,
                false
            )
        );

        emit Sale(
            supply,
            msg.sender,
            msg.value,
            metadataURI,
            block.timestamp
        );

        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        holderOf[supply] = msg.sender;
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool){
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id-1].owner, "Operations Not Allowed");

        minted[id-1].cost = newPrice;
        return true;
    }

    function flagUsed(uint256 nftId) external returns(bool){
        require(minted[nftId - 1].isUsed == false, "Tickets already used!");
        require(msg.sender == minted[nftId - 1].owner, "Operations Not Allowed");

        minted[nftId - 1].isUsed = true;
        return true;
    }

    function transferNft(uint256 nftId, address nftAddress) external returns(bool){
        require(msg.sender != minted[nftId - 1].owner, "Can not transfer to self");
        IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, nftId);
        return true;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getAllNFTs() external view returns (TransactionStruct[] memory){
        return minted;
    }

    function getNFT(uint256 nftId) external view returns(TransactionStruct memory){
        return minted[nftId - 1];
    }

    function getAllTransactions() external view returns(TransactionStruct[] memory){
        return transactions;
    }
}