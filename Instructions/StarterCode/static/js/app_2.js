//Populate Dropdown Menu with Sample ID's
function init(){
    var dropDown = d3.select("#selDataset")

//Reads the data from the json file
d3.json("samples.json").then((importedData) => {
     console.log(importedData)   
});
}