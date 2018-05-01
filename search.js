#!/usr/bin/env node
const program = require("commander")
const ask_informations = require("./functions/ask_informations")
const ask_save_file = require("./functions/ask_register")
const All_Champions_Name = require("./functions/getAllChampionsName")
const getOneChampionName = require("./functions/getOneChampionName")
const All_Items_name = require("./functions/getAllItemsName")
const getOneItemName = require("./functions/getOneItemName")
const All_summoner_spells = require("./functions/getAllSummonerName")
const getOneSummonerName = require("./functions/getOneSummonerName")
const getOnePlayer = require("./functions/getOnePlayer")
var fs = require('fs')
const axios = require('axios')

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
			console.log(answer)
			return All_Champions_Name()
		})
		.then((number) => {
			console.log(number)
			return number
		})
	}
	else if(program.champion){
		ask_informations('champion')
		.then((id) => {
			return getOneChampionName(id)
		})
		.then((number) => {
			console.log(number)
			return number
		})
	}
	else if(program.items){
		All_Items_name()
	}
	else if(program.item){
		ask_informations('item')
		.then((id) => {
			return getOneItemName(id)
		})
		.then((number) => {
			console.log(number)
			return number
		})
	}
	else if(program.summonerspells){
		ask_save_file()
		.then((answer) => {
			console.log(answer)
			return All_summoner_spells()
		})
		.then((number) => {
			console.log(number)
			return number
		})
	}
	else if(program.summonerspell){
		ask_informations("sort d'invocateur")
		.then((id) => {
			return getOneSummonerName(id)
		})
		.then((number) => {
			console.log(number)
			return number
		})
	}
	else if(program.playerinfo){
	ask_informations('Joueur')
	.then((id) => {
			return getOnePlayer(id)
		})
		.then((number) => {
			console.log(number)
			return number
		})
	}
	else if (program.update){
		console.log("Mise à jour en cours")

		update_items()
		.then(() => {
			update_champions()
			.then(() => {
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
			console.log(error)
		})
	}
	else{
		program.help()
	}
}

const update_items = () => {
    return new Promise(resolve => {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/items?locale=fr_FR&api_key=RGAPI-7dc33f86-dd43-47ee-b862-0b72b646e247')
			.then(function (items) {
				var items_json = JSON.stringify(items.data)
				fs.writeFile('./functions/liste_items.json', items_json, 'utf8')
				console.log("Objet récupérés avec succés")
			.catch((error)=> {
				console.log("Erreur lors de la récupération des objets")
				console.log(error)                
            });
		});
	});
}

const update_champions = () => {
    return new Promise(resolve => {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=fr_FR&dataById=false&api_key=RGAPI-7dc33f86-dd43-47ee-b862-0b72b646e247')
			.then(function (champions) {
				var champions_json = JSON.stringify(champions.data)
				fs.writeFile('./functions/liste_champion.json', champions_json, 'utf8')
				console.log("Champion récupérés avec succés")
			.catch((error) => {
				console.log("Erreur lors de la récupération des champions")
				console.log(error)                
            });
        });
	});
}

const update_summoner_spells = () => {
    return new Promise(resolve => {
    	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=fr_FR&dataById=false&api_key=RGAPI-7dc33f86-dd43-47ee-b862-0b72b646e247')
			.then(function (summonerspells) {
				var summoner_spell_json = JSON.stringify(summonerspells.data)
				fs.writeFile('./functions/liste_summoner_spell.json', summoner_spell_json, 'utf8')
				console.log("Sort d'invocateurs récupérés avec succés")
			.catch((error) => {
				console.log("Erreur lors de la récupération des sort d'inovacteur")
				console.log(error)                
            });
		});
	});
}
main()