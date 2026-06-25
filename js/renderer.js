
let currentReviewFilter = "all";

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

    <h2 class="welcome-text">
        Welcome To
    </h2>

    <h1 class="academy-name">
        AJ हिंGLISH Academy
    </h1>

    <h2 class="test-name">
        ${testName}
    </h2>

    <button id="startExam">

        🚀 Start Test

    </button>

</div>

    `;
}
function showInstructions(
    instructionsHindi,
    instructionEnglish
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

    <h3>
📌 हिंदी निर्देश
</h3>

<p>
    ${instructionsHindi || ""}
</p>

<hr>

<h3>
📌 English Instructions
</h3>

<p>
    ${instructionEnglish || ""}
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

    <div class="header-left">

        <div class="academy-name">
            AJ हिंGLISH Academy
        </div>

        <div class="exam-title">
            ${question.examName || ""}
        </div>

    </div>

    <div class="header-right">

  <div
    id="global-timer"
    class="global-timer">

    ${typeof remainingTime !== "undefined"
        ? `${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2,"0")}`
        : ""}

</div>

    </div>

</div>
        <div class="question-box">

    <div class="question-badge">
        Q. ${index + 1}
    </div>

    <div class="question-text">
        ${question.question}
    </div>

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
        ${question.review ? "Review ★" : "Mark Review"}
    </button>

    <button id="nextBtn">
        Next
    </button>

</div>
<button
 id="openPalette"
 class="palette-open-btn exam-palette-btn">

    📋 Questions

</button>
    

        <div class="watermark">

            ${question.watermarkText || ""}

        </div>
<div
    id="paletteDrawer"
    class="palette-drawer">

    <div class="palette-header">

        <h3>
            Questions
        </h3>

        <button
            id="closePalette">

            ✕

        </button>

    </div>

    <div class="palette-grid">

    ${createPalette()}

</div>

<div class="palette-submit">

    <button id="paletteSubmitBtn">

        🚀 Submit Test

    </button>

</div>

</div>
    

    </div>

    `;
}

function showResult(result) {
    document.getElementById("exam-screen").style.display = "none";

document.getElementById("result-screen").style.display = "block";

document.getElementById(
    "review-screen"
).style.display = "none";

document.getElementById(
    "review-screen"
).innerHTML = "";
    
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
        AJ हिंGLISH Academy
        </h2>

        <h1>
        TEST RESULT
        </h1>
        ${
result.disqualified
?
`
<div class="disqualified-box">

    <h3>
        ⚠️ अयोग्यता सूचना
    </h3>

    <div class="disq-line">

        आपने
        <strong>${result.blankCount}</strong>
        प्रश्न बिना कोई उत्तर अंकित किए छोड़े हैं।

    </div>

    <div class="disq-line">

        अनुमत सीमा :
        <strong>
        ${Math.floor(result.total * 0.10)}
        </strong>
        प्रश्न
        (कुल प्रश्नों का 10%)

    </div>

    <div class="disq-rule">

        RPSC नियम:

        यदि अभ्यर्थी ने 10% से अधिक प्रश्नों में
        पाँचों विकल्पों में से किसी भी विकल्प को
        अंकित नहीं किया है तो वह अयोग्य माना जाएगा।

    </div>

    <div class="disq-rule-en">

        If a candidate has not marked any
        of the five circles in more than
        10% questions, he/she shall be
        disqualified.

    </div>

</div>
`
:
""
}
        
        <div class="result-stats">

    <div class="result-card correct-card">

        <div>✅ Correct Answers</div>

        <h2>${result.correct}</h2>

        <small>
            (+${result.correctMarks} Marks)
        </small>

    </div>

    <div class="result-card wrong-card">

        <div>❌ Incorrect Answers</div>

        <h2>${result.wrong}</h2>

        <small>
            (-${result.negativeMarks} Marks)
        </small>

    </div>

    <div class="result-card unattempted-card">

        <div>⚪ Left Blank</div>

        <h2>${result.blankCount}</h2>

        <small>
            (No Marks)
        </small>

    </div>
    <div class="result-card optione-card">

    <div>🟡 Option E</div>

    <h2>${result.optionECount}</h2>

    <small>(No Marks)</small>

</div>

</div>

<div class="result-summary-cards">

    <div class="summary-card">

        <div>🏆 Net Score</div>

        <h2>
           ${result.score} / ${result.maximumMarks}
        </h2>

    </div>

    <div class="summary-card">

        <div>📊 Percentage</div>

        <h2>
            ${result.percentage}%
        </h2>

    </div>

    <div class="summary-card">


    <div>🎯 Accuracy</div>

    <h2>
        ${result.accuracy}%
    </h2>

</div>

    </div>

<div class="result-info-bar">

    <div>
        ⏱ Time Taken :
        <strong>
            ${result.timeTaken}
        </strong>
    </div>

    <div>
        📘 Total Questions :
        <strong>
            ${result.total}
        </strong>
    </div>

    <div>
        📝 Attempted :
        <strong>
            ${result.attempted}
        </strong>
    </div>

</div>

        <button id="reviewAnswersBtn">
            Review Ansfvwers
        </button>

        <br><br>

        <button id="restartTestBtn">
            Restart Test
        </button>

        <br><br>

        <button id="joinTelegramResult"
class="telegram-btn">

    🚀 For More Tests

</button>

<div class="telegram-subtitle">
    Join our Telegram Channel
</div>

    </div>

    `;
}

function createPalette() {
    
    let html = "";
    
    questions.forEach((q, index) => {
        
        let colorClass = "";
        
        if (
            q.review &&
            q.userAnswer
        ) {
            
            colorClass =
                "palette-answered";
            
        } else if (
            q.review
        ) {
            
            colorClass =
                "palette-review";
            
        } else if (
            q.userAnswer
        ) {
            
            colorClass =
                "palette-answered";
            
        } else {
            
            colorClass =
                "palette-unanswered";
            
        }
        
        html += `
        <button
            class="palette-btn ${colorClass}"
            data-index="${index}">

            ${
    q.review ?
        `<span class="palette-star">★</span>` :
        ""
}

            ${index + 1}

        </button>
        `;
    });
    
    return html;
}


function createReviewPalette() {
    
    let html = "";
    
    questions.forEach((q, index) => {
        
        let colorClass = "";
        
        if (
            q.review &&
            !q.userAnswer
        ) {
            
            colorClass = "palette-review";
            
        } else if (
            q.userAnswer &&
            q.userAnswer ==
            q.answerNumber
        ) {
            
            colorClass = "palette-correct";
            
        } else if (
            q.userAnswer &&
            q.userAnswer !=
            q.answerNumber
        ) {
            
            colorClass = "palette-wrong";
            
        } else {
            
            colorClass = "palette-unanswered";
            
        }
        
        html += `
<button
    class="palette-btn ${colorClass}"
    data-index="${index}">

    ${
        q.review
        ? `<span class="palette-star">★</span>`
        : ""
    }

    ${index + 1}

</button>
`;
    });
    
    return html;
}
function getFilteredReviewQuestions() {
    
    switch (currentReviewFilter) {
        
        case "correct":
            
            return questions
                .map((q, i) => ({ ...q, index: i }))
                .filter(q =>
                    q.userAnswer &&
                    q.userAnswer ==
                    q.answerNumber
                );
            
        case "wrong":
            
            return questions
                .map((q, i) => ({ ...q, index: i }))
                .filter(q =>
                    q.userAnswer &&
                    q.userAnswer !=
                    q.answerNumber
                );
            
        case "review":
            
            return questions
                .map((q, i) => ({ ...q, index: i }))
                .filter(q =>
                    q.review === true
                );
            
        case "unattempted":
            
            return questions
                .map((q, i) => ({ ...q, index: i }))
                .filter(q =>
                    !q.userAnswer
                );
            
        default:
            
            return questions
                .map((q, i) => ({ ...q, index: i }));
            
    }
    
}
function showReviewScreen(index = 0) {
    const filteredQuestions =
    getFilteredReviewQuestions();

if (
    filteredQuestions.length === 0
) {
    
    alert("No Questions Found");
    return;
    
}

const currentQuestion =
    filteredQuestions[index];
    
    hideAllScreens();

document.getElementById(
    "review-screen"
).innerHTML = "";

document.getElementById(
    "review-screen"
).style.display = "block";
    document.getElementById("review-screen").innerHTML = `

    <div class="exam-container">

        <div class="review-header">

    <div>

        <h2>Review Answers</h2>

        <div class="question-number">
          Question ${index + 1} / ${filteredQuestions.length}
        </div>
        <div class="review-filters">

    <button
class="review-filter ${
currentReviewFilter==="all"
? "active"
: ""
}"
data-filter="all">
All
</button>

    <button
class="review-filter ${
currentReviewFilter==="correct"
? "active"
: ""
}"
data-filter="correct">
Correct
</button>

    <button
class="review-filter ${
currentReviewFilter==="wrong"
? "active"
: ""
}"
data-filter="wrong">
Wrong
</button>

    <button
class="review-filter ${
currentReviewFilter==="review"
? "active"
: ""
}"
data-filter="review">
Review
</button>

    <button
class="review-filter ${
currentReviewFilter==="unattempted"
? "active"
: ""
}"
data-filter="unattempted">
Unattempted
</button>

</div>

    </div>

    <button
        id="openReviewPalette"
        class="review-top-btn">

        📋 Questions

    </button>
    </div>

<div class="question-box">

    <div class="question-id">
        Q. ${currentQuestion.index + 1}
    </div>

    <div class="question-text">
        ${currentQuestion.question}
    </div>

</div>

        <div class="options-box">

            <button class="option-btn ${
                currentQuestion.answerNumber == "1"
                ? "correct"
                : currentQuestion.userAnswer == "1"
                ? "wrong"
                : ""
            }">
                A. ${currentQuestion.option1}
            </button>

            <button class="option-btn ${
                currentQuestion.answerNumber == "2"
                ? "correct"
                : currentQuestion.userAnswer == "2"
                ? "wrong"
                : ""
            }">
                B. ${currentQuestion.option2}
            </button>

            <button class="option-btn ${
                currentQuestion.answerNumber == "3"
                ? "correct"
                : currentQuestion.userAnswer == "3"
                ? "wrong"
                : ""
            }">
                C. ${currentQuestion.option3}
            </button>

            <button class="option-btn ${
                currentQuestion.answerNumber == "4"
                ? "correct"
                : currentQuestion.userAnswer == "4"
                ? "wrong"
                : ""
            }">
                D. ${currentQuestion.option4}
            </button>

        </div>
<div class="review-summary">

    <div class="review-answer-box">

        <strong>Your Answer:</strong>

        ${
            currentQuestion.userAnswer
            ? String.fromCharCode(
                64 +
                parseInt(
                    currentQuestion.userAnswer
                )
            )
            : "Not Attempted"
        }

    </div>

    <div class="review-answer-box">

        <strong>Correct Answer:</strong>

        ${
            String.fromCharCode(
                64 +
                parseInt(
                    currentQuestion.answerNumber
                )
            )
        }

    </div>

  ${
(
currentQuestion.review &&
!currentQuestion.userAnswer
)
||
currentQuestion.userAnswer
?
`
<div class="review-answer-box
${
currentQuestion.userAnswer &&
currentQuestion.userAnswer ==
currentQuestion.answerNumber
? "status-correct"
: "status-wrong"
}">
${
currentQuestion.review &&
!currentQuestion.userAnswer
? "🟨 Marked For Review"

: currentQuestion.userAnswer ==
currentQuestion.answerNumber
? "✅ Correct"

: "❌ Incorrect"
}
</div>
`
: ""
}
</div>
<div class="review-explanation">

    <h3>📖 Explanation</h3>

    <div class="explanation-text">

<p>
${
(currentQuestion.explanation || "Explanation Not Available")
.replace(/\n/g,"</p><p>")
}
</p>

</div>

</div>
        <div class="review-buttons">

    <button id="prevReview">
        ⬅ Previous
    </button>

    <button id="exitReview">
        🚪 Exit Review
    </button>

    <button id="nextReview">
        Next ➡
    </button>

</div>



<div
    id="reviewPaletteDrawer"
    class="palette-drawer">

    <div class="palette-header">

        <h3>
            Questions
        </h3>

        <button
            id="closeReviewPalette">

            ✕

        </button>

    </div>

    <div class="palette-grid">

       ${createReviewPalette()}

    </div>

</div>
    </div>

    `;

    const exitBtn =
    document.getElementById(
        "exitReview"
    );

if (exitBtn) {
    
    exitBtn.onclick = () => {
        
        const result =
            calculateResult();
        
        showResult(result);
        bindResultEvents();
        
    };
    
}
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
        
        if (index < filteredQuestions.length - 1) {
            showReviewScreen(index + 1);
        }
        
    };
}

/* YAHAN PASTE KARNA HAI */

const openReviewPalette =
    document.getElementById(
        "openReviewPalette"
    );

const closeReviewPalette =
    document.getElementById(
        "closeReviewPalette"
    );

const reviewPaletteDrawer =
    document.getElementById(
        "reviewPaletteDrawer"
    );

if (
    openReviewPalette &&
    reviewPaletteDrawer
) {
    
    openReviewPalette.onclick = () => {
        
        reviewPaletteDrawer.classList.add(
            "show-palette"
        );
        
    };
    
}

if (
    closeReviewPalette &&
    reviewPaletteDrawer
) {
    
    closeReviewPalette.onclick = () => {
        
        reviewPaletteDrawer.classList.remove(
            "show-palette"
        );
        
    };
    
}

document
    .querySelectorAll(
        ".review-filter"
    )
    .forEach(btn => {
        
        btn.onclick = () => {
            
            currentReviewFilter =
                btn.dataset.filter;
            
            showReviewScreen(0);
            
        };
        
    });

document
    .querySelectorAll(
        "#reviewPaletteDrawer .palette-btn"
    )
    .forEach(btn => {
        
        btn.onclick = () => {
            
            showReviewScreen(
                parseInt(
                    btn.dataset.index
                )
            );
            
        };
        
    });
}