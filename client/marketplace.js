var web3 = new Web3(Web3.givenProvider);
var marketInstance;
var user;
var marketAddress = "0x36f88d94123f4194a9fBe0666fE860B53175F5d5"
// old contract "0x2e7a44DEA57f355ee4D2Bc82bECe0FA69BA403eb";
// var marketabi;

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        marketInstance = new web3.eth.Contract(marketabi, marketAddress, 
        {from: accounts[0], gas:300000, gasPrice:20000000000});
        user = web3.utils.toChecksumAddress(accounts[0]);
        console.log(marketInstance);
        console.log(accounts[0])
        marketListeners();
    })
});

var pullCatalog = async() => {
    //prone to being updated once marketplace is integrated
    var kittyArray = await marketInstance.methods.getAllTokenOnSale().call();
    pullKitty(kittyArray); 
    console.log(kittyArray)
  };

var pullKitty = async(kittyArray) => {
    var kittyLog = [];

    for (let i = 0; i < kittyArray.length; i++) {
        let kittyId = kittyArray[i]
        console.log(typeof kittyId)
        if(kittyId == 0){
            continue
        }
        let kitties = await instance.methods.getKitty(kittyId).call();
        let offerDetails = await marketInstance.methods.getOffer(kittyId).call()
        let kittyPrice = offerDetails['price'];
        let kittySeller = offerDetails['seller'];
        let kittyGenes = kitties['genes'];
        let kittyGeneration = kitties['generation'];
        kittyLog.push({kittyGenes, kittyId, kittyGeneration, kittyPrice, kittySeller}); 
    }
    catOffers_onLaunch(kittyLog);
return kittyLog; 
};

// function to place offer
var placeKittyOffer = async() => {
    let kittyId = getKittyId()
    let price = $('#sellprice').val()
    let Ethprice = Web3.utils.toWei(price, 'ether');
    await marketInstance.methods.setOffer(Ethprice,kittyId).send()
}

// function to check owner 
var checkOwner = async() => {
    let kittyId = getKittyId()
    return await instance.methods.ownerOf(kittyId).call() 
}

// function to check offer
var checkOffer = async() => {
    let kittyId = getKittyId()
    let offerDetails = await marketInstance.methods.getOffer(kittyId).call()
    let offerPrice = Web3.utils.fromWei(offerDetails.price, 'ether')
    console.log(offerDetails.seller)
    console.log(offerDetails)
    if (offerDetails.active == true && offerDetails.seller !== user){
        $('#offerForm').addClass('hidden')
        $('#buyBtn').removeClass('hidden')
        $('#ethprice').html(offerPrice + ' ETH')
        $('#ethprice').prop('disabled', true)
    }
    if(offerDetails.active == true && offerDetails.seller == user){
        $('#offerForm').removeClass('hidden')
        $('#offerBtn').addClass('hidden')
        $('#offerBox').addClass('hidden')
        $('#cancelBtn').removeClass('hidden')
        $('#buyBtn').addClass('hidden')
    }
    if(offerDetails.active == false && offerDetails.seller !== user){
        $('#offerForm').removeClass('hidden')
        $('#offerBtn').removeClass('hidden')
        $('#offerBox').removeClass('hidden')
        $('#cancelBtn').addClass('hidden')
        $('#buyBtn').addClass('hidden')
    }
}

// function to cancel offer
var cancelOffer = async() => {
    let kittyId = getKittyId()
    await marketInstance.methods.removeOffer(kittyId).send()
}

// function to buy kitty
var buyKitty = async() => {
    let kittyId = getKittyId()
    let offerDetails = await marketInstance.methods.getOffer(kittyId).call()
    let price = offerDetails.price
    await marketInstance.methods.buyKitty(kittyId).send({value: price})
}

// create switch function for event listens 
var marketListeners = () => {
    marketInstance.events.MarketTransaction().on('data', function(event){
        let eventType = (event.returnValues.TxType).toString();
        switch(eventType) {
            case "Create offer":
                //alert_msg('Successfully set offer for Kitty id: ' + tokenId, 'success')
                $('#offerBox').addClass('hidden')
                $('#offerBtn').addClass('hidden')
                $('#cancelBtn').removeClass('hidden')
              break;
            case "Remove offer":
                //alert_msg('Successfully Offer remove for Kitty id: ' + tokenId, 'success')
                $('#offerBox').removeClass('hidden')
                $('#offerBtn').removeClass('hidden')
                $('#cancelBtn').addClass('hidden')
              break;
            case "Buy":
                //alert_msg('Successfully set offer for Kitty id: ' + tokenId, 'success')
                window.location.replace("catalog.html")
              break;   
          }
      })
      .on('error', console.error);
}

var grantKittyApproval = () => {
    instance.methods.setApprovalForAll(marketAddress, true).send()
    .on('receipt', function(receipt){
        console.log(receipt)})
    .then(
        () => {
        $('#approveBtn').addClass('hidden');
        $('#offerBtn').prop('disabled', false);
        }
    )
}

var checkifMarketContractisApproved = async() => {
    var isApproved = await instance.methods.isApprovedForAll(user, marketAddress).call()

    if(isApproved == true){
        $('#approveBtn').addClass('hidden');
        $('#offerBtn').prop('disabled', false);
    }
    else if(isApproved !== true){
        $('#approveBtn').removeClass('hidden');
        $('#offerBtn').prop('disabled', true);
    }
}
