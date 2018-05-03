const fs = require('fs');
var save;

const getAllChampionsName = () => {
    return new Promise(function(resolve, reject){
    	all_data=[]
    	one_data=[]
        let rawdata = fs.readFileSync('./functions/liste_champion.json');  
        let Champs = JSON.parse(rawdata);
        for (champ in Champs.data) {
        	one_data.push(Champs.data[champ]["id"])
            one_data.push(Champs.data[champ]["name"])
            one_data.push(Champs.data[champ]["title"])
            all_data.push(one_data)
            one_data=[]
        }
        if (all_data.length >0) {
            resolve(all_data)
        }
        else{
            reject("Nous n'avons pas pu trouvé vos champions. Une erreur est survenue.")
        }
    }
)};

module.exports = getAllChampionsName