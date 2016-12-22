const M = require("monet");
const R = require("ramda");
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;

// :: a -> String -> Either (String, String) a
function checkIfEmpty(value, key) {
    return R.isEmpty(value) ?
        M.Either.Left(Tuple2(key, "empty")) :
        M.Either.Right(value);
}

// :: SchemaFragment -> [a] -> String -> Either Tuple(String, String) [a]
function validateArray(type, value, key) {
    if (R.type(type) == "Object") {
        const result = R.reduce(function(acc, x) {
            const output = validate(x, type);
            return acc.concat(output);
        }, [], value);
        return (R.flatten(result) == []) ? M.Either.Right(output) :
            M.Either.Left(result);
    }

    return (R.compose(R.all((x) => x == type),
            R.map(R.type))(value)) ?
        M.Either.Right(value) :
        M.Either.Left(Tuple2(key, false));
}

// :: SchemaFragment -> a -> String -> Either Tuple(String, String) [a]
function validateType(type, value, key) {
    if (R.type(type) == "Array" &&
        R.type(value) == type[0]) {
        return validateArray(type[1], value, key);

    } else if (R.type(type) == "Object"){
	const output = validate(value, type);
	return (output == [])? M.Either.Right(value) :
           M.Either.Left(output);

    }

    return (R.type(value) == type) ?
        M.Either.Right(value) :
        M.Either.Left(Tuple2(key, false));
}

// :: JSON -> Schema -> [(String, String)]
function validate(object, schema) {

    // assuming schema is valid 
    const keys = R.keys(schema);

    return R.flatten(R.map(function(key) {
        const type = schema[key];
        const value = object[key];

        const validationT = R.curry(validateType)(type, R.__, key);
        const validationE = R.curry(checkIfEmpty)(R.__, key);

        return (R.isNil(value) ?
                M.Either.Left(Tuple2(key, undefined)) :
                M.Either.Right(value))
            .bind(x => validationE(x))
            .bind(x => validationT(x))
            .cata(function(x) {
                return [x];
            }, function(x) {
                return [];
            })

    }, keys));
}

module.exports = {
    validate: validate,
    validateType: validateType,
    checkIfEmpty: checkIfEmpty,
    validateArray: validateArray,
}
