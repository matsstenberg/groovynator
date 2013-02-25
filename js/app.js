var api_key = ''
var keys = [
	'C',
	'D♭',
	'D',
	'E♭',
	'E',
	'F',
	'G♭',
	'G',
	'A♭',
	'A',
	'B♭',
	'B'
]
var trackList;
var trackInfo;
var playlist;
var makePopup;

function FetchTrackInfo(index, track, callback) {
	var data = {
		'api_key' : api_key,
		'track_id' : track.replace('spotify', 'spotify-WW'),
		'bucket' : 'audio_summary'
	}
	try{
		$.get(' http://developer.echonest.com/api/v4/song/profile?', data, function(response) {
			if(response.response.status.code == 0){
				if (callback && typeof(callback) === "function")
					callback(response.response.status.code, response.response.songs[0].audio_summary, track);
				//getTempo(trackInfo);
				trackInfo[index] = response.response.songs[0].audio_summary;
			}
			else if(response.response.status.code != 5){
				console.log('Retrying FetchTrackInfo in 100ms for', track);
				window.setTimeout(function(){
					FetchTrackInfo(index, track, callback);
				},100);
			}
			else{
				if (callback && typeof(callback) === "function")
					callback(response.response.status.code, null, track);
				trackInfo[index] = response.response.status.code;
			}
		});
	}
	catch(err){
		console.log('FetchTrackInfo failed:', err)
		return 0
	}
}

require(['$api/models', '$views/list#List', '$views/popup#Popup'], function(models, List, Popup) {


	// Creating Setlist view
	//SetlistFromURI('spotify:user:lindstrom_official:playlist:6GqaLK88iH6XliGziOijCS');
	function SetlistFromURI(uri){
		trackList = new Array();
		trackInfo = new Array(); 
		models.Playlist.fromURI(uri)
			.load(['name','tracks'])
			.done(function(pl){
				playlist = pl;
				var list = List.forPlaylist(pl);
				pl.tracks.snapshot()
					.done(function(t){
						trackList = t.toArray();
						list.init();

						$('#setlist_tracklist').html('<h2>' + pl.name + '</h2>').append(list.node);
						$('.sp-list-heading.sp-list-cell-album').html('Tempo / Key');

						for (var i = 0; i < trackList.length; i++) {
							FetchTrackInfo(i, trackList[i].uri, function(status, info, trackUri) {
								var element = $('[data-uri="' + trackUri + '"]');
								if (status != 5){
									element.children('.sp-list-cell-album').html(Math.round(info.tempo) + ' / ' + keys[info.key]).css('text-overflow','clip');
								}
								else{
									element.children('.sp-list-cell-album').html('N/A').css('text-overflow','clip');
								}
							});
						}
					});
				});
		}

	makePopup = function(trigElement, element, text){
		var popup = Popup.withText(text);
		trigElement.addEventListener('mouseover',function(){
			popup.showFor(element);
		});
		trigElement.addEventListener('mouseout',function(){
			popup.hide();
		});
	}

    // Drag & Drop
    // TODO Jquery this
    var dropBox = document.querySelector('#drop-box');
    var success_message = document.createElement('p');

   $('#drop-box').append('<div id = "heading">'+'<br>'+
    '<h4>' + 'Drag a playlist into the box to get started' + '</h4>'+'</div>');

    dropBox.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.effectAllowed = 'copy';
    }, false);

    dropBox.addEventListener('dragenter', function(e){
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('over');
    }, false);

    dropBox.addEventListener('dragover', function(e){
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    dropBox.addEventListener('drop', function(e){

    	$("#heading").remove();    	
		
	    if (e.preventDefault) e.preventDefault();
        SetlistFromURI(e.dataTransfer.getData('text'));
        this.classList.remove('over');
        success_message.innerHTML = '<h4>'+'Playlist successfully dropped: '+e.dataTransfer.getData('text')+'</h4>';

         if(typeof thisuritxt == 'p'){
        	this.replaceChild(success_message);
        	thisuritxt = this.appendChild(success_message);

        }
        var thisuritxt = this.appendChild(success_message);
      
    }, false);
});
