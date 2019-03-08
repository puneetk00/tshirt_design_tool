$(function () {
    /*Canvas for Back view product*/
    canvasBackProduct = new fabric.Canvas('back-product', {
        selection: false
    });
    canvasBackProduct.setWidth(615);
    canvasBackProduct.setHeight(615);
    fabric.Object.prototype.transparentCorners = false;


    canvasBack = new fabric.Canvas('back', {
        selection: false
    });
    canvasBack.setWidth(mxWidthBack);
    canvasBack.setHeight(mxHeightBack);
    $('#back-view .canvas-container').css({
        "top": "80px",
        "left": "20px"
    });

    canvasBack.observe('mouse:up', function (e) {
        switchFunctionBack();
    });
    canvasBack.observe('object:scaling', function (e) {
        $(".deleteBtn").remove();
        shape = e.target;
        var shapeCanvas = shape.get("shapeCanvas");
        var maxWidth = shape.get("maxWidth"),
            maxHeight = shape.get("maxHeight"),
            minWidth = shape.get("minWidth"),
            minHeight = shape.get("minHeight"),
            actualWidth = shape.scaleX * shape.width,
            actualHeight = shape.scaleY * shape.height;
        if (shapeCanvas != "texts") {
            if (shape.width >= shape.height) {
                if (!isNaN(maxWidth) && actualWidth >= maxWidth) {
                    shape.set({
                        scaleX: maxWidth / shape.width,
                        scaleY: maxWidth / shape.width
                    })
                }
                if (!isNaN(minWidth) && actualWidth <= minWidth) {
                    shape.set({
                        scaleX: minWidth / shape.width,
                        scaleY: minWidth / shape.width
                    })
                }
            } else {
                if (!isNaN(maxHeight) && actualWidth >= maxHeight) {
                    shape.set({
                        scaleX: maxHeight / shape.height,
                        scaleY: maxHeight / shape.height
                    })
                }
                if (!isNaN(minHeight) && actualHeight <= minHeight) {
                    shape.set({
                        scaleX: minHeight / shape.height,
                        scaleY: minHeight / shape.height
                    })
                }
            }
            shape.width = shape.width * shape.scaleX;
            shape.height = shape.height * shape.scaleY;
        } else {
            if (!isNaN(maxWidth) && actualWidth >= maxWidth) {
                shape.set({
                    scaleX: maxWidth / shape.width
                })
            }
            if (!isNaN(maxHeight) && actualHeight >= maxHeight) {
                shape.set({
                    scaleY: maxHeight / shape.height
                })
            }
        }
    });
    canvasBack.on('object:selected', function (e) {
        $('.img-wrapper .canvas-container').addClass('gridlines');
        switchFunctionBack();
        addDeleteBtnBack(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        if (!!canvasBack.getActiveObject()) {
            let activeObjectFind = canvasBack.getActiveObject().shapeCanvas;
            if (activeObjectFind === "texts") {
                $('#add-edit-opt, #add-edit').addClass('active');
            }
        }
        getColors(canvasBack.getActiveObject(), function (colors) {
            manipulate(colors);
        });
    });
    canvasBack.on('selection:cleared', function () {
        $('.editing-tool-con, .options').removeClass('active');
        $(".deleteBtn").remove();
        $(".color-planet ul li").removeClass('active');
    });
    canvasBack.on("object:moving", function (e) {
        shape = e.target;
        let scaleX = shape.get("scaleX");
        let scaleY = shape.get("scaleY");
        let top = shape.top;
        let left = shape.left;
        let topBound = 0;
        let bottomBound = topBound + canvas.getHeight();
        let leftBound = 0;
        let rightBound = leftBound + canvas.getWidth();
        shape.set("left", Math.min(Math.max(left, leftBound), rightBound - shape.width * scaleX));
        shape.set("top", Math.min(Math.max(top, topBound), bottomBound - shape.height * scaleY));
        $(".deleteBtn").remove();
    });
    canvasBack.on('mouse:down', function (e) {
        if (!canvasBack.getActiveObject()) {
            $(".deleteBtn").remove();
        }
    });
    canvasBack.on('object:modified', function (e) {
        addDeleteBtnBack(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });
    canvasBack.on('object:rotating', function (e) {
        $(".deleteBtn").remove();
    });

    $('#selectImgBack ul li a').on('click', function () {
        var IconImgSrcBack = $(this).children('img').attr('src');
        handleImageSelectBack(IconImgSrcBack);
    });


    // document.getElementById('uploadImgBack').addEventListener('change', handleImageSelectUploadBack, false);

    function switchFunctionBack() {
        let activeObj = canvasBack.getActiveObject();
        var activeCanvasObject = null;
        if (!!canvasBack.getActiveObject()) {
            var activeObjectfind = canvasBack.getActiveObject().shapeCanvas;
            switch (activeObjectfind) {
                case 'texts': {
                    $('.editing-tool-con').removeClass('active');
                    $('#add-edit-opt').addClass('active');
                    $('.options').removeClass('active');
                    $('#add-edit').addClass('active');
                    $('#txtArea').val(activeObj.text);
                    $('.selectric .label').html(activeObj.fontFamily).css('font-family', activeObj.fontFamily);
                    var ActiveColorName = activeObj.fill;
                    $('.color-planet ul li').each(function () {
                        var liColorName = $(this).attr('data-color');
                        if (ActiveColorName === liColorName) {
                            $('.color-planet ul li').removeClass('active');
                            $(this).addClass('active');
                        }
                    });
                    $('#rotationValue, #rotationInput').val(activeObj.angle);
                    $('ul.text-align li').removeClass('active');
                    let alignValue = canvasBack.getActiveObject().textAlign;
                    if (alignValue === "left") {
                        $('ul.text-align li:first-child').addClass('active');
                    } else if (alignValue === "center") {
                        $('ul.text-align li:nth-child(2)').addClass('active');
                    } else {
                        $('ul.text-align li:last-child').addClass('active');
                    }
                    break;
                }
                case 'image': {
                    $('.editing-tool-con').removeClass('active');
                    $('.options').removeClass('active');
                    $('#add-art').addClass('active');
                    $('#upload-opt-next').addClass('active');
                    var activeObjectText = canvasBack.getActiveObject();
                    $('#image-rotate-back').val(activeObjectText.angle);
                    $('#rotateValImageBack').val(activeObjectText.angle);
                    let grayscalled = false;
                    for (let filtr of activeObjectText.filters) {
                        if (filtr.type === 'Grayscale') {
                            grayscalled = true;
                        } else {
                            grayscalled = false;
                        }
                    }
                    $('#makeOneColorBack').prop('checked', grayscalled);
                    getColors(canvasBack.getActiveObject(), function (colors) {
                        manipulate(colors);
                    })
                    break;
                }
            }
        }
        else {
        }
    }
});