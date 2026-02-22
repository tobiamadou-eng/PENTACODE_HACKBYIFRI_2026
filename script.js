// ===============================
// ANIMATION APPARITION AU SCROLL
// ===============================
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.3 });

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// ===============================
// GESTION NIVEAU + PERFORMANCE
// ===============================
window.addEventListener("DOMContentLoaded", function() {

    const level = localStorage.getItem("smartlearnLevel");
    const levelBox = document.querySelector(".level-selection");

    if(levelBox && level){
    levelBox.style.display = "none";

    const display = document.getElementById("currentLevelDisplay");
    if(display){
        display.innerHTML = `
            <div class="quiz-box">
                <h3>Niveau actuel : ${level}</h3>
                <button class="btn-secondary" onclick="resetLevel()">
                    Modifier mon niveau
                </button>
            </div>
        `;
    }
}

    // Charger les performances si on est sur le dashboard
    const performanceSection = document.getElementById("performanceSection");
    if(performanceSection){
        loadPerformance();
    }

});

function saveLevel(){
    const level = document.getElementById("studyLevel").value;

    if(level === ""){
        alert("Veuillez sélectionner votre niveau.");
        return;
    }

    localStorage.setItem("smartlearnLevel", level);
    location.reload();
}


// ===============================
// MINI QUIZ SYSTEM
// ===============================

let questionStartTime = 0;
let suspiciousAnswers = 0;
let currentQuestion = 0;
let score = 0;
let wrongAnswers = [];

const quizData = [
{
    question: "Quel est le principe central du chapitre ?",
    options: ["Un concept logique", "Une formule mathématique", "Une règle grammaticale", "Un événement historique"],
    correct: 0,
    explanation: "Le principe central repose sur une structure logique reliant plusieurs éléments."
},
{
    question: "Pourquoi est-il important ?",
    options: ["Pour mémoriser", "Pour comprendre un mécanisme", "Pour décorer un texte", "Sans importance"],
    correct: 1,
    explanation: "Il est important car il permet de comprendre le fonctionnement interne du concept."
},
{
    question: "Comment fonctionne-t-il ?",
    options: ["Par hasard", "Par répétition mécanique", "Par relation logique entre éléments", "Il ne fonctionne pas"],
    correct: 2,
    explanation: "Il fonctionne par interaction logique entre plusieurs composants."
},
{
    question: "Dans quel contexte s'applique-t-il ?",
    options: ["Uniquement en théorie", "Dans un cadre structuré", "Dans un jeu vidéo", "Jamais"],
    correct: 1,
    explanation: "Il s'applique dans un cadre structuré permettant son utilisation concrète."
},
{
    question: "Quel est son objectif final ?",
    options: ["Confusion", "Compréhension et application", "Complexité inutile", "Divertissement"],
    correct: 1,
    explanation: "Son objectif final est de relier compréhension théorique et application pratique."
}
];

function startQuiz() {
    questionStartTime = Date.now();
    suspiciousAnswers = 0;
    currentQuestion = 0;
    score = 0;
    wrongAnswers = [];
    showQuestion();
}

function showQuestion() {
    questionStartTime = Date.now();
    const q = quizData[currentQuestion];

    const resultBox = document.getElementById("resultBox");
    if(!resultBox) return;

    resultBox.innerHTML = `
        <div class="quiz-box">
            <h3>Mini-quiz (Question ${currentQuestion + 1}/5)</h3>
            <p>${q.question}</p>

            <div class="options">
                ${q.options.map((option, index) =>
                    `<button class="quiz-option" onclick="selectAnswer(${index})">${option}</button>`
                ).join("")}
            </div>
        </div>
    `;
}

function selectAnswer(index) {
    evaluateAnswer(index);
}

function evaluateAnswer(selectedIndex) {

    const timeSpent = Date.now() - questionStartTime;
    if(timeSpent < 1500){
        suspiciousAnswers++;
    }

    const correctIndex = quizData[currentQuestion].correct;

    if(selectedIndex === correctIndex){
        score++;
    } else {
        wrongAnswers.push({
            question: quizData[currentQuestion].question,
            explanation: quizData[currentQuestion].explanation
        });
    }

    currentQuestion++;

    if(currentQuestion < quizData.length){
        showQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {

    if(suspiciousAnswers >= 3){
        alert("Des réponses trop rapides ont été détectées. Le quiz va être relancé.");
        startQuiz();
        return;
    }

    const percentage = Math.round((score / quizData.length) * 100);

    let history = JSON.parse(localStorage.getItem("performanceHistory")) || [];

    history.push({
        score: percentage,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("performanceHistory", JSON.stringify(history));

    // Détermination du niveau
    let level = "";
    let advice = "";

    if(percentage < 50){
        level = "Débutant";
        advice = "Vous devez revoir le chapitre et renforcer votre compréhension.";
    }
    else if(percentage < 80){
        level = "Intermédiaire";
        advice = "Bonne base. Une révision ciblée améliorera votre maîtrise.";
    }
    else{
        level = "Avancé";
        advice = "Excellent travail. Vous maîtrisez le chapitre.";
    }

    // Reprise des erreurs
    let reExplanationSection = "";

    if(wrongAnswers.length > 0){
        reExplanationSection = `
            <div class="review-section">
                <h4>Points mal compris :</h4>
                ${wrongAnswers.map(item =>
                    `<p><strong>${item.question}</strong><br>${item.explanation}</p>`
                ).join("")}
            </div>
        `;
    }

    // Planning intelligent
    let sessions = 0;
    let duration = 0;

    if(percentage < 50){
        sessions = 5;
        duration = 60;
    }
    else if(percentage < 75){
        sessions = 3;
        duration = 45;
    }
    else{
        sessions = 2;
        duration = 30;
    }

    let planning = `
        <div class="planning-box">
            <h4>Planning recommandé :</h4>
            <p>${sessions} séance(s) de ${duration} minutes</p>

            <div class="progress-container">
                <div class="progress-bar" style="width:${percentage}%"></div>
            </div>
        </div>
    `;

    document.getElementById("resultBox").innerHTML = `
        <div class="quiz-box">
            <h3>Résultat final</h3>

            <div class="score-display">${percentage}%</div>
            <p><strong>Niveau :</strong> ${level}</p>
            <p>${advice}</p>

            ${planning}
            ${reExplanationSection}

            <button class="btn-primary" onclick="startQuiz()">Refaire le quiz</button>
            <button class="btn-secondary" onclick="showExplanation()">Revoir l'explication complète</button>
            <button class="btn-primary" onclick="startRevision(${sessions}, ${duration})">
                Commencer ma révision personnalisée
            </button>
        </div>
    `;
}
function startRevision(totalSessions, durationMinutes){

    localStorage.setItem("revisionData", JSON.stringify({
        sessions : totalSessions,
        duration : durationMinutes,
        wrongAnswers : wrongAnswers
    }));

    window.location.href = "revision.html";
}

// ===============================
// ANALYSE + CONVERSATION
// ===============================

function analyzeChapter() {
    const content = document.getElementById("chapterInput").value;
    const resultBox = document.getElementById("resultBox");

    if (content.trim() === "") {
        alert("Veuillez coller un chapitre.");
        return;
    }

    resultBox.innerHTML = "<p>Analyse en cours...</p>";

    setTimeout(() => {
        showExplanation();
    }, 1200);
}

function showExplanation() {
    const resultBox = document.getElementById("resultBox");

    resultBox.innerHTML = `
        <div class="explanation-box">
            <h3>Explication détaillée :</h3>
            <p>Explication générée automatiquement.</p>

            <div class="understanding-buttons">
                <button class="btn-primary" onclick="startQuiz()">J'ai compris</button>
                <button class="btn-secondary" onclick="openConversation()">Je n'ai pas compris</button>
            </div>

            <div id="conversationArea"></div>
        </div>
    `;
}

function openConversation() {
    document.getElementById("conversationArea").innerHTML = `
        <div class="conversation-box">
            <p><strong>SMARTLEARN :</strong> Quelle partie n'avez-vous pas comprise ?</p>
            <textarea id="studentQuestion" placeholder="Expliquez votre difficulté..."></textarea>
            <button class="btn-primary" onclick="replyToStudent()">Envoyer</button>
        </div>
    `;
}

function replyToStudent() {
    const question = document.getElementById("studentQuestion").value;

    if (question.trim() === "") {
        alert("Veuillez préciser votre difficulté.");
        return;
    }

    document.getElementById("conversationArea").innerHTML += `
        <div class="ai-reply">
            <p><strong>SMARTLEARN :</strong> Reprenons plus simplement.</p>
        </div>
    `;
}



// ===============================
// PERFORMANCE DASHBOARD
// ===============================
function loadPerformance(){

    const history = JSON.parse(localStorage.getItem("performanceHistory")) || [];
    if(history.length === 0) return;

    const average =
        Math.round(history.reduce((acc, item) => acc + item.score, 0) / history.length);

    let level = average < 50 ? "Débutant" :
                average < 80 ? "Intermédiaire" :
                "Avancé";

    document.getElementById("performanceSection").innerHTML = `
        <h3>📊 Mes performances</h3>
        <p><strong>Score moyen :</strong> ${average}%</p>
        <p><strong>Niveau global :</strong> ${level}</p>
        <p><strong>Séances réalisées :</strong> ${history.length}</p>
    `;
}

// ===============================
// LOGIN SYSTEM
// ===============================

function loginUser(){

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    if(!email || !password){
        alert("Champs introuvables.");
        return;
    }

    if(email.value.trim() === "" || password.value.trim() === ""){
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Simulation connexion
    localStorage.setItem("smartlearnUser", email.value);

    window.location.href = "dashboard.html";
}

function registerUser(){

    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");

    if(!email || !password){
        alert("Champs introuvables.");
        return;
    }

    if(email.value.trim() === "" || password.value.trim() === ""){
        alert("Veuillez remplir tous les champs.");
        return;
    }

    localStorage.setItem("smartlearnUser", email.value);

    alert("Compte créé avec succès !");
    window.location.href = "dashboard.html";
}
function resetLevel(){
    localStorage.removeItem("smartlearnLevel");
    location.reload();
}

