// page Loading 
swal({
	title: " Loading",
	text: "Please wait",
	timer: 4000,
	showConfirmButton: false,
	imageUrl: "Twitter_Logo_Blue.png"
	});
	

var myVar;
function myFunction() {
    myVar = setTimeout(showPage, 0);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myPage").style.display = "block";
}


// READ THE DATA 
d3.csv("perfectlocations.csv", function(data){

var mywords = "";
var pos = 0;
var neg = 0;
var tneu = 0
// calculate all pos neg and neutral tweets
for (var i = 0, len = data.length; i < len; i++) 
{
	if(Number(data[i].polarity) < 0){
		neg ++;
	} else if (Number(data[i].polarity) > 0){
		pos ++;
	} else {
		tneu ++;
	}
}
neg = neg/data.length * 100;
tneu = tneu/data.length * 100;
pos = pos/data.length * 100;
pos = pos.toFixed(2);
tneu = tneu.toFixed(2);
neg = neg.toFixed(2);
// fill in the summary statistics in the page
document.getElementById("tpos").innerHTML=" Positive " + pos + " %";
document.getElementById("tneu").innerHTML=" Neutral " + tneu + " %";
document.getElementById("tneg").innerHTML=" Negative " + neg + " %";

// put all the words in a lagre string
for (var i = 0, len = data.length; i < len; i++) 
{
	mywords += JSON.stringify(data[i].text);
}
// convert the text into words and remove stop words
mywords = text2wordmap(mywords);
// only words with frequency more than 50
mywords.filter(function(d) {return d.value > 50;})

// create cloud content
var fill = d3.scale.category20();
var cloud = d3.layout.cloud;

var fill = d3.scale.category20();

var layout = cloud()
    .size([800, 500])
    .words(mywords.map(function(d) { return {text: d.key , size: +d.value};})
	.slice(0,3000))
    .padding(1)
    .rotate(function() { return ~~(Math.random() * 1) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();
// DRAW THE WORD CLOUD
function draw(words) {
  d3.select("#WordCloud").append("svg")
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

//full word cloud end.

});
//FUNCTION to cut a string into indivisual words and count the frequency after removing stop words
//Source: https://pastebin.com/yH8cXk5N
text2wordmap = function(){ 
	var stopWords = /^(i|me|⚡️|un|-|rt|_|à|—|y|trump|via|la|Trump's|donald|Donald|my|\r|Trump|""|RT|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|a|able|about|above|abst|accordance|according|accordingly|across|act|actually|added|adj|affected|affecting|affects|after|afterwards|again|against|ah|all|almost|alone|along|already|also|although|always|am|among|amongst|an|and|announce|another|any|anybody|anyhow|anymore|anyone|anything|anyway|anyways|anywhere|apparently|approximately|are|aren|arent|arise|around|as|aside|ask|asking|at|auth|available|away|awfully|b|back|be|became|because|become|becomes|becoming|been|before|beforehand|begin|beginning|beginnings|begins|behind|being|believe|below|beside|besides|between|beyond|biol|both|brief|briefly|but|by|c|ca|came|can|cannot|can't|cause|causes|certain|certainly|co|com|come|comes|contain|containing|contains|could|couldnt|d|date|did|didn't|different|do|does|doesn't|doing|done|don't|down|downwards|due|during|e|each|ed|edu|effect|eg|eight|eighty|either|else|elsewhere|end|ending|enough|especially|et|et-al|etc|even|ever|every|everybody|everyone|everything|everywhere|ex|except|f|far|few|ff|fifth|first|five|fix|followed|following|follows|for|former|formerly|forth|found|four|from|further|furthermore|g|gave|get|gets|getting|give|given|gives|giving|go|goes|gone|got|gotten|h|had|happens|hardly|has|hasn't|have|haven't|having|he|hed|hence|her|here|hereafter|hereby|herein|heres|hereupon|hers|herself|hes|hi|hid|him|himself|his|hither|home|how|howbeit|however|hundred|i|id|ie|if|i'll|im|immediate|immediately|importance|important|in|inc|indeed|index|information|instead|into|invention|inward|is|isn't|it|itd|it'll|its|itself|i've|j|just|k|keep|keeps|kept|kg|km|know|known|knows|l|largely|last|lately|later|latter|latterly|least|less|lest|let|lets|like|liked|likely|line|little|'ll|look|looking|looks|ltd|m|made|mainly|make|makes|many|may|maybe|me|mean|means|meantime|meanwhile|merely|mg|might|million|miss|ml|more|moreover|most|mostly|mr|mrs|much|mug|must|my|myself|n|na|name|namely|nay|nd|near|nearly|necessarily|necessary|need|needs|neither|never|nevertheless|new|next|nine|ninety|no|nobody|non|none|nonetheless|noone|nor|normally|nos|not|noted|nothing|now|nowhere|o|obtain|obtained|obviously|of|off|often|oh|ok|okay|old|omitted|on|once|one|ones|only|onto|or|ord|other|others|otherwise|ought|our|ours|ourselves|out|outside|over|overall|owing|own|p|page|pages|part|particular|particularly|past|per|perhaps|placed|please|plus|poorly|possible|possibly|potentially|pp|predominantly|present|previously|primarily|probably|promptly|proud|provides|put|q|que|quickly|quite|qv|r|ran|rather|rd|re|readily|really|recent|recently|ref|refs|regarding|regardless|regards|related|relatively|research|respectively|resulted|resulting|results|right|run|s|said|same|saw|say|saying|says|sec|section|see|seeing|seem|seemed|seeming|seems|seen|self|selves|sent|seven|several|shall|she|shed|she'll|shes|should|shouldn't|show|showed|shown|showns|shows|significant|significantly|similar|similarly|since|six|slightly|so|some|somebody|somehow|someone|somethan|something|sometime|sometimes|somewhat|somewhere|soon|sorry|specifically|specified|specify|specifying|still|stop|strongly|sub|substantially|successfully|such|sufficiently|suggest|sup|sure|t|take|taken|taking|tell|tends|th|than|thank|thanks|thanx|that|that'll|thats|that've|the|their|theirs|them|themselves|then|thence|there|thereafter|thereby|thered|therefore|therein|there'll|thereof|therere|theres|thereto|thereupon|there've|these|they|theyd|they'll|theyre|they've|think|this|those|thou|though|thoughh|thousand|throug|through|throughout|thru|thus|til|tip|to|together|too|took|toward|towards|tried|tries|truly|try|trying|ts|twice|two|u|un|under|unfortunately|unless|unlike|unlikely|until|unto|up|upon|ups|us|use|used|useful|usefully|usefulness|uses|using|usually|v|value|various|'ve|very|via|viz|vol|vols|vs|w|want|wants|was|wasnt|way|we|wed|welcome|we'll|went|were|werent|we've|what|whatever|what'll|whats|when|whence|whenever|where|whereafter|whereas|whereby|wherein|wheres|whereupon|wherever|whether|which|while|whim|whither|who|whod|whoever|whole|who'll|whom|whomever|whos|whose|why|widely|willing|wish|with|within|without|wont|words|world|would|wouldnt|www|x|y|yes|yet|you|youd|you'll|your|youre|yours|yourself|yourselves|you've|z|zero|per|aan|af|al|als|bij|dan|dat|die|dit|een|en|er|had|heb|hem|het|hij|hoe|hun|ik|in|is|je|kan|me|men|met|mij|nog|nu|of|ons|ook|te|tot|uit|van|was|wat|we|wel|wij|zal|ze|zei|zij|zo|zou|alors|au|aucuns|aussi|autre|avant|avec|avoir|bon|car|ce|cela|ces|ceux|chaque|ci|comme|comment|dans|des|du|dedans|dehors|depuis|devrait|doit|donc|dos|début|elle|elles|en|encore|essai|est|et|eu|fait|faites|fois|font|hors|ici|il|ils|je|juste|la|le|les|leur|là|ma|maintenant|mais|mes|mine|moins|mon|mot|même|ni|nommés|notre|nous|ou|où|par|parce|pas|peut|peu|plupart|pour|pourquoi|quand|que|quel|quelle|quelles|quels|qui|sa|sans|ses|seulement|si|sien|son|sont|sous|soyez|sujet|sur|ta|tandis|tellement|tels|tes|ton|tous|tout|trop|très|tu|voient|vont|votre|vous|vu|ça|étaient|état|étions|été|être||aber|als|am|an|auch|auf|aus|bei|bin|bis|bist|da|dadurch|daher|darum|das|daß|dass|dein|deine|dem|den|der|des|dessen|deshalb|die|dies|dieser|dieses|doch|dort|du|durch|ein|eine|einem|einen|einer|eines|er|es|euer|eure|für|hatte|hatten|hattest|hattet|hier|hinter|ich|ihr|ihre|im|in|ist|ja|jede|jedem|jeden|jeder|jedes|jener|jenes|jetzt|kann|kannst|können|könnt|machen|mein|meine|mit|muß|mußt|musst|müssen|müßt|nach|nachdem|nein|nicht|nun|oder|seid|sein|seine|sich|sie|sind|soll|sollen|sollst|sollt|sonst|soweit|sowie|und|unser|unsere|unter|vom|von|vor|wann|warum|was|weiter|weitere|wenn|wer|werde|werden|werdet|weshalb|wie|wieder|wieso|wir|wird|wirst|wo|woher|wohin|zu|zum|zur|über|último|é|acerca|agora|algmas|alguns|ali|ambos|antes|apontar|aquela|aquelas|aquele|aqueles|aqui|atrás|bem|bom|cada|caminho|cima|com|como|comprido|conhecido|corrente|das|debaixo|dentro|desde|desligado|deve|devem|deverá|direita|diz|dizer|dois|dos|e|ela|ele|eles|em|enquanto|então|está|estão|estado|estar|estará|este|estes|esteve|estive|estivemos|estiveram|eu|fará|faz|fazer|fazia|fez|fim|foi|fora|horas|iniciar|inicio|ir|irá|ista|iste|isto|ligado|maioria|maiorias|mais|mas|mesmo|meu|muito|muitos|nós|não|nome|nosso|novo|o|onde|os|ou|outro|para|parte|pegar|pelo|pessoas|pode|poderá|podia|por|porque|povo|promeiro|quê|qual|qualquer|quando|quem|quieto|são|saber|sem|ser|seu|somente|têm|tal|também|tem|tempo|tenho|tentar|tentaram|tente|tentei|teu|teve|tipo|tive|todos|trabalhar|trabalho|tu|um|uma|umas|uns|usa|usar|valor|veja|ver|verdade|verdadeiro|você|los|un|una|unas|unos|uno|sobre|todo|también|tras|otro|algún|alguno|alguna|algunos|algunas|ser|es|soy|eres|somos|sois|estoy|esta|estamos|estais|estan|como|en|para|atras|porque|por qué|estado|estaba|ante|antes|siendo|ambos|pero|por|poder|puede|puedo|podemos|podeis|pueden|fui|fue|fuimos|fueron|hacer|hago|hace|hacemos|haceis|hacen|cada|fin|incluso|primero|desde|conseguir|consigo|consigue|consigues|conseguimos|consiguen|ir|voy|va|vamos|vais|van|vaya|gueno|ha|tener|tengo|tiene|tenemos|teneis|tienen|el|la|lo|las|los|su|aqui|mio|tuyo|ellos|ellas|nos|nosotros|vosotros|vosotras|si|dentro|solo|solamente|saber|sabes|sabe|sabemos|sabeis|saben|ultimo|largo|bastante|haces|muchos|aquellos|aquellas|sus|entonces|tiempo|verdad|verdadero|verdadera|cierto|ciertos|cierta|ciertas|intentar|intento|intenta|intentas|intentamos|intentais|intentan|dos|bajo|arriba|encima|usar|uso|usas|usa|usamos|usais|usan|emplear|empleo|empleas|emplean|ampleamos|empleais|valor|muy|era|eras|eramos|eran|modo|bien|cual|cuando|donde|mientras|quien|con|entre|sin|trabajo|trabajar|trabajas|trabaja|trabajamos|trabajais|trabajan|podria|podrias|podriamos|podrian|podriais|yo|aquel|se|di|ya|$|247|#|–|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100|101|102|103|104|105|106|107|108|109|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125|126|127|128|129|130|131|132|133|134|135|136|137|138|139|140|141|142|143|144|145|146|147|148|149|150|151|152|153|154|155|156|157|158|159|160|161|162|163|164|165|166|167|168|169|170|171|172|173)$/

	var punctuation = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g
	var wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g
	var discard = /^(@|https?:)/
	var maxLength = 30


	function entries(map) {
	  var entries = [];
	  for (var key in map) entries.push({
	    key: key,
	    value: map[key]
	  });
	  return entries;
	}; 

	function parser(text) {
	  var tags = {};
	  var cases = {};
	  text.split(wordSeparators).forEach(function(word) {
	    if (discard.test(word)) return;
	    word = word.replace(punctuation, "");
	    if (stopWords.test(word.toLowerCase())) return;
	    word = word.substr(0, maxLength);
	    cases[word.toLowerCase()] = word;
	    tags[word = word.toLowerCase()] = (tags[word] || 0) + 1;
	  });
	  tags = entries(tags).sort(function(a, b) { return b.value - a.value; });
	  tags.forEach(function(d) { d.key = cases[d.key]; });
	  return tags;
	}

	return parser;
}();

