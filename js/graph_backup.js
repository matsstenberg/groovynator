/*global element,tempo*/
var element;
//element = $("#graph_test");
//var paper = new Raphael(element,"100%","100%");  
var tempo = new Array();
exports.getTempo = function (trackInfo) {
	//try {
	"use strict";
	var j = 0;
	console.log("Grapheen tempo");
	for (var i = 0; i < trackInfo.length; i++) {
		tempo[i] = trackInfo[i].tempo;
		if(!isNaN(tempo[i])){
				tempo[i] = Math.round( tempo[i] );
				//console.log(tempo[i]);

			}
		else{
			j = i-1;
			tempo[i]=tempo[j];
			j = 0;
		}	
		console.log(tempo[i]);
	}

		//ritadata();
		return true;
	}
	/*catch(err){
		console.log("Den gubben gick inte");
	return false;
	}*/
//}


function ritadata(){

	//function getDatatoData(){
	//	}

	var multi_axis = new Charts.LineChart('graph_test', {
  show_grid: false,
 // show_y_labels: false,
  show_x_labels: false,
  label_max: false,
  label_min: false,
  multi_axis: true,
  max_y_labels: 8,
  x_padding: 45 
});

multi_axis.add_line({
	//var n = 0;
	//for(k = 0;k<tempo.length;k++){
		//	data:[[k,tempo[n]]],
  data: [[1, [121],[2, [120],[3,130]],
//data: [[1, 120],[2, 123],[3,130]],
	//		}
  options: {
    line_color: "#00aadd",
    dot_color: "#00aadd",  	 
    area_color: "230-#88c9dd-rgba(255,255,255,0)",
    area_opacity: 0.2,
    dot_size: 5,
    line_width: 4 
  		}
	});
multi_axis.draw()

//}