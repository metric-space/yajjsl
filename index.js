const M = require("monet");
const E = M.Either;
const validate = require("./lib/validate.js").validate;
const validateSchema = require("./lib/schema.js").validateSchema;

function validateComplete(object, schema) {
    return validateSchema(schema)
        .bind(validate);

};

module.exports = {
    validate: validateComplete
}
