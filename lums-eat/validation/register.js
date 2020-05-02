const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
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
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    if (Validator.isDecimal(data.password)) {
        errors.password = "Password should contain both alphabets and numbers";
    }
    if (Validator.isAlpha(data.password)) {
        errors.password = "Password should contain both alphabets and numbers";
    }
    if (Validator.isLowercase(data.password)) {
        errors.password = "Password should contain atleat one uppercase alphabet";
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