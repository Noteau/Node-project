const fs = require('fs');

const getOneChampionName = (id) => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync("./functions/liste_champion.json");  
        let Champs = JSON.parse(rawdata);
        for (champ in Champs.data) {
        	if (id["answer"] == Champs.data[champ]["id"]) {
        		console.log("Champion numéro : "+Champs.data[champ]["id"]+"\nNom : "+ Champs.data[champ]["name"]+"\nTitre : "+Champs.data[champ]["title"]+"\n")
        		return
        	}
        }
        console.log("Nous n'avons pas pu trouvé votre champion. Vous etes certains d'avoir entré le bon numéro ?")
    }
)};

module.exports = getOneChampionName