const M = require("monet");
const E = M.Either;
const tuples = require('fantasy-tuples'),
    Tuple2 = tuples.Tuple2;
const assert = require("chai").assert;
const utils = require("../lib/validate.js");

describe("checkIfEmpty Util Tests", function() {
    it("check-if-empty util should return Right if not empty ",
        function() {
            const value = "Rick";
            const key = "Morty";
            assert.deepEqual(E.Right(value), utils.checkIfEmpty(value, key));

        });

    it("check-if-empty util should return Right if input is a non-empty object",
        function() {
            const value = {
                "Rick": "Sanchez"
            };
            const key = "Morty";
            assert.deepEqual(E.Right(value), utils.checkIfEmpty(value, key));

        });

    it("check-if-empty util should return Right if input is a non-empty Array",
        function() {
            const value = ["Rick", "Sanchez"];
            const key = "Morty";
            assert.deepEqual(E.Right(value), utils.checkIfEmpty(value, key));

        });


    it("check-if-empty util should return Left if input is an empty array",
        function() {
            const value = [];
            const key = "Morty";
            assert.deepEqual(E.Left(Tuple2(key, "empty")),
                utils.checkIfEmpty(value, key));

        });

    it("check-if-empty util should return Left if input is an empty object",
        function() {
            const value = {};
            const key = "Morty";
            assert.deepEqual(E.Left(Tuple2(key, "empty")),
                utils.checkIfEmpty(value, key));

        })

})

describe("validateArray Util Tests", function() {

    it("correct type array should output a Right ",
        function() {
            const array = ["weapon", "alpha", "wolfenstein"]

            assert.deepEqual(E.Right(array),
                utils.validateArray("String", array, "dontmatter"));

        });

    it("incorrect type array should output a Left ",
        function() {
            const array = ["weapon", 2, "wolfenstein"]

            assert.deepEqual(E.Left(Tuple2("dontmatter", false)),
                utils.validateArray("String", array, "dontmatter"));

        });
});

describe("validateType Util Tests", function() {

    it("correct type should output a Right ",
        function() {
            const value = "wolfenstein";

            assert.deepEqual(E.Right(value),
                utils.validateType("String", value, "dontmatter"));

        });

    it("incorrect type should output a Left ",
        function() {
            const value = 2;

            assert.deepEqual(E.Left(Tuple2("dontmatter", false)),
                utils.validateType("String", value, "dontmatter"));

        });

    it("correct type array should output a Right ",
        function() {
            const array = ["weapon", "alpha", "wolfenstein"]

            assert.deepEqual(E.Right(array),
                utils.validateType(["Array", "String"], array, "dontmatter"));

        });

    it("incorrect type array should output a Left ",
        function() {
            const array = ["weapon", 2, "wolfenstein"]

            assert.deepEqual(E.Left(Tuple2("dontmatter", false)),
                utils.validateType(["Array", "String"], array, "dontmatter"));

        });

});

describe("Main validate Util Tests", function() {

    const schema1 = {
        "weapon": "String",
        "pokemon": ["Array", "String"],
        "pokeball": {
            "material": "String",
            "cost": "Number"
        },
        "characters": ["Array", {
            "name": "String"
        }]
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


    it("correct types should output []",
        function() {
            assert.deepEqual([],
                utils.validate(correct, schema1));

        });

    it("incorrect types should output a list of tuples",
        function() {
            assert.sameDeepMembers([Tuple2("material", false), Tuple2("characters", undefined)],
                utils.validate(incorrect1, schema1));

        });

    it("incorrect types should output a list of tuples (part 2)",
        function() {
            assert.deepEqual([Tuple2("weapon", undefined), Tuple2("pokemon", false),
                    Tuple2("material", false), Tuple2("characters", undefined)
                ],
                utils.validate(incorrect2, schema1));

        });

});
