# Node-project

Bienvenue sur notre programme d'aide sur League of Legends.

Pour l'utiliser il suffit de télécharger le contenu de ce dépôt (ou de le cloner par le lien offert par git) et de générer une clef API (trouvable à l'adresse https://developer.riotgames.com/, les clefs n'étant utilisable que 24 heures nous ne pouvons en fournir) que vous insérez à la place de l'api key présente dans le fichier search.js
Une fois le contenu téléchargé placez-vous dans le dossier où se trouve le fichier search.js.
Vérifiez que Node est bien installé sur votre ordinateur.
Tapez enfin "node search.js"

Une aide s'affiche et vous explique les différentes options : 

    -V, --version                         Affiche la version du programme
   
    -C,--champions                       Affiche tous les champions du jeu
    
    -c,--champion [id]                   Affiche un champion à partir de son id
    
    -I,--items                           Affiche tous les objets du jeu
    
    -i,--item [id]                       Affiche un objet précis à partir de son numéro
    
    -S,--summonerspells                  Affiche les sorts d'invocateur
    
    -s,--summonerspell [id]              Affiche les détails d'un sort d'invocateur
    
    -P,--playerinfo [player-name]        Affiche les informations d'un joueur (Rang,niveau)
    
    -u --update                          Mets à jour nos données grace à l'API de RiotGames
    
    -h, --help                           Affiche l'aide
    
Pour lancer correctement le programe il ne reste plus qu'à écrire : node search.js [-nom de l'option voulue]

Pour des raisons techniques la fonction de mise à jour est limité en nombre d'essais par heure. (Limite de 10/h)
