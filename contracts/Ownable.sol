pragma solidity ^0.5.12;

contract Ownable {
    address payable public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller must be contract owner");
        _; // continue execution
    }
    
    constructor() public {
        owner = msg.sender;
    }
}