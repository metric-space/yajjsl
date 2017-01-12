const typeChecking = false;

const { create, env } = require('sanctuary');
const S = create({ checkTypes: typeChecking, env: env });
const R = require("ramda");
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;

// sequenceE :: Applicative m => [m a] ->  m [] (Highly specific to the Either type)
const sequenceE = function(x) {
    return S.reduce(S.lift2(S.C(S.append)), S.Right([]), x);
};

// :: a -> String -> Either (String, String) a
const checkIfEmpty = R.curry((value, key) => {
    return R.isEmpty(value) ?
        S.Left(Tuple2(key, "empty")) :
        S.Right(value);
});

// :: SchemaFragment -> [a] -> String -> Either Tuple(String, String) [a]
// this is responsible for validation of array of both basic and custom types
const validateArrayType = R.curry((type, value, key) => {
    const type_ = (R.type(type) == "Object") ? "Object" : type;
    const f = R.all((x) => R.type(x) == type_);
    const truthy = f(value);
    if (truthy && type_ == "Object") {
        return sequenceE(R.map(validate(R.__, type), value));
    }

    return truthy ?
        S.Right(true) :
        S.Left(Tuple2(key, false));
});

// :: SchemaFragment -> a -> String -> Either Tuple(String, String) [a]
const validateVanillaType = R.curry((type, value, key) => {
    return (R.type(value) === type) ?
        S.Right(true) :
        S.Left(Tuple2(key, false));

});

// :: SchemaFragment -> a -> String -> Either Tuple(String, String) [a]
const validateStructure = R.curry((type, value, key) => {

    const tupleInst = type instanceof Tuple2;

    if (tupleInst && R.type(value) == type._1) {
        return validateArrayType(type._2, value, key);

    } else if (!tupleInst && type instanceof Object &&
        R.type(value) == "Object") {
        return validate(value, type)

    } else {
        return validateVanillaType(type, value, key);
    }

    return S.Left(key, false);
});

// :: JSON -> Schema -> [(String, String)]
const validate = R.curry((object, schema) => {

    // assuming schema is valid 
    const keys = R.keys(schema);

    return sequenceE(R.map(function(key) {
        const type = schema[key];
        const value = object[key];

        const validationT = validateStructure(type, R.__, key);
        const validationE = checkIfEmpty(R.__, key);

        return (R.isNil(value) ?
                S.Left(Tuple2(key, undefined)) :
                S.Right(value))
            .chain(validationE)
            .chain(validationT)
            .chain(x => S.Right(R.flatten(x)))
    }, keys));
});

module.exports = {
    validate: validate,
    validateVanillaType: validateVanillaType,
    checkIfEmpty: checkIfEmpty,
    validateArrayType: validateArrayType,
}
