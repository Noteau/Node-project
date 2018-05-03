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

const api_key = 'RGAPI-13579ca8-2c86-4e4d-bff8-26ee4b185737'

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

	if(program.champions){
		ask_save_file()
		.then((answer) => {
			console.log(answer.answer)
			return All_Champions_Name()
			/*if(answer.answer){
				file_save("Champions","test")
			}
			*/
		})
		.then((data)=>{
			console.log(data)
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.champion){
		ask_informations('champion')
		.then((id) => {
			return getOneChampionName(id)
		})
		.then((data)=>{
			console.log("Champion numéro : "+data[0]+"\nNom : "+ data[1]+"\nTitre : "+data[2]+"\n")
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.items){
		return All_Items_name()
		.then((data)=>{
			console.log(data)
		})
	}
	else if(program.item){
		ask_informations('item')
		.then((id) => {
			return getOneItemName(id)
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.summonerspells){
		ask_save_file()
		.then((answer) => {
			console.log(answer)
			return All_summoner_spells()
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.summonerspell){
		ask_informations("sort d'invocateur")
		.then((id) => {
			return getOneSummonerName(id)
		})
		.catch((error) => {
			console.log(error)	
		})
	}
	else if(program.playerinfo){
	ask_informations('Joueur')
	.then((id) => {
			return getOnePlayer(id)
		})
	.catch((error) => {
			console.log(error)	
		})
	}
	else if (program.update){
		console.log("Mise à jour en cours")

		update_items()
		.then(() => {
			console.log("1")
			update_champions()
			.then(() => {
				console.log("2")
				update_summoner_spells()
				.then(() => {
					console.log("Mise à jour terminé")	
				})
				.catch((error) =>{
					console.log(error)
				})		
			})
			.catch((error) =>{
				console.log(error)
			})
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
    return new Promise(resolve => {
    	console.log('https://euw1.api.riotgames.com/lol/static-data/v3/items?locale=fr_FR&api_key='+api_key)
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/items?locale=fr_FR&api_key='+api_key)
			.then(function (items) {
				var items_json = JSON.stringify(items.data)
				fs.writeFile('./functions/liste_items.json', items_json, (error) => { console.log(error)})
				console.log("Objets récupérés avec succés")
		});
	});
}

const update_champions = () => {
    return new Promise(resolve => {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=fr_FR&dataById=false&api_key='+api_key)
			.then(function (champions) {
				var champions_json = JSON.stringify(champions.data)
				fs.writeFile('./functions/liste_champion.json', champions_json, (error) => { console.log(error)})
				console.log("Champions récupérés avec succés")
        });
	});
}

const update_summoner_spells = () => {
    return new Promise(resolve => {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=fr_FR&dataById=false&api_key='+api_key)
			.then(function (summonerspells) {
				var summoner_spell_json = JSON.stringify(summonerspells.data)
				fs.writeFile('./functions/liste_summoner_spell.json', summoner_spell_json, (error) => { console.log(error)})
				console.log("Sort d'invocateurs récupérés avec succés")
		});
	});
}


const file_save = (file_name,test) => {
	fs.appendFile(file_name+'.txt', test , function (err) {
  	if (err) throw err;
  		console.log(test.Promise)
  		console.log('Votre requete à était ajouté au fichier '+file_name+'.txt');
	});
}
main()