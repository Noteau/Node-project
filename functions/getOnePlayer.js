const axios = require('axios')

const getOnePlayerName = (id) => {
    return new Promise(resolve => {
        axios.get('https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+id.answer+'?api_key=RGAPI-7dc33f86-dd43-47ee-b862-0b72b646e247')
            .then(function (joueur) {
                console.log("Le joueur "+joueur.data["name"]+" a l'id  : "+joueur.data["id"]+"\nIl est actuellement niveau "+joueur.data["summonerLevel"]+"\n")
                axios.get('https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+joueur.data["id"]+'?api_key=RGAPI-7dc33f86-dd43-47ee-b862-0b72b646e247')
                .then(function (ranks) {
                    for (rank in ranks.data){
                        console.log("Il est classé "+ranks.data[rank]["tier"]+" "+ranks.data[rank]["rank"]+" avec "+ranks.data[rank]["leaguePoints"]+" points en "+ranks.data[rank]["queueType"])
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