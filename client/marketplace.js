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

        console.log("marketplace contract instance: " + instance);
       // SubscriptionCall()
    })
});

