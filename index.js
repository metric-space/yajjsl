const S = require("sanctuary");
const validate = require("./lib/validate.js").validate;
const validateSchema = require("./lib/schema.js").validateSchema;

function validateComplete(object, schema) {
    return validateSchema(schema)
        .chain(validate)
	.chain(x => S.Right(x));
};

module.exports = {
    validate: validateComplete
}
