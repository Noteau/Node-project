const fs = require('fs');

const getAllSummonerName = () => {
    return new Promise(function(resolve, reject) {
    	all_data=[]
    	one_data=[]
        let rawdata = fs.readFileSync('./functions/liste_summoner_spell.json');  
        let Summoner_spells = JSON.parse(rawdata);
        all_data.push(Summoner_spells.version)
        for (summoner_spell in Summoner_spells.data) {
        	one_data.push(Summoner_spells.data[summoner_spell]["name"])
        	one_data.push(Summoner_spells.data[summoner_spell]["summonerLevel"])
        	one_data.push(Summoner_spells.data[summoner_spell]["id"])
        	one_data.push(Summoner_spells.data[summoner_spell]["description"])
        	all_data.push(one_data)
        	one_data=[]
        }
        if (all_data.length >0) {
            resolve(all_data)
        }
        else{
        	reject("Nous n'avons pas pu trouvé vos sorts d'invocateur. Une erreur est survenue.")
       	}
    }
)};

module.exports = getAllSummonerName