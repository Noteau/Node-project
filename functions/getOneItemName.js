const fs = require('fs');

const getOneItemName = (id) => {
    return new Promise(function(resolve, reject) {
        data=[]
        let rawdata = fs.readFileSync("./functions/liste_items.json");  
        let Items = JSON.parse(rawdata);
        for (item in Items.data) {
        	if (id["answer"] == Items.data[item]["id"]) {
                data.push(Items.data[item]["id"])
                data.push(Items.data[item]["name"])
                data.push(Items.data[item]["plaintext"])
        	}
        }
        if (data.length >0) {
            resolve(data)
        }
        else{
            reject("Nous n'avons pas pu trouvé votre items. Vous etes certains d'avoir entré le bon numéro ?")
        }
    }
)};

module.exports = getOneItemName