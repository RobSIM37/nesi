import { minLengthFunctionFactory,
        mustContainCharInRangeFactory,
        containsCharacterInSetFactory
} from "./validationFunctions";
import { TEXT, PASSWORD } from "./inputTypes";
const invalidPasswordChars = ["(",")","{", "}","[","]"];

export const loginInputs = [
    { type: TEXT, dataKey: "userName", label: "User Name", default: "", required: true,
        validationFunctions: [
            minLengthFunctionFactory(3, "User Name must be at least 3 characters."),
            containsCharacterInSetFactory(false, invalidPasswordChars, `User Name may not contain any of the following symbols: ${invalidPasswordChars.join(", ")}`)
        ]
    },
    { type: PASSWORD, dataKey: "password", label: "Password", default: "", required: true,
        validationFunctions: [
            mustContainCharInRangeFactory("a","z", "Password must contain a lower case letter."),
            mustContainCharInRangeFactory("A", "Z", "Password must contain an upper case letter."),
            mustContainCharInRangeFactory("0", "9", "Password must contain a number."),
            containsCharacterInSetFactory(false, invalidPasswordChars, `Password may not contain any of the following symbols: ${invalidPasswordChars.join("\n")}`)
        ]
    }
];