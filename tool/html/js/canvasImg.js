var myAppModule = (function () {
    var outObj = {};
    var file, img, img2;
    var init = function (newFile, newFileReader) {
        file = newFile;
        fileReader = newFileReader;
    };

    var onloadImage2 = function () {
        cImg = new fabric.Image(img2, {
            left: 0,
            top: 0,
            angle: 0,
            lockUniScaling: true,
            lockScalingFlip: true
        });

        cImg.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: true,
            tl: false,
            tr: false,
            mtr: false
        });

        var cw = mxWidth;
        var ch = mxHeight;
        cImg.set({
            shapeCanvas: 'image',
            maxWidth: cw,
            maxHeight: ch,
            minWidth: 0.4 * img2.width,
            minHeight: 0.4 * img2.height
        });
        if (img2.width >= cw || img2.height >= ch) {
            alert("Please select image as per canvas limit");
        } else {
            canvas.add(cImg);
            canvas.setActiveObject(cImg);
            getCanvasCat();
        }
        $('.selectImg').val('');
    };


    var onloadImageBack = function () {
        cImg = new fabric.Image(img2, {
            left: 0,
            top: 0,
            angle: 0,
            lockUniScaling: true,
            lockScalingFlip: true
        });

        cImg.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: true,
            tl: false,
            tr: false,
            mtr: false
        });

        var cw = mxWidth;
        var ch = mxHeight;
        cImg.set({
            shapeCanvas: 'image',
            maxWidth: cw,
            maxHeight: ch,
            minWidth: 0.4 * img2.width,
            minHeight: 0.4 * img2.height
        });
        if (img2.width >= cw || img2.height >= ch) {
            alert("Please select image as per canvas limit");
        } else {
            canvasBack.add(cImg);
            canvasBack.setActiveObject(cImg);
            getCanvasCat();
        }
        $('#selectImgBack').val('');
    };


    var onloadFile2 = function (url) {
        img2 = new Image();
        img2.src = url;
        img2.setAttribute('crossOrigin', 'anonymous');
        console.log(img2);
        img2.onload = onloadImage2;
    };

    var onloadFileBack = function (url) {
        img2 = new Image();
        img2.src = url;
        img2.setAttribute('crossOrigin', 'anonymous');
        img2.onload = onloadImageBack;
    };
    outObj.init = init;
    outObj.OnloadFile2 = onloadFile2;
    outObj.OnloadFileBack = onloadFileBack;
    return outObj;
})();

function handleFileSelect(evt) {
    var files = evt.target.files;
    var fileName = evt.target.files[0].name;
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }

        var category = fileName.split('_'),
            catfolder = category[1].split('-')[0],
            imgName = fileName,
            cat;

        if (fileName.indexOf('@back') > -1) {
            alert("Select only front image");
        }

        else {
            if (category[0] == "ts")
                cat = "tshirts";
            else
                cat = "fullsleeve";

            $('#dispImg').css({
                "background-image": "url(assets/" + cat + "/" + catfolder + "/" + fileName + ")",
                "width": "100%",
                "height": "490px",
                "background-repeat": "no-repeat"
            });

            var fileNameTemp = fileName.split('.png'),
                fileNameBack = fileNameTemp[0] + "@back.png";

            fileName = fileNameBack;

            $('#dispImgBack').css({
                "background-image": "url(assets/" + cat + "/" + catfolder + "/" + fileName + ")",
                "width": "100%",
                "height": "490px",
                "background-repeat": "no-repeat"
            });
        }
        $('#selectFile').val('');
    }
}

function handleImageSelect(url) {
    myAppModule.OnloadFile2(url);
}

function handleImageSelectBack(url) {
    myAppModule.OnloadFileBack(url);
}


