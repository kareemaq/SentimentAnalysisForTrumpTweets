// read the map data
d3.csv('maptestv2.csv', function(error, data) {
	
var dataset = {};

var paletteScale = d3.scale.linear()
            .domain([-3,-2,-1,0,1,2,3])
            .range(["#cf270e","#cf270e","#f57a68","#ffeda0","#66ff66","#33cc33","#009933"]);
			
// loop thorgh all the data to initialize a variable to fit DataMap format.
    for (var i = 0, len = data.length; i < len; i++){
		
		var iso = data[i].codes;
        var value = Number(data[i].polarity);
		var tweets = data[i].tweets
        dataset[iso] = { polarity: value.toFixed(2), fillColor: paletteScale(value), numberOfTweets: tweets};
    };
// Create a datamap Object
	 var datamap = new Datamap({
        element: document.getElementById('map'),
        projection: 'equirectangular', // map projection
        // countries colors depending on polarities
        fills: {
		"3": "#009933",
        "2": "#33cc33",
        "1": "#66ff66",
        "0": "#ffeda0",
        "-1": "#f57a68",
        "-2": "#f03b20",
		"-3": "#cf270e",
		"tweets": "#1f77b4",
		defaultFill: '#F5F5F5' },
        data: dataset,
        geographyConfig: {
            borderColor: '#DEDEDE',
            highlightBorderWidth: 3,
            // don't change color on mouse hover
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
            // only change border colour
            highlightBorderColor: '#B7B7B7',
            // show desired information in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if country is not present in dataset
                if (!data) { return ; }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Polarity: <strong>', data.polarity, '</strong>',
					'<br>#Tweets: <strong>', data.numberOfTweets, '</strong>',
                    '</div>'].join('');
            }
			
        }

    });

		// the map legend content
	datamap.legend({
		legendTitle: 'Polarity',
		lables:{
		"3": "3",
        "2": "2",
        "1": "1",
        "0": "0",
        "-1": "1",
        "-2": "2",
		"-3": "3"
		}
		});
		// create a buble object to represent the tweets
		var bubble = [];
		// loop through the data to initialize an object to fit DataMap format for Bubles
		for(var i = 0, len = data.length; i < len; i++)  {
		bubble.push({name: data[i].cname, tweets: data[i].tweets, radius: data[i].tweets/45, 
		latitude: data[i].lat, longitude: data[i].long, fillKey: 'tweets', polarity: Number(data[i].polarity).toFixed(2)});
		}
		// add the bubbles to the map and with the tooltip content
		datamap.bubbles(bubble,{
			popupTemplate: function (geo, data) { 
            return ['<div class="hoverinfo">' +  '<strong>' + data.name, '</strong>',
            '<br/>Polarity: ' +  '<strong>' + data.polarity , '</strong>', '',
			'<br/>#Tweets: ' +  '<strong>' + data.tweets , '</strong>', '',
            '</div>'].join('');
			
    }
});
		
		});
		
		
		
		