//Populate Dropdown Menu with Sample ID's
function init(){
    
    //D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset")

    //Reads the data from the json file
    d3.json("samples.json").then((data) => {
        
        //assign a variable to data
        var importedData = data
        console.log(importedData)

        //use names to populate dropdown using for loop
        importedData.names.forEach(function(n){
            dropdownMenu
            .append("option")
            .text(n).property("value");
        });
        
    });
}

init();