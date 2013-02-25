var sp = getSpotifyApi();
        var models = sp.require('$api/models');

        var playlist_url = 'http://open.spotify.com/user/jkeck99/playlist/21iMSq0jzTie7m7v4UcMlV';
        var playlistHTML = document.getElementById('playlist');
       var pl = models.Playlist.fromURI(playlist_url, function(playlist) {
            var fragment = document.createDocumentFragment();
            for (var i = 0, l = playlist.tracks.length; i < l; i++){
                var link = document.createElement('li');
                var a = document.createElement('a');
                a.href = playlist.tracks[i].uri;
                a.innerHTML = playlist.tracks[i].name;
                link.appendChild(a);
                fragment.appendChild(link);
            }
            playlistHTML.appendChild(fragment);
        });