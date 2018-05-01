const fs = require('fs');

const getOneSumonerName = (id) => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync("./functions/liste_summoner_spell.json");  
        let Summoner_spells = JSON.parse(rawdata);
        for (summoner_spell in Summoner_spells.data) {
        	if (id["answer"] == Summoner_spells.data[summoner_spell]["id"]) {
        		console.log("Nom du sort d'invocateur : "+ Summoner_spells.data[summoner_spell]["name"]+"\nCe sort est débloqué au niveau "+Summoner_spells.data[summoner_spell]["summonerLevel"]+"\nNuméro du sort d'invocateur : "+Summoner_spells.data[summoner_spell]["id"]+"\nDescription : "+Summoner_spells.data[summoner_spell]["description"]+"\n")
        		return
        	}
        }
        console.log("Nous n'avons pas pu trouvé votre sort d'invocateur. Vous etes certains d'avoir entré le bon numéro ?")
    }
)};

module.exports = getOneSumonerName