export const minLengthFunctionFactory = (length, errorMessage) => {
    return (value) => {
        let result = null;
        if (value.length < length) {
            result = errorMessage;
        }
        return result
    }
}

export const mustContainCharInRangeFactory = (lowerBoundChar, upperBoundChar, errorMessage) => {
    return (value) => {
        let result = errorMessage;
        const letterArr = value.split("");
        letterArr.forEach(letter => {
            if (letter.charCodeAt(0) >= lowerBoundChar.charCodeAt(0) &&
                letter.charCodeAt(0) <= upperBoundChar.charCodeAt(0)) {
                    result = null;
                }
        })
        return result;
    }
}

export const containsCharacterInSetFactory = (must, set, errorMessage) => {
    return (value) => {
        let result = null
        const letterArr = value.split("");
        let containsLetterFromSet = false;
        letterArr.forEach(letter => {
            if (set.indexOf(letter) !== -1) {
                containsLetterFromSet = true;
            }
        })
        if (containsLetterFromSet !== must) {
            result = errorMessage;
        }
        return result;
    }
}