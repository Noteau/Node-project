const inquirer = require('inquirer')
const ask_informations = (choix) => {
    return new Promise(resolve => {
    inquirer.prompt([
	{
		type:'input',
		message:'Quel '+choix+' voulez vous voir en détail ?',
		name: 'answer',

	}
	]).then((answer)=>{
		resolve(answer)
	}).catch((e)=>{
		resolve("nope")
	})
  });
}

module.exports = ask_informations