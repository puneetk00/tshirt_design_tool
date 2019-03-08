$(function () {

    $('.options').on('click', function () {
        $('.options').removeClass('active');
        $(this).addClass('active');
    });
    $('.options').on('click', function () {
        let thisAttr = $(this).attr('data-src');
        $('.editing-tool-con').removeClass('active');
        $('#' + thisAttr).addClass('active');
    });
    $('.close-option, a#textDone').on('click', function () {
        $(this).parents('.input-wrapper').css('display', 'none');
        $('.options, .editing-tool-con').removeClass('active');
        $('.canvas-container').removeClass('gridlines');
        $('a.back-to-art').click();
    });
    $('.submit-btnFontColor').on('click', function () {
        $(this).parents('.makeOneColor').find('.popupLike').css('display', 'none');
        $(this).parents('.makeOneColor').find('.hide-colorActive').css('display', 'block');
        $(this).parents('.makeOneColor').prev('.top-edit-section').css('display', 'block');
    });
    $('#color-lab-scroll').slimScroll({
        height: '315px'
    });
    $('#icons-container-scroll').slimScroll({
        height: '450px'
    });

    $('.first-category > a').on('click', function () {
        $('.first-category').css('display', 'none');
        $(this).parent('li.first-category').css('display', 'block').addClass('active');
        $(this).next('ul').css('display', 'block');
        $('#add-art-opt').find('.option-heading-text').before('<a href="javascript: void(0)" class="back-to-art"></a>');
    });

    $(document).on('click', 'a.back-to-art', function () {
        $('li.first-category').removeClass('active');
        $('.icons-container ul ul, .seprate-icons').css('display', 'none');
        $('.icons-container').css('display', 'block');
        $('li.first-category, li.second-category').css('display', 'inline-block');
        $(this).remove();
    });

    $('.icons-container ul li a').on('click', function () {
        var dataval = $(this).attr('data-value');
        $('.' + dataval).css('display', 'block').parents('#icons-container-scroll').find('.icons-container').css('display', 'none');
    })

    // $('.icons-container ul li a').on('click', function () {
    //     $(this).next('.images-list').css('display', 'block');
    //     if ($(this).next('.images-list').css('display') == 'block') {
    //         // $('.icons-container ul li').removeClass('active');
    //         $(this).parent('li').addClass('active');
    //         $(this).parent('li').nextAll('li').css('display', 'none');
    //     }
    // });

    $('#fontFamily').selectric();
    let productImageFront = $('#front-product-view').css('background-image');
    let productImageBack = $('#back-product-view').css('background-image');
    $('.acctual-product-image').css('background-image', productImageFront);

    $('.front-back-option a').on('click', function () {
        $('.front-back-option ul li').removeClass('active');
        $(this).parents('li').addClass('active');
        let frontBackData = $(this).attr('data-src');
        $('#front-view, #back-view, #front-product-view, #back-product-view').css('display', 'none');
        $('#' + frontBackData).css('display', 'block');
        $('.' + frontBackData).css('display', 'block');
        $('.editing-tool-con, .options').removeClass('active');
        if (frontBackData === 'front-view') {
            $('.dgarImageBack, .back-imgEdit').css('display', 'none');
            $('.dgarImageFront, .front-imgEdit').css('display', 'block');
            $('#selectImgBack').css('display', 'none');
            $('#selectImg').css('display', 'block');
            $('.acctual-product-image').css('background-image', productImageFront);
        } else if (frontBackData === 'back-view') {
            $('.dgarImageBack, .back-imgEdit').css('display', 'block');
            $('.dgarImageFront, .front-imgEdit').css('display', 'none');
            $('#selectImgBack').css('display', 'block');
            $('#selectImg').css('display', 'none');
            $('.acctual-product-image').css('background-image', productImageBack);
        }
    });


    /*Canvas for front view product*/
    canvasFrontProduct = new fabric.Canvas('front-product', {
        selection: false
    });
    canvasFrontProduct.setWidth(615);
    canvasFrontProduct.setHeight(615);
    fabric.Object.prototype.transparentCorners = false;


    /*Canvas for front*/
    canvas = new fabric.Canvas('front', {
        selection: false
    });
    canvas.setWidth(mxWidth);
    canvas.setHeight(mxHeight);
    fabric.Object.prototype.transparentCorners = false;

    // /*convas for front output*/
    frontOutput = new fabric.Canvas('myCanvasExport', {
        selection: false
    });


    let containerHeight = $('.img-wrapper').height();
    $('#front-view').css({
        'height': containerHeight
    });
    $('#front-view .canvas-container').css({
        "top": "80px",
        "left": "20px"
    });

    canvas.observe('mouse:up', function (e) {
        switchFunction();
    });
    canvas.observe('object:scaling', function (e) {
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
    canvas.on('object:selected', function (e) {
        $('#front-view .canvas-container').addClass('gridlines');
        switchFunction();
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        if (!!canvas.getActiveObject()) {
            let activeObjectFind = canvas.getActiveObject().shapeCanvas;
            if (activeObjectFind === "texts") {
                $('#add-edit-opt, #add-edit').addClass('active');
            }
        }
        getColors(canvas.getActiveObject(), function (colors) {
            manipulate(colors);
        });
    });
    canvas.on('selection:cleared', function () {
        $('.editing-tool-con, .options').removeClass('active');
        $(".deleteBtn").remove();
        $(".color-planet ul li").removeClass('active');
    });

    canvas.on("object:moving", function (e) {
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
    canvas.on('mouse:down', function (e) {
        if (!canvas.getActiveObject()) {
            $(".deleteBtn").remove();
        }
    });
    canvas.on('object:modified', function (e) {
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });
    canvas.on('object:rotating', function (e) {
        $(".deleteBtn").remove();
    });
    /** Delet btn script **/
    $(document).on('click', ".deleteBtn", function () {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            $(".deleteBtn").remove();
        }
    });
    $('.color-planet ul li').each(function () {
        let colorCode = $(this).attr('data-color');
        $(this).css({
            "background-color": colorCode
        });
    });

    $('#selectImg ul li a').on('click', function () {
        var IconImgSrc = $(this).children('img').attr('src');
        handleImageSelect(IconImgSrc);
    });



    function switchFunction() {
        let activeObj = canvas.getActiveObject();
        var activeCanvasObject = null;
        if (front === 'block') {
            if (!!canvas.getActiveObject()) {
                var activeObjectfind = canvas.getActiveObject().shapeCanvas;
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
                        let alignValue = canvas.getActiveObject().textAlign;
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
                        var activeObjectText = canvas.getActiveObject();
                        $('#image-rotate').val(activeObjectText.angle);
                        $('#rotateValImage').val(activeObjectText.angle);
                        let grayscalled = false;
                        for (let filtr of activeObjectText.filters) {
                            if (filtr.type === 'Grayscale') {
                                grayscalled = true;
                            } else {
                                grayscalled = false;
                            }
                        }
                        $('#makeOneColor').prop('checked', grayscalled);
                        getColors(canvas.getActiveObject(), function (colors) {
                            manipulate(colors);
                        });
                        break;
                    }
                }
            }
        }
    };
});