$(function () {
    $('.options').on('click', function () {
        $('.options').removeClass('active');
        $(this).addClass('active');
        // if (!!canvas.getActiveObject())
        //     console.log(canvas.getActiveObject().fontFamily);
    });

    $('.options').on('click', function () {
        let thisAttr = $(this).attr('data-src');
        $('.editing-tool-con').removeClass('active');
        $('#' + thisAttr).addClass('active');
    });

    $('.close-option').on('click', function () {
        $(this).parents('.editing-tool-con').removeClass('active');
        $('.options').removeClass('active');
    });

    $('#color-lab-scroll').slimScroll({
        height: '200px'
    });

    /*Canvas for front*/
    canvas = new fabric.Canvas('front', {
        selection: false
    });
    canvas.setWidth(mxWidth);
    canvas.setHeight(mxHeight);
    fabric.Object.prototype.transparentCorners = false;

    let containerHeight = $('.img-wrapper').height();
    $('#front-view').css({
        'height': containerHeight
    });
    $('#front-view .canvas-container').css({
        "top": "200px"
    });

    canvas.observe('mouse:up', function (e) {
        console.log('mouse:up');
    });
    canvas.observe('object:scaling', function (e) {
        console.log('object:scaling');
        $(".deleteBtn").remove();
    });
    canvas.on('object:selected', function (e) {
        console.log('object:selected');
        $('.canvas-container').addClass('gridlines');
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });
    canvas.on('selection:cleared', function () {
        console.log('selection:cleared');
    });
    canvas.on("object:moving", function (e) {
        console.log('object:moving');
        $(".deleteBtn").remove();
    });
    canvas.on('mouse:down', function (e) {
        console.log('mouse:down');
        if (!canvas.getActiveObject()) {
            $(".deleteBtn").remove();
        }
    });
    canvas.on('object:modified', function (e) {
        console.log('object:modified');
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });
    canvas.on('object:rotating', function (e) {
        console.log('object:rotating');
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
});