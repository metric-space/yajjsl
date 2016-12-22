const assert = require("chai").assert;
const utils = require("../lib/schema.js");

describe("ValidSchema Util Tests", function() {
    it("should return true",
        function() {
            const schema1 = {
                "weapon": "String",
                "pokemon": ["Array", "String"]

            };

            assert.equal(utils.validateSchema(schema1), true);

        });

    it("should return false",
        function() {
            const schema2 = {
                "weapon": "String",
                "pokemon": ["String", "String"]

            };

            assert.equal(utils.validateSchema(schema2), false);

        });

    it("More complex example should return true", function() {
        const schema1 = {
            "name": "String",
            "location": ["Array", {
                "address": "String",
                "numbers": ["Array", "Number"]
            }]
        }

        assert.equal(utils.validateSchema(schema1), true);

    })

    it("More complex example should return false", function() {
        const schema1 = {
            "name": "String",
            "location": ["Array", {
                "address": "String",
                "numbers": ["Number"]
            }]
        }

        assert.equal(utils.validateSchema(schema1), false);

    })

    it("Even More complex example should return true", function() {
        const schema1 = {
            "name": "String",
            "detail": {
                "location": ["Array", {
                    "address": "String",
                    "numbers": ["Array", "Number"]
                }]
            }
        }

        assert.equal(utils.validateSchema(schema1), true);

    });

    it("Even More complex example should return false", function() {
        const schema1 = {
            "name": "String",
            "detail": {
                "location": ["String", {
                    "address": "String",
                    "numbers": ["Array", "Number"]
                }]
            }
        }

        assert.equal(utils.validateSchema(schema1), false);

    })
});


