const fs = require('fs');


const getAllChampionsName = () => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync('./functions/liste_champion.json');  
        let Champs = JSON.parse(rawdata);  
        //console.log(Champs); 
        for (champ in Champs.data) {
            console.log("Champion numéro : "+Champs.data[champ]["id"]+"\nNom : "+ Champs.data[champ]["name"]+"\nTitre : "+Champs.data[champ]["title"]+"\n")
        }
    }
)};
    	/*console.log(json)
    	ta = JSON.stringify(json)
    	obj = JSON.parse(json)
    	a = obj.data
        console.log(obj)
        console.log(a)
    	var fuckyou= [];
    	for (var z in a){
    		fuckyou.push(z)
    	}
    	for (var jean in  fuckyou) {
    		var news = fuckyou[jean].title;
    		console.log(news)
    	}*/
    
          


module.exports = getAllChampionsName