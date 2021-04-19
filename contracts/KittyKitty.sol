pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {

    mapping(address => uint256) public tokenHolders;
    mapping(uint256 => address) kittyOwners;

    mapping(uint256 => address) public kittyIndexToApproved;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    string public constant _name = "KittyKittys";
    string public constant _symbol = "KTK";

    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

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

    function breed(uint256 _dadId, uint256 _mumId) public returns (uint256){
       require(_owns(msg.sender, _dadId) && _owns(msg.sender, _mumId));

       ( uint256 dadDna,,,,uint256 dad_generation ) = getKitty(_dadId);
       ( uint256 mumDna,,,,uint256 mum_generation ) = getKitty(_mumId);
       uint256 newDna = _mixDna(dadDna, mumDna);
       uint256 kidGen = 0;


      if(dad_generation <= mum_generation){
          kidGen = mum_generation + 1;
      }
      else if (dad_generation > mum_generation){
          kidGen = dad_generation + 1;
          kidGen /= 2;
      } 
      else{
          kidGen = mum_generation;
      }

       _createKitty( _mumId, _dadId, uint16(kidGen), newDna, msg.sender);

       return newDna;
    }

    function supportsInterface(bytes4 _interfaceId) external view returns (bool){
        return ( _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
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
        require(_owns(msg.sender, kittenId));

        _approve(kittenId, _approved);
        emit Approval(msg.sender, _approved, kittenId);

    }

    function setApprovalForAll(address _operator, bool _approved) public{
        require(_operator != msg.sender);

        _setApprovalForAll(msg.sender, _operator, _approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _kittenId) public view returns (address){
        require (_kittenId < kitties.length);

        return kittyIndexToApproved[_kittenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }

    function _safeTransfer(address _from, address _to, uint256 kittenId, bytes memory _data) internal {
        
        _transfer(_from, _to, kittenId);
        require(_checkERC721Support(_from, _to, kittenId, _data));
    }   
    function transferFrom(address _from, address _to, uint256 kittenId)  public {
        require( _isApprovedOrOwner(msg.sender, _from, _to, kittenId) );  
        _transfer(_from, _to, kittenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 kittenId, bytes memory data) public {
        require( _isApprovedOrOwner(msg.sender, _from, _to, kittenId) ); 
        _safeTransfer(_from, _to, kittenId, data);
    }

    function safeTransferFrom(address _from, address _to, uint256 kittenId) public {
        safeTransferFrom(_from, _to, kittenId, "");
    }

    function _approve(uint256 _kittenId, address _approved) internal{
        kittyIndexToApproved[_kittenId] = _approved;
    }

    function _setApprovalForAll(address _owner, address _operator, bool _approved) internal {
        _operatorApprovals[_owner][_operator] = _approved;
    }

    function _checkERC721Support(address _from, address _to, uint256 kittenId, bytes memory _data) internal returns (bool) {
        if (!_isContract(_to) ){
            return true;
        }
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, kittenId, _data);
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function _isContract(address _to) view internal returns (bool){
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _approvedFor( address _claimant, uint256 kittenId) internal view returns (bool) {
        return kittyIndexToApproved[kittenId] == _claimant;
    }

    function _isApprovedOrOwner( address _spender, address _from, address _to, uint256 kittenId) internal view returns (bool){
        require (_owns(_from, kittenId)); //From owns the token
        require (_to != address(0)); // TO address is not zero address
        require (kittenId < kitties.length); //Token must exist

        //Spender is from OR spender is approved for kittenId OR spender is operator from _from
        return (_spender == _from
        || _approvedFor(_spender, kittenId)
        || isApprovedForAll(_from, _spender));
    }

    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal returns (uint256){
       uint256[8] memory geneArray;
       uint8 random = uint8( now % 255 );
       uint256 i;
       uint256 index = 7;
       // Loop thru random number with bitwise operator(&)
       for(i = 1; i <= 128; i = i*2){
           if(random & i != 0){
               geneArray[index] = uint8( _dadDna % 100 );
           }
           else{
               geneArray[index] = uint8( _mumDna % 100 );
           }
           _mumDna = _mumDna / 100;
           _dadDna = _dadDna / 100;
           index --;
       }
       // create new Gene from geneArray
       uint256 newGene;
       for( i = 0; i < 8; i++){
           newGene = newGene + geneArray[i];
           if(i != 7){
           newGene = newGene * 100;
           }  
       }
       return newGene;
    }

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
        uint256 genes,
        uint256 mumId, 
        uint256 dadId, 
        uint256 birthTime, 
        uint256 generation
    )
    {
        Kitty storage kitty = kitties[_kittenId];
        
        genes = uint256(kitty.genes); 
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        birthTime = uint256(kitty.birthTime); 
        generation = uint256(kitty.generation);
    }
}