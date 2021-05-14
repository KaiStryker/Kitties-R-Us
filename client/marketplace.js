var web3 = new Web3(Web3.givenProvider)
var marketInstance
var user
var marketAddress = "0xf033776fD39F55A85d2847094255eF7468EE0de4"

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        marketInstance = new web3.eth.Contract(marketabi, marketAddress, 
        {from: accounts[0]})
        user = web3.utils.toChecksumAddress(accounts[0])
        console.log(marketInstance)
        console.log(accounts[0])
        marketListeners()
        approvalEventListener()
    })
});

var pullCatalog = async() => {
    var kittyArray = await marketInstance.methods.getAllTokenOnSale().call();
    pullKitty(kittyArray)
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
        let kittyPrice = offerDetails['price']
        let kittySeller = offerDetails['seller']
        let kittyGenes = kitties['genes']
        let kittyGeneration = kitties['generation']
        kittyLog.push({kittyGenes, kittyId, kittyGeneration, kittyPrice, kittySeller}); 
    }
    catOffers_onLaunch(kittyLog)
return kittyLog; 
};

// Function to place kiity offer
var placeKittyOffer = () => {
    let kittyId = getKittyId()
    let price = $('#sellprice').val()
    let Ethprice = Web3.utils.toWei(price, 'ether');
    marketInstance.methods.setOffer(Ethprice,kittyId).send()
    .on("transactionHash", () => {
      $('#catalog-loader').prop('hidden',false)
    })  
}

// Function to check owner 
var checkOwner = async() => {
    let kittyId = getKittyId()
    return await instance.methods.ownerOf(kittyId).call() 
}

// Function to check offer
var checkOffer = async() => {
    let kittyId = getKittyId()
    let offerDetails = await marketInstance.methods.getOffer(kittyId).call()
    let offerPrice = Web3.utils.fromWei(offerDetails.price, 'ether')
   
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

// Function to cancel offer
var cancelOffer = () => {
    let kittyId = getKittyId()

    marketInstance.methods.removeOffer(kittyId).send()
    .on("transactionHash", function(){
        $('#deletediv').prop('hidden', false)
      })
    
}

// Function to buy kitty
var buyKitty = async() => {
    let kittyId = getKittyId()
    let offerDetails = await marketInstance.methods.getOffer(kittyId).call()
    let price = offerDetails.price

    marketInstance.methods.buyKitty(kittyId).send({value: price})
    .on("transactionHash", function(hash){
        $('#catalog-loader').prop('hidden',false)
      })
    
}

var marketListeners = () => {
    marketInstance.events.MarketTransaction().on('data', (event) => {
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

// Function to approve contract to trade Kitties
var grantKittyApproval = () => {
    instance.methods.setApprovalForAll(marketAddress, true).send()
    .on('transactionHash', () => {
        $('#catalog-loader').prop('hidden',false) 
    })   
}

var approvalEventListener = () => {
    instance.events.ApprovalForAll().on('data', (event) => {
        $('#approveBtn').addClass('hidden')
        $('#offerBtn').prop('disabled', false)
        $('#catalog-loader').prop('hidden',true)
})}

var checkifMarketContractisApproved = async() => {
    var isApproved = await instance.methods.isApprovedForAll(user, marketAddress).call()

    if(isApproved == true){
        $('#approveBtn').addClass('hidden')
        $('#offerBtn').prop('disabled', false)
    }
    else if(isApproved !== true){
        $('#approveBtn').removeClass('hidden')
        $('#offerBtn').prop('disabled', true)
    }
}
