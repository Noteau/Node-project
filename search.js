#!/usr/bin/env node
const program = require("commander")
const ask = require("./functions/ask_register")
const blablou = require("./functions/getAllChampionsName")

program
	.version('1.0.0')
	.option('-C,--champions','Show all champions')
	.option('-c,--champion [name]','Show one champion')
	.option('-I,--items','Show all items')
	.option('-i,--item [item]','Show one item')
	.option('-S,--summoner-spells','Show all summoner-spells')
	.option('-s,--summoner-spell [summoner-spell] ','Show one summoner-spell')
	.option('-si,--summoner-info [summoner-name]',"Show one summoner's data")
	.option('-sh,--summoner-historical [summoner-name]',"Show one summoner's historical of last 20 games")

program.parse(process.argv)

async function main(){
	if(program.champions){
		ask()
		.then((answer) => {
			console.log(answer)
			return blablou()
		})
		.then((number) => {
			console.log(number)
			return number
		})
		
	}
	else if(program.champion){

	}
	else if(program.items){

	}
	else if(program.item){

	}
	else if(program.summoner_spells){

	}
	else if(program.summonerSpell){

	}
	else if(program.summonerInfo){
	console.log('summoner-info')
	}
	else if(program.summonerHistorical){
	console.log('summoner-info')
	}else{
		program.help()
	}
}
main()