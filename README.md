# Yet Another Javascript Json Schema Library (...hehe)

![rickandmorty](https://github.com/functor-soup/yajjsl/raw/master/pic/rickandmorty.jpg)

Yet another piece of code that tries to validate json based on types,
this is NOT BASED ON THE JSON SCHEMA STANDARD which I find too verbose for my likes
but that's just me.

### Goals of this Library

1. To provide type validation for entities inside a json object
2. To provide checkif-empty/undefined validation for entities inside a json object
3. The output of this will be a list of errors 

### Development Goals

1. Use Monads and it's related operations  to make for readable code
2. Use Ramda.js for other other operations
3. Test library thoroughly


### Example


```javascript

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

const incorrect1 = {
        "pokemon": [1, 2],
        "pokeball": {
            "material": ["Egg Nut", "Brown Nut"],
            "cost": 100
        },
	"characters": [{ "name": "Red Foreman"}, 
		       { "name": "I am Fez" }]

    };

validate(incorrect1, schema1);

// output -> [("weapon", undefined), ("pokemon", false), ("material", false)] 
// tuples are based on fantasy-land-tuples

```

[![Build Status](https://travis-ci.org/functor-soup/yajjsl.svg?branch=master)](https://travis-ci.org/functor-soup/yajjsl)
