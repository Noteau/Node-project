const fs = require('fs');

const getOneItemName = (id) => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync("./functions/liste_items.json");  
        let Items = JSON.parse(rawdata);
        for (item in Items.data) {
        	if (id["answer"] == Items.data[item]["id"]) {
        		console.log("\nNom : "+ Items.data[item]["name"]+"\nNuméro de l'objet : "+Items.data[item]["id"]+"\nUtilité : "+Items.data[item]["plaintext"]+"\nDescription : "+Items.data[item]["description"]+"\n")
        		return
        	}
        }
        console.log("Nous n'avons pas pu trouvé votre item. Vous etes certains d'avoir entré le bon numéro ?")
    }
)};

module.exports = getOneItemName