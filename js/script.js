class Question {
    constructor(text, choices, answer, value) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.value = value;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Quel sort de Dnd donne +5 a la CA juste qu au debut du prochain tour du joueur ?", ["Fireball", "Shield", "Mage-armor", "Shield of faith"], "Shield", 1), 
    new Question("Quelle armure donne a son porteur un minimum de 18 a la CA ?", ["Mail","Fullplate", "Studded-Leather", "Naked"], "Fullplate", 1),
    new Question("Quel sort permet de realiser ces souhaits les plus fous?" , ["Divine-Intervention","Wish", "Prestidigitation", "Augury"], "Wish", 1),
    new Question("Quelle classe peux utiliser l abilite divine smite?", ["Druid","Paladin", "Rogue", "Warlock"], "Paladin", 1),
    new Question("Quelle classe peux utiliser l abilite wildshape?", ["Paladin","Druid", "Rogue", "Warlock"], "Druid", 1)
  ];

  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();

  const modal = document.querySelector('.modal')
  const openModal = document.querySelector('.open-button')
  const closeModal = document.querySelector('.close-button')
  const hideModalButton = document.querySelector('.hidemodal')
  const recommencer = document.querySelector('.recommencer')

// Ferme modal quand le bouton "Fermer la fenetre" est clicker
closeModal.addEventListener('click', () => {
  modal.close();
});
// Empeche la modal de s<afficher encore si l'utilisateur choisi "Ne plus afficher cette fenetre"
hideModalButton.addEventListener('click', () => {
  localStorage.setItem('noShowModal','true');
  modal.close();
});
// Verifie si la modal devrais s'afficher quand la page charge
window.onload = function() {
  if (localStorage.getItem('noShowModal') !=='true') {
    modal.showModal()
  };
};
//
recommencer.addEventListener('click', () => {
  localStorage.setItem('recom','true');
  location.reload();
})

window.onload = function() {
  if (localStorage.getItem('recom')!== 'true'){
  }
}