const M = require("monet");
const R = require("ramda");

function validateType(type, value, key) {
    return (R.type(value) == type) ?
        M.Either.Right(value) :
        M.Either.Left(key + " is not of expected type :" + type);
}

function checkIfEmpty(value, key) {
    return R.isEmpty(value) ?
        M.Either.Left(key + " is empty") :
        M.Either.Right(value);
}

function keysWithSchema(object, schema) {
    return R.pickBy((v, k) => !R.isNil(schema[k]), object);
}

function validateArray(array, type) {
    return R.compose(R.all((x) => x == type),
        R.map(R.type))(array);
}

function validate(object, schema) {

    const keys = R.keys(keysWithSchema(object, schema));

    return R.flatten(R.map(function(key) {
        const vschema = schema[key];

        const type = vschema.type;
        const value = object[key];

        const validationT = R.curry(validateType)(type, R.__, key);
        const validationE = R.curry(checkIfEmpty)(R.__, key);

        return (R.isNil(value) ?
                M.Either.Left(key + " is undefined") :
                M.Either.Right(value))
            .bind(x => validationT(x))
            .bind(x => validationE(x))
            .cata(function(x) {
                return [x];
            }, function(x) {
                if (["Object"].indexOf(R.type(x)) > -1) {
                    return validate(x, vschema["schema"]);
                } 

                return [];
            })

    }, keys));
}
