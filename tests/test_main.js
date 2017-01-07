const S = require("sanctuary");
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;
const assert = require("chai").assert;
const validate = require("../index.js").validate;

describe("Util Tests", function() {
    it("should return Right given correct schema and schema-valid object",
        function() {
            const schema1 = {
                "weapon": "String",
                "pokemon": Tuple2("Array", "String")

            };

	    const object1 = {"weapon" : "sheepinator", 
		    "pokemon":["Blaziken", "Torchic"]}

            assert.isTrue(validate(object1, schema1).isRight);

        });

    it("should return Left given an incorrect schema and schema-valid object",
        function() {
            const schema1 = {
                "weapon": ["Array","Something"],
                "pokemon": Tuple2("Array", "String")

            };

	    const object1 = {"weapon" : "sheepinator", 
		    "pokemon":["Blaziken", "Torchic"]}

            assert.isTrue(validate(object1, schema1).isLeft);

        });

    it("should return Left given an correct schema and schema-invalid object",
        function() {
            const schema1 = {
                "weapon": "String",
                "pokemon": Tuple2("Array", "String")

            };

	    const object1 = {"weapon" : "sheepinator", 
		    "pokemon":{"name":"Blaziken", "name-ed":"Torchic"}}

            assert.isTrue(validate(object1, schema1).isLeft);

        });
})



