function calculateResult() {

    let total =
        questions.length;

    let attempted =
    questions.filter(
        q =>
        q.userAnswer !== "" &&
        String(q.userAnswer) !== "5"
    ).length;

let unattempted =
    questions.filter(
        q =>
        q.userAnswer === "" ||
        String(q.userAnswer) === "5"
    ).length;
    
    let optionECount =
    questions.filter(
        q =>
        String(q.userAnswer) === "5"
    ).length;

let blankCount =
    questions.filter(
        q =>
        q.userAnswer === ""
    ).length;
    
    let correct = 0;
    let wrong = 0;
    
    

questions.forEach(q => {
    
    // Option E = No Negative Marking
    if (
        String(q.userAnswer) === "5"
    ) {
        
        return;
        
    }
    
// Blank = Unattempted
if (q.userAnswer === "") {
    
    return;
    
}
    
    if (
        String(q.userAnswer) ===
        String(q.answerNumber)
    ) {
        
        correct++;
        
    } else {
        
        wrong++;
        
    }
    
});
    let positive =
        questions[0].positiveMarks || 1;

    let negative =
        questions[0].negativeMarks || 0;

    let score =
        (correct * positive)
        -
        (wrong * negative);

   let maximumMarks =
    total * positive;

let percentage =
    maximumMarks > 0 ?
    (
        score / maximumMarks
    ) * 100 :
    0;
let disqualified =

    blankCount >
    (total * 10 / 100);
    
    let timeTakenSeconds =
    Math.floor(
        (Date.now() - examStartTime) /
        1000
    );

let hours =
    Math.floor(
        timeTakenSeconds / 3600
    );

let minutes =
    Math.floor(
        (timeTakenSeconds % 3600) / 60
    );

let seconds =
    timeTakenSeconds % 60;

let formattedTime =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

let accuracy =
    attempted > 0
    ?
    (
        correct / attempted
    ) * 100
    :
    0;
    
return {

    total,

    attempted,

    optionECount,

    blankCount,

    unattempted,

    correct,

    wrong,
    
    disqualified,
   
    maximumMarks:
    maximumMarks,
    
    accuracy:
    accuracy.toFixed(2),
    timeTaken:
    formattedTime,

    correctMarks:
        parseFloat(
            (correct * positive)
            .toFixed(2)
        ),

    negativeMarks:
        parseFloat(
            (wrong * negative)
            .toFixed(2)
        ),

    score:
        parseFloat(
            score.toFixed(2)
        ),

    percentage:
        percentage.toFixed(2)

};

}