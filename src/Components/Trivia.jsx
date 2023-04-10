import React, {useState, useEffect} from "react";
const responses = [
        {
        "question": [],
        "correct": [],
        "incorrect": []
        }
];
// let responses = [];

export default function Trivia(){
    // const [questions, setQuestions] = useState([]);
    // useEffect(() => {
    //     generateQuestions(setQuestions);
    // }, []);
    // var numQuestion = 0;
    // console.log(questions);
    // questions.forEach((item) => {
    //     responses[numQuestion].question.push(item.question);
    //     console.log(responses[numQuestion].incorrect);
    //     for(var i = 0; i < item.incorrect_answers.length; i++){
    //         responses[numQuestion].incorrect.push(item.incorrect_answers[i]);
    //     }
    //     responses[numQuestion].correct.push(item.correct_answer);
    //     numQuestion++;
    // });
    // questions.forEach((item) => {
    //     responses.push(
    //         {
    //             "question": item.question,
    //             "correct": item.correct_answer,
    //             "incorrect": item.incorrect_answers
    //         }
    //     );
    // });
    

    const incorrectResponses = responses[0].incorrect;
    return (
        <>
        <h3>{responses[0].question[0]}</h3>
        
        <div>
        {incorrectResponses.map((response, index) => (
          <button key={index}>
            {response}
          </button>
        ))}
        </div>
        <button>{responses[0].correct[0]}</button>
        </>
    )
}
const generateQuestions = (setData) => {
    fetch("https://opentdb.com/api.php?amount=1")
        .then((res) => res.json())
        .then((data) => setData(data.results));
};
