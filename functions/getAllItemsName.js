const fs = require('fs');

const getAllItemsName = () => {
    return new Promise(resolve => {
        let rawdata = fs.readFileSync('./functions/liste_items.json');  
        let items = JSON.parse(rawdata);
        for (item in items.data) {
            console.log("\nNom : "+ items.data[item]["name"]+"\nNuméro de l'objet : "+items.data[item]["id"]+"\nUtilité : "+items.data[item]["plaintext"]+"\nDescription : "+items.data[item]["description"]+"\n")
        }
    }
)};

module.exports = getAllItemsName