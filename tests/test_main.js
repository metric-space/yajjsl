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

	    const result = validate(object1, schema1);
            assert.isTrue(result.isLeft);

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

    it("given a schema-invalid object in which a string is given in place of an object, should return left with correct error",
        function() {
            const schema1 = {
                "weapon": "String",
                "pokemon": Tuple2("Array", {"name":String})

            };

	    const object1 = {"weapon" : "sheepinator", "pokemon":"Blaziken"}

	    const result = validate(object1, schema1);
            assert.isTrue(result.isLeft);
            assert.equal(result.value._2, false);

        });

})

describe("Benchmarking complex schema Tests", function() {

    const schema = {"weapons":Tuple2("Array", 
				     		{
	                                         "name":"String", 
						 "cost":"String",
                                                 "description": {"status":"String",
						                 "info":"String"}
                                                }),
                    "pokemon" : {"name":"String",
		                 "stone":Tuple2("Array","String")}
                   }

    it("should return Right given correct schema and schema-valid object",
        function() {

	    const object1 = {"weapons" : [{"name":"Fishing Rod", 
		                           "cost":"100 Quid",
	                                   "description": {"status":"broken", "info":"Some loser called Brock broke it"}},
	                                 {"name":"Repel", 
					  "cost":"200 Quid",
					  "description": {"status":"out-of-stock", "info":"Team Rocket bought it all :,("}},
	                                 {"name":"Stick", 
					  "cost":"0 Quid",
					  "description":{"status":"plenty all around", "info":"Might come in handy if MagiKarp wacks the crap out of me"}},
	                                 {"name":"Sheepinator", 
					  "cost":"1000 Quid",
					  "description":{"status":"lost in silvercity", "info":"Turns your enemies into sheep, how awesome is that?"}},
	                                 {"name":"Rhydo 2", 
					  "cost":"2000000 Quid",
					  "description": {"status":"Dr. Nefarious has it", "info":"Makes your mama swallow planets .. hehehehe"}}], 
		    "pokemon":{"name" : "Blaziken", 
			       "stone": ["moon stone", "ratchet", "clank", "silvercity", 
				         "thunder stone", "mooncity", "tibetian mongol",
			                 "fenrir", "meggiddo", "rick", "morty", "cake",
			                 "chicken tikka", "chicken 65", "pho", "quantum"]}}

            assert.isTrue(validate(object1, schema).isRight);

        });

})




