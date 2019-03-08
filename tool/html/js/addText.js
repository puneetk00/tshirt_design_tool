$(function () {
    $('#add-edit').on('click', function () {
        let textAreaVal = $('#txtArea').val();
        if (textAreaVal == '') {
            console.log('empty');
        } else {
            let textbox = new fabric.IText(textAreaVal, {
                left: 50,
                top: 50,
                width: 150,
                fontSize: 30,
                fontFamily: 'arial',
                fill: 'white',
                evented: true,
                noScaleCache: false
            });
            textbox.setControlsVisibility({
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
            textbox.set({
                shapeCanvas: 'texts',
                maxWidth: cw,
                maxHeight: ch,
                minWidth: 10,
                minHeight: 10,
                hasRotatingPoint: false
            });
            let front = $('#front-view').css('display');
            if (front === 'block') {
                canvas.add(textbox);
                canvas.setActiveObject(textbox);
                canvas.renderAll();
            } else {
                canvasBack.add(textbox);
                canvasBack.setActiveObject(textbox);
                canvasBack.renderAll();
            }
        }
    });

    // $('.radiusX, .radiusY').change(function () {
    //     curve.set($(this).attr('class'), $(this).val(), true);
    // });

    function detetBtn() {
        let canTrX = canvas.getActiveObject().aCoords.tr.x;
        let canTrY = canvas.getActiveObject().aCoords.tr.y;
        addDeleteBtn(canTrX, canTrY);
    }

    function detetBtnBack() {
        let canTrX = canvasBack.getActiveObject().aCoords.tr.x;
        let canTrY = canvasBack.getActiveObject().aCoords.tr.y;
        addDeleteBtnBack(canTrX, canTrY);
    }

    $('#txtArea').keyup(function () {
        let updatedtextAreaVal = $(this).val();
        let front = $('#front-view').css('display');
        if (front === 'block') {
            if (!!canvas.getActiveObject()) {
                let activeObject = canvas.getActiveObject();
                activeObject.set('text', updatedtextAreaVal);
            }
            detetBtn();
            canvas.renderAll();
        } else {
            if (!!canvasBack.getActiveObject()) {
                let activeObject = canvasBack.getActiveObject();
                activeObject.set('text', updatedtextAreaVal);
            }
            detetBtnBack();
            canvasBack.renderAll();
        }
    });


    $('.color-planet ul li').on('click', function () {
        let front = $('#front-view').css('display');
        $('.color-planet ul li').removeClass('active');
        $(this).addClass('active');
        let colorValue = $(this).attr('data-color');
        if (front === 'block') {
            canvas.getActiveObject().set("fill", colorValue);
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            canvasBack.getActiveObject().set("fill", colorValue);
            canvasBack.renderAll();
        }
    });

    $('ul.text-align li a').on('click', function () {
        let front = $('#front-view').css('display');
        $('ul.text-align li').removeClass('active');
        let textAlignValue = $(this).attr('data-value');
        if (front === 'block') {
            if (textAlignValue === 'alignLeft') {
                canvas.getActiveObject().set("textAlign", "left");
                $(this).parents('li').addClass('active');
            } else if (textAlignValue === 'alignCenter') {
                canvas.getActiveObject().set("textAlign", "center");
                $(this).parents('li').addClass('active');
            } else {
                canvas.getActiveObject().set("textAlign", "right");
                $(this).parents('li').addClass('active');
            }
            canvas.renderAll();
        }
        else if (!!canvasBack.getActiveObject()) {
            if (textAlignValue === 'alignLeft') {
                canvasBack.getActiveObject().set("textAlign", "left");
                $(this).parents('li').addClass('active');
            } else if (textAlignValue === 'alignCenter') {
                canvasBack.getActiveObject().set("textAlign", "center");
                $(this).parents('li').addClass('active');
            } else {
                canvasBack.getActiveObject().set("textAlign", "right");
                $(this).parents('li').addClass('active');
            }
            canvasBack.renderAll();
        }
    });

    $('.centerAlign').on('click', function () {
        let front = $('#front-view').css('display');
        $(this).addClass('active');
        if (front === 'block') {
            canvas.centerObject(canvas.getActiveObject());
            canvas.getActiveObject().setCoords();
            detetBtn();
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            canvasBack.centerObject(canvasBack.getActiveObject());
            canvasBack.getActiveObject().setCoords();
            detetBtnBack();
            canvasBack.renderAll();
        }
    });

    document.getElementById('rotationInput').onchange = function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            canvas.getActiveObject().rotate(this.value);
            $('#rotationValue').val(this.value);
            canvas.getActiveObject().setCoords();
            detetBtn();
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            canvasBack.getActiveObject().rotate(this.value);
            canvasBack.getActiveObject().setCoords();
            $('#rotationValue').val(this.value);
            detetBtnBack();
            canvasBack.renderAll();
        }
    };

    document.getElementById('rotationValue').onchange = function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            canvas.getActiveObject().rotate(this.value);
            canvas.getActiveObject().setCoords();
            $('#rotationInput').val(this.value);
            detetBtn();
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            canvasBack.getActiveObject().rotate(this.value);
            canvasBack.getActiveObject().setCoords();
            $('#rotationInput').val(this.value);
            detetBtnBack();
            canvasBack.renderAll();
        }
    }

    // var fontValue = canvas.getActiveObject().fontSize;
    // console.log(fontValue);
    $('.fontSize').on('change', function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            //canvas.getActiveObject().set("scaleX", this.value);
            //canvas.getActiveObject().set("scaleY", this.value);
            canvas.getActiveObject().set('fontSize', this.value);
            canvas.getActiveObject().setCoords();
            detetBtn();
            canvas.renderAll();
        } else if (!!canvasBack.getActiveObject()) {
            //canvasBack.getActiveObject().set("scaleX", this.value);
            //canvasBack.getActiveObject().set("scaleY", this.value);
            canvasBack.getActiveObject().set('fontSize', this.value);
            canvasBack.getActiveObject().setCoords();
            detetBtnBack();
            canvasBack.renderAll();
        }
    });
    $('.selectric-items li').each(function () {
        let fontfamilyName = $(this).html();
        $(this).css('font-family', fontfamilyName);
    });

    $('.selectric-items li').on('click', function () {
        let fontfamilyName = $(this).html();
        $('.selectric .label').css('font-family', fontfamilyName);
    });

    $('a#textDone').on('click', function () {
        $('.editing-tool-con').removeClass('active');
        $('.options').removeClass('active');
    });

    $('.bring-forward').on('click', function () {
        $(this).addClass('active');
        canvas.getActiveObject().bringForward();
        canvas.renderAll();
    });

});