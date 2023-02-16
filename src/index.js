module.exports = function toReadable(number) {
    const transformNumber = String(number).split('');

    let hundreds = transformNumber[0];
    let tens = transformNumber[1];
    let ones = transformNumber[2];
    let isHundreds = false;
    let isTens = false;
    let isOnes = false;

    if (transformNumber.length === 3) {
        isHundreds = true;
        hundreds = transformNumber[0];
        tens = transformNumber[1] == 0 ? null : transformNumber[1] + 0;
        ones = transformNumber[2] == 0 ? null : transformNumber[2];
    }

    if (transformNumber.length === 2) {
        isTens = true;
        tens = transformNumber[0] + 0;
        ones = transformNumber[1] == 0 ? null : transformNumber[1];
    }

    if (transformNumber.length === 1) {
        isOnes = true;
        ones = transformNumber[0];
    }

    const onesDigits = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    };

    const tensToTwentyDigits = {
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
    };

    const tensDigits = {
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety',
    };

    if (isHundreds) {
        let localHundreds = hundreds;
        let localTens = tens;
        let localOnes = ones;
        const onesAndTensSum = +localTens + +localOnes;


        for (key in onesDigits) {
            if (key == hundreds) {
                localHundreds = `${onesDigits[key]} hundred`;
            }
        }

        for (key in tensDigits) {
            if (key == tens && tens) {
                localTens = tensDigits[key];
            }
        }

        for (key in onesDigits) {
            if (key == ones && ones) {
                localOnes = onesDigits[key];
            }
        }

        if (Number(onesAndTensSum) <= 19) {
            for (key in tensToTwentyDigits) {
                if (key == onesAndTensSum) {
                    localTens = tensToTwentyDigits[key];
                    localOnes = null;
                }
            }
        }

        if (!localTens && !localOnes) {
            return `${localHundreds}`;
        } else if (!localOnes) {
            return `${localHundreds} ${localTens}`;
        } else if (!localTens) {
            return `${localHundreds} ${localOnes}`;

        } else {
            return `${localHundreds} ${localTens} ${localOnes}`;
        }
    }

    if (isTens && number > 19) {
        let localTens = tens;
        let localOnes = ones;

        for (key in tensDigits) {
            if (key == tens) {
                localTens = tensDigits[key];
            }
        }

        for (key in onesDigits) {
            if (key == ones && ones) {
                localOnes = onesDigits[key];
            }
        }

        if (!localOnes) {
            return `${localTens}`;
        } else if (!localOnes) {
            return `${localHundreds} ${localTens}`;
        } else if (!localTens) {
            return `${localHundreds} ${localOnes}`;

        } else {
            return `${localTens} ${localOnes}`;
        }

    } else {
        for (key in tensToTwentyDigits) {
            if (key == number) {
                return tensToTwentyDigits[key];
            }
        }
    }

    if (isOnes) {
        for (key in onesDigits) {
            if (key == number) {
                return onesDigits[key];
            }
        }
    }
};
