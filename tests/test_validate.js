const S = require("sanctuary");
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;
const assert = require("chai").assert;
const utils = require("../lib/validate.js");

describe("checkIfEmpty Util Tests", function() {
    it("check-if-empty util should return Right if not empty ",
        function() {
            const value = "Rick";
            const key = "Morty";
            assert.isTrue(S.Right(value).equals(utils.checkIfEmpty(value, key)));

        });

    it("check-if-empty util should return Right if input is a non-empty object",
        function() {
            const value = {
                "Rick": "Sanchez"
            };
            const key = "Morty";
            assert.isTrue(S.Right(value).equals(utils.checkIfEmpty(value, key)));

        });

    it("check-if-empty util should return Right if input is a non-empty Array",
        function() {
            const value = ["Rick", "Sanchez"];
            const key = "Morty";
            assert.isTrue(S.Right(value).equals(utils.checkIfEmpty(value, key)));

        });


    it("check-if-empty util should return Left if input is an empty array",
        function() {
            const value = [];
            const key = "Morty";
            assert.isTrue(S.Left(Tuple2(key, "empty")).equals(utils.checkIfEmpty(value, key)));

        });

    it("check-if-empty util should return Left if input is an empty object",
        function() {
            const value = {};
            const key = "Morty";
            assert.isTrue(S.Left(Tuple2(key, "empty")).equals(utils.checkIfEmpty(value, key)));

        })

})

describe("validateArrayType Util Tests", function() {

    it("correct type array should output a Right ",
        function() {
            const array = ["weapon", "alpha", "wolfenstein"]

            assert.isTrue(S.Right(true)
			  .equals(utils.validateArrayType("String", array, "dontmatter")));

        });

    it("incorrect type array should output a Left ",
        function() {
            const array = ["weapon", 2, "wolfenstein"]

            assert.isTrue(S.Left(Tuple2("dontmatter", false))
			  .equals(utils.validateArrayType("String", array, "dontmatter")));

        });
});

describe("validateVanillaType Util Tests", function() {

    it("correct type should output a Right ",
        function() {
            const value = "wolfenstein";

            assert.isTrue(S.Right(true)
			   .equals(utils.validateVanillaType("String", value, "dontmatter")));

        });

    it("incorrect type should output a Left ",
        function() {
            const value = 2;

            assert.isTrue(S.Left(Tuple2("dontmatter", false))
			   .equals(utils.validateVanillaType("String", value, "dontmatter")));

        });

});

describe("Main validate Util Tests", function() {

    const schema1 = {
        "weapon": "String",
        "pokemon": Tuple2("Array", "String"),
        "pokeball": {
            "material": "String",
            "cost": "Number"
        },
        "characters": Tuple2("Array", {
            "name": "String"
        })
    };

    const correct = {
        "weapon": "fishing-rod",
        "pokemon": ["Butterfly", "Pikachu"],
        "pokeball": {
            "material": "Golden nut",
            "cost": 100
        },
        "characters": [{
            "name": "Red Foreman"
        }, {
            "name": "I am Fez"
        }]
    };

    const incorrect1 = {
        "weapon": "fishing-rod",
        "pokemon": ["Butterfly", "Pikachu"],
        "pokeball": {
            "material": ["Egg Nut", "Brown Nut"],
            "cost": 100
        }
    };

    const incorrect2 = {
        "pokemon": [1, 2],
        "pokeball": {
            "material": ["Egg Nut", "Brown Nut"],
            "cost": 100
        }
    };


    it("correct types should output a Right",
        function() {
            const result = utils.validate(correct, schema1);
	    console.log(result);
            assert.isTrue(result.isRight);

        });

    it("incorrect types should output a left",
        function() {
	    const result = utils.validate(incorrect1, schema1);
            assert.isTrue(result.equals(S.Left(Tuple2("material", false))));

        });

    it("incorrect types should output a left (part 2)",
        function() {
	    const result = utils.validate(incorrect2, schema1);
            assert.isTrue(result.equals(S.Left(Tuple2("weapon", undefined))));

        });

});
