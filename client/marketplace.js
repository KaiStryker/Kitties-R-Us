var web3 = new Web3(Web3.givenProvider);
var marketInstance;
var user;
var marketAddress = "0xe027899099Ca590a89dAE1449EB17a5CE29D674e"
// old contract "0x36f88d94123f4194a9fBe0666fE860B53175F5d5";
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
var placeKittyOffer = () => {
    let kittyId = getKittyId()
    let price = $('#sellprice').val()
    let Ethprice = Web3.utils.toWei(price, 'ether');
    marketInstance.methods.setOffer(Ethprice,kittyId).send()
    .on("transactionHash", function(hash){
      $('#catalog-loader').prop('hidden',false)
    })  
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
var cancelOffer = () => {
    let kittyId = getKittyId()
    marketInstance.methods.removeOffer(kittyId).send()
    .on("transactionHash", function(hash){
        $('#deletediv').prop('hidden', false)
      })
    
}

// function to buy kitty
var buyKitty = async() => {
    let kittyId = getKittyId()
    let offerDetails = await marketInstance.methods.getOffer(kittyId).call()
    let price = offerDetails.price
    marketInstance.methods.buyKitty(kittyId).send({value: price})
    .on("transactionHash", function(hash){
        $('#catalog-loader').prop('hidden',false)
      })
    
}

// create switch function for event listens 
var marketListeners = () => {
    marketInstance.events.MarketTransaction().on('data', function(event){
        let eventType = (event.returnValues.TxType).toString();
        switch(eventType) {
            case "Create offer":
                $('#offerBox').addClass('hidden')
                $('#offerBtn').addClass('hidden')
                $('#cancelBtn').removeClass('hidden')
                $('#catalog-loader').prop('hidden',true)
              break;
            case "Remove offer":
                $('#offerBox').removeClass('hidden')
                $('#offerBtn').removeClass('hidden')
                $('#cancelBtn').addClass('hidden')
                $('#deletediv').prop('hidden', true)
                //reset input value
                document.getElementById('sellprice').value = ''
              break;
            case "Buy":
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
