$(function () {
    var productImage;
    var mainImage = new new fabric.Image(productImage, {
        left: 0,
        top: 0,
        angle: 0,
        lockUniScaling: true,
        lockScalingFlip: true
    });

    mainImage.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mtr: false
    });

    mainImage.set({
        shapeCanvas: 'image',
        hasRotatingPoint: false
    });

    canvas.add(mainImage);
});