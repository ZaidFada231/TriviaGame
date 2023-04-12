import axios from 'axios';
import { useEffect, useState } from 'react';
export default function TriviaTest() {
// could not get fetch to work, after some research i used axios and get
  const [question, setQuestion] = useState([]);
  const [correctPick, setCorrectPick] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  function combineAllAnswers(incorrect, correctAnswer) {
    let allAnswers = [];
    incorrect.map((item) => {
      item.incorrect_answers.map((incorrectAnswer) => {
        allAnswers.push(incorrectAnswer)
      });
    });
    allAnswers.push(correctAnswer);
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  async function getTriviaData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=1");

    setQuestion(response.data.results);
    setCorrectPick(response.data.results[0].correct_answer);
    combineAllAnswers(response.data.results, response.data.results[0].correct_answer);
}

  useEffect(() => {
    getTriviaData();
  }, []);

  function checkIfPickedRight(picked) {
    if (picked === correctPick) {
      getTriviaData();
      setCurrentPoints(currentPoints + 1);
    } else {
      setCurrentPoints(currentPoints - 1);
    }
  }
  function removeCharacters(question) {
    return question.replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"").replace(/(&quot\;)/g, "\"");
  }

  return (
    <div className="App">
        <div>
          <div>
            Current Points: {currentPoints}
          </div>
          <br />
          {question.map((triviaData, index) =>
            <div key={index}>
              <div>
                {removeCharacters(triviaData.question)}
              </div>
              <br />
              <div>
                {
                  allPossibleAnswers.map((answer, index) =>
                    <div key={index}>
                      <button className='button-style' key={index} onClick={() => checkIfPickedRight(answer)} >
                        {removeCharacters(answer)}
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          )}
        </div>
    </div>
  );
}