import React, {useState, useEffect} from "react";
export default function Trivia(){
    const [triviaQuestion, setTriviaQuestion] = useState([]);
    const [allResponses, setAllResponses] = useState([]);
    const [questions, setQuestion] = useState([]);

    let allAnswers = [];
    let question = [];
    triviaQuestion.map((item) => {
        question.push(item.question);
        item.incorrect_answers.map((incorrectAns) => {
            allAnswers.push(incorrectAns);
        });
        allAnswers.push(item.correct_answer);
    });
    allAnswers.sort(() => Math.random() - 0.5);
    console.log(allAnswers);
    useEffect(() => {
        setAllResponses(allAnswers); 
    }, []);
    useEffect(() => {
        generateQuestions(setTriviaQuestion);
    }, []); 
    
    const generateQuestions = (setData) => {
        fetch("https://opentdb.com/api.php?amount=1")   
            .then((res) => res.json())
            .then((data) => setData(data.results))
    };
    function remCharacters(question) {
        return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
    }
    return (
        <>
        {triviaQuestion.map((triviaData, index) =>
            <div key={index}>
              <div>
                {remCharacters(triviaData.question)}
              </div>
              <br />
              <div>
                { 
                    allResponses.map((answer, index) =>
                    <div key={index}>
                      <button key={index} >
                        {remCharacters(answer)}
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          )}
        </>
    )
}

