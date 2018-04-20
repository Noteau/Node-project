const inquirer = require('inquirer')
const ask = function ask() {
	inquirer.prompt([
	{
		type:'checkbox',
		message:'Voulez vous sauvegarder le contenu récupéré ?',
		name: 'Answer',
		choices: [
		'Oui',
		'Non'
		]
	}
	]).then((answer)=>{
		console.log(answers)
	})
}

module.exports = ask