const fs = require('fs');

const getAllItemsName = () => {
    return new Promise(function(resolve, reject) {
    	one_data=[]
    	all_data=[]
        let rawdata = fs.readFileSync('./functions/liste_items.json');  
        let items = JSON.parse(rawdata);
        for (item in items.data) {
            console.log("\nNom : "+ items.data[item]["name"]+"\nNuméro de l'objet : "+items.data[item]["id"]+"\nUtilité : "+items.data[item]["plaintext"]+"\nDescription : "+items.data[item]["description"]+"\n")
        
        	one_data.push(items.data[item]["id"])
        	one_data.push(items.data[item]["name"])
        	one_data.push(items.data[item]["plaintext"])
        	one_data.push(items.data[item]["description"])
        	all_data.push(one_data)
        	one_data=[]
        }
        if (all_data.length >0) {
            resolve(all_data)
        }
        else{
        	reject("Nous n'avons pas pu trouvé vos items. Une erreur est survenue ?")
       	}
    }
)};

module.exports = getAllItemsName