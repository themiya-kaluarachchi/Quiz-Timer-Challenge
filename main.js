const result = document.getElementById("result");
const answerInput = document.getElementById("answer");

//Simulated checker with callback

function checkAnswerCallback(answer, callback) 
{
  setTimeout(() =>
  {
    const correct = answer === 8;
    callback(correct);
  }, 1000);  
}

//Simulated checker with Promise
function checkAnswerPromise(answer)
{
  return new Promise((resolve, reject) =>
  {
    setTimeout(() =>
    {
      const correct = answer === 8;
      resolve(correct);
    }, 1000);
  });
}

//Submit with Callback
function submitWithCallback()
{
  result.innerHTML = "Checking (promise)...";
  const answer = parseInt(answerInput.value);
  checkAnswerPromise(answer).then((isCorrect) =>
  {
    result.innerHTML = isCorrect ? "✅ Correct!" : "❌ Wrong answer!";
  });
}

//Submit with Async/Await
async function submitWithAsync() 
{
  result.innerText = "Checking (async/await)...";
  const answer = parseInt(answerInput.value);
  const isCorrect = await checkAnswerCallback(answer);
  result.innerText = isCorrect ? "✅ Correct!" : "❌ Wrong answer!";
}