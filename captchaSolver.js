function rgb2hsv(r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }

        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }

    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}

function getRGB(imageData, width, x, y) {
    var index = 4 * (x + y * width);
    return imageData.slice(index, index + 3);
}

function getHSV(imageData, width, x, y) {
    var rgb = getRGB(imageData, width, x, y);
    return rgb2hsv(...rgb);
}

function getNeighborPixels(imageData, width, x, y) {
    return [
        getRGB(imageData, width, x, y + 1),
        getRGB(imageData, width, x + 1, y),
        getRGB(imageData, width, x - 1, y),
        getRGB(imageData, width, x, y - 1)
    ];
}

function isYellow(rgb) {
    var hsv = rgb2hsv(...rgb);
    return hsv.h > 31.0 && hsv.h < 80.0;
}

function isNotYellow(rgb) {
    return !isYellow(rgb);
}

function removeLineFromImg(img, width, height) {
    var ok = true;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var rgb = getRGB(img, width, i, j);
            var index = 4 * (i + j * width);

            if (isYellow(rgb)) {
                ok = false;

                var neighborPixels = getNeighborPixels(img, width, i, j);
                var notYellowPixels = neighborPixels.filter(isNotYellow);

                if (notYellowPixels.length > 1) {
                    var index = 4 * (i + j * width);
                    var avgPixel = notYellowPixels
                      .reduce((acc, current) => [ acc[0] + current[0], acc[1] + current[1], acc[2] + current[2] ])
                      .map(result => Math.floor(result / notYellowPixels.length));

                    img[index] = avgPixel[0];
                    img[index + 1] = avgPixel[1];
                    img[index + 2] = avgPixel[2];
                }
            }
        }
    }

    if (!ok) {
        removeLineFromImg(img, width, height);
    }
}

function removeColorFromImg(img, width, height) {
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var hsv = getHSV(img, width, i, j);
            var index = 4 * (i + j * width);
            var color = hsv.v < 30 ? 0 : 255;

            img[index] = color;
            img[index + 1] = color;
            img[index + 2] = color;
        }
    }
}

async function runCaptcha(element) {
    var width = element.width;
    var height = element.height;

    // Create a canvas just for cropping.
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Draw our image to the canvas...
    var ctx = canvas.getContext("2d");
    ctx.rect(0, 0, 1, 1);
    ctx.drawImage(element, 0, 0);

    // Crop our image and save it in memory.
    var croppedImg = ctx.getImageData(1, 1, width, height);

    // Set the new dimensions of our image.
    width -= 2;
    height -= 2;

    // Create our new, cropped canvas.
    var croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = width;
    croppedCanvas.height = height;

    // Set our new cropped canvas image data.
    var croppedCtx = croppedCanvas.getContext("2d");
    croppedCtx.rect(0, 0, width, height);
    croppedCtx.putImageData(croppedImg, 0, 0);

    // Get our new image data...
    var img = croppedCtx.getImageData(0, 0, width, height);

    // Transform it for our captcha needs...
    removeLineFromImg(img.data, width, height);
    removeColorFromImg(img.data, width, height);

    // Save the image data...
    croppedCtx.putImageData(img, 0, 0);

    // And send it over to our OCR friends at Tesseract!
    var ocr = await Tesseract.recognize(croppedCtx);
    return ocr.text.replace(/\s/g, '').toLowerCase();
}

async function solveCaptchaOnPage() {
    var content = document.getElementById("jPopFrame_content").contentDocument;
    var captcha = content.getElementById('captchaImage');
    var result = await runCaptcha(captcha);

    var captchaText = content.getElementById('captcha');
    captchaText.value = result;

    var loginButton = content.getElementById('bp_login');
    loginButton.click();
}