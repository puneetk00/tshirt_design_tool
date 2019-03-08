$('#saveImg').on('click', saveImg);
var c;

function saveImg() {
    $('body').addClass('can-output');
    $('.canvas-output').css('display', 'block');

    var img = canvas.toDataURL("image/jpeg");
    var c = document.getElementById('myCanvasExport');
    var ctx = c.getContext("2d");
    var imageObj1 = new Image();
    var imageObj2 = new Image();
    imageObj1.crossOrigin = "*";
    imageObj2.crossOrigin = "*";
    var bgfront = $('#front-product-view').css("background-image");
    bgfrontTemp = bgfront.split('assests')[1];
    bgfrontTemp2 = bgfrontTemp.split('.jpg')[0];
    imageObj1.src = "assests" + bgfrontTemp2 + ".jpg";
    imageObj1.onload = function () {
        ctx.drawImage(imageObj1, -300, -380);
        imageObj2.src = img;
        imageObj2.onload = function () {
            ctx.drawImage(imageObj2, 200, 100);
            runafterImage();
        }
    };


    var imgBack = canvasBack.toDataURL("image/jpeg");
    var cBack = document.getElementById('myCanvasExportBack');
    var ctxBack = cBack.getContext("2d");
    var imageObj1Back = new Image();
    var imageObj2Back = new Image();
    var bgfront = $('#back-product-view').css("background-image");
    bgfrontTemp = bgfront.split('assests')[1];
    bgfrontTemp2 = bgfrontTemp.split('.jpg')[0];
    imageObj1Back.src = "assests" + bgfrontTemp2 + ".jpg";
    imageObj1Back.onload = function () {
        ctxBack.drawImage(imageObj1Back, -300, -400);
        imageObj2Back.src = imgBack;
        imageObj2Back.onload = function () {
            ctxBack.drawImage(imageObj2Back, 200, 100);
            runafterImageBack();
        }
    };

    // console.log('Main Image Front -', JSON.stringify(canvasFrontProduct));
    // console.log('Main Image Back -', JSON.stringify(canvasBackProduct));
    // console.log('Front View -', JSON.stringify(canvas));
    // console.log('Back View -', JSON.stringify(canvasBack));

}

function runafterImage() {
    var frontOutputImage = document.getElementById('myCanvasExport').toDataURL("image/png");
    console.log(frontOutputImage);
}

function runafterImageBack() {
    var backOutputImage = document.getElementById('myCanvasExportBack').toDataURL("image/png");
    console.log(backOutputImage);
}

$('.canvas-output-close').on('click', function () {
    $('body').removeClass('can-output');
    $('.canvas-output').css('display', 'none');
});