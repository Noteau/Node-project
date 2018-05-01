const fs = require('fs');

const getAllSummonerName = () => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync('./functions/liste_summoner_spell.json');  
        let Summoner_spells = JSON.parse(rawdata);
      	console.log("Pour la version "+Summoner_spells.version+" de League of Legends les sorts d'invocateurs sont :\n")
        for (summoner_spell in Summoner_spells.data) {
            console.log("Nom du sort d'invocateur : "+ Summoner_spells.data[summoner_spell]["name"]+"\nCe sort est débloqué au niveau "+Summoner_spells.data[summoner_spell]["summonerLevel"]+"\nNuméro du sort d'invocateur : "+Summoner_spells.data[summoner_spell]["id"]+"\nDescription : "+Summoner_spells.data[summoner_spell]["description"]+"\n")
        }
    }
)};

module.exports = getAllSummonerName