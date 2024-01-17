// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
address payable contractOwner= payable(0x96Bd98A9fdD411dFa5E8d4fF6633617bf61F6816);
uint256 public listingPrice = 0.025 ether;
struct NFTs{
    string title;
    string description;
    string emaile;
    string catagories;
    uint256 fundeRised;
    address creator;
    string image;
    uint256 timeStamp;
    uint256 id;
}
mapping(uint256=>NFTs) public nftImages;

uint256 public imagesCount =0 ;
function uplodeIPFS (address _creator,string memory _image, string memory _title, string memory _description , string memory _emaile, 
string memory _catagory  ) public payable returns(
string memory,
string memory,
string memory,
address,
string memory){
    imagesCount++;
    NFTs storage nft = nftImages[imagesCount];
    nft.title=_title;
    nft.creator=_creator;
    nft.description=_description;
    nft.emaile=_emaile;
    nft.catagories=_catagory;
    nft.image=_image;
    nft.timeStamp=block.timestamp;
    nft.id= imagesCount;
    return(
        _title,
        _description,
        _catagory,
        _creator,
        _image
    );

}

function getAllNft() public view returns(NFTs[] memory){
    uint itemsCount = imagesCount;
    uint curentIndx=0;
    NFTs[] memory items = new NFTs[](itemsCount);
    for(uint256 i =0; i<=itemsCount; i++){
        uint256 currentId = i+1;
        NFTs storage currrentItem = nftImages[currentId];
        items[curentIndx]=currrentItem;
        curentIndx+=1;
    }
    return items;
}

function getImage (uint256 id) external view returns(
    string memory,
    string memory,
    string memory,
    string memory,
    uint256 ,
    address,
    string memory,
    uint256,
    uint256
){
    NFTs memory nfts = nftImages[id];
    return(
        nfts.title,
        nfts.description,
        nfts.emaile,
        nfts.catagories,
        nfts.fundeRised,
        nfts.creator,
        nfts.image,
        nfts.timeStamp,
        nfts.id

    );
}

function updateListingPrice(uint256 _listingPrice,address owner) public payable{
    require(
        contractOwner==owner,
        "only the countract owner can update"
    );
    listingPrice=_listingPrice;
}
function donate(uint256 _id) public payable{
    uint256 amount = msg.value;
    NFTs storage nfts = nftImages[_id];
    (bool sent,) = payable(nfts.creator).call{value:amount}("");
    if (sent){
        nfts.fundeRised=nfts.fundeRised+amount;

    }
}
function withdrow(address _owner) external{
    require(_owner==contractOwner,"only the countract owner can withdraw");
    uint256 balance = address(this).balance;
    require(balance>0,"no fund available");
    contractOwner.transfer(balance);

}

}