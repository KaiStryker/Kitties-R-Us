// Create a function that takes the string and converts it to Cat-tributes
var dadboxFilled = false;
var mumboxFilled = false;
var maxChecked = 2;
var dadValue;
var mumValue;

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
var dadCatBox = (id) => {

    var catDiv = `
                 `+ catBody(id) + `                         
                 `
    var catView = $('#dadKitty')
    if (!catView.length) {
        $('#catsDiv').append(catDiv)
    }
}

var mumCatBox = (id) => {

    var catDiv = `
                 `+ catBody(id) + `                         
                 `
    var catView = $('#mumKitty')
    if (!catView.length) {
        $('#catsDiv').append(catDiv)
    }
}

var childCatBox = (id) => {

    var catDiv = `
                 `+ catBody(id) + `                         
                 `
    var catView = $('#childKitty')
    if (!catView.length) {
        $('#catsDiv').append(catDiv)
    }
}

var catCarousel = (dna,id) => {
    console.log(dna)
    var catDiv = `<label for="kitty`+ id +`" class="KittyBreeding" id= "kit `+ id + ` ">
                 <div class="featureBox">
                 `+ catBody(id) + `
                 </div>
                 </label>
                 <input type="checkbox" name="Kitty" id="kitty`+ id +`" value= "${dna}" onclick= "logvalue('kitty`+ id +`')">                         
                 </div>`
    // var catView = $('#kit' + id)
    // if (!catView.length) {
    // $( ".glider-prev" ).before(catDiv);
    $('.glider-track').append(catDiv)
    // }
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
// Need a way to change filled variables from true to false and vice versa when checkboxed are clicked or unclicked
// Make sure only two kitties can be selected at a time 
$('input[type=checkbox]').change(function() {
    console.log(this);
    if ($('input[type=checkbox]:checked').length > maxChecked) return  $(this).prop('checked', false)
    
    if ($(this).is(':checked')) {
      console.log(this)
      displayKitty();
    } 
    else {
      console.log("Checkbox is unchecked..")
      if (dadboxFilled){
          dadboxFilled = false;
      }
      else {
            mumboxFilled = false;
        }
      }
    }
    
    
    );

// Function that takes that blends dna of 2 kitties and returns a new one 
var loadChildKitty = (_dadDna, _mumDna) => {
    var id = "childKitty";
    var firstHalf =_dadDna / 100000000; // 11223344 
    var secondHalf = _mumDna % 100000000; // 44332211
    var newDna = firstHalf * 100000000;
    var childDna = newDna + secondHalf; // 1122334444332211

    childDna = catDna(childDna);
    childCatBox(id);
    renderCat(childDna,id);
}

var loadDadKitty = () => {
    var id = "dadKitty";
    dadDna = catDna(dadValue);
    dadCatBox(id);
    renderCat(dadDna,id);
    dadboxFilled = true;
}

var loadMumKitty = () => {
    var id = "mumKitty";
    mumDna = catDna(mumValue);
    mumCatBox(id);
    renderCat(mumDna,id);
    mumboxFilled = true;
}

var displayKitty = () => {
// When only one kitty is selected
// Run dna thru render dna function and display result on screen
    if((dadboxFilled && mumboxFilled) == false){
        dadValue = $(this).val()
        console.log(dadValue)
        loadDadKitty()
        return
    }
// Once a second kitty is clicked, it will be loaded in the Mum box and it’s DNA will be mixed with the first kitty and the result will be displayed above
    if(dadboxFilled && (mumboxFilled == false)){
        //needs work
        mumValue = $(this).val()
        console.log(mumValue)
        loadMumKitty()
    }
// When 2 kitties are selected 
// Take dna of both cats and run thru blend function
// Return result on screen thru render dna function 
    if (dadboxFilled && mumboxFilled) return loadChildKitty(dadValue,mumValue);
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
