var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var contractAddress = "0xdAC391e04d588Cfc0735814f302D08E1E21Dde19";
// "0x1A23bc6FB16e2Bbce9aF87425e226AD55A463C76" - old contract
// var abi;

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, 
        {from: accounts[0], gas:300000, gasPrice:20000000000});
        user = accounts[0];

        console.log(instance);
       // SubscriptionCall()
    })
});

var SubscriptionCall = () => {
    // Way to subscribe to all events on page load 
  instance.events.Birth().on('data', function(event){
  console.log(event);
  let kittenId = event.returnValues.kittenId;
  let mumId = event.returnValues.mumId;
  let dadId = event.returnValues.dadId
  let genes = event.returnValues.genes
  $("").text( +" kittenId:" + kittenId
              +" mumId:" + mumId
              +" dadId:" + dadId
              +" genes:" + genes)
})
.on('error', console.error);
  }

var birthCall = async () => {    
    let newEvent = await instance.once('Birth', {
    filter: {owner: user}
    }, (error,response) => {
        let value = response.returnValues['genes']
        console.log(value);
    })
}

var transferCall = async () => {
    let newEvent = await instance.once('Transfer', {
    filter: {owner: user}
    }, (error,response) => {
            console.log(response.returnValues
            );
        })
}

var getCurrentDna = () => {
   var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationfirst').html()
    dna += $('#dnadecorationsecond').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

var createKitty = () => {
    console.log('working')
    var dnaStr = getCurrentDna();
    instance.methods.createKittyGen0(dnaStr).send()
    .on("transactionHash", function(hash){
        console.log(hash);
        $('.mint-background').show();
        console.log('Showing mint screen');
        $('.submitButton').prop('disabled', true);
    })
    .then(birthCall())
    .then(() => {
        $('.mint-background').hide();
        $('.event-background').show();
        $('.submitButton').prop('disabled', false);
        console.log('minting was successful!');
    })
    .catch(error => console.error(error))
    // create landing page that displays Kitty created on the blockchain
}

// Create a function that pulls information from blockchain about Gen0 kitties for sale and returns genes
// var kittyLog = [];
// Update to pull array of caller's kitty ids,

var pullCatalog = async() => {
    //prone to being updated once marketplace is integrated
    var kittyArray = await instance.methods.tokensOfOwner(user).call();
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
        Catalog_onLaunch(kittyLog);
    return kittyLog; 
};

var pullCarousel = async() => {
    //prone to being updated once marketplace is integrated
    var kittyArray = await instance.methods.tokensOfOwner(user).call();
    pullKittyforCarousel(kittyArray); 
  };

var pullKittyforCarousel = async(kittyArray) => {
        var kittyLog = [];

        for (let id = 0; id < kittyArray.length; id++) {
            let kittyId = kittyArray[id]
            let kitties = await instance.methods.getKitty(kittyId).call();
            let kittyGenes = kitties['genes'];
            kittyLog.push({kittyGenes, kittyId});
            console.log(kittyLog);
        }
        Carousel_onLaunch(kittyLog);
    return kittyLog;
};

var breedKitty = () => {
    let dadId = parseInt($("#dadDiv").attr('title'))
    let mumId = parseInt($("#mumDiv").attr('title'))
    instance.methods.breed(dadId,mumId).send().on
    ("transactionHash", function(hash){
        console.log(hash);
        window.location.replace("catalog.html")
    }).catch(error => console.error(error))
}

var pullKittyforOfferpage = async() => {
    var kittyId = getKittyId();
    console.log(kittyId)
    var kittyLog = [];0
        let kitties = await instance.methods.getKitty(kittyId).call();
        let kittyGenes = kitties['genes'];
        let kittyGeneration = kitties['generation'];
        kittyLog.push({kittyGenes, kittyId, kittyGeneration});
        console.log(kittyLog);
    CatOffer(kittyLog);
    return kittyLog;
};

var getKittyId = () => {
    var params = new URLSearchParams(window.location.search)
    return params.get('catId')
}

