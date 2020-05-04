const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePassInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
    data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2 : "";
    // newpassword checks
    if (Validator.isEmpty(data.newpassword)) {
        errors.newpassword = "new password field is required";
    }
    if (Validator.isEmpty(data.newpassword2)) {
        errors.newpassword2 = "confirm New password field is required";
    }
    if (!Validator.isLength(data.newpassword, { min: 6, max: 30 })) {
        errors.newpassword = "new password must be at least 6 characters";
    }
    if (!Validator.equals(data.newpassword, data.newpassword2)) {
        errors.newpassword2 = "new passwords must match";
    }
    if (Validator.isDecimal(data.newpassword)) {
        errors.newpassword = "new password should contain both alphabets and numbers";
    }
    if (Validator.isAlpha(data.newpassword)) {
        errors.newpassword = "newpassword should contain both alphabets and numbers";
    }
    if (Validator.isLowercase(data.newpassword)) {
        errors.newpassword = "new password should contain atleat one uppercase alphabet";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};