/* global $, questionData */

var mainController = {
  data: { 
    currentQuestionIndex: 0,
    userAnswerIndex: -1,
    score: 0,
    questions: questionData,
    questionCount: questionData.length,
    answerImg: questionData.answerImg
  },

  uiElements: {
    startButton: null,
    startPage: null,
    questionPage: null,
    answerPage: null,
    finalPage: null,
    finalButton: null,
    
    questionText: null,
    answerInput1: null,
    answerInput2: null,
    answerInput3: null,
    answerInput4: null,
    answerText1: null,
    answerText2: null,
    answerText3: null,
    answerText4: null,
    nexttButton: null,
    questionForm: null,
    questionPageMessage: null,
    answerImg: null,
    
    questionScoreHeader: null,
    answerResultText: null,
    questionNumber: null,
    questionCount: null,
    score: null,
    finalPageText: null
  },

  init: function () {
    console.log('init function called');
    
    // pages
    this.uiElements.startButton = $('#start-button');
    this.uiElements.startPage = $('#start-page');
    this.uiElements.questionPage = $('#question-page');
    this.uiElements.answerPage = $('#answer-page');
    this.uiElements.finalPage = $('#final-page');

    // question page elements
    this.uiElements.questionText = $('#question-text');
    this.uiElements.answerInput1 = $('#answer-radio-1');
    this.uiElements.answerInput2 = $('#answer-radio-2');
    this.uiElements.answerInput3 = $('#answer-radio-3');
    this.uiElements.answerInput4 = $('#answer-radio-4');
    this.uiElements.answerText1 = $('#answer-label-1');
    this.uiElements.answerText2 = $('#answer-label-2');
    this.uiElements.answerText3 = $('#answer-label-3');
    this.uiElements.answerText4 = $('#answer-label-4');
    this.uiElements.answerImg = $("#answer-img");

    this.uiElements.nextButton = $('#next-button');

    this.uiElements.questionPageMessage = $('#question-page-message');
    this.uiElements.questionForm = $('#question-form');

    this.uiElements.answerResultText = $("#answer-result-text");

    this.uiElements.questionScoreHeader = $('#question-score-header');
    this.uiElements.questionNumber = $('.questionNumber');
    this.uiElements.questionCount = $('.questionCount');
    this.uiElements.score = $('.score');
    
    this.uiElements.finalPageText = $('#final-page-text');
    this.uiElements.finalButton = $('#final-button');
    
    this.wireEvents();
  },
  
  wireEvents: function () {
    console.log('wireEvents function called');
    var that = this;

    this.uiElements.startButton.click(function () {
      that.uiElements.questionNumber.text('1');
      that.uiElements.questionCount.text(that.data.currentQuestionIndex + 1);
      that.uiElements.score.text(that.data.score);
      that.uiElements.questionScoreHeader.show();
      
      that.fillInQuestionText(that);
      that.uiElements.questionPage.show();
      that.uiElements.startPage.hide();
    });

    this.uiElements.finalButton.click(function(){
      that.uiElements.startPage.show();
      that.uiElements.finalPage.hide();
    })
    
    this.uiElements.questionForm.submit(function(e) {
      console.log('question form submit');
      e.preventDefault();
      
      var isChecked1 = that.uiElements.answerInput1.is(':checked');
      var isChecked2 = that.uiElements.answerInput2.is(':checked');
      var isChecked3 = that.uiElements.answerInput3.is(':checked');
      var isChecked4 = that.uiElements.answerInput4.is(':checked');
      
      if( !isChecked1 && !isChecked2 && !isChecked3 && !isChecked4 ) {
        that.uiElements.questionPageMessage.text(
          'You must select an answer before submitting.'
        );
      } else {
        var answerIndex = document.forms['question-form']['answers'].value;
        that.data.userAnswerIndex = answerIndex;
        that.fillAnswerPage();
        that.uiElements.answerPage.show();
        that.uiElements.questionPage.hide();
      }
    });
    
    this.uiElements.nextButton.click(function() {
      if(that.data.currentQuestionIndex == that.data.questionCount - 1) {
        that.fillFinalPage();
        that.uiElements.finalPage.show();
        that.uiElements.answerPage.hide();
      } else {
        that.data.currentQuestionIndex += 1;
        that.uiElements.questionNumber.text(that.data.currentQuestionIndex + 1);
        that.fillInQuestionText(that);
        that.uiElements.questionPage.show();
        that.uiElements.answerPage.hide();
      }
    })
  },
  
  fillInQuestionText: function(that) {
    console.log('fillInQuestionText called');
    var currQuestion = that.data.questions[that.data.currentQuestionIndex];
    that.uiElements.questionPageMessage.text('');
    that.uiElements.questionText.text(currQuestion.questionText);
    that.uiElements.answerText1.text(currQuestion.answerText[0]);
    that.uiElements.answerText2.text(currQuestion.answerText[1]);
    that.uiElements.answerText3.text(currQuestion.answerText[2]);
    that.uiElements.answerText4.text(currQuestion.answerText[3]);
    
    // uncheck all answer radio buttons
    that.uiElements.answerInput1.prop('checked', false);
    that.uiElements.answerInput2.prop('checked', false);
    that.uiElements.answerInput3.prop('checked', false);
    that.uiElements.answerInput4.prop('checked', false);
  },

  fillAnswerPage: function() {
    var currQuestion = this.data.questions[this.data.currentQuestionIndex];

    var userAnswerIndex = this.data.userAnswerIndex;
    var userAnswerText = 'Your Answer: ';
    userAnswerText += currQuestion.answerText[userAnswerIndex];

    var correctQuestionText = 'Question: ';
    correctQuestionText += currQuestion.questionText;
    
    var correctAnswerIndex = currQuestion.correctAnswerIndex;
    var correctAnswerText = 'Correct Answer: ';
    correctAnswerText += currQuestion.answerText[correctAnswerIndex];
    this.uiElements.answerImg.prop("src", currQuestion.answerImg);
    console.log(this.uiElements.answerImg.attr("src"));
    console.log(currQuestion.answerImg);
    if(userAnswerIndex == correctAnswerIndex) {
      this.data.score += 1;
      this.uiElements.score.text(this.data.score);
      this.uiElements.answerResultText.text(
        'Correct: ' + currQuestion.correctAnswerText
      )
    } else {
      this.uiElements.answerResultText.text(
        'Incorrect: ' + currQuestion.correctAnswerText
      )
    }
  },
  
  fillFinalPage: function() {
    var text;
    
    if(this.data.score < 4) {
      text = 'You need to spend more time outdoors!';
    } else if(this.data.score < 8) {
      text = 'You know your parks!'
    } else {
      text = 'You\'re a National Park expert!'
    }
    
    this.uiElements.finalPageText.text(text);
  }

}

$(document).ready(function () {
  mainController.init();
});

