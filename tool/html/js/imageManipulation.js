/**
 * Way to implemtent
 */
//var filter = new fabric.Image.filters.replaceColor({oldColor: [255,220,0], newColor: [0,255,0]});


fabric.Image.filters.removeBackground = fabric.util.createClass({

    type: 'removeBackground',

    applyTo: function (canvasEl) {
        var context = canvasEl.getContext('2d'),
            imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
            pix = imageData.data;

        var data = [];
        var frequency = {};
        var colors = [];
        var finalColors = [];

        /* Getting Pixels of Input Image
        */

        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i],
                g = pix[i + 1],
                b = pix[i + 2];
            alpha = pix[i + 3];

            var newColor = { r: 0, g: 0, b: 0, a: 0 };

            if (alpha == 0) continue;
            var rgb = r + ',' + g + ',' + b;
            if (data.indexOf(rgb) == -1) {
                data.push(rgb);
                frequency[rgb] = 0;
            }
            else {
                frequency[rgb] = frequency[rgb] + 1;
                if (frequency[rgb] > 100) {
                    if (colors.indexOf(rgb) == -1) {
                        colors.push(rgb);
                    }
                }

            }
        }

        /*
        * Getting color having maximum frequency and this color of max frequency
        * will be our background color
        */
        let arr = Object.values(frequency);
        let min = Math.min(...arr);
        let max = Math.max(...arr);
        // console.log(`Min value: ${min}, max value: ${max}`);

        var x = getKeyByValue(frequency, max);
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        // console.log(x);
        var imageBackgroundColor = x.split(',').map(function (item) {
            return parseInt(item, 10);
        });
        /*
        * Splitting string of data into integer data
        */
        colors.forEach(function (color) {
            var b = color.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            finalColors.push(b);
        });
        length = finalColors.length;
        var group = []; var group1 = [];
        var count = 0; var count1 = 0;
        var group1 = [];

        /*
        * Grouping color based upon given range
        */
        finalColors.forEach(function (rgb, i) {
            var nextElem = i + 1 >= finalColors.length ? i : i + 1;
            if (i !== nextElem) {
                var r = rgb[0];
                var g = rgb[1];
                var b = rgb[2];
                var nextcolor = finalColors[nextElem];
                var nextR = nextcolor[0];
                var nextG = nextcolor[1];
                var nextB = nextcolor[2];
                var check = (r - 10 < nextR && nextR < r + 10) && (b - 10 < nextB && nextB < b + 10) && (g - 10 < nextG && nextG < g + 10);
                if (check) {
                    if (!!group[count]) {
                        group[count].push(rgb.join(','));
                    } else {
                        group[count] = [rgb.join(',')];
                    }
                }
                else {
                    if (!!group[count]) {
                        group[count].push(rgb.join(','));
                    } else {
                        group[count] = [rgb.join(',')];
                    }
                    count++;
                }
            }
        });

        /**
         * Getting average of the colors
         */
        var colorGroup = group.map(function (collection) {
            var avgR = 0;
            var avgG = 0;
            var avgB = 0;
            for (var i = 0; i < collection.length; i++) {
                avgR += parseInt(collection[i].split(',')[0]);
                avgB += parseInt(collection[i].split(',')[1]);
                avgG += parseInt(collection[i].split(',')[2]);
            }
            avgR = parseInt(avgR / (collection.length));
            avgB = parseInt(avgB / (collection.length));
            avgG = parseInt(avgG / (collection.length));
            return [avgR, avgB, avgG];
        });

        /*
        * Grouping colors for a particular range
        */
        for (var i = 0; i < colorGroup.length; i++) {
            for (var j = 1; j < colorGroup.length; j++) {
                if (!colorGroup[i]) continue;
                var first = colorGroup[i][0];
                var second = colorGroup[i][1];
                var third = colorGroup[i][2];
                var first1 = colorGroup[j][0];
                var second1 = colorGroup[j][1];
                var third1 = colorGroup[j][2];
                var check = (first - 40 < first1 && first1 < first + 40) && (second - 40 < second1 && second1 < second + 40) && (third - 40 < third1 && third1 < third + 40);
                // console.log(first, first1, second,second1, third, third1, check, i,j);
                if (check && colorGroup[i] !== colorGroup[j]) {
                    i--;
                    colorGroup.splice(j, 1);
                    // console.log(colorGroup);
                }
            }
        }


        var newColor = { r: 0, g: 0, b: 0, a: 0 };
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i],
                g = pix[i + 1],
                b = pix[i + 2];
            var range = 25;
            var check1 = (imageBackgroundColor[0] - range < r && r < imageBackgroundColor[0] + range)
                && (imageBackgroundColor[1] - range < g && g < imageBackgroundColor[1] + range)
                && (imageBackgroundColor[2] - range < b && b < imageBackgroundColor[2] + range);

            if (check1) {
                // remove background color.
                pix[i] = newColor.r;
                pix[i + 1] = newColor.g;
                pix[i + 2] = newColor.b;
                pix[i + 3] = newColor.a;
            }
            // console.log('dwawed');
        }
        context.putImageData(imageData, 0, 0);
    }
});


fabric.Image.filters.replaceColor = fabric.util.createClass({

    type: 'replaceColor',
    initialize: function (options) {
        options || (options = null);
        if (!!options) {
            this.oldColor = options.oldColor;
            this.newColor = options.newColor;
        }
    },
    applyTo: function (canvasEl) {
        var context = canvasEl.getContext('2d'),
            imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
            pix = imageData.data;

        var data = [];
        var frequency = {};
        var colors = [];
        var finalColors = [];
        /* Getting Pixels of Input Image
        */

        var newColor = { r: this.newColor[0], g: this.newColor[1], b: this.newColor[2] };
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i],
                g = pix[i + 1],
                b = pix[i + 2];
            var range = 25;
            var check1 = (this.oldColor[0] - range < r && r < this.oldColor[0] + range)
                && (this.oldColor[1] - range < g && g < this.oldColor[1] + range)
                && (this.oldColor[2] - range < b && b < this.oldColor[2] + range);
            if (check1) {
                // remove background color.
                pix[i] = newColor.r;
                pix[i + 1] = newColor.g;
                pix[i + 2] = newColor.b;
                // pix[i + 3] = newColor.a;
            }
        }
        context.putImageData(imageData, 0, 0);
    }
});

function getColors(fabricImageObject, cb) {
    if (!!fabricImageObject) {
        var dataURL = fabricImageObject.toDataURL();
        var canvasEl = document.createElement('canvas');

        canvasEl.width = fabricImageObject.getWidth();
        canvasEl.height = fabricImageObject.getHeight();

        var context = canvasEl.getContext('2d');

        var image = new Image();
        image.src = dataURL;
        image.onload = function () {
            context.drawImage(image, 0, 0);
            var imageData = context.getImageData(0, 0, fabricImageObject.getWidth(), fabricImageObject.getHeight()),
                pix = imageData.data;

            var data = [];
            var frequency = {};
            var colors = [];
            var finalColors = [];

            // console.log(imageData)
            /* Getting Pixels of Input Image
            */

            for (var i = 0, n = pix.length; i < n; i += 4) {
                var r = pix[i],
                    g = pix[i + 1],
                    b = pix[i + 2];
                alpha = pix[i + 3];

                var newColor = { r: 0, g: 0, b: 0, a: 0 };

                if (alpha == 0) continue;
                var rgb = r + ',' + g + ',' + b;
                if (data.indexOf(rgb) == -1) {
                    data.push(rgb);
                    frequency[rgb] = 0;
                }
                else {
                    frequency[rgb] = frequency[rgb] + 1;
                    if (frequency[rgb] > 100) {
                        if (colors.indexOf(rgb) == -1) {
                            colors.push(rgb);
                        }
                    }

                }
            }

            /*
            * Getting color having maximum frequency and this color of max frequency
            * will be our background color
            */

            let arr = Object.values(frequency);
            let min = Math.min(...arr);
            let max = Math.max(...arr);
            // console.log(`Min value: ${min}, max value: ${max}`);

            var x = getKeyByValue(frequency, max);
            function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
            }

            // console.log(x);
            var imageBackgroundColor = x.split(',').map(function (item) {
                return parseInt(item, 10);
            });

            /*
            * Splitting string of data into integer data
            */
            colors.forEach(function (color) {
                var b = color.split(',').map(function (item) {
                    return parseInt(item, 10);
                });
                finalColors.push(b);
            });


            length = finalColors.length;

            var group = []; var group1 = [];
            var count = 0; var count1 = 0;
            var group1 = [];

            /*
            * Grouping color based upon given range
            */
            finalColors.forEach(function (rgb, i) {
                var nextElem = i + 1 >= finalColors.length ? i : i + 1;
                if (i !== nextElem) {
                    var r = rgb[0];
                    var g = rgb[1];
                    var b = rgb[2];
                    var nextcolor = finalColors[nextElem];

                    var nextR = nextcolor[0];
                    var nextG = nextcolor[1];
                    var nextB = nextcolor[2];
                    var check = (r - 10 < nextR && nextR < r + 10) && (b - 10 < nextB && nextB < b + 10) && (g - 10 < nextG && nextG < g + 10);
                    if (check) {
                        if (!!group[count]) {
                            group[count].push(rgb.join(','));
                        } else {
                            group[count] = [rgb.join(',')];
                        }
                    }
                    else {
                        if (!!group[count]) {
                            group[count].push(rgb.join(','));
                        } else {
                            group[count] = [rgb.join(',')];
                        }
                        count++;
                    }
                }

            });

            /**
             * Getting average of the colors
             */
            var colorGroup = group.map(function (collection) {
                var avgR = 0;
                var avgG = 0;
                var avgB = 0;
                for (var i = 0; i < collection.length; i++) {
                    avgR += parseInt(collection[i].split(',')[0]);
                    avgB += parseInt(collection[i].split(',')[1]);
                    avgG += parseInt(collection[i].split(',')[2]);
                }
                avgR = parseInt(avgR / (collection.length));
                avgB = parseInt(avgB / (collection.length));
                avgG = parseInt(avgG / (collection.length));
                return [avgR, avgB, avgG];

            });


            /*
            * Grouping colors for a particular range
            */
            for (var i = 0; i < colorGroup.length; i++) {
                for (var j = 1; j < colorGroup.length; j++) {
                    if (!colorGroup[i]) continue;
                    var first = colorGroup[i][0];
                    var second = colorGroup[i][1];
                    var third = colorGroup[i][2];
                    var first1 = colorGroup[j][0];
                    var second1 = colorGroup[j][1];
                    var third1 = colorGroup[j][2];
                    var check = (first - 40 < first1 && first1 < first + 40) && (second - 40 < second1 && second1 < second + 40) && (third - 40 < third1 && third1 < third + 40);

                    // console.log(first, first1, second,second1, third, third1, check, i,j);
                    if (check && colorGroup[i] !== colorGroup[j]) {
                        i--;
                        colorGroup.splice(j, 1);
                        // console.log(colorGroup);
                    }
                }
            }
            // console.log({ imageBackgroundColor: imageBackgroundColor, colors: colorGroup })
            cb({ imageBackgroundColor: imageBackgroundColor, colors: colorGroup });
        }
    }
    else {
        cb({})
    }
}

