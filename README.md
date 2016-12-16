# Yet Another Javascript Json Schema Library (...hehe)

![rickandmorty](https://github.com/functor-soup/yajjsl/raw/master/pic/rickandmorty.jpg)

Yet another piece of code that tries to validate json based on types,
this is NOT BASED ON THE JSON SCHEMA STANDARD which I find too verbose for my likes
but that's just me.

### Goals of this Library

1. To provide type validation for enities inside a json object
2. To provide value validation for entities inside a json object
3. The output of this will a list of errors 

### Development Goals

1. Use Monads and it's related operations  to make for readable code
2. Use Ramda.js for other other operations
3. Test library thoroughly

### Pending

1. Validation of complex array types (code is in place, just need to join em up nicely)


### Example


```
const schema1 = {
        "weapon": "String",
        "pokemon": ["Array", "String"],
        "pokeball": ["Object", {
            "material": "String",
            "cost": "Number"
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

validate(incorrect1, schema1);

// output -> [("weapon", undefined), ("pokemon", false), ("material", false)] 
// tuples are based on fantasy-land-tuples

```

