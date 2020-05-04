const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangeInfoInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.number = !isEmpty(data.number) ? data.number : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.number)) {
        errors.number = "Number is required";
    }
    if (Validator.isMobilePhone(data.number)) {
        errors.number = "Enter a valid number";
    }
    if (!Validator.isLength(data.number, { min: 12, max: 12 })) {
        errors.number = "Enter a valid number";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};