let title = document.title;
const theQuestions = JSON.parse(JSON.stringify(questions))

let question_number = 0;
let correct = 0;

load_question();

function load_question()
{
	//Assign question text
	document.querySelector("#question").innerText = theQuestions[title][question_number].question;

	//Get reference to option div
	const options = document.querySelector("#options");

	//Clear off previous options
	options.innerText = "";

	//Shuffle options
	shuffle(theQuestions[title][question_number].options);

	//For each option, make a button with option inner text and give appropriate click handler
	for(let i = 0; i < theQuestions[title][question_number].options.length; i++)
	{
		make_button(i, options);

	}
}

/*
 * Adds button with proper text and click handler to DOM
 * Returns reference to buttton 
 */

function make_button(index, optRef)
{
	let button = document.createElement("button");
	button.className = "option";

	//Add question text
	button.innerText = theQuestions[title][question_number].options[index];

	//Add click handler
	button.addEventListener("click", decide_correct);

	optRef.appendChild(button);
	return button;
}

function decide_correct()
{
	const buttonText = this.innerText;
	const answer = theQuestions[title][question_number].answer;
	//If correct make button green for 2 seconds
	//If incorrect, make button red for 2 seconds

	this.addEventListener("animationend", () => 
	{
		question_number += 1;
		document.querySelector("#correct").innerText = `${correct}/${question_number}`;
		progress();
	})

	if(buttonText == answer)
	{
		this.classList.add("correct");
		correct += 1;
	}
	else
	{
		this.classList.add("wrong");
	}

	

}

function gameOver()
{
	document.querySelector("#question").innerText = "Quiz Complete!";
	document.querySelector("#options").innerText = "";
	let button = document.createElement("button");
	button.innerText = "Start Over";
	button.className = "option"
	button.onclick = () => {
		document.querySelector("#correct").innerText = "0/0"
		correct = 0;
		question_number = 0;
		load_question();
	}
	
	document.querySelector("#options").appendChild(button);

}

function progress()
{
	if(question_number == theQuestions[title].length)
	{
		gameOver();
	}

	else
	{
		load_question();
	}
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}