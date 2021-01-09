//Populate Dropdown Menu with Sample ID's
function init(){
    
    //D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset")

    //Reads the data from the json file
    d3.json("samples.json").then((data) => {
        
        //assign a variable to data
        var importedData = data
        console.log(importedData)

        //use names to populate dropdown using forEach loop
        importedData.names.forEach(function(name){
            dropdownMenu
            .append("option")
            .text(name)
            .property("value");
        });

        //populate demographic info from metadata
        var li1 = d3.select("#sample-metadata").append("li").text("ID: " + importedData.metadata[0].id)
        var li2 = d3.select("#sample-metadata").append("li").text("Ethnicity: " + importedData.metadata[0].ethnicity)
        var li3 = d3.select("#sample-metadata").append("li").text("Gender: " + importedData.metadata[0].gender)
        var li4 = d3.select("#sample-metadata").append("li").text("Age: " + importedData.metadata[0].age)
        var li5 = d3.select("#sample-metadata").append("li").text("Location: " + importedData.metadata[0].location)
        var li6 = d3.select("#sample-metadata").append("li").text("Bbtype: " + importedData.metadata[0].bbtype)
        var li7 = d3.select("#sample-metadata").append("li").text("Wfreq: " + importedData.metadata[0].wfreq)

        //sample values
        var sampleValues = importedData.samples[0].sample_values.slice(0,10).reverse();
        var IDs = importedData.samples[0].otu_ids.slice(0,10).reverse();
        var otuIDs = IDs.map(d => "OTU " + d);
        var labels = importedData.samples[0].otu_labels.slice(0,10);

        console.log(sampleValues)
        console.log(IDs)

        //bar chart
        var trace = {
            x: sampleValues,
            y: otuIDs,
            text: labels,
            type: "bar",
            orientation: "h",

        };
        
        var data = [trace];

        var layout = {
            title: "OTU Data",
            xaxis: { title: "Sample Values"},
            yaxis: { title: "OTU IDs"},
            margin:{
                l: 100,
                r:100,
                t:100,
                b:30
            },
            bargap: .5
        };

        Plotly.newPlot('bar', data, layout);

        //bubble chart
        var trace2 = {
            x: importedData.samples[0].otu_ids,
            y: importedData.samples[0].sample_values,
            mode: "markers",
            marker:{
                size: importedData.samples[0].sample_values,
                color: importedData.samples[0].otu_ids,
            },
            text: importedData.samples[0].otu_labels
        };
        
        var data2 = [trace2];

        var layout2 = {
            title: "OTU Data",
            showlegend: false,
            height: 600,
            width: 1000
        };

        Plotly.newPlot("bubble", data2, layout2);
        
    });
}

d3.selectAll("#selDataset").on("change", optionChanged)


//drop down selection function
function optionChanged(newSample){

    d3.json("samples.json").then((data) => {
        var importedData = data; 

        var ddMenu = d3.select("#selDataset");
        var DataSelection = ddMenu.property("value");

        //for loop for data selection
        for(var i = 0; i < importedData.names.length; i++){
            if(DataSelection === importedData.names[i]){
                d3.select("#sample-metadata").selectAll("li")
                    .remove();
                //populate demographic info from metadata for selection made
                var li1 = d3.select("#sample-metadata").append("li").text("ID: " + importedData.metadata[i].id)
                var li2 = d3.select("#sample-metadata").append("li").text("Ethnicity: " + importedData.metadata[i].ethnicity)
                var li3 = d3.select("#sample-metadata").append("li").text("Gender: " + importedData.metadata[i].gender)
                var li4 = d3.select("#sample-metadata").append("li").text("Age: " + importedData.metadata[i].age)
                var li5 = d3.select("#sample-metadata").append("li").text("Location: " + importedData.metadata[i].location)
                var li6 = d3.select("#sample-metadata").append("li").text("Bbtype: " + importedData.metadata[i].bbtype)
                var li7 = d3.select("#sample-metadata").append("li").text("Wfreq: " + importedData.metadata[i].wfreq)

                //sample values for selection made
                var sampleValues = importedData.samples[i].sample_values.slice(0,10).reverse();
                var IDs = importedData.samples[i].otu_ids.slice(0,10).reverse();
                var otuIDs = IDs.map(d => "OTU " + d);
                var labels = importedData.samples[i].otu_labels.slice(0,10);

                console.log(sampleValues)
                console.log(IDs)

                //bar chart
                var trace = {
                    x: sampleValues,
                    y: otuIDs,
                    text: labels,
                    type: "bar",
                    orientation: "h",

                };
                
                var data = [trace];

                var layout = {
                    title: "OTU Data",
                    xaxis: { title: "Sample Values"},
                    yaxis: { title: "OTU IDs"},
                    margin:{
                        l: 100,
                        r:100,
                        t:100,
                        b:30
                    },
                    bargap: .5

                }

                Plotly.newPlot('bar', data, layout);

                //bubble chart
                var trace2 = {
                    x: importedData.samples[i].otu_ids,
                    y: importedData.samples[i].sample_values,
                    mode: "markers",
                    marker:{
                        size: importedData.samples[i].sample_values,
                        color: importedData.samples[i].otu_ids,
                    },
                    text: importedData.samples[i].otu_labels
                };
                
                var data2 = [trace2];
        
                var layout2 = {
                    title: "OTU Data",
                    showlegend: false,
                    height: 600,
                    width: 1000
                };
        
                Plotly.newPlot("bubble", data2, layout2);
            }
        }
    });
}

init();





