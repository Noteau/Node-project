var fs = require("fs")
var json = require("./graa.json")

const getAllChampionsName = () => {
    return new Promise(resolve => {
    	//console.log(json)
    	ta = JSON.stringify(json)
    	obj = JSON.parse(ta)
    	a = obj.data
    	var fuckyou= [];
    	for (var z in a){
    		fuckyou.push(z)
    	}
    	for (var jean in  fuckyou) {
    		var news = fuckyou[jean].title;
    		console.log(news)
    	}
  });
}

module.exports = getAllChampionsName