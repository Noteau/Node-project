const axios = require('axios')

const getOnePlayerName = (id, api_key) => {
    return new Promise(function(resolve, reject){
        data=[]
        axios.get('https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+id.answer+'?api_key='+api_key)
            .then(function (joueur) {
                data.push(joueur.data["name"])
                data.push(joueur.data["id"])
                data.push(joueur.data["summonerLevel"])
                axios.get('https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+joueur.data["id"]+'?api_key='+api_key)
                .then(function (ranks) {
                    for (rank in ranks.data){
                        data.push(ranks.data[rank]["tier"])
                        data.push(ranks.data[rank]["rank"])
                        data.push(ranks.data[rank]["leaguePoints"])
                        data.push(ranks.data[rank]["queueType"])
                        }

                    if (data.length >0) {
                        resolve(data)
                    }
                    else{
                        reject("Nous n'avons pas pu trouvé votre invocateur. Vous etes certains d'avoir entré le bon nom ?")
                    }
                })
                .catch(function (error) {
                    console.log("Nous n'avons pas pu trouvé son rang. Peut etre n'est-il pas classé")
            });
           })
            .catch(function (error) {
                
                console.log("Nous n'avons pas pu trouvé votre joueur. Vous etes certains d'avoir entré le bon nom et que le joueur est bien présent sur le serveur européen ?")
            });

     }
)};

module.exports = getOnePlayerName