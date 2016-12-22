const R = require("ramda");

// Schema Rules
//
//  Schema:: Map String String
//  Schema:: Map String ArrayX
//
//  ArrayX -> [Const String] or [Const Schema]  
//   where value of const is either "Array"
//

// :: Array[a] -> Bool
function validateArrayX(arrayX) {
    if (!(arrayX.length == 2)) {
        return false;
    }
    const val1 = arrayX[0];
    const type2 = R.type(arrayX[1]);
    const truthy = (val1 == "Array") && ["Object", "String"].indexOf(type2) > -1;
    return type2 == "Object" ? truthy && validateSchema(arrayX[1]) : truthy;
}

// :: Schema -> Bool
function validateSchema(schema) {
    const vals = R.values(schema);
    return R.reduce(function(acc, x) {
        const notEmpty = !(R.isNil(x) || R.isEmpty(x)) 
	const rightType = ["Object", "String", "Array"].indexOf(R.type(x)) > -1;
	const truthy = notEmpty && rightType;

        if (truthy && R.type(x) == "Array") {
            return acc && validateArrayX(x);
        } else if (truthy && R.type(x) == "Object"){
	    return acc && validateSchema(x);
	}

        return acc && truthy;

    }, true, vals);
}

module.exports = {
    validateArrayX: validateArrayX,
    validateSchema: validateSchema
}
