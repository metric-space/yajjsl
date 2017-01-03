const R = require("ramda");
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;

// Schema Rules
//
//  Schema:: Map String String
//  Schema:: Map String (Const, String)
//  Schema:: Map String (Const, Schema)
//  Schema:: Map String Schema
//
//   where value of Const has to be a string of value "Array"

const ObjectType = R.type({});
const StringType = R.type("");

// :: (String, SchemaFrag) -> Bool
function validateSchemaTuple(input) {
    // don't care about the String type in the tuple
    if(input._1 != "Array"){ return false;};
    const val = input._2;
    const truthy = [ObjectType, StringType].indexOf(R.type(val)) > -1;
    return R.type(val) == ObjectType ? truthy && validateSchema(val) : truthy;
}

// :: Schema -> Bool
function validateSchema(schema) {

    const vals = R.values(schema);
    return R.reduce(function(acc, x) {
        const notEmpty = !(R.isNil(x) || R.isEmpty(x)) 
        if (notEmpty && x instanceof Tuple2) {
            return acc && validateSchemaTuple(x);
        } else if (notEmpty && x instanceof Object){
	    return acc && validateSchema(x);
	}
        return acc && notEmpty && (R.type(x) == StringType);

    }, true, vals);
}

module.exports = {
    validateSchemaTuple: validateSchemaTuple,
    validateSchema: validateSchema
}
