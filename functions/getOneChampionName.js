const fs = require('fs');

const getOneChampionName = (id) => {
    data=[]
    return new Promise(function(resolve, reject) {
        let rawdata = fs.readFileSync("./functions/liste_champion.json");  
        let Champs = JSON.parse(rawdata);
        for (champ in Champs.data) {
        	if (id["answer"] == Champs.data[champ]["id"]) {
        		data.push(Champs.data[champ]["id"])
                data.push(Champs.data[champ]["name"])
                data.push(Champs.data[champ]["title"])
        	}
        }
        if (data.length >0) {
            resolve(data)
        }
        else{
            reject("Nous n'avons pas pu trouvé votre champion. Vous etes certains d'avoir entré le bon numéro ?")
        }
    }
)};

module.exports = getOneChampionName