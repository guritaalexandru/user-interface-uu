
function updateFile(fileName, newData){
    // Using blob, save a json formatted data into a specified file name
    const jsonData = JSON.stringify(newData);
    const blob = new Blob([jsonData], {type: "application/json"});
    const url = URL.createObjectURL(blob);


    const a = document.createElement("a");
    a.href = url;
    a.download = "Beverages_eng_filtered.js";
    
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    
}


function replaceData(newData, fullArray){

    console.log("Replacing old data")
    newDataItemId = newData.itemId;
    for (i = 0; i < fullArray.length; i++){
        currentItem = fullArray[i];
        if (newDataItemId == currentItem.itemId){
            fullArray[i] = newData;
        }
    };
}


function getCurrentDirectory() {
    // Get the current page URL
    const currentPageUrl = window.location.href;

    // Extract the directory portion of the URL
    const lastIndex = currentPageUrl.lastIndexOf('/');
    const currentDirectory = currentPageUrl.substring(0, lastIndex);

    return currentDirectory;
}


window.updateFile = updateFile;
window.replaceData = replaceData;