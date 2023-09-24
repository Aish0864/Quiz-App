const start_btn = document.getElementById("startbtn");
const exit_btn = document.getElementById("quit");
const continue_btn = document.getElementById("continue");
const next_btn = document.getElementById("nextBtn");
const end_btn = document.getElementById("endQuiz");
const restart_btn = document.getElementById("replay");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));

const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");

const time_line = document.querySelector(".time_line");

const timeCount = document.querySelector(".timer_sec");

let answerrecorded = false;
let stopQuiz = false;
let score = 0;
let questionCounter = 0;
let questionindex = [];
let correctanswer = [];

let timeValue = 29;
let widthValue = 0;

let counter;
let counterLine;

start_btn.onclick = () => {
  document.querySelector(".startdiv").style.display = "none";
  document.querySelector(".info_box").style.display = "block";
  document.querySelector(".quiz_box").style.display = "none";
  document.querySelector(".result_box").style.display = "none";
};

exit_btn.onclick = () => {
  document.querySelector(".startdiv").style.display = "block";
  document.querySelector(".info_box").style.display = "none";
  document.querySelector(".quiz_box").style.display = "none";
  document.querySelector(".result_box").style.display = "none";
};

continue_btn.onclick = () => {
  startTimer(timeValue);
  startTimerLine(widthValue);
  fetchquestions();

  document.getElementById("nextBtn").disabled = true;
  document.getElementById("nextBtn").style.backgroundColor = "gray";
  document.getElementById("nextBtn").style.cursor = "not-allowed";

  document.querySelector(".startdiv").style.display = "none";
  document.querySelector(".info_box").style.display = "none";
  document.querySelector(".quiz_box").style.display = "block";
  document.querySelector(".result_box").style.display = "none";
};

end_btn.onclick = () => {
  a = prompt("You really want to end quiz?(y or n)");
  if (a == "y" || a == "Y") {
    showresult();
  }
};

restart_btn.onclick = () => {
  console.log("sadfghj");
  location.reload();
};
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 0.065;
    time_line.style.width = time + "vw";
    if (time > 66) {
      clearInterval(counterLine);
    }
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = "00:" + time;
    time--;
    if (time < 9) {
      timeCount.textContent = "00:0" + time;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "Time Off";
      for (i = 1; i < 5; i++) {
        document.getElementById("choice" + i).disabled = true;
      }
      answerrecorded = true;
      shownext();
    }
  }
}

next_btn.onclick = () => {
  clearInterval(counterLine);
  clearInterval(counter);
  answerrecorded = false;
  shownext();

  if (stopQuiz == false) {
    startTimer(timeValue);
    startTimerLine(widthValue);
    fetchquestions();
    if (questionCounter < 4) {
      questionCounter = questionCounter + 1;
      document.getElementById("queCount").innerHTML = questionCounter + 1;

      for (i = 1; i < 5; i++) {
        document.getElementById("choice" + i).style.backgroundColor = "";
        document.getElementById("choice" + i).style.color = "";
        document.getElementById("choice" + i).disabled = false;
      }
      // document.getElementById('choice1').style.backgroundColor = '';
      // document.getElementById('choice1').style.color = '';

      // document.getElementById('choice1').disabled = false;
      // document.getElementById('choice2').disabled = false;
      // document.getElementById('choice3').disabled = false;
      // document.getElementById('choice4').disabled = false;
    } else {
      questionCounter = 0;
      clearInterval(counterLine);
      clearInterval(counter);
      // console.log(score);
      showresult();
      stopQuiz = true;
    }
  }
  // console.log('clicked');
};

shownext = () => {
  if (answerrecorded == true) {
    document.getElementById("nextBtn").disabled = false;
    document.getElementById("nextBtn").style.backgroundColor = "";
    document.getElementById("nextBtn").style.cursor = "";
  } else {
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("nextBtn").style.backgroundColor = "gray";
    document.getElementById("nextBtn").style.cursor = "not-allowed";
  }
};

showresult = () => {
  document.querySelector(".startdiv").style.display = "none";
  document.querySelector(".info_box").style.display = "none";
  document.querySelector(".quiz_box").style.display = "none";
  document.querySelector(".result_box").style.display = "block";

  clearInterval(counterLine);
  clearInterval(counter);
  answerrecorded = false;
  if (score == 5) {
    document.querySelector(".score_text").innerHTML =
      "Excellent!<br>You have scored " + score + " out of 5";
  } else if (score > 2 && score < 5) {
    document.getElementById("icon").src = "../image/great2.gif";
    document.querySelector(".score_text").innerHTML =
      "Great!<br>You have scored " + score + " out of 5";
  } else if (score <= 2 && score > 0) {
    document.getElementById("icon").src = "../image/good.gif";
    document.querySelector(".score_text").innerHTML =
      "Good!<br>You have scored " + score + " out of 5";
  } else {
    document.getElementById("icon").src = "../image/poor.gif";
    document.querySelector(".score_text").innerHTML =
      "Poor!<br>You have scored " + score + " out of 5";
  }
};

choice1.onclick = () => {
  if (choice1.innerText.match(correctanswer)) {
    document.getElementById("choice1").style.backgroundColor = "#9EF0A4";
    document.getElementById("choice1").style.color = "Green";
    score = score + 1;
  } else {
    document.getElementById("choice1").style.backgroundColor = "#F0A99E";
    document.getElementById("choice1").style.color = "Red";
  }
  answerrecorded = true;
  shownext();
  clearInterval(counterLine);
  clearInterval(counter);
  document.getElementById("choice2").disabled = true;
  document.getElementById("choice3").disabled = true;
  document.getElementById("choice4").disabled = true;
};

choice2.onclick = () => {
  if (choice2.innerText.match(correctanswer)) {
    document.getElementById("choice2").style.backgroundColor = "#9EF0A4";
    document.getElementById("choice2").style.color = "Green";
    score = score + 1;
  } else {
    document.getElementById("choice2").style.color = "Red";
    document.getElementById("choice2").style.backgroundColor = "#F0A99E";
  }
  answerrecorded = true;
  shownext();
  clearInterval(counterLine);
  clearInterval(counter);
  document.getElementById("choice1").disabled = true;
  document.getElementById("choice3").disabled = true;
  document.getElementById("choice4").disabled = true;
};

choice3.onclick = () => {
  if (choice3.innerText.match(correctanswer)) {
    document.getElementById("choice3").style.backgroundColor = "#9EF0A4";
    document.getElementById("choice3").style.color = "Green";
    score = score + 1;
  } else {
    document.getElementById("choice3").style.color = "Red";
    document.getElementById("choice3").style.backgroundColor = "#F0A99E";
  }
  answerrecorded = true;
  shownext();
  clearInterval(counterLine);
  clearInterval(counter);
  document.getElementById("choice1").disabled = true;
  document.getElementById("choice2").disabled = true;
  document.getElementById("choice4").disabled = true;
};

choice4.onclick = () => {
  if (choice4.innerText.match(correctanswer)) {
    document.getElementById("choice4").style.backgroundColor = "#9EF0A4";
    document.getElementById("choice4").style.color = "Green";
    score = score + 1;
  } else {
    document.getElementById("choice4").style.color = "Red";
    document.getElementById("choice4").style.backgroundColor = "#F0A99E";
  }
  answerrecorded = true;
  shownext();
  clearInterval(counterLine);
  clearInterval(counter);
  document.getElementById("choice1").disabled = true;
  document.getElementById("choice2").disabled = true;
  document.getElementById("choice3").disabled = true;
};

const fetchquestions = async () => {
  const res = await fetch(
    "https://avatar-83168-default-rtdb.firebaseio.com/questions.json"
  );
  if (!res.ok) {
    throw new Error("Something went wrong!");
  } else {
    // console.log("Connection made");
  }
  const data = await res.json();

  // console.log(data);
  if (stopQuiz == false) {
    question.innerHTML = data[questionCounter]["question"];

    // console.log(data[1]['options'])
    choices[0].innerText = "A.\t" + data[questionCounter]["options"][0];
    choices[1].innerText = "B.\t" + data[questionCounter]["options"][1];
    choices[2].innerText = "C.\t" + data[questionCounter]["options"][2];
    choices[3].innerText = "D.\t" + data[questionCounter]["options"][3];

    correctanswer = data[questionCounter]["answer"];

    console.log(correctanswer);
  }

  return data;
};
fetchquestions();
// fetcheddata =
// console.log(fetcheddata['Promiseresult']);
