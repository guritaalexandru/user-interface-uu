function loadItems(){
    // Initial loading of the items
    // object dictionary of the category terms, following the Beverages_eng naming 
    categoryItems = {
        "beer": ["ale", "stout", "ipa", "lager"],
        "wine": ["vin"],
        "spirits": ["whisky", "rom", "tequila", "okryddad sprit"],
        "alcohol-free": ["alkoholfritt"]
    };

    var allItems = getAllItems(DB_FILTERED);
    globalState.menuItems = allItems;
    console.log("Loaded beverages into globalvariables");
    console.log(globalState.menuItems);

}




function getAllItems(database){
    // Editing the code from loader.js, allbeverages()
    // This function takes in a database and returns all the items

    var collector = [];

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
        console.log(database[i].name, database[i].priceinclvat);

        collector.push(
                {
                    itemId : parseInt(database[i].articleid),
                    itemName : database[i].name,
                    itemPrice : parseFloat(database[i].priceinclvat),
                    category : database[i].category,
                    producer : database[i].producer,
                    alcoholStrength : database[i].alcoholstrength,
                    published: publishedvar,
                    deleted: deletedvar 
                }
            );
    };
    //
    return collector;
}


loadItems();