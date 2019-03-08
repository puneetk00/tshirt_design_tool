var myAppModuleUpload = (function () {
    var outObjUp = {};
    var fileUp, fileReaderUp, imgUp, img2Up;
    var initUp = function (newFile, newFileReader) {
        fileUp = newFile;
        fileReaderUp = newFileReader;
    };

    var onloadImage2Up = function () {
        cImg = new fabric.Image(img2Up, {
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

        var cwUp = mxWidth;
        var chUp = mxHeight;
        cImg.set({
            shapeCanvas: 'image',
            maxWidth: cwUp,
            maxHeight: chUp,
            minWidth: 0.4 * img2Up.width,
            minHeight: 0.4 * img2Up.height,
            hasRotatingPoint: false
        });
        if (img2Up.width >= cwUp || img2Up.height >= chUp) {
            alert("Please select image as per canvas limit");
        } else {
            canvas.add(cImg);
            //getCanvasCat();
            dragDropEditer();
        }
        $('#uploadImg').val('');
        canvas.setActiveObject(cImg);
    };

    function dragDropEditer() {
        $('#uploadCenter').click(function () {
            canvas.centerObject(canvas.getActiveObject());
        });
    }

    document.getElementById('selectFile').addEventListener('change', handleFileSelect2, false);
    document.getElementById('uploadImg').addEventListener('change', handleImageSelectUpload, false);
    document.getElementById('uploadImgBack').addEventListener('change', handleImageSelectUploadBack, false);

    $('#uploadCenter').click(function () {
        canvas.centerObject(canvas.getActiveObject());
        canvas.getActiveObject().setCoords();
        detetBtn();
        canvas.renderAll();
    });

    $('#uploadCenterback').click(function () {
        canvasBack.centerObject(canvasBack.getActiveObject());
        canvasBack.getActiveObject().setCoords();
        detetBtnBack();
        canvasBack.renderAll();
    });

    var onloadImageBackUp = function () {
        cImg = new fabric.Image(img2Up, {
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

        var cwUp = mxWidth;
        var chUp = mxHeight;
        cImg.set({
            shapeCanvas: 'image',
            maxWidth: cwUp,
            maxHeight: chUp,
            minWidth: 0.4 * img2Up.width,
            minHeight: 0.4 * img2Up.height
        });
        if (img2Up.width >= cwUp || img2Up.height >= chUp) {
            alert("Please select image as per canvas limit");
        } else {
            canvasBack.add(cImg);
            dragDropEditerBack();
        }
        $('#uploadImgBack').val('');
        canvasBack.setActiveObject(cImg);
    };

    function dragDropEditerBack() {
        $('#uploadCenterback').click(function () {
            canvasBack.centerObject(canvasBack.getActiveObject());
        });
    }

    var onloadFile2Up = function (e) {
        img2Up = new Image();
        img2Up.onload = onloadImage2Up;
        img2Up.src = fileReaderUp.result;

    };

    var onloadFileBackUp = function (e) {
        img2Up = new Image();
        img2Up.onload = onloadImageBackUp;
        img2Up.src = fileReaderUp.result;
    };

    outObjUp.initUp = initUp;
    outObjUp.OnloadFile2Up = onloadFile2Up;
    outObjUp.OnloadFileBackUp = onloadFileBackUp;
    return outObjUp;
})();

function handleFileSelect2(evt) {
    var files = evt.target.files;
    var fileName = evt.target.files[0].name;

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
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

            var fileNameTemp = fileName.split('.jpg'),
                fileNameBack = fileNameTemp[0] + "@back.jpg";
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

function handleImageSelectUpload(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.target.files || evt.dataTransfer.files;
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        myAppModuleUpload.initUp(f, reader);
        reader.onload = myAppModuleUpload.OnloadFile2Up;
        reader.readAsDataURL(f);
        // canvas.setActiveObject(cImg);
    }
}

function handleImageSelectUploadBack(evt) {
    var files = evt.target.files;
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        myAppModuleUpload.initUp(f, reader);
        reader.onload = myAppModuleUpload.OnloadFileBackUp;
        reader.readAsDataURL(f);
    }
}

$(function () {
    $('.flipHoriz a').on('click', function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            if (!!canvas.getActiveObject().flipX) {
                canvas.getActiveObject().flipX = false;
            } else {
                canvas.getActiveObject().flipX = true;
            }
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            if (!!canvasBack.getActiveObject().flipX) {
                canvasBack.getActiveObject().flipX = false;
            } else {
                canvasBack.getActiveObject().flipX = true;
            }
            canvasBack.renderAll();
        }
    });

    $('.flipVert a').on('click', function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            if (!!canvas.getActiveObject().flipY) {
                canvas.getActiveObject().flipY = false;
            } else {
                canvas.getActiveObject().flipY = true;
            }
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            if (!!canvasBack.getActiveObject().flipY) {
                canvasBack.getActiveObject().flipY = false;
            } else {
                canvasBack.getActiveObject().flipY = true;
            }
            canvasBack.renderAll();
        }
    });

    /** Make one color  */

    $('#makeOneColor').on('change', function (e) {
        var checked = $(this).is(':checked');
        var image = canvas.getActiveObject();
        var filter = new fabric.Image.filters.Grayscale();
        if (!!image) {
            if (checked) {
                image.filters.push(filter);
            } else {
                image.filters.pop(filter);
            }
            image.applyFilters(canvas.renderAll.bind(canvas));
        }
        canvas.renderAll();
    });

    /** Remove Background  */

    $('#removeBackground').on('change', function (e) {
        var checked = $(this).is(':checked');
        var image = canvas.getActiveObject();
        var filter = new fabric.Image.filters.removeBackground();
        if (!!image) {
            if (checked) {
                image.filters.push(filter);
            } else {
                image.filters.pop(filter);
            }
            image.applyFilters(canvas.renderAll.bind(canvas));
        }
        canvas.renderAll();
    });

    $('#removeBackgroundBack').on('change', function (e) {
        var checked = $(this).is(':checked');
        var image = canvasBack.getActiveObject();
        var filter = new fabric.Image.filters.removeBackground();
        if (!!image) {
            if (checked) {
                image.filters.push(filter);
            } else {
                image.filters.pop(filter);
            }
            canvasBack.renderAll();
            image.applyFilters(canvasBack.renderAll.bind(canvasBack));
        }
        canvasBack.renderAll();
    });

    // document.getElementById('imgWidthScale').onchange = function () {
    //     var scaleWidth = parseFloat($(this).val()); //Inch
    //     var dpi_x = document.getElementById('dpi').offsetWidth;
    //     var dpi_y = document.getElementById('dpi').offsetHeight;
    //     var objWid = canvas.getActiveObject().get('maxWidth'); //px
    //     var objHei = canvas.getActiveObject().get('maxHeight'); //px
    //     var ratioWH = objWid / objHei; //Number
    //     var scaleHeight = scaleWidth * ratioWH; // Inch
    //     $('#imgHeightScale').val(parseFloat(scaleHeight).toFixed(1));
    //     canvas.getActiveObject().setWidth(scaleWidth * dpi_x);
    //     canvas.getActiveObject().setHeight(scaleHeight * dpi_y);

    //     var newWid = scaleWidth * dpi_x;
    //     var upDWid = newWid - objWid;
    //     var canTrX = canvas.getActiveObject().aCoords.tr.x + upDWid;
    //     var canTrY = canvas.getActiveObject().aCoords.tr.y;
    //     addDeleteBtn(canTrX, canTrY);
    //     console.log(objWid, newWid, upDWid, canTrX);
    //     canvas.renderAll();
    // };
    // function addDeleteBtn(x, y) {
    //     $(".deleteBtn").remove();
    //     var btnLeft = x - 8;
    //     var btnTop = y - 8;
    //     var deleteBtn = '<img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/close_red.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:20px;height:20px;"/>';
    //     $("#dispImg .canvas-container").append(deleteBtn);
    //     $("#dispImgBack .canvas-container").append(deleteBtn);
    // }
    // document.getElementById('imgHeightScale').onchange = function () {
    //     var scaleHeight = parseFloat($(this).val()); //Inch
    //     var dpi_x = document.getElementById('dpi').offsetWidth;
    //     var dpi_y = document.getElementById('dpi').offsetHeight;
    //     var objWid = canvas.getActiveObject().get('maxWidth'); //px
    //     var objHei = canvas.getActiveObject().get('maxHeight'); //px
    //     var rationHW = objHei / objWid; //Number
    //     var scaleWidth = scaleHeight * rationHW; // Inch
    //     $('#imgWidthScale').val(parseFloat(scaleWidth).toFixed(1));
    //     canvas.getActiveObject().setWidth(scaleWidth * dpi_x);
    //     canvas.getActiveObject().setHeight(scaleHeight * dpi_y);
    //     canvas.renderAll();
    // };

    // document.getElementById('imgWidthScaleback').onchange = function () {
    //     var scaleWidth = parseFloat($(this).val()); //Inch
    //     var dpi_x = document.getElementById('dpi').offsetWidth;
    //     var dpi_y = document.getElementById('dpi').offsetHeight;
    //     var objWid = canvasBack.getActiveObject().get('maxWidth'); //px
    //     var objHei = canvasBack.getActiveObject().get('maxHeight'); //px
    //     var ratioWH = objWid / objHei; //Number
    //     var scaleHeight = scaleWidth * ratioWH; // Inch
    //     $('#imgHeightScaleback').val(parseFloat(scaleHeight).toFixed(1));
    //     canvasBack.getActiveObject().setWidth(scaleWidth * dpi_x);
    //     canvasBack.getActiveObject().setHeight(scaleHeight * dpi_y);

    //     var newWid = scaleWidth * dpi_x;
    //     var upDWid = newWid - objWid;
    //     var canTrX = canvas.getActiveObject().aCoords.tr.x + upDWid;
    //     var canTrY = canvas.getActiveObject().aCoords.tr.y;
    //     addDeleteBtn(canTrX, canTrY);
    //     console.log(objWid, newWid, upDWid, canTrX);
    //     canvasBack.renderAll();
    // };

    // document.getElementById('imgHeightScaleback').onchange = function () {
    //     var scaleHeight = parseFloat($(this).val()); //Inch
    //     var dpi_x = document.getElementById('dpi').offsetWidth;
    //     var dpi_y = document.getElementById('dpi').offsetHeight;
    //     var objWid = canvasBack.getActiveObject().get('maxWidth'); //px
    //     var objHei = canvasBack.getActiveObject().get('maxHeight'); //px
    //     var rationHW = objHei / objWid; //Number
    //     var scaleWidth = scaleHeight * rationHW; // Inch
    //     $('#imgWidthScaleback').val(parseFloat(scaleWidth).toFixed(1));
    //     canvasBack.getActiveObject().setWidth(scaleWidth * dpi_x);
    //     canvasBack.getActiveObject().setHeight(scaleHeight * dpi_y);
    //     canvasBack.renderAll();
    // };

    $('#makeOneColorBack').on('change', function (e) {
        var checked = $(this).is(':checked');
        var image = canvasBack.getActiveObject();
        if (!!image) {
            if (checked) {
                var filter = new fabric.Image.filters.Grayscale();
                image.filters.push(filter);
            } else {
                image.filters.pop(filter);
            }
            image.applyFilters(canvasBack.renderAll.bind(canvasBack));
        }
        canvasBack.renderAll();
    });

    $(document).on('click', 'ul.change-color-list li', function () {
        $('.popupLike').css('display', 'block');
        $('.top-edit-section, .hide-colorActive').css('display', 'none');
        $('.change-color-list li span').removeClass('active');
        $(this).find('span').addClass('active');
    });

    // $(document).on('click', '#change-color ul.change-color-list li', function () {
    //     $('.change-color-list ~ li').css('display', 'inline-block');
    // });

    // $(document).on('click', '#change-color-back ul.change-color-list li', function () {
    //     $('.change-color-list ~ li').css('display', 'inline-block');
    // });

    var oldColor;
    var newColor;
    var replaceC;

    $(document).on('click', '.change-color-list li', function () {
        oldColor = $(this).children('span').css('background-color').replace('rgb', '').replace('(', '').replace(')', '').replace(/ /g, '').split(',');
        oldColor = oldColor.map(function (color) { return parseInt(color); })
    });

    $(document).on('click', '#change-color > li', function () {
        var image = canvas.getActiveObject();
        newColor = $(this).attr('data-value').replace('rgb', '').replace('(', '').replace(')', '').replace(/ /g, '').split(',');
        newColor = newColor.map(function (color) { return parseInt(color); });
        replaceC = new fabric.Image.filters.replaceColor({
            oldColor: oldColor,
            newColor: newColor
        });
        image.filters.push(replaceC);
        image.applyFilters(canvas.renderAll.bind(canvas));
        canvas.renderAll();
        oldColor = newColor

        newColorFRepl = $(this).attr('data-value');
        $('.change-color-list li span.active').css('background-color', newColorFRepl);
    });

    $(document).on('click', '#imgReset', function () {
        var image = canvas.getActiveObject();
        image.filters = [];
        image.applyFilters(canvas.renderAll.bind(canvas));
        canvas.renderAll();
        getColors(canvas.getActiveObject(), function (colors) {
            manipulate(colors);
        });
    });

    // $(document).on('click', '#change-color > li', function () {
    //     var image = canvas.getActiveObject();
    //     newColor = $(this).attr('data-value').replace('rgb', '').replace('(', '').replace(')', '').replace(/ /g, '').split(',');
    //     newColor = newColor.map(function (color) { return parseInt(color); });
    //     replaceC = new fabric.Image.filters.replaceColor({
    //         oldColor: oldColor,
    //         newColor: newColor
    //     });
    //     image.filters.pop(replaceC);
    //     image.applyFilters(canvas.renderAll.bind(canvas));
    //     canvas.renderAll();
    //     oldColor = newColor

    //     newColorFRepl = $(this).attr('data-value');
    //     $('.change-color-list li span').css('background-color', newColorFRepl);
    // });

    $(document).on('click', '#change-color-back > li', function () {
        var image = canvasBack.getActiveObject();
        newColor = $(this).attr('data-value').replace('rgb', '').replace('(', '').replace(')', '').replace(/ /g, '').split(',');
        newColor = newColor.map(function (color) { return parseInt(color); });
        replaceC = new fabric.Image.filters.replaceColor({
            oldColor: oldColor,
            newColor: newColor
        });
        image.filters.push(replaceC);
        image.applyFilters(canvasBack.renderAll.bind(canvasBack));
        canvasBack.renderAll();
        oldColor = newColor

        newColorFRepl = $(this).attr('data-value');
        $('.change-color-list li span.active').css('background-color', newColorFRepl);
    });

    $('#imgResetBack').on('click', function () {
        var image = canvasBack.getActiveObject();
        image.filters = [];
        image.applyFilters(canvasBack.renderAll.bind(canvasBack));
        canvasBack.renderAll();
        getColors(canvasBack.getActiveObject(), function (colors) {
            manipulate(colors);
        });
    });
});

$('#image-rotate').on('change', function () {
    var rotateValue = $(this).val();
    $('#rotateValImage').val(rotateValue);
    canvas.getActiveObject().rotate(this.value);
    canvas.getActiveObject().setCoords();
    detetBtn();
    canvas.renderAll();
});

$('#image-rotate-back').on('change', function () {
    var rotateValue = $(this).val();
    $('#rotateValImageBack').val(rotateValue);
    canvasBack.getActiveObject().rotate(this.value);
    canvasBack.getActiveObject().setCoords();
    detetBtnBack();
    canvasBack.renderAll();
});

$('#rotateValImage').on('change', function () {
    var rotateValue = $(this).val();
    $('#image-rotate').val(rotateValue);
    canvas.getActiveObject().rotate(this.value);
    canvas.getActiveObject().setCoords();
    detetBtn();
    canvas.renderAll();
});


$('#rotateValImageBack').on('change', function () {
    var rotateValue = $(this).val();
    $('#image-rotate-back').val(rotateValue);
    canvasBack.getActiveObject().rotate(this.value);
    canvasBack.getActiveObject().setCoords();
    detetBtnBack();
    canvasBack.renderAll();
});

function manipulate(colors) {
    let allColor = colors.colors;
    $('.change-color-list').html('');
    var changeColorList = $('.change-color-list li').length;
    if (changeColorList == 0) {
        for (let i = 0; i < allColor.length; i++) {
            var allColorGroup = allColor[i];
            $('.change-color-list').append('<li><span style="background-color: rgb(' + allColorGroup + ');"></span></li>');
            $('#change-color li').each(function () {
                var colorValue = $(this).attr('data-value');
                $(this).css('background-color', colorValue);
            });
            $('#change-color-back li').each(function () {
                var colorValue = $(this).attr('data-value');
                $(this).css('background-color', colorValue);
            });
            $('.change-color-list li').each(function () {
                var spanBgColor = $('.change-color-list li span').css('background-color');
                $('.colorFoundCount').html(allColor.length);
                if (spanBgColor === 'rgb(254, 254, 253)' && changeColorList === 0) {
                    $('.change-color-list li').html('Full Color');
                    $('.ChangeColorFound').css('display', 'none');
                }
            });
        }
    }
}