var currentQuestion = 0;
var score = 0;
var totalQuestions = questions.length;

var container = document.getElementById('quizContainer');
var questionContainer = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var nextButton = document.getElementById('nextButton');
var resultContainer = document.getElementById('result');

function loadQuestion(questionIndex){
	var q = questions[questionIndex];
	questionContainer.textContent = (questionIndex + 1) + '. ' + q.question;
	opt1.textContent = q.option1;
	opt2.textContent = q.option2;
	opt3.textContent = q.option3;
	opt4.textContent = q.option4;
}

function loadNextQuestion(){
	var selectedOption = document.querySelector('input[type = radio]:checked');
	if(!selectedOption){
		alert('Please select an answer!');
		return;
	}
	var selectedAnswer = selectedOption.value;
	if(questions[currentQuestion].answer == selectedAnswer){
		score += 10;
	}

	selectedOption.checked = false;
	currentQuestion++;
	if(currentQuestion == totalQuestions - 1){
		nextButton.textContent = "Finish";
	}

	if(currentQuestion == totalQuestions){
		container.style.display = 'none';
		resultContainer.style.display = '';
		resultContainer.innerHTML = "Your score is " + score + '<br>';
		var img = document.createElement("img");
		// img.width = 256;
		// img.height = 192;

		if(score == 0){
		    img.src = 'img/lost.gif';
   			
		}else if(score > 0 && score <= 20){
			img.src = 'img/tryharder.gif';
			
		}else if(score > 20 && score <= 40){
			img.src = 'img/nicetry.gif';

		}else{
			img.src = 'img/success.gif';
		}
		resultContainer.appendChild(img);
		
	}
	loadQuestion(currentQuestion);
}

function loadPrevQuestion(){
	loadQuestion(currentQuestion - 1);
}

loadQuestion(currentQuestion);


