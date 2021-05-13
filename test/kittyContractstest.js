const KittyContract= artifacts.require("Kittycontract");
const KittyMarketplace= artifacts.require("KittyMarketPlace");
const truffleAssert = require("truffle-assertions");

// await truffleAssert.passes() - use to ensure something passes
// await truffleAssert.fails() - use to ensure something fails
// assert() - use to ensure two or more things equal the same thing 

contract("Kittycontract", (accounts) => {

    var instance;

    // Use beforeEach() to use deployed contracts for each test
    beforeEach( async() => {
        // deployed contract
        instance = await KittyContract.new()
    })
  
                                 // SETTERS

    it("should produce a NFT kitty by owner and produce a Birth event", async () => {
        // Make sure function reverts once gen0Counter is more than 10
        for (let i= 0; i < 10; i++){
            await instance.createKittyGen0("1111")}
        await truffleAssert.fails(instance.createKittyGen0('123424'))
        // Make sure only owner of contract can execute
        instance = await KittyContract.new()
        await truffleAssert.fails(instance.createKittyGen0('12324', {from: accounts[1]}))
    
    })
    it("should produce a NFT kitty and produce a Birth event", async () => {
        // Make sure owner can’t execute contract and everyone else can 
        await truffleAssert.fails(instance.createKitty('112424', {from: accounts[0], value: web3.utils.toWei(".02", "ether")}))
        // Make sure contract fails if msg.value isn’t .02 eth
        await truffleAssert.fails(instance.createKitty('57686'))
    })
    it("should breed kitty only if msg.sender owns both kitties", async () => {
        await instance.createKittyGen0('12333', {from: accounts[0]})
        await instance.createKittyGen0('12334', {from: accounts[0]})
        await truffleAssert.passes(instance.breed("1","2", {from: accounts[0]}))
        await truffleAssert.fails(instance.breed("1","2", {from: accounts[2]}))
    })

    it("should setApprovalForAll and emit ApprovalForAll event", async () => {
        await truffleAssert.passes(instance.ApprovalForAll().on('data', 
        (_events) => {console.log(_events)}))
        await truffleAssert.passes(instance.setApprovalForAll(accounts[1], "true"))
        // Make sure function reverts if _operator is msg.sender
        await truffleAssert.fails(instance.setApprovalForAll(accounts[0], "true"))
    })

    it("should transfer kitty and emit Transfer event", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.transfer(accounts[1], "1"))
        instance = await KittyContract.new()
        // if _to address doesn't exist,
        await instance.createKittyGen0('13442', {from: accounts[0]})
        let fakeAccount = "0x0000000000000000000000000000000000000000"
        await truffleAssert.fails(instance.transfer(fakeAccount, "1"))
        //  address cannot be contract address
        await truffleAssert.fails(instance.transfer(instance.address, "1"))
        // token doesn't belong to caller
        await truffleAssert.fails(instance.transfer(accounts[2], "1", {from: accounts[3]}))
    })

    it("should approve kitty and emit Approval event", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.Approval().on('data', 
        (_events) => {console.log(_events)}))
        await truffleAssert.passes(instance.approve(accounts[1], "1"))
    })

    it("should execute transferFrom function properly", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.transferFrom(accounts[0], accounts[1], "1"))
        // Make sure function reverts if sender isn’t _from address
        // or isn’t approved for kittyId 
        // or isn’t approved for all from _from address or kittyId doesn’t exist
        await instance.createKittyGen0('134542', {from: accounts[0]})
        await truffleAssert.fails(instance.transferFrom(accounts[1], accounts[2], "2"))
    })

    it("should execute safeTransferFrom function properly", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.safeTransferFrom(accounts[0], accounts[1], "1"))
        // Make sure function reverts if sender isn’t _from address
        // or isn’t approved for kittyId 
        // or isn’t approved for all from _from address or kittyId doesn’t exist
        await instance.createKittyGen0('134542', {from: accounts[0]})
        await truffleAssert.fails(instance.safeTransferFrom(accounts[1], accounts[2], "2"))
    })

    it("should withdraw funds only to owner", async () => {
        await instance.createKitty('123424', {from: accounts[1], value: web3.utils.toWei(".02", "ether")})
        await truffleAssert.passes(instance.withdrawAll({from: accounts[0]}))
        await instance.createKitty('123424', {from: accounts[1], value: web3.utils.toWei(".02", "ether")})
        await truffleAssert.fails(instance.withdrawAll({from: accounts[1]}))

    })
                                 // GETTERS

    it("should return kitty info based on kittyId", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.getKitty("1"))
    }) 

    it("should return array with KittyIds of token owner", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.tokensOfOwner(accounts[0]))
    })

    it("should return balance of token owner", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.balanceOf(accounts[0]))
    })

    it("should return total supply of kitties created", async () => {
        await truffleAssert.passes(instance.totalSupply())
    })

    it("should return owner of inputed kittyId", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await truffleAssert.passes(instance.ownerOf(accounts[0]))   
    })

    it("should return who is approved for kittyId", async () => {
        await instance.createKittyGen0('13442', {from: accounts[0]})
        await instance.approve(accounts[1], "1")
        await truffleAssert.passes(instance.getApproved("1"))
    })

    it("should return who is approved for all for a particular address", async () => {
        await truffleAssert.passes(instance.isApprovedForAll(accounts[0], accounts[1]))
    })
})

contract("KittyMarketPlace", (accounts) => {

    var instance;

    // Use beforeEach() to use deployed contracts for each test
    beforeEach( async() => {
        // deployed contract
        instance = await KittyMarketplace.new()
    })
                                 // SETTERS

    it("should set offer", async () => {
        // Make sure function reverts if
            // msg.sender isn’t owner of Kitty
            // kittyId isn’t for sale
            // contract isn’t approved to transfer kitties for msg.sender
        // Make sure offer is created(getOffer function)
        // Check that Market Transaction event emits correct info
    })

    it("should remove offer", async () => {
        // Make sure function reverts if seller isn’t the same as msg.sender
        // Make sure tokenIdToOffer is deleted for that kittyId(getOffer function)
        // Make sure offer offers[tokenIdToOffer[kittenId]].active is changed to false
        // Check that Market Transaction event emits correct info 
    })

    it("should buy kitty", async () => {
        // Set new offer
        // Make sure function reverts if payment for kitty is insufficient
        // Make sure function reverts if kitty is not for sale 
        // Make sure tokenIdToOffer is deleted for that kittyId
        // Make sure offers[tokenIdToOffer[kittenId]].active is changed to false
        // Make sure seller gets paid
        // Make sure ownership of kitty is transferred to buyer
        // Check that Market Transaction event emits correct info
    })
                                 // GETTERS 

    it("should return details about offer", async () => {

    })

    it("shouild return tokens for sale", async () => {
        
    })

})