/**
 * The object-collection of methods for
 * validating fields (Validator) using
 * regular expressions.
 */
const Validator = {
    validateEmail(email) {
        const emailRegex = /^(?![-.+])[a-zA-Z\d-.+]{2,20}@[\w.!$%&’*+/=?^-]{1,15}\.[a-zA-Z\d-.+]{1,5}$/;
        return emailRegex.test(email);
    },

    validatePhone(phone) {
        if(phone.length > 25) {
            return false;
        }
        const phoneRegex = /^(\+38)?[ -]*\(?(0[ -]*)(9[ -]*)(9[ -]*)\)?[ -]*(\d[ -]*){7}$/;
        return phoneRegex.test(phone);
    },

    validatePassword(password) {
        const passwordRegex = /^(?=\w*[A-Z])(?=\w*[a-z])(?=\w*\d)\w{8,}$/;
        return passwordRegex.test(password);
    }
};

// Test
console.log("VALID:");
console.log("Email:");
console.log(Validator.validateEmail("firstpart@secondpart.end"));
console.log(Validator.validateEmail("fi@secon!dpart.end"));
console.log(Validator.validateEmail("first-part@.se=cond%p.art.end"));
console.log(Validator.validateEmail("first.part@se=cond%part.r"));
console.log("Phone:");
console.log(Validator.validatePhone("+38 (099) 567 8901"));
console.log(Validator.validatePhone("+38 099 5 6 7 8 9  01"));
console.log(Validator.validatePhone("(09-9) 567-890-1"));
console.log(Validator.validatePhone("--  (099) 567 890-1"));
console.log("Password:");
console.log(Validator.validatePassword("C00l_Pass"));
console.log(Validator.validatePassword("SupperPas1"));


console.log("\nINVALID:");
console.log("Email:");
console.log(Validator.validateEmail(".firstpart@.se=cond%.enddeded"));
console.log(Validator.validateEmail("f@secondart.end,"));
console.log(Validator.validateEmail("first-part@.se=cond@part.end"));
console.log(Validator.validateEmail("-firstpart@.se=cond%.enddeded"));
console.log(Validator.validateEmail("firs_tpart@.se.en"));
console.log(Validator.validateEmail("firstpart@.se.enddeded"));
console.log("Phone:");
console.log(Validator.validatePhone("+38 (099) 567 8901 0"));
console.log(Validator.validatePhone("+38 099 a0000000"));
console.log(Validator.validatePhone("+38 (0989) 567 8901"));
console.log(Validator.validatePhone("+48 (0989) 567 8901"));
console.log("Password:");
console.log(Validator.validatePassword("Cool_pass"));
console.log(Validator.validatePassword("C00l"));
