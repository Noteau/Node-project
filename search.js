#!/usr/bin/env node
const program = require("commander")
var fs = require('fs')
const axios = require('axios')
const ask_informations = require("./functions/ask_informations")
const ask_save_file = require("./functions/ask_register")
const All_Champions_Name = require("./functions/getAllChampionsName")
const getOneChampionName = require("./functions/getOneChampionName")
const All_Items_name = require("./functions/getAllItemsName")
const getOneItemName = require("./functions/getOneItemName")
const All_summoner_spells = require("./functions/getAllSummonerName")
const getOneSummonerName = require("./functions/getOneSummonerName")
const getOnePlayer = require("./functions/getOnePlayer")

const api_key = 'RGAPI-7d126e95-4452-493a-8787-df899a94fa64'
var answer_save

program
	.version('1.0.0')
	.option('-C,--champions','Show all champions')
	.option('-c,--champion [name]','Show one champion')
	.option('-I,--items','Show all items')
	.option('-i,--item [item]','Show one item')
	.option('-S,--summonerspells','Show all summoner-spells')
	.option('-s,--summonerspell [summoner-spell] ','Show one summoner-spell')
	.option('-P,--playerinfo [player-name]',"Show one player's data")
	.option('-u --update', "Update Item and Champion JSON file to refresh our data")

program.parse(process.argv)

function main(){
	if (!fs.existsSync('./JSONs/liste_champion.json/')) {
			console.log('\nFichier de ressource champions introuvable, lancement automatique de la mise à jour des données')
			update_champions()
	};
	if (!fs.existsSync('./JSONs/liste_items.json/')) {
			console.log('\nFichier de ressource items introuvable, lancement automatique de la mise à jour des données')
			update_items()
	};
	if (!fs.existsSync('./JSONs/liste_summoner_spell.json/')) {
			console.log("\nFichier de ressource sort d'invocateur introuvable, lancement automatique de la mise à jour des données")
			update_summoner_spells()
	};

	if(program.champions){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return All_Champions_Name()
		})
		.then((data)=>{
			for (i in data) {
                console.log("ID : "+data[i][0]+"\nNom du champion : "+data[i][1]+"\nTitre : "+data[i][2]+"\n<------------------------------------>\n")
            }
            if(answer_save){
				file_save("Champions",data)
			}
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.champion){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return ask_informations('champion')
		})
		.then((id) => {
			return getOneChampionName(id)
		})
		.then((data)=>{
			console.log("Champion numéro : "+data[0]+"\nNom : "+ data[1]+"\nTitre : "+data[2]+"\n")
			if(answer_save){
				file_save("Champion_"+data[1],data)
			}
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.items){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return All_Items_name()
		})
		.then((data)=>{
			for (i in data) {
                console.log("Cet objet porte le numéro "+data[i][0]+"\nNom : "+data[i][1]+"\nDescription : "+data[i][2]+"\n<------------------------------------>\n")
            }
            if(answer_save){
				file_save("Items",data)
			}
		})
	}
	else if(program.item){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return ask_informations('item')
		})
		.then((id) => {
			return getOneItemName(id)
		})
		.then((data)=>{
			console.log("\nNom : "+ data[1]+"\nNuméro de l'objet : "+data[0]+"\nUtilité : "+data[2])
        	if(answer_save){
				file_save("Item_"+data[1],data)
			}
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.summonerspells){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return All_summoner_spells()
		})
		.then((data)=>{
      		console.log("Pour la version "+data[0]+" de League of Legends les sorts d'invocateurs sont :\n")
      		for (i in data) {
                console.log("Ce sort d'invocateur se nomme "+data[i][0]+"\nCe sort porte le numéro "+data[i][1]+"\nCe sort est débloquable au niveau : "+data[i][2]+"\nDescription : "+data[i][3]+"\n<------------------------------------>\n")
            }
            if(answer_save){
				file_save("Sort d'invocateurs",data)
			}
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.summonerspell){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return ask_informations("sort d'invocateur")
		})
		.then((id) => {
			return getOneSummonerName(id)
		})
		.then((data)=>{
			console.log("Nom du sort d'invocateur : "+data[0]+"\nCe sort est débloqué au niveau "+data[1]+"\nNuméro du sort d'invocateur : "+data[2]+"\nDescription : "+data[3]+"\n")
        	if(answer_save){
				file_save("Sort d'invocateur_"+data[0],data)
			}
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.playerinfo){
		ask_save_file()
		.then((answer) => {
			answer_save=answer.answer
			return ask_informations('Joueur')
		})
		.then((id) => {
			return getOnePlayer(id,api_key)
		})
		.then((data)=>{
			console.log("Le joueur "+data[0]+" a l'id  : "+data[1]+"\nIl est actuellement niveau "+data[2]+"\n")
			console.log("Il est classé "+data[3]+" "+data[4]+" avec "+data[5]+" points en "+data[6])
			console.log("Il est classé "+data[7]+" "+data[8]+" avec "+data[9]+" points en "+data[10])
			if(answer_save){
				file_save("invocateur_"+data[0],data)
			}
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if (program.update){
		console.log("Mise à jour en cours")

		return update_items()
		.then((state) => {
			console.log(state)
			return update_champions()
		})
		.then((state) => {
			console.log(state)
			return update_summoner_spells()
		})
		.then((state) => {
			console.log(state)
			console.log("Mise à jour terminé")	
		})
		.catch((error) =>{
			console.log("shit")
			console.log(error)
		})
	}
	else{
		program.help()
	}
}

const update_items = () => {
    return new Promise(function(resolve, reject) {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/items?locale=fr_FR&api_key='+api_key)
			.then(function (items) {
				var items_json = JSON.stringify(items.data)
				fs.writeFile('./JSONs/liste_items.json', items_json, (error) => {})
				resolve("Objets récupérés avec succés")
		});
	});
}

const update_champions = () => {
    return new Promise(function(resolve, reject) {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=fr_FR&dataById=false&api_key='+api_key)
			.then(function (champions) {
				var champions_json = JSON.stringify(champions.data)
				fs.writeFile('./JSONs/liste_champion.json', champions_json, (error) => {})
				resolve("Champions récupérés avec succés")
        });
	});
}

const update_summoner_spells = () => {
    return new Promise(function(resolve, reject) {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=fr_FR&dataById=false&api_key='+api_key)
			.then(function (summonerspells) {
				var summoner_spell_json = JSON.stringify(summonerspells.data)
				fs.writeFile('./JSONs/liste_summoner_spell.json', summoner_spell_json, (error) => {})
				resolve("Sort d'invocateurs récupérés avec succés")
		});
	});
}


const file_save = (file_name,content) => {
	fs.writeFile('./saved_data/'+file_name+'.txt', content , function (err) {
  	if (err) throw err;
  		console.log('Votre requete à était ajouté au fichier '+file_name+'.txt');
	});
}
main()