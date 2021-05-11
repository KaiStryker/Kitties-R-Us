
// Function that takes the string and converts it to Cat-tributes
var catDna = (dnaStr) => {
    var dna = {
        //Colors
        "headcolor": dnaStr.substring(0, 2),
        "mouthColor": dnaStr.substring(2, 4),
        "eyesColor": dnaStr.substring(4, 6),
        "earsColor": dnaStr.substring(6, 8),
        //Cattributes
        "eyesShape": dnaStr.substring(8, 9),
        "decorationPattern": dnaStr.substring(9, 10),
        "decorationfirstcolor": dnaStr.substring(10, 12),
        "decorationsecondcolor": dnaStr.substring(12, 14),
        "animation": dnaStr.substring(14, 15),
        "lastNum": dnaStr.substring(15, 16)
    }
    return dna
}
// Function that logs info from Cat-tribute function into html
var renderCat = (dna,id) => {

    headColor(colors[dna.headcolor], id)
    mouthColor(colors[dna.mouthColor], id)
    eyeColor(colors[dna.eyesColor], id)
    tailColor(colors[dna.earsColor], id)
    eyeVariation(dna.eyesShape, id)
    patternVariation(dna.decorationPattern, id)
    changeleftpatternColor(colors[dna.decorationfirstcolor], id)
    changerightpatternColor(colors[dna.decorationsecondcolor], id)
    animationVariation(dna.animation, id)
}

// Cat HTML Div for catalogue
var catBox = (id) => {
    var catDiv = `<div class="col-lg-4 pointer fit-content" id="catview` + id + `">
                 <div class="featureBox catDiv">
                 <div data-toggle="tooltip" title="Click for More Details" data-trigger="hover" data-placement='bottom'>
                 `+ catBody(id) + ` 
                 </div>                        
                 </div>
                 <div class="dnaDiv" id="catDNA`+ id + `"></div>
                 `+ cattributes(id) + `
                </div>`
    var catView = $('#catview' + id)
    if (!catView.length) {
        $('#catsDiv').append(catDiv)
    }
}


//Simple body of a cat
var catBody = (id) => {
    var single = `<div class="cat__ear" id="ears`+ id + `">
    <div id="leftEar`+ id + `" class="cat__ear--left">
        <div class="cat__ear--left-inside"></div>

    </div>
    <div id="rightEar`+ id + `" class="cat__ear--right">
        <div class="cat__ear--right-inside"></div>
    </div>
    </div>
    <div id="head`+ id + `" class="cat__head">
    <div id="midDot`+ id + `" class="cat__head-dots">
        <div id="leftDot`+ id + `" class="cat__head-dots_first"></div>
        <div id="rightDot`+ id + `" class="cat__head-dots_second"></div>
    </div>
    <div id="catEye`+ id + `" class="cat__eye">
        <div class="cat__eye--left">
            <span class="pupil-left"></span>
        </div>
        <div class="cat__eye--right">
            <span class="pupil-right"></span>
        </div>
    </div>
    <div class="cat__facedetail-left" id="details`+ id + `"></div>
    <div class="cat__facedetail-right" id="details2`+ id + `"></div>
    <div class="cat__nose"></div>
    <div id="mouth-contour`+ id + `" class="cat__mouth-contour"></div>
    <div class="cat__mouth-left"></div>
    <div class="cat__mouth-right"></div>
    <div class="cat__whiskers-left"></div>
    <div class="cat__whiskers-right"></div>
    </div>
    <div class="cat__body">
        <div id= "chest`+ id + `" class="cat__chest"></div>
        <div id= "chest_inner`+ id + `" class="cat__chest_inner"></div>
        <div id="pawLeft`+ id + `" class="cat__paw-left"></div>
        <div id= "pawLeftInner`+ id + `" class="cat__paw-left_inner"></div>
        <div id= "pawRight`+ id + `" class="cat__paw-right"></div>
        <div id= "pawRightInner`+ id + `" class="cat__paw-right_inner"></div>
        <div id="tail`+ id + `" class="cat__tail"></div>
    </div>`
    return single
}

var cattributes = (id) => {
    var Cattributes = `<ul class=" cattributes" style="list-style: none;">
                            <li><span id="eyeName`+ id + `"></span> eyes</li>
                            <li><span id="patternName`+ id + `"></span> decoration</li>
                            <li><span id="animationName`+ id + `"></span> animation </li>
                        </ul>`
    return Cattributes
}

var Catalog_onLaunch = (KittyLog) => {
    KittyLog.map( (kittyLog) => {
        let kittyDna = catDna(kittyLog.kittyGenes);

        // Functions that loads html of Kittys on catalog page, 
        catBox(kittyLog.kittyId);
        renderCat(kittyDna,kittyLog.kittyId);
        $('#catview' + kittyLog.kittyId).attr('onclick', 'displayKittypage("placeOffer.html?catId='+ kittyLog.kittyId +'")')
        $('#catDNA' + kittyLog.kittyId).html(`
        <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ kittyLog.kittyGeneration + `</h4></span>
        <br>
        <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ kittyLog.kittyGenes + `</h4></span>`);
    })
    $('#catalog-loader').prop('hidden',true)
    if(!KittyLog.length){
        $('#noKittyMessage').prop('hidden', false)
        $('#breedButton').prop('hidden', true)
    }
}

var Breedingpage = () => {
    window.location.replace("breeding.html")
}

var displayKittypage = (url) => {
    window.location.replace(url)
}
 