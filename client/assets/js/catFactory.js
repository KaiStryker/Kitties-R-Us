
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color) 
    $('#headcode').html('code: '+ code) 
    $('#dnabody').html(code) 
    $('#dnabody2').html(code) 
}

function mouthColor(color,code){
    $('.cat__mouth-contour, .cat__chest_inner').css('background', '#' + color)
    $('#mouthcode').html('code: '+ code)
    $('#dnamouth').html(code)
    $('#dnamouth2').html(code)

}

function eyeColor(color,code){
    $('.cat__eye span').css('background', '#' + color)
    $('#eyecode').html('code: '+ code)
    $('#dnaeyes').html(code)
    $('#dnaeyes2').html(code)

}

function tailColor(color,code){
    $('.cat__paw-left, .cat__paw-right, .cat__paw-left_inner, .cat__paw-right_inner, .cat__tail, .cat__ear--left, .cat__ear--right').css('background', '#' + color)
    $('#tailcode').html('code: '+ code)
    $('#dnaears').html(code)
    $('#dnaears2').html(code)
}

function eyeVariation(num) {

    $('#dnashape').html(num)
    $('#dnashape2').html(num)

    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2: 
            normalEyes()
            $('#eyeName').html('Chill')
            SleepyEyes()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Thinker')
            lookingUp()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('Blank')
            blankEyes()
            break
        default: 
            normalEyes()
            break
    }
}

function patternVariation(num) {
    $('#dnadecoration').html(num)
    $('#dnadecoration2').html(num)
    switch (num) {
        case 1:
            $('#patternName').html('Basic')
            normalpattern()
            break
        case 2: 
            normalpattern()
            $('#patternName').html('Third Eye')
            firstpattern()
            break
        case 3: 
            normalpattern()
            $('#patternName').html('Swave')
            secondpattern()
            break
        case 4: 
            normalpattern()
            $('#patternName').html('Femmy')
            thirdpattern()
            break
        default: 
            console.log( 'Need more inputs')
    }
}

function normalEyes() {
    $('.cat__eye').find('span').css('border', 'none')
}
function SleepyEyes() {
     $('.cat__eye').find('span').css('border-top', '12px solid')
}
function lookingUp(){
    $('.cat__eye').find('span').css('border-bottom', '12px solid')
}
function blankEyes(){
    $('.cat__eye').find('span').css('border-top', '41px solid')
}


function normalpattern() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__facedetail-left').css(
        {   "border-radius": "158% 0 90% 0",
            "height": "50px",
            "width": "50px",
            "top": "55px",
            "left": "20px",
            "transform": "rotate(75deg)" 
        })
    $('.cat__facedetail-right').css(
        {   "border-radius": "106% 0 95% 0",
            "height": "88px",
            "width": "86px",
            "top": "95px",
            "left": "138px",
            "transform": "none" 
        })
}

function firstpattern() {
    $('.cat__facedetail-left').css(
        {   "transform": "rotate(47deg)", 
            "height": "50px", 
            "width": "50px", 
            "top": "16px", 
            "left": "82px", 
            "border-radius": "90 0 90% 0" 
        })
    $('.cat__facedetail-right').css(
        {   "height": "88px", 
            "width": "86px", 
            "top": "62px", 
            "border-radius": "106% 0 95% 0", 
            "left": "114px" 
        })
}

function secondpattern() {
    $('.cat__facedetail-left').css(
        {   "border-radius": "69%",
            "height": "55px",
            "width": "161px",
            "top": "109px",
            "left": "22px",
            "transform": "rotate(86deg)"
        })
    $('.cat__facedetail-right').css(
        {   "height": "88px", 
            "width": "149px", 
            "top": "34px", 
            "border-radius": "106% 0 95% 0", 
            "left": "41px" 
        })
}

function thirdpattern() {
    $('.cat__facedetail-left').css(
        {   "border-right": "14px solid rgba(255, 255, 255, 0)",
            "border-left": "14px solid rgba(255, 255, 255, 0)",
            "border-top": "14px solid rgba(255, 255, 255, 0)",
            "border-radius": "40%"
        })
    $('.cat__facedetail-right').css(
        {   "transform": "rotate(17deg)",
            "border-right": "14px solid rgba(255, 255, 255, 0)",
            "border-left": "14px solid rgba(255, 255, 255, 0)",
            "border-top": "14px solid rgba(255, 255, 255, 0)",
            "border-radius": "40%",
            "height": "50px",
            "width": "50px",
            "top": "55px",
            "left": "157px",
        })
}

function changeleftpatternColor(color, code) {
    $('.cat__facedetail-left').css('background-color', '#' + color)
    $('#Pattern1_code').html('code: '+ code)
    $('#dnadecorationfirst').html(code)
    $('#dnadecorationfirst2').html(code)
}

function changerightpatternColor(color, code) {
    $('.cat__facedetail-right').css('background-color', '#' + color)
    $('#Pattern2_code').html('code: '+ code)
    $('#dnadecorationsecond').html(code)
    $('#dnadecorationsecond2').html(code)
}

function animationVariation(num){
    $('#dnaanimation').html(num)
    $('#dnaanimation2').html(num)
    switch(num){
        case 1:
            resetAnimations();
            $('#animationName').html('Still')
            break;
        case 2:
            resetAnimations();
            $('#animationName').html('Shaky');
            animationType1();
            break;
        case 3:
            resetAnimations();
            $('#animationName').html('Ignite');
            animationType2();
            break;
        case 4:
            resetAnimations();
            $('#animationName').html('Shaky');
            animationType3();    
            break; 
    }
}

function resetAnimations() {
    $('#head').removeClass("movingHead");
    $('#ears').removeClass("movingHead");
    $('#details').removeClass("ignite")
    $('#details2').removeClass("ignite")
    $('#tail').removeClass("wiggle")
    //Popup screen ids
    $('#head2').removeClass("movingHead");
    $('#ears2').removeClass("movingHead");
    $('#details_').removeClass("ignite")
    $('#details2_').removeClass("ignite")
    $('#tail2').removeClass("wiggle")
}

function animationType1() {
    resetAnimations();
    $('#head').addClass("movingHead")
    $('#ears').addClass("movingHead")
    //Popup screen ids
    $('#head2').addClass("movingHead")
    $('#ears2').addClass("movingHead")
}

function animationType2() {
    resetAnimations();
    $('#details').addClass("ignite")
    $('#details2').addClass("ignite")
    //Popup screen ids
    $('#details_').addClass("ignite")
    $('#details2_').addClass("ignite")
}

function animationType3() {
    resetAnimations();
    $('#tail').addClass("wiggle")
    //Popup screen ids
    $('#tail2').addClass("wiggle")
}

function colorSwitch() {
    $('#catColors').removeClass("hide")
    $('#catAttributes').addClass("hide")
}

function attributeSwitch() {
    $('#catAttributes').removeClass("hide")
    $('#catColors').addClass("hide")
}


