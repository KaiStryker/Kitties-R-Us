// Create a function that takes the string and converts it to Cat-tributes
var maxChecked = 2;
var currentlyChecked;
var dadDna;
var mumDna;
var childDna;

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

// Create a function that logs info from Cat-tribute function into html that is presented on Catalog page

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

// Cat HTML Div for catalog
var dadCatBox = (dna,id) => {

    var catDiv = `<div id="dadDiv" value=${dna}>
                 `+ catBody(id) + `                         
                 </div>`
    var catView = $('#dadKitty')
    $('#dadKitty').append(catDiv)
}

var mumCatBox = (dna,id) => {

    var catDiv = `<div id="mumDiv" value=${dna}>
                 `+ catBody(id) + `                         
                 </div>`
    var catView = $('#mumDiv')
    if (!catView.length){
    $('#mumKitty').append(catDiv)
    }
}

var childCatBox = (dna,id) => {

    var catDiv = `<div id="childDiv" value=${dna}>
                 `+ catBody(id) + `                         
                 </div>`
    var catView = $('#childDiv')
    if (!catView.length){
    $('#childKitty').append(catDiv)
    }
}


var catCarousel = (dna,id) => {
    var catDiv = ` <input type="checkbox" name="Kitty" id="kitty`+ id +`" value= "${dna}">  
                <label for="kitty`+ id +`" class="KittyBreeding" id= "kit `+ id + ` ">
                 <div class="featureBox">
                 `+ catBody(id) + `
                 </div>
                 </label>                       
                 </div>`
    var catView = $('#kitty' + id)
    // if (!catView.length) {
    // $( ".glider-prev" ).before(catDiv);
    $('.glider-track').append(catDiv)
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
    <div class="cat__facedetail-right" id="details2-`+ id + `"></div>
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

// Each kitty will be clickable and once clicked will be loaded on the display box 
// Need a way to change filled(mumboxFilled) variables from true to false and vice versa when checkboxed are clicked or unclicked
// Make sure only two kitties can be selected at a time 
$(document).on('input', 'input:checkbox',function() {
    // Need to 
    if (($('input[type=checkbox]:checked')).length > maxChecked) return  console.log(`${$(this).prop('checked', false)}`)
    
    if (this.checked) {
      currentlyChecked = this.value
      displayKitty(currentlyChecked)
      return
    } 

    if (!this.checked){
        // console.log(this.value == $("#dadDiv").attr('value'))
        ($("#dadDiv").length & $("#mumDiv").length) & this.value == $("#dadDiv").attr('value') ? $("#dadDiv, #childDiv").remove() : 
        ($("#dadDiv").length & $("#mumDiv").length) & this.value == $("#mumDiv").attr('value') ? $("#mumDiv, #childDiv").remove() :
        $("#dadDiv").length & !($("#mumDiv").length) ? $("#dadDiv").remove() : 
        !($("#dadDiv").length) & ($("#mumDiv").length) ? $("#mumDiv").remove() : null
    }
    });

// Function that takes that blends dna of 2 kitties and returns a new one 
var loadChildKitty = (_dadDna, _mumDna) => {
    var id = "childKitty";
    var firstHalf = Math.floor(_dadDna / 100000000); // 11223344 
    console.log(firstHalf)
    var secondHalf = _mumDna % 100000000; // 44332211
    console.log(secondHalf)
    var newDna = firstHalf * 100000000;
    console.log(newDna)
    var finalDna = (newDna + secondHalf)
    console.log(finalDna)
    var childDna = finalDna.toString(); // 1122334444332211
    childDnaArray = catDna(childDna);
    childCatBox(finalDna,id);
    renderCat(childDnaArray,id);
}

var loadDadKitty = (_dadDna) => {
    var id = "dadKitty";
    let dadDna = catDna(_dadDna);
    dadCatBox(_dadDna,id);
    renderCat(dadDna,id);
}

var loadMumKitty = (_mumDna) => {
    var id = "mumKitty";
    let mumDna = catDna(_mumDna);
    mumCatBox(_mumDna,id);
    renderCat(mumDna,id);
}

var displayKitty = (dna) => {
// When only one kitty is selected
// Run dna thru render dna function and display result on screen
    if((!($("#dadDiv").length) & !($("#mumDiv").length)) == true){
        dadDna = dna
        loadDadKitty(dadDna)
        return
    }
// Once a second kitty is clicked, it will be loaded in the Mum box and it’s DNA will be mixed with the first kitty and the result will be displayed above
    if(($("#dadDiv").length & !($("#mumDiv").length))== true){
        mumDna = dna
        loadMumKitty(mumDna)
    }

//When dadDiv is empty and MumDiv isn't
    if(!($("#dadDiv").length & ($("#mumDiv").length))== true){ 
        dadDna = dna
        loadDadKitty(dadDna)
    }
// When 2 kitties are selected 
// Take dna of both cats and run thru blend function
// Return result on screen thru render dna function 
    if ($("#dadDiv").length & $("#mumDiv").length) {
    loadChildKitty(dadDna,mumDna)}

}

var Carousel_onLaunch = (KittyLog) => {
 
    KittyLog.map( (kittyLog) => {
        let kittyDna = catDna(kittyLog.kittyGenes);

        // Function that loads html of Kittys on carousel page, 
        catCarousel(kittyLog.kittyGenes,kittyLog.id);
        renderCat(kittyDna,kittyLog.id);

    })
}

// $('input[type=checkbox]').change(function () {
//     if ($('input[type=checkbox]:checked').length > maxChecked) {
//         $(this).prop('checked', false) ;
//         //create statement appended to html that displays this instead of an alert
//         alert("only 2 kitties can be checked");
//     }
// });
