var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var contractAddress = "0x237c8582798165A5C9cab3f79BAA449C42Ef217c"
var contractOwner;

$(document).ready(function(){
    window.ethereum.enable().then(async function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, 
        {from: accounts[0]});
        user = web3.utils.toChecksumAddress(accounts[0]);
        contractOwner = await instance.methods.owner().call();
        console.log(instance);
    })
});

var birthCall = async () => {    
    await instance.once('Birth', {
    filter: {owner: user}
    }, (error,response) => {
        let value = response.returnValues['genes']
        console.log(value);
    })
}

var transferCall = async () => {
    await instance.once('Transfer', {
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
    var price = web3.utils.toWei(".02", "ether")
    console.log(price)
    var dnaStr = getCurrentDna();
    (user == contractOwner ? instance.methods.createKittyGen0(dnaStr).send() 
    :instance.methods.createKitty(dnaStr).send({value: price}))
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
}

// For Catalog page
var pullCatalog = async() => {
    var kittyArray = await instance.methods.tokensOfOwner(user).call();
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
        }
        Catalog_onLaunch(kittyLog);
    return kittyLog; 
};

// For Breed page
var pullCarousel = async() => {
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
        }
        Carousel_onLaunch(kittyLog);
    return kittyLog;
};

var breedKitty = () => {
    let dadId = parseInt($("#dadDiv").attr('title'))
    let mumId = parseInt($("#mumDiv").attr('title'))
    instance.methods.breed(dadId,mumId).send().on
    ("transactionHash", function(hash){
        $('.mint-background').show()
    })
    .then(birthCall())
    .then(()=> {
         window.location.replace("catalog.html")
    })
    .catch(error => console.error(error))
}

// For offer page
var pullKittyforOfferpage = async() => {
    var kittyId = getKittyId();
    var kittyLog = [];0
        let kitties = await instance.methods.getKitty(kittyId).call();
        let kittyGenes = kitties['genes'];
        let kittyGeneration = kitties['generation'];
        kittyLog.push({kittyGenes, kittyId, kittyGeneration});
    CatOffer(kittyLog);
    return kittyLog;
};

var getKittyId = () => {
    var params = new URLSearchParams(window.location.search)
    return params.get('catId')
}

