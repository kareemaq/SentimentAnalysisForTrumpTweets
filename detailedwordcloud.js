// read the file
d3.csv("perfectlocations.csv", function(data){
var poswords = "";
var negwords = "";
// check for neg and po words in the data
for (var i = 0, len = data.length; i < len; i++) 
{
	if(Number(data[i].polarity) < 0){
		negwords += JSON.stringify(data[i].text);;
	} if (Number(data[i].polarity) > 0){
		poswords += JSON.stringify(data[i].text);;
	}
}
// convert the text into words and remove stop words
poswords = text2wordmap(poswords);
negwords = text2wordmap(negwords);


//draw positive cloud
var fill = d3.scale.linear()
    .domain([0,10,20,30,50])
    .range(['#006d2c','#238b45','#41ae76','#66c2a4','#ccece6']);
var cloud = d3.layout.cloud;


var layout = cloud()
    .size([450, 450])
    .words(poswords.map(function(d) { return {text: d.key , size: +d.value};})
	.slice(0,500))
    .padding(0)
    .rotate(function() { return ~~(Math.random() * 1) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();
// DRAW THE WORD CLOUD
function draw(words) {
  d3.select("#WordCloud-pos").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}

//draw negative cloud
var filln = d3.scale.linear()
    .domain([0,10,20,30,50])
    .range(['#bd0026','#e31a1c','#fc4e2a','#fd8d3c','#fed976']);
var cloud = d3.layout.cloud;


var layout = cloud()
    .size([450, 450])
    .words(negwords.map(function(d) { return {text: d.key , size: +d.value};})
	.slice(0,300))
    .padding(0)
    .rotate(function() { return ~~(Math.random() * 1) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw1);

layout.start();
// DRAW THE WORD CLOUD
function draw1(words) {
  d3.select("#WordCloud-neg").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return filln(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}
});

