const result = document.getElementById("result");
const answerInput = document.getElementById("answer");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

let score = 0;
let timer;
let timeLeft = 10;

// Strart timer
function startTimer()
{
  clearInterval(timer);
  timerLeft = 10;
  timerDisplay.innerText = `Time left: ${timeLeft}s`;

  timer = setInterval(() =>
  {
    timeLeft--;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0)
    {
      clearInterval(timer);
      result.innerText = "⏰ Time's up!";
    }
  }, 1000);
}

// Simulated async check with setTimeout (1s delay)
function checkAnswerCallback(answer, callback) 
{
  setTimeout(() =>
  {
    const correct = answer === 8;
    callback(correct);
  }, 1000);  
}

// Simulated checker with Promise
function checkAnswerPromise(answer)
{
  return new Promise((resolve) =>
  {
    setTimeout(() =>
    {
      const correct = answer === 8;
      resolve(correct);
    }, 1000);
  });
}

// Submit with Callback
function submitWithCallback()
{
  if (timeLeft <= 0) 
  {
    result.innerText = "⏰ Too late!";
    return;
  }

  result.innerHTML = "Checking (callback)...";
  const answer = parseInt(answerInput.value);
  checkAnswerCallback(answer, (isCorrect) =>
  {
    handleResult(isCorrect);
  });
}

// Promise submission
function submitWithPromise()
{
  if (timeLeft <= 0) 
  {
    result.innerText = "⏰ Too late!";
    return;
  }

  result.innerHTML = "Checking (callback)...";
  const answer = parseInt(answerInput.value);
  checkAnswerPromise(answer).then((isCorrect) =>
  {
    handleResult(isCorrect);
  });
}

// Submit with Async/Await
async function submitWithAsync() 
{
  if (timeLeft <= 0) 
  {
    result.innerText = "⏰ Too late!";
    return;
  }

  result.innerText = "Checking (async/await)...";
  const answer = parseInt(answerInput.value);
  const isCorrect = await checkAnswerPromise(answer);
  handleResult(isCorrect);
}

// Result Handler
function handleResult(isCorrect)
{
  clearInterval(timer);
  if (isCorrect)
  {
    result.innerText = "✅ Correct!";
    score++;
  }
  else
  {
    result.innerText = "❌ Wrong!";
  }
  scoreDisplay.innerText = `Score: ${score}`;
}

// Restart Quiz
function restartQuiz()
{
  clearInterval(timer);
  timeLeft = 10;
  answerInput.value = '';
  result.innerText = '';
  timerDisplay.innerText = '';
  startTimer();
}

startTimer();