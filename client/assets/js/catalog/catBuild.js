// CSS properties to build each cat depending on the DNA

function headColor(color, id) {
    $('#head' + id + ', #chest' + id).css('background', '#' + color) 
}

function mouthColor(color, id){
    $('#mouth-contour'+ id + ', #chest_inner' + id).css('background', '#' + color)
}

function eyeColor(color, id){
    $('#catEye' + id).find('span').css('background', '#' + color)
}

function tailColor(color, id){
    $('#pawLeft' + id + ', #pawRight' 
    + id + ', #pawLeftInner' 
    + id + ', #pawRightInner' 
    + id + ', #tail' 
    + id + ', #leftEar' 
    + id + ', #rightEar' 
    + id)
    .css('background', '#' + color)
}

function eyeVariation(num, id) {

    switch (num) {
        case '1':
            normalEyes(id)
            $('#eyeName'+ id).html('Basic')
            break
        case '2': 
            normalEyes(id)
            $('#eyeName'+ id).html('Chill')
            SleepyEyes(id)
            break
        case '3':
            normalEyes(id)
            $('#eyeName'+ id).html('Thinker')
            lookingUp(id)
            break
        case '4':
            normalEyes(id)
            $('#eyeName'+ id).html('Blank')
            blankEyes(id)
            break
        default: 
            normalEyes(id)
            break
    }
}

function patternVariation(num, id) {
  
    switch (num) {
        case '1':
            $('#patternName' + id).html('Basic')
            normalpattern(id)
            break
        case '2': 
            normalpattern(id)
            $('#patternName' + id).html('Third Eye')
            firstpattern(id)
            break
        case '3': 
            normalpattern(id)
            $('#patternName' + id).html('Swave')
            secondpattern(id)
            break
        case '4': 
            normalpattern(id)
            $('#patternName' + id).html('Femmy')
            thirdpattern(id)
            break
    }
}

function normalEyes(id) {
    $('#catEye' + id).find('span').css('border', 'none')
}
function SleepyEyes(id) {
    $('#catEye'+ id).find('span').css('border-top', '12px solid')
}
function lookingUp(id){
    $('#catEye' + id).find('span').css('border-bottom', '12px solid')
}
function blankEyes(id){
    $('#catEye' + id).find('span').css('border-top', '41px solid')
}


function normalpattern(id) {
    $('#details' + id).css(
        {   "border-radius": "158% 0 90% 0",
            "height": "50px",
            "width": "50px",
            "top": "55px",
            "left": "20px",
            "transform": "rotate(75deg)" 
        })
    $('#details2' + id).css(
        {   "border-radius": "106% 0 95% 0",
            "height": "88px",
            "width": "86px",
            "top": "95px",
            "left": "138px",
            "transform": "none" 
        })
}

function firstpattern(id) {
    $('#details' + id).css(
        {   "transform": "rotate(47deg)", 
            "height": "50px", 
            "width": "50px", 
            "top": "16px", 
            "left": "82px", 
            "border-radius": "90 0 90% 0" 
        })
    $('#details2' + id).css(
        {   "height": "88px", 
            "width": "86px", 
            "top": "62px", 
            "border-radius": "106% 0 95% 0", 
            "left": "114px" 
        })
}

function secondpattern(id) {
    $('#details' + id).css(
        {   "border-radius": "69%",
            "height": "55px",
            "width": "161px",
            "top": "109px",
            "left": "22px",
            "transform": "rotate(86deg)"
        })
    $('#details2' + id).css(
        {   "height": "88px", 
            "width": "149px", 
            "top": "34px", 
            "border-radius": "106% 0 95% 0", 
            "left": "41px" 
        })
}

function thirdpattern(id) {
    $('#details' + id).css(
        {   "border-right": "14px solid rgba(255, 255, 255, 0)",
            "border-left": "14px solid rgba(255, 255, 255, 0)",
            "border-top": "14px solid rgba(255, 255, 255, 0)",
            "border-radius": "40%"
        })
    $('#details2' + id).css(
        {   "transform": "rotate(17deg)",
            "border-right": "14px solid rgba(255, 255, 255, 0)",
            "border-left": "14px solid rgba(255, 255, 255, 0)",
            "border-top": "14px solid rgba(255, 255, 255, 0)",
            "border-radius": "40%",
            "height": "50px",
            "width": "50px",
            "top": "55px",
            "left": "157px"
        })
}

function changeleftpatternColor(color, id) {
    $('#details' + id).css('background-color', '#' + color)
}

function changerightpatternColor(color, id) {
    $('#details2' + id).css('background-color', '#' + color)
}

function animationVariation(num, id){

    switch(num){
        case '1':
            resetAnimations(id);
            $('#animationName' + id).html('Still')
            break;
        case '2':
            resetAnimations(id);
            $('#animationName' + id).html('Shaky head')
            animationType1(id)
            break;
        case '3':
            resetAnimations(id);
            $('#animationName' + id).html('Ignite')
            animationType2(id)
            break;
        case '4':
            resetAnimations(id);
            $('#animationName' + id).html('Shaky tail')
            animationType3(id)  
            break; 
    }
}

function resetAnimations(id) {
    $('#head'+ id).removeClass("movingHead")
    $('#ears'+ id).removeClass("movingHead")
    $('#details' + id).removeClass("ignite")
    $('#details2' + id).removeClass("ignite")
    $('#tail' + id).removeClass("wiggle")
}

function animationType1(id) {
    resetAnimations();
    $('#head'+ id).addClass("movingHead")
    $('#ears'+ id).addClass("movingHead")
}

function animationType2(id) {
    resetAnimations(id);
    $('#details' + id).addClass("ignite")
    $('#details2' + id).addClass("ignite")
}

function animationType3(id) {
    resetAnimations(id);
    $('#tail' + id).addClass("wiggle")
}
