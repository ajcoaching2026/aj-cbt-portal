function hideAllScreens() {

document.getElementById("loading-screen").style.display = "none";
document.getElementById("landing-screen").style.display = "none";
document.getElementById("instruction-screen").style.display = "none";
document.getElementById("exam-screen").style.display = "none";
document.getElementById("result-screen").style.display = "none";
document.getElementById("review-screen").style.display = "none";

}
function showLoading() {
hideAllScreens();

document.getElementById(
    "loading-screen"
).style.display = "block";
    document.getElementById(
        "loading-screen"
    ).innerHTML = `
    
    <div class="loading-box">

        <img
        src="assets/logo.png"
        class="logo">

        <h2>
        Loading Test...
        </h2>

    </div>
    
    `;
}

function showLanding(testName) {
hideAllScreens();

document.getElementById(
    "landing-screen"
).style.display = "block";
    document.getElementById(
        "landing-screen"
    ).innerHTML = `

    <div class="landing-box">

        <img
        src="assets/logo.png"
        class="logo">

        <h1>
        ${testName}
        </h1>

        <button id="joinTelegram">

        Join Telegram

        </button>

        <button id="startExam">

        Start Test

        </button>

    </div>

    `;
}
function showInstructions(
    instructionsHindi,
    instructions4
) {
    hideAllScreens();

document.getElementById(
    "instruction-screen"
).style.display = "block";

    document.getElementById(
        "instruction-screen"
    ).innerHTML = `

    <div class="instruction-box">

        <img
        src="assets/logo.png"
        class="logo">

        <h2>
        Instructions
        </h2>

        <div class="instruction-text">

            <p>
            ${instructionsHindi || ""}
            </p>

            <p>
            ${instructions4 || ""}
            </p>

        </div>

        <button id="beginTest">

        Start Exam

        </button>

    </div>

    `;
}
function showExam(question, index, total) {
    hideAllScreens();

document.getElementById(
    "exam-screen"
).style.display = "block";

    const selectedAnswer =
        question.userAnswer || "";

    document.getElementById(
        "exam-screen"
    ).innerHTML = `

    <div class="exam-container">

        <div class="exam-header">

            <div class="test-info">

                <div class="test-name">
                    ${question.examName || ""}
                </div>

                <div class="test-type">
                    ${question.testType || ""}
                </div>

            </div>

            <div
                id="global-timer"
                class="global-timer">
            </div>

        </div>

        <div class="question-number">

            Question ${index + 1}

        </div>

        <div class="question-box">

            ${question.question}

        </div>

        <div class="options-box">

            <button
                class="option-btn
                ${selectedAnswer=="1"
                ? "selected"
                : ""}"
                data-option="1">

                A.
                ${question.option1}

            </button>

            <button
                class="option-btn
                ${selectedAnswer=="2"
                ? "selected"
                : ""}"
                data-option="2">

                B.
                ${question.option2}

            </button>

            <button
                class="option-btn
                ${selectedAnswer=="3"
                ? "selected"
                : ""}"
                data-option="3">

                C.
                ${question.option3}

            </button>

            <button
                class="option-btn
                ${selectedAnswer=="4"
                ? "selected"
                : ""}"
                data-option="4">

                D.
                ${question.option4}

            </button>
            ${question.option5Text
            ? `
            <button
                class="option-btn
                ${selectedAnswer=="5"
                ? "selected"
                : ""}"
                data-option="5">

                E.
                ${question.option5Text}

            </button>
            `
            : ""}

        </div>

        <div class="bottom-actions">

            <button id="prevBtn">
                Previous
            </button>

            <button id="reviewBtn">
    ${question.review ? "Reviewed ✓" : "Mark Review"}
</button>

            <button id="nextBtn">
                Next
            </button>

        </div>

        <button
            id="submitExam"
            class="submit-btn">

            Submit Test

        </button>

        <div class="watermark">

            ${question.watermarkText || ""}

        </div>

    

    </div>

    `;
}

function showResult(result) {
    document.getElementById("exam-screen").style.display = "none";

document.getElementById("result-screen").style.display = "block";
    
    document.getElementById(
    "exam-screen"
).innerHTML = "";

    document.getElementById(
        "result-screen"
    ).innerHTML = `

    <div class="exam-container">

        <img
        src="assets/logo.png"
        class="logo">

        <h2>
        AJHinglishAcademy
        </h2>

        <h1>
        TEST RESULT
        </h1>

        <div class="question-box">

            Total Questions :
            ${result.total}

            <br><br>

            Attempted :
            ${result.attempted}

            <br><br>

            Correct :
            ${result.correct}

            <br><br>

            Wrong :
            ${result.wrong}

            <br><br>

            Unattempted :
            ${result.unattempted}

            <br><br>

            Score :
            ${result.score}

            <br><br>

            Percentage :
            ${result.percentage}%

        </div>

        <button id="reviewAnswersBtn">
            Review Answers
        </button>

        <br><br>

        <button id="restartTestBtn">
            Restart Test
        </button>

        <br><br>

        <button id="joinTelegramResult">
            Join Telegram Channel
        </button>

    </div>

    `;
}
function createPalette() {

    let html = "";

    questions.forEach((q, index) => {

        let colorClass = "";

        if (q.review) {

            colorClass = "palette-review";

        } else if (q.userAnswer) {

            colorClass = "palette-answered";

        } else {

            colorClass = "palette-unanswered";

        }

        html += `
        <button
            class="palette-btn ${colorClass}"
            data-index="${index}">

            ${index + 1}

        </button>
        `;
    });

    return html;
}
function showReviewScreen(index = 0) {

    hideAllScreens();

    document.getElementById("review-screen").style.display = "block";

    document.getElementById("review-screen").innerHTML = `

    <div class="exam-container">

        <h2>Review Answers</h2>

        <div class="question-number">
            Question ${index + 1} / ${questions.length}
        </div>

        <div class="question-box">
            ${questions[index].question}
        </div>

        <div class="options-box">

            <button class="option-btn ${
                questions[index].correctAnswer == "1"
                ? "correct"
                : questions[index].userAnswer == "1"
                ? "wrong"
                : ""
            }">
                A. ${questions[index].option1}
            </button>

            <button class="option-btn ${
                questions[index].correctAnswer == "2"
                ? "correct"
                : questions[index].userAnswer == "2"
                ? "wrong"
                : ""
            }">
                B. ${questions[index].option2}
            </button>

            <button class="option-btn ${
                questions[index].correctAnswer == "3"
                ? "correct"
                : questions[index].userAnswer == "3"
                ? "wrong"
                : ""
            }">
                C. ${questions[index].option3}
            </button>

            <button class="option-btn ${
                questions[index].correctAnswer == "4"
                ? "correct"
                : questions[index].userAnswer == "4"
                ? "wrong"
                : ""
            }">
                D. ${questions[index].option4}
            </button>

        </div>

        <div class="review-buttons">

            <button id="prevReview">
                Previous
            </button>

            <button id="nextReview">
                Next
            </button>

        </div>

    </div>

    `;

    const prevBtn =
        document.getElementById("prevReview");

    const nextBtn =
        document.getElementById("nextReview");

    if (prevBtn) {
        prevBtn.onclick = () => {

            if (index > 0) {
                showReviewScreen(index - 1);
            }

        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {

            if (index < questions.length - 1) {
                showReviewScreen(index + 1);
            }

        };
    }

}