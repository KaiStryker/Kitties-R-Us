var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var marketAddress = "0x2e7a44DEA57f355ee4D2Bc82bECe0FA69BA403eb";
// var marketabi;

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(marketabi, marketAddress, 
        {from: accounts[0], gas:300000, gasPrice:20000000000});
        user = accounts[0];

        console.log(instance);
       // SubscriptionCall()
    })
});

var pullCatalog = async() => {
    //prone to being updated once marketplace is integrated
    var kittyArray = await instance.methods.getAllTokenOnSale().call();
    console.log(kittyArray)
    pullKitty(kittyArray); 
  };

var pullKitty = async(kittyArray) => {
    var kittyLog = [];

    for (let i = 0; i < kittyArray.length; i++) {
        let kittyId = kittyArray[i]
        let kitties = await instance.methods.getKitty(kittyId).call();
        let kittyGenes = kitties['genes'];
        let kittyGeneration = kitties['generation'];
        kittyLog.push({kittyGenes, kittyId, kittyGeneration}); 
        console.log(kittyLog);  
    }
    catOffers_onLaunch(kittyLog);
return kittyLog; 
};

