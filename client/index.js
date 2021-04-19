var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var contractAddress = "0xb0a734Eb141b8e3686E3e32d8dd67A21E08fbFEE";
var abi;

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
  let owner = event.returnValues.owner;
  let kittenId = event.returnValues.kittenId;
  let mumId = event.returnValues.mumId;
  let dadId = event.returnValues.genes
  $("").text("owner:" + owner
              +" kittenId:" + kittenId
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

var pullCatalog = async() => {
    //prone to being updated once marketplace is integrated
    var num = await instance.methods.gen0Counter().call();
    pullKitty(20); 
  };

var pullKitty = async(num) => {
        var kittyLog = [];

        for (let i = 0; i < num; i++) {
            let kitties = await instance.methods.getKitty(i).call();
            let kittyGenes = kitties['genes'];
            let kittyGeneration = kitties['generation'];
            kittyLog.push({kittyGenes, i, kittyGeneration}); 
            console.log(kittyLog);  
        }
        Catalog_onLaunch(kittyLog);
    return kittyLog;
};

var pullCarousel = async() => {
    //prone to being updated once marketplace is integrated
    var num = await instance.methods.gen0Counter().call();
    pullKittyforCarousel(20); 
  };

var pullKittyforCarousel = async(num) => {
        var kittyLog = [];

        for (let id = 0; id < num; id++) {
            let kitties = await instance.methods.getKitty(id).call();
            let kittyGenes = kitties['genes'];
            kittyLog.push({kittyGenes, id});  
        }
        Carousel_onLaunch(kittyLog);
    return kittyLog;
};


