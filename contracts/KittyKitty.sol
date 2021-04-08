pragma solidity ^0.5.0;

import "./IERC721.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {

    mapping(address => uint256) public tokenHolders;
    mapping(uint256 => address) kittyOwners;
    mapping(uint256 => address) public kittyIndexToApproved;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    string public constant _name = "KittyKittys";
    string public constant _symbol = "KTK";

    Kitty[] public kitties;

    struct Kitty {
          uint256 genes;
          uint64 birthTime;
          uint32 mumId;
          uint32 dadId;
          uint16 generation;
    }

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    event Birth(
        address owner, 
        uint256 kittenId, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 genes
        );

    uint256 public gen0Counter;

    function createKittyGen0(uint256 _genes) public onlyOwner returns (uint256) {
       require(gen0Counter < CREATION_LIMIT_GEN0);
       
       gen0Counter++;

       // Gen0 has no owners, they are owned by the contract or contract owner
       return _createKitty(0,0,0,_genes,msg.sender);
}

    function _createKitty(
        uint256 _mumId, 
        uint256 _dadId, 
        uint16 _generation, 
        uint256 _genes, 
        address _owner
    )private returns (uint256) {
            Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(now),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        uint256 newKittenId = kitties.push(_kitty) - 1;

        emit Birth(_owner, newKittenId, _mumId, _dadId, _genes);
        
        _transfer(address(0), _owner, newKittenId);

        return newKittenId;
    }

    function getKitty(uint256 _kittenId) public view returns (
        uint256 birthTime, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 generation,
        uint256 genes, 
        address owner
    )
    {
        Kitty storage kitty = kitties[_kittenId];

        birthTime = uint256(kitty.birthTime); 
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
        genes = uint256(kitty.genes);
        owner = kittyOwners[_kittenId];
        
    }

    function balanceOf(address owner) external view returns (uint256 balance){
        return tokenHolders[owner];
    }
   
    function totalSupply() public view returns (uint256 total){
        return kitties.length;
    }
  
    function name() external view returns (string memory tokenName){
        return _name;
    }

    function symbol() external view returns (string memory tokenSymbol){
        return _symbol;
    }

    function ownerOf(uint256 kittenId) external view returns (address owner){

        return kittyOwners[kittenId];
    }
        
    function transfer(address _to, uint256 kittenId) external{
        require (_to != address(0), "address doesn't exist" );
        require (_to != address(this), "address cannot be contract address");
        require (_owns(msg.sender, kittenId), "token doesn't belong to caller");

        _transfer(msg.sender, _to, kittenId);
    }

    function _transfer( address _from, address _to, uint256 kittenId) internal { 
        tokenHolders[_to]++;
        kittyOwners[kittenId] = _to;

        if (_from != address(0)){
           tokenHolders[_from]--;
           delete kittyIndexToApproved[kittenId];
        }
    
        emit Transfer(_from, _to, kittenId);
    }

    function _owns(address _claimer, uint256 kittenId) internal view returns (bool){
        return kittyOwners[kittenId] == _claimer;
    }

    function approve(address _approved, uint256 kittenId) external{
        require(owns(msg.sender, kittenId));

        _approve(kittenId, _approved);
        emit Approval(msg.sender, _approved, kittenId);

    }

    function setApprovalForAll(address _operator, bool approved) public{
        require(_operator != msg.sender);

        _setApprovalForAll(msg.sender, _operator, _approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _kittenId) public view returns (address){
        require (_kittenId < kitties.length);

        return kittyIndexToApproved[_kittenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
        return _operatorApprovals[owner][_operator];
    }

    function _approve(uint256 _kittenId, address _approved) internal{
        kittyIndexToApproved[_kittenId] = _approved;
    }

    function _setApprovalForAll(address _owner, address _operator, bool _approved) internal {
        _operatorApprovals[_owner][_operator] = _approved;
    }
}
