const S = require("sanctuary");
const validate = require("./lib/validate.js").validate;
const validateSchema = require("./lib/schema.js").validateSchema;
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;

function validateComplete(object, schema) {
    return (validateSchema(schema)?
	    S.Right(schema):
	    S.Left(Tuple2("Schema","invalid")))
        .chain(x => validate(object, x))
	.chain(x => S.Right(object));
};

module.exports = {
    validate: validateComplete
}
