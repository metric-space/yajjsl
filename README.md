# Yet Another Javascript Json Schema Library (...hehe)

![rickandmorty](https://github.com/functor-soup/yajjsl/raw/master/pic/rickandmorty.jpg)

Yet another piece of code that tries to validate json based on types,
this is NOT BASED ON THE JSON SCHEMA STANDARD which I find too verbose for my likes
but that's just me.

### Goals of this Library

1. To provide type validation for entities inside a json object
2. To provide checkif-empty/undefined validation for entities inside a json object
3. The output of this will be the first error encountered (Wrapped in a Left) or the whole object (wrapped in a Right)

### Development Goals

1. Use Applictive-functors/Monads and it's related operations  to make for readable code
2. Use Ramda.js for other other operations
3. Test library thoroughly


### Example


```javascript

const schema1 = {
        "weapon": "String",
        "pokemon": Tuple("Array", "String"),
        "pokeball": {
            "material": "String",
            "cost": "Number"
        },
	"characters": Tuple("Array", {"name": "String"})

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

// output -> Left(Tuple("weapon", undefined)) 
// tuples are based on fantasy-land-tuples

```

### What this is not
1. A fast library (overuse of Ramda.js and Sanctuary js type checking has made this slow)

### P.S
1. This also features schema checking for validity based on some preset rules

### License
MIT License

[![Build Status](https://travis-ci.org/functor-soup/yajjsl.svg?branch=master)](https://travis-ci.org/functor-soup/yajjsl)
