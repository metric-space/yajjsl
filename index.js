const M = require("monet");
const R = require("ramda");
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;


function checkIfEmpty(value, key) {
    return R.isEmpty(value) ?
        M.Either.Left(Tuple2(key, "empty")) :
        M.Either.Right(value);
}

function validSchemaKeys(schema) {
    const keys = R.keys(schema);
    return R.filter(function(x) {
            const value = schema[x];
            return !(R.isNil(value) || R.isEmpty(value) || (R.type(value) == "Object"))
        },
        keys)
}

function validateArray(type, value, key) {
    return (R.compose(R.all((x) => x == type),
            R.map(R.type))(value)) ?
        M.Either.Right(value) :
        M.Either.Left(Tuple2(key, false));
}

function validateType(type, value, key) {
    if (R.type(type) == "Array" &&
        type.length == 2 &&
        R.type(value) == type[0]) {
        return validateArray(type[1], value, key);
    }

    return (R.type(value) == type) ?
        M.Either.Right(value) :
        M.Either.Left(Tuple2(key, false));
}

function validate(object, schema) {

    const keys = validSchemaKeys(schema);

    return R.flatten(R.map(function(key) {
        const type = schema[key];
        const value = object[key];

        const validationT = R.curry(validateType)(type, R.__, key);
        const validationE = R.curry(checkIfEmpty)(R.__, key);

        return (R.isNil(value) ?
                M.Either.Left(Tuple2(key, undefined)) :
                M.Either.Right(value))
            .bind(x => validationT(x))
            .bind(x => validationE(x))
            .cata(function(x) {
                return [x];
            }, function(x) {
                if (R.type(x) == "Object" && R.type(x) == type[0]) {
                    return validate(x, type[1]);
                }

                return [];
            })

    }, keys));
}

module.exports = {
    validate: validate,
    validateType: validateType,
    checkIfEmpty: checkIfEmpty,
    validateArray: validateArray,
    validSchemaKeys: validSchemaKeys
}
