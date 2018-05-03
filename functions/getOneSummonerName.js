const fs = require('fs');

const getOneSumonerName = (id) => {
    return new Promise(function(resolve, reject) {
        data=[]
        let rawdata = fs.readFileSync("./functions/liste_summoner_spell.json");  
        let Summoner_spells = JSON.parse(rawdata);
        for (summoner_spell in Summoner_spells.data) {
        	if (id["answer"] == Summoner_spells.data[summoner_spell]["id"]) {
                data.push(Summoner_spells.data[summoner_spell]["name"])
                data.push(Summoner_spells.data[summoner_spell]["summonerLevel"])
                data.push(Summoner_spells.data[summoner_spell]["id"])
                data.push(Summoner_spells.data[summoner_spell]["description"])
        	}
        }
        if (data.length >0) {
            resolve(data)
        }
        else{
            reject("Nous n'avons pas pu trouvé votre sort d'invocateur. Vous etes certains d'avoir entré le bon numéro ?")
        }
    }
)};

module.exports = getOneSumonerName