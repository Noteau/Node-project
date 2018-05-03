const fs = require('fs');
var save;

const getAllChampionsName = () => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync('./functions/liste_champion.json');  
        let Champs = JSON.parse(rawdata);
        for (champ in Champs.data) {
            save = save + "Champion numéro : "+Champs.data[champ]["id"]+"\nNom : "+ Champs.data[champ]["name"]+"\nTitre : "+Champs.data[champ]["title"]+"\n"
            console.log("Champion numéro : "+Champs.data[champ]["id"]+"\nNom : "+ Champs.data[champ]["name"]+"\nTitre : "+Champs.data[champ]["title"]+"\n")
        }
    }
)};

module.exports = getAllChampionsName