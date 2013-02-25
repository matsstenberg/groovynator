function wrapTempo(tempo) {
	if(tempo > 180){
		tempo/= 2;
		return wrapTempo(tempo);
	}
	else if(tempo < 45){
		tempo *= 2;
		return wrapTempo(tempo);
	}
	else
		return tempo
}


function renderTempoTab() {
	if (typeof(papper) == 'object'){
		papper.remove();
	}
	var tempoCircles = new Array();
	var energyCircles = new Array();
	var danceabilityCircles = new Array();
	var offsetY = 120;
	var offsetX = 40;
	var size = 900;
	papper = new Raphael('tempo_graph', size*1.2, size);

	papper.text(15,10,'BPM');
	for (var i = 45; i <= 180; i+= 15) {
		papper.path('M40,' + (offsetY+(640-(i*4))) + 'l860,0');
		papper.text(15,(4+offsetY+(640-(i*4)))/2,i);
	};

	if (typeof(trackList) != 'undefined'){
		// Draw line
		var lineString = '';
		for (var i = 0; i < trackList.length; i++) {
			if (typeof(trackInfo[i]) == 'object'){
				tempo = wrapTempo(trackInfo[i].tempo);
				lineString += ((lineString=='')?'M':'L') + (offsetX + (i/trackList.length)*size) + ',' + (offsetY+(640-(tempo*4)));
			}
		}
		papper.path(lineString)
			.attr({
				'stroke-width': 5,
				'opacity': 0.2
			});

		// Draw dots
		for (var i = 0; i < trackList.length; i++) {
			if (typeof(trackInfo[i]) == 'object'){
				tempo = wrapTempo(trackInfo[i].tempo);
				danceabilityCircles[i] = papper.circle(
					offsetX + (i/trackList.length)*size,
					offsetY + (640-(tempo*4)),
					5+(15*trackInfo[i].energy)+15*trackInfo[i].danceability
					)
				.attr({
					'fill': '#393',
					'opacity': 0.5,
					'stroke-width': 0
				});	
				energyCircles[i] = papper.circle(
					offsetX + (i/trackList.length)*size,
					offsetY+(640-(tempo*4)),
					5+(15*trackInfo[i].energy)
					)
				.attr({
					'fill': '#F00',
					'opacity': 0.5,
					'stroke-width': 0
				});	
				tempoCircles[i] = papper.circle(
					offsetX + (i/trackList.length)*size,
					offsetY +(640-(tempo*4)),
					5
					)
				.attr({
					'fill': Raphael.hsl(((((trackInfo[i].key*7)%12)/12))%1,0.7,0.7),
					'stroke': Raphael.hsl(((((trackInfo[i].key*7)%12)/12))%1,0.7,0.3),
					'stroke-width': 2
				});
				makePopup(tempoCircles[i].node, tempoCircles[i].node, trackList[i].name + ': ' + Math.round(tempo) + 'bpm');
				makePopup(energyCircles[i].node, tempoCircles[i].node, 'Energy: ' + Math.round(trackInfo[i].energy*100) + '%');
				makePopup(danceabilityCircles[i].node, tempoCircles[i].node, 'Danceability: ' + Math.round(trackInfo[i].danceability*100) + '%');
			}
		}
		// Draw missing dots
		for (var i = 0; i < trackList.length; i++) {
			var prevTempo, nextTempo;
			if (typeof(trackInfo[i]) != 'object'){
				for(ii = i; ii>=0; ii--){
					if (typeof(trackInfo[ii]) == 'object'){
						prevTempo = trackInfo[ii].tempo;
						break;
					}
				}
				for(ii = i; ii<trackList.length; ii++){
					if (typeof(trackInfo[ii]) == 'object'){
						nextTempo = trackInfo[ii].tempo;
						break;
					}
				}
				if (typeof(prevTempo) == 'undefined'){
					tempo = 120;
				}
				else if(typeof(nextTempo == 'undefined')){
					tempo = prevTempo;
				}
				else {
					tempo = (prevTempo+nextTempo)/2;
				}
				tempoCircles[i] = papper.circle(
					offsetX + (i/trackList.length)*size,
					offsetY +(640-(tempo*4)),
					5
					)
				.attr({
					'fill': '#777',
					'stroke': '#333',
					'stroke-width': 2
				});
			makePopup(tempoCircles[i].node, tempoCircles[i].node, trackList[i].name + ': ? bpm');
			}
		}
	}
}