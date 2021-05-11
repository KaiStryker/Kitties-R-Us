
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyeColor" : 12,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationfirstcolor" : 11,
    "decorationsecondcolor" : 11,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$(document).ready(function() {
    $('#dnabody').html(defaultDNA.headColor);
    $('#dnamouth').html(defaultDNA.mouthColor);
    $('#dnaeyes').html(defaultDNA.eyesColor);
    $('#dnaears').html(defaultDNA.earsColor);
    
    $('#dnashape').html(defaultDNA.eyesShape)
    $('#dnadecoration').html(defaultDNA.decorationPattern)
    $('#dnadecorationfirst').html(defaultDNA.decorationfirstcolor)
    $('#dnadecorationsecond').html(defaultDNA.decorationsecondcolor)
    $('#dnaanimation').html(defaultDNA.animation)
    $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
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

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    mouthColor(colors[dna.mouthColor], dna.mouthColor)
    $('#mouthtummycolor').val(dna.headcolor)
    eyeColor(colors[dna.eyeColor], dna.eyeColor)
    $('#eyecolor').val(dna.eyeColor)
    tailColor(colors[dna.earsColor], dna.earsColor)
    $('#tailcolor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)  
    patternVariation(dna.decorationPattern)
    $('#decPattern').val(dna.decorationPattern)
    changeleftpatternColor(colors[dna.decorationfirstcolor], dna.decorationfirstcolor)
    $('#patterncolor_1').val(dna.decorationfirstcolor)
    changerightpatternColor(colors[dna.decorationsecondcolor], dna.decorationsecondcolor)
    $('#patterncolor_2').val(dna.decorationsecondcolor)
    animationVariation(dna.animation)
    $('#animationPattern').val(dna.animation)
    //temperarily used for pop up
    $('#dnaspecial2').html(dna.lastNum)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthtummycolor').change(()=>{
    var colorValue = $('#mouthtummycolor').val()
    mouthColor(colors[colorValue], colorValue)
})
$('#eyecolor').change(()=>{
    var colorVal = $('#eyecolor').val()
    eyeColor(colors[colorVal], colorVal)
})
$('#tailcolor').change(()=>{
    var colorVal = $('#tailcolor').val()
    tailColor(colors[colorVal], colorVal)
})

// Changing catributes 
$('#eyeshape').change(()=>{
    var shape = parseInt($('#eyeshape').val())
    eyeVariation(shape)
})

$('#decPattern').change(()=>{
    var pattern = parseInt($('#decPattern').val())
    patternVariation(pattern)
})

$('#patterncolor_1').change(()=>{
    var patternColor = $('#patterncolor_1').val()
    changeleftpatternColor(colors[patternColor], patternColor)
})

$('#patterncolor_2').change(()=>{
    var patternColor = $('#patterncolor_2').val()
    changerightpatternColor(colors[patternColor], patternColor)
})

$('#animationPattern').change(()=>{
    var animationNum = parseInt($('#animationPattern').val())
    animationVariation(animationNum)
})

function colorSwitch() {
    $('#catColors').removeClass("hide")
    $('#catAttributes').addClass("hide")
}

function attributeSwitch() {
    $('#catAttributes').removeClass("hide")
    $('#catColors').addClass("hide")
}

$('.close-button').click(()=> {
    $('.mint-background').hide();
    $('.event-background').hide();
})

$('.mint-background').click(()=> {
    $('.mint-background').hide();
    $('.event-background').hide();
})

$('.event-background').click(()=> {
    $('.mint-background').hide();
    $('.event-background').hide();
})

function randomizesColor() {
    var num = (Math.floor(Math.random() * 89 ) + 10).toString(); 
    return num;
 }
 
 function randomizesAttr() {
     var num = Math.floor(Math.random() * 4 ) + 1; 
     return num;
  }

function randomKitty() {
    var head = randomizesColor()
    var mouth = randomizesColor()
    var eye = randomizesColor()
    var tail = randomizesColor()

    var eyeVari = randomizesAttr()
    var patVari = randomizesAttr()

    var patColor1 = randomizesColor()
    var patColor2 = randomizesColor()

    var aniVari = randomizesAttr()
    
    // Colors 
    headColor(colors[head],head)
    $('#bodycolor').val(head)
    mouthColor(colors[mouth], mouth)
    $('#mouthtummycolor').val(mouth)
    eyeColor(colors[eye], eye)
    $('#eyecolor').val(eye)
    tailColor(colors[tail], tail)
    $('#tailcolor').val(tail)

    // Attributes
    eyeVariation(eyeVari)
    $('#eyeshape').val(eyeVari)  
    patternVariation(patVari)
    $('#decPattern').val(patVari)
    changeleftpatternColor(colors[patColor1], patColor1)
    $('#patterncolor_1').val(patColor1)
    changerightpatternColor(colors[patColor2], patColor2)
    $('#patterncolor_2').val(patColor2)
    animationVariation(aniVari)
    $('#animationPattern').val(aniVari)
}

function defaultKitty(){
    renderCat(defaultDNA)
}
