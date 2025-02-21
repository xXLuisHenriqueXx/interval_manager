"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (input) => {
    let isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.lastEndNumber !== undefined) {
        if (input.lastEndNumber === 0) {
            isValid = isValid && +input.value === 0;
        }
        else {
            isValid = isValid && +input.value === input.lastEndNumber;
        }
    }
    return isValid;
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map