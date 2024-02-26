function loadItems(){
    // Initial loading of the items
    // object dictionary of the category terms, following the Beverages_eng naming 
    categoryItems = {
        "beer": ["ale", "stout", "ipa", "lager"],
        "wine": ["vin"],
        "spirits": ["whisky", "rom", "tequila", "okryddad sprit"],
        "non-alcoholic": ["alkoholfritt"]
    };

    var allItems = getAllItems(DB_FILTERED);
    globalState.menuItems = allItems;
    // console.log("Loaded beverages into globalvariables");
    // console.log(globalState.menuItems);

}




function getAllItems(database){
    // Editing the code from loader.js, allbeverages()
    // This function takes in a database and returns all the items
    var collector = [];

    const imageLinks = {
        "beer": 'https://cdn.pixabay.com/photo/2016/09/14/11/35/beer-1669273_640.png',
        "wine": "https://media.istockphoto.com/id/467008147/photo/red-and-white-wine-glass-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=2u999aK5oSvmDYw_XdiA9haER5e2ppfw9_WcJAuzTPg=",
        "spirits": "https://img.fruugo.com/product/6/33/782888336_max.jpg",
        "non-alcoholic": "https://cdn1.iconfinder.com/data/icons/eco-food-and-cosmetic-labels/128/Artboard_20-512.png"

    }

    // Attributes to capture
    // constant variables
    var publishedvar = true;
    var deletedvar = false

    //variables to be changed in the loop
    let itemId;
    let itemName;
    let itemPrice;
    let category;
    let producer;
    let alcoholStrength;

    for (i = 0; i < database.length; i++) {

        // console.log(database[i].name, database[i].priceinclvat, database[i].catgegory);

        //sort the item into the broader category names (beer,wine,spirits, alcoholfree)
        // NOTE: IN THE RAW FILES, category is mispelled as catgegory
        var rawCategory =  database[i].catgegory.toLowerCase();
        // console.log(rawCategory)
        var finalCategory = findCategory(rawCategory);

        var itemNameFull = database[i].name;
        if (database[i].name2 != null){ // if there is a second name, add it to the string
            itemNameFull += (" " + database[i].name2);
        }

        collector.push(
                {
                    itemId : parseInt(database[i].articleid),
                    itemName : itemNameFull,
                    itemPrice : parseFloat(database[i].priceinclvat),
                    itemCategory : finalCategory,
                    description: rawCategory,
                    producer : database[i].producer,
                    alcoholStrength : database[i].alcoholstrength,
                    published: publishedvar,
                    deleted: deletedvar,
                    itemImage:  imageLinks[finalCategory]
                }
            );
    };
    //
    return collector;
}

function findCategory(rawCategory){
    // helper function to rename the rawcategory into a more broad name
    categoryItems = {
        "beer": ["ale", "stout", "ipa", "lager"],
        "wine": ["vin"],
        "spirits": ["whisky", "rom", "tequila", "okryddad sprit"],
        "non-alcoholic": ["alkoholfritt"]
    };

    // Create a regular expression pattern from the array elements
    for (var checkItem in categoryItems){
        const pattern = new RegExp(categoryItems[checkItem].join('|'), 'i'); // join the array into a string, not case sensitive
        const found = pattern.test(rawCategory);

        if (found){
            return checkItem;
        }
    }
    
}

loadItems();