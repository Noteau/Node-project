const inquirer = require('inquirer')
const ask = () => {
    return new Promise(resolve => {
    inquirer.prompt([
	{
		type:'confirm',
		message:'Voulez vous sauvegarder le contenu récupéré ?',
		name: 'answer',
	}
	]).then((answer)=>{
		resolve(answer)
	}).catch((e)=>{
		resolve("nope")
	})
  });
}

module.exports = ask