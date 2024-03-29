var triviaQuestions = [{
    question: "What is the term for a nine sided object?",
    answerList: ["Nonagon", "Septagon", "Octagon", "Decagon"],
    answer: 0
},{
    question: "Halloween is in which month?",
    answerList: ["October", "November", "December", "September"],
    answer: 0
},{
    question: "What is the official language of Cambodia?",
    answerList: ["Thai", "Khmer", "Burmese", "English"],
    answer: 1
},{
    question: "The Shining was written by which author?",
    answerList: ["J.R.R Tolkien", "J.K. Rowling", "R.L. Stein", "Stephen King"],
    answer: 3
},{
    question: "What is the H in H2O?",
    answerList: ["Hexagon", "Heavy", "Hydrogen", "Helium"],
    answer: 2
},{
    question: "Mick Jagger is in which band?",
    answerList: ["The Beatles", "Pink Floyd", "Rolling Stones", "The Clash"],
    answer: 2
},{
    question: "What is the smallest island country?",
    answerList: ["Nauru", "Tuvalu", "Palau", "Malta"],
    answer: 0
},{
    question: "Sheldon Cooper is a character in which TV show?",
    answerList: ["Big Bang Theory", "Simpsons", "Futurama", "Friends"],
    answer: 0
},{
    question: "What letter follows iota in the Greek alphabet?",
    answerList: ["Omega", "Kappa", "Theta", "Lambda"],
    answer: 1   
},{
    question: "Michael Jordan played for which team?",
    answerList: ["Jazz", "Spurs", "Warriors", "Bulls"],
    answer: 3
}]

console.log(triviaQuestions);

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "Sorry, that's not right.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4500)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4500);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);

	var audioElement = document.createElement("audio");
	audioElement.setAttribute('src', 'assets/images/wildCard.mp3');
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
	$('#startOverBtn').on("click", function() {
		audioElement.play();
	})
	
}