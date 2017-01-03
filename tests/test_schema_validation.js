const assert = require("chai").assert;
const utils = require("../lib/schema.js");
const tuples = require('fantasy-tuples'),
    Tuple = tuples.Tuple2;

describe("ValidSchema Util Tests", function() {
    it("should return true",
        function() {
            const schema1 = {
                "weapon": "String",
                "pokemon": Tuple("Array", "String")

            };

            assert.equal(utils.validateSchema(schema1), true);

        });

    it("should return false",
        function() {
            const schema2 = {
                "weapon": "String",
                "pokemon": Tuple("String", "String")

            };

            assert.equal(utils.validateSchema(schema2), false);

        });

    it("More complex example should return true", function() {
        const schema1 = {
            "name": "String",
            "location": Tuple("Array", {
                "address": "String",
                "numbers": Tuple("Array", "Number")
            })
        }

        assert.equal(utils.validateSchema(schema1), true);

    })

    it("More complex example should return false", function() {
        const schema1 = {
            "name": "String",
            "location": Tuple("Array", {
                "address": "String",
                "Egghead": []
            })
        }

        assert.equal(utils.validateSchema(schema1), false);

    })

    it("Even More complex example should return true", function() {
        const schema1 = {
            "name": "String",
            "detail": {
                "location": Tuple("Array", {
                    "address": "String",
                    "numbers": Tuple("Array", "Number")
                })
            }
        }

        assert.equal(utils.validateSchema(schema1), true);

    });

    it("Even More complex example should return false", function() {
        const schema1 = {
            "name": "String",
            "detail": {
                "location": Tuple("String", {
                    "address": "String",
                    "numbers": Tuple("Array", "Number")
                })
            }
        }

        assert.equal(utils.validateSchema(schema1), false);

    });
})
