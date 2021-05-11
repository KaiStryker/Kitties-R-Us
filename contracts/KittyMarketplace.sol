pragma solidity ^0.5.0;

import "./KittyKitty.sol";
import "./Ownable.sol";
import "./IKittyMarketPlace.sol";

contract KittyMarketPlace is Ownable, IKittyMarketPlace {
    Kittycontract private _kittyContract;

    struct Offer{
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 kittenId;
        bool active;
    }

    Offer[] offers;

    mapping(uint256 => Offer) tokenIdToOffer;

    event MarketTransaction(string TxType, address owner, uint256 kittenId);

    constructor(address _kittyContractAddress) public {
        setKittyContract(_kittyContractAddress);
    }

    function setKittyContract(address _kittyContractAddress) public onlyOwner{
        _kittyContract = Kittycontract(_kittyContractAddress);
    }

    function getOffer(uint256 _kittenId) public view returns ( address seller, uint256 price, uint256 index, uint256 kittenId, bool active){
       
        Offer storage currentOffer = tokenIdToOffer[_kittenId];

        seller = currentOffer.seller;
        price = currentOffer.price;
        index = currentOffer.index;
        kittenId = currentOffer.kittenId;
        active = currentOffer.active;
    }

    function setOffer(uint256 _price, uint256 _kittenId) public{
        require(_ownsKitty(msg.sender, _kittenId), "you are not owner of Kitty");
        require(tokenIdToOffer[_kittenId].active == false, "You can't sell the same order twice"); 
        require(_kittyContract.isApprovedForAll(msg.sender,address(this)), "Contract needs to be approved to transfer Kitty in the future");

        Offer memory newOffer = Offer({
        seller: msg.sender,
        price: _price,
        index: offers.length,
        kittenId: _kittenId,
        active: true
        });

        tokenIdToOffer[_kittenId] = newOffer;
        offers.push(newOffer);

        emit MarketTransaction("Create offer", msg.sender, _kittenId);
    }

    function removeOffer(uint256 kittenId) public{
        Offer memory _offer = tokenIdToOffer[kittenId];
        require(_offer.seller == msg.sender, "You are not the seller of this Kitty");
        
        delete tokenIdToOffer[kittenId];
        offers[_offer.index].active = false;

        emit MarketTransaction("Remove offer", msg.sender, kittenId);
    }

    function buyKitty(uint256 kittenId) public payable{
        Offer memory _offer = tokenIdToOffer[kittenId];

        require(msg.value == _offer.price, "The payment is insufficient");
        require(tokenIdToOffer[kittenId].active == true, "No active order present");

        // Delete Kitty from the mapping before paying out to prevent reentry attack 
        delete tokenIdToOffer[kittenId];
        offers[_offer.index].active = false;
        address payable seller = _offer.seller;
        
        //tranfer the funds to the seller
        if (_offer.price > 0){
            seller.transfer(_offer.price);
        }

        // Transfer ownership of the kitty
        _kittyContract.transferFrom(seller, msg.sender, kittenId);

        emit MarketTransaction("Buy", msg.sender, kittenId);
    } 

    function getAllTokenOnSale() public view  returns(uint256[] memory listOfOffers){
        uint256 totalOffers = offers.length;
        
        if(totalOffers == 0){
            return new uint256[](0);
        } else{

            uint256[] memory result = new uint256[](totalOffers);

            uint256 offerId;

            for (offerId = 0; offerId < totalOffers; offerId++){
                if(offers[offerId].active == true){
                    result[offerId] = offers[offerId].kittenId;
                }
            }
            return result;
        }
    }

    function _ownsKitty(address _address, uint256 _kittenId) internal view returns (bool){
        return (_kittyContract.ownerOf(_kittenId) == _address);
    }
}