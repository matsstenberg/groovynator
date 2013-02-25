var paper;
var trackCircles;
var trackGridCircles;
function renderKeyTab() {
	if (typeof(paper) == 'object')
		paper.remove();
	var size = 256,
		numDots = 12,
		offset = 35
	paper = new Raphael('key_graph', size*3, size*3);

	// Drawing background
	for (var i = 0; i < numDots; i++) {
		var lineColour = Raphael.hsl((i/numDots),0.5,0.5);
		paper.path(
				'M' + ((offset*2)+size) + ',' + ((offset*2)+size) + 
				'l' + ((size+offset)*Math.cos(i*(Math.PI/(numDots/2))-(Math.PI*0.5))) + ',' + ((size+offset)*Math.sin(i*(Math.PI/(numDots/2))-(Math.PI*0.5))))
			.attr({
				'stroke-opacity': 0.2,
				'stroke-width': 30,
				'stroke-linecap': 'round',
				'stroke' : lineColour
			});
		var labels = paper.text(
			(offset*2)+size+(size+offset)*Math.cos(i*(Math.PI/(numDots/2))-(Math.PI*0.5)),
			(offset*2)+size+(size+offset)*Math.sin(i*(Math.PI/(numDots/2))-(Math.PI*0.5)),
			keys[(i*7)%12]);
		$('tspan', labels.node).attr('dy', 0);
	}
	// Drawing key-graph
	if (typeof(trackList) != 'undefined'){
		trackCircles = new Array();
		trackGridCircles = new Array();
		for (var i = trackList.length - 1; i >= 0; i--) {
			trackGridCircles[i] = paper.circle(
				(offset*2)+size,
				(offset*2)+size,
				size*((i+1)/trackList.length))
				.attr({
					'stroke-opacity': 1.2-(i/trackList.length)*(i/trackList.length),
					'stroke-width': Math.min(2+(size/trackList.length)/4, 15)
				});
		}

		for (var i = trackList.length - 1; i >= 0; i--) {
			if(trackInfo[i] != undefined){
				dotColour = Raphael.hsl(((((trackInfo[i].key*7)%12)/12))%1,0.4,0.8);
				strokeColour = Raphael.hsl(((((trackInfo[i].key*7)%12)/12))%1,0.7,0.3);
				if(typeof(trackInfo[i].key) != 'undefined'){
					trackCircles[i] = paper.circle(
						(offset*2)+size+size*((i+1)/trackList.length)*Math.cos(((trackInfo[i].key*7)%12)*(Math.PI/(numDots/2))-(Math.PI*0.5)),
						(offset*2)+size+size*((i+1)/trackList.length)*Math.sin(((trackInfo[i].key*7)%12)*(Math.PI/(numDots/2))-(Math.PI*0.5)),
						Math.min(2+(size/trackList.length)/4, 15))
						.attr({
							'fill': dotColour,
							'stroke': strokeColour
							});
					makePopup(trackCircles[i].node, trackCircles[i].node, keys[trackInfo[i].key]);
					makePopup(trackGridCircles[i].node, trackCircles[i].node, trackList[i].artists[0].name + ' - ' + trackList[i].name); //Add popup place
					trackGridCircles[i]
						.attr({
							'stroke': dotColour
						});
				}
				else{
					makePopup(trackGridCircles[i].node, trackGridCircles[i].node, trackList[i].artists[0].name + ' - ' + trackList[i].name); // Popup placeee
					trackGridCircles[i].attr({
						'stroke-width': 2,
						'stroke-opacity': 0.5-(i/(trackList.length*2)),
						'stroke': '#000'});
				}
			}
		}

	}
};