📄 CAHIER DES CHARGES
HACKBYIFRI 2026
Thème : Intégration efficace du numérique dans l'apprentissage

1️⃣ Nom de l'équipe
PENTACODE IFRI

2️⃣ Présentation des membres

Membre 1 (Chef de groupe)
• Nom :YEVI
• Prénom(s) :Mawuli Peniel Samuel
• École : IFRI
• Filière : SYSTÈME EMBARQUÉ
• Année :1
• Téléphone : 0144462903
• Email : samuelyevidev777@gmail.com

Membre 2
• Nom : OLAFA
• Prénom(s) : Mauricia Nériah Mondjissiola
• École : IFRI
• Filière : GÉNIE LOGICIEL
• Année : 1
• Téléphone : 0152213535
• Email : neriah249@gmail.com

Membre 3
• Nom : AMADOU
• Prénom(s) : Tobie Vincent Geduld
• École : IFRI
• Filiière : SÉCURITÉ INFORMATIQUE
• Année : 1
• Téléphone : 0197221065
• Email : geduldamadou@gmail.com

• Membre 4
• Nom : ATHINDEHOU
• Prénom(s) : Oluwa-Tobi Amos Fréjus • École : IFRI
• Filière : SÉCURITÉ INFORMATIQUE
• Année : 1
• Téléphone : 0160483747
• Email : athindehoufrejus@gmail.com

Membre 5
• Nom :SALIFOU
• Prénom(s) :tarouwere Abdel Azim
• École : IFRI
• Filière : GÉNIE LOGICIEL
• Année : 1
• Téléphone : 0190905914
• Email : tarouwereabdelazim@gmail.com

3️⃣ Problème(s) identifié(s)
Problème principal
Les étudiants rencontrent des difficultés majeures dans :
L'organisation efficace de leurs révisions
La compréhension claire de certains chapitres complexes
Le maintien de la concentration sur de longues périodes
L'identification des points réellement importants d'un cours
Contexte À l'université :
Les cours sont parfois denses et techniques
Certains enseignants dictent sans fournir de support numérique
Les étudiants relisent passivement sans méthode structurée
Les révisions sont souvent tardives et mal planifiées
Ces difficultés entraînent :
Stress académique
Mauvaises performances Risque de décrochage
Catégories touchées
Étudiants en Licence
Étudiants en Master
Doctorants
Étudiants en période d'examen

4️⃣ Description de la solution
Nom de la solution SMARTLEARN Description
SMARTLEARN est une application web intelligente qui transforme un chapitre de cours en un assistant d'apprentissage interactif.
Elle permet de :
Obtenir une explication claire et structurée Générer automatiquement des mini-quiz
Mesurer son niveau de maîtrise
Obtenir un planning de révision personnalisé
Améliorer la concentration via un mode Focus
Comment la solution répond au problème SMARTLEARN transformer :
Lecture passive → Apprentissage actif
Désorganisation → Planification structurée Stress → Suivi maîtrisé Elle aide l'étudiant à :
Comprendre
Tester
Mesurer
Planifier
Réviser efficacement
Valeur ajoutée
Adaptation au niveau (Licence / Master / Doctorat)
Deux modes :
• Basé sur le contenu personnel
• Mode enrichissement pédagogique
Génération automatique de planification selon performance
Intégration d'un mode Focus chronométré
5️⃣ Exigences fonctionnelles

SMARTLEARN devra permettre :
• Sélection du niveau académique
• Sélection de la matière
• Saisie(Copier-coller)ou photographies (analyse OCR) d'un chapitre
• Génération d'explication claire et structurée
• Extraction des concepts clés
• Génération automatique de mini-quiz
• Correction automatique avec explication
• Calcul du score et indice de maîtrise
• Génération automatique d'un planning de révision
• Mode Focus (session 25 minutes avec minuterie)
• Suivi simple de progression
6️⃣ Technologies utilisées

Langages
• PHP (backend & frontend) – simplicité et rapidité de développement
• HTML / CSS / JavaScript – interface web légère et efficace
Framework
• FastAPI – performant, simple à utiliser pour API backend
Base de données
• SQLite – léger, facile à déployer, adapté à un prototype
IA
• API OpenAI – génération pédagogique intelligente, quiz et explications Justification :
Ces technologies permettent un prototype fonctionnel rapide, stable et démontrable.

7️⃣ Modèle économique (optionnel)
SMARTLEARN pourrait évoluer vers :
• Version gratuite avec fonctionnalités de base
• Version premium avec :
Analyse avancée(OCR) Historique détaillé Statistiques de progression Public payant potentiel :
Étudiants en université
Écoles privées Centres de formation Stratégie :
Partenariats universitaires
Abonnement étudiant mensuel faible coût

8️⃣ Perspectives et évolutions futures
Fonctionnalités futures possibles :
• Upload direct de PDF
• Tableau de bord graphique avancé
• Mode collaboratif (groupes d'étude)
• Analyse multi-chapitres
• Recommandation intelligente basée sur historique • Application mobile

9️⃣ Architecture et pratique technique
Architecture
Frontend (HTML/CSS/JS)
↓
Backend (FastAPI – PHP)
↓
Base SQLite
↓
Appels API OpenAI
Flux de fonctionnement
L'utilisateur saisit un chapitre
Le backend envoie le contenu à l'API OpenAI
L'IA génère explication + quiz
Le système calcule le score
L'algorithme génère le planning
Les résultats sont affichés
Contraintes Techniques
• Dépendance à l'API OpenAI
• Gestion des limites de requêtes
• Connexion internet requise
Risques techniques
• Latence API
• Gestion erreurs réseau
• Gestion taille du texte envoyé Ces risques seront limités par :
Tests intensifs
Gestion d'erreurs backend
Limitation taille des entrées

🎯 Conclusion
SMARTLEARN est une solution réaliste, innovante et adaptée au contexte universitaire.
Elle intègre efficacement le numérique dans l'apprentissage en combinant :
Explication intelligente
Évaluation active
Suivi de performance
Organisation stratégique
