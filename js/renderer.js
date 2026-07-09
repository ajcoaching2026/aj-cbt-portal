
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

    <h2 class="loading-title">
        Loading Test...
    </h2>

    <p class="loading-subtitle">
        Please Wait
    </p>

    <div class="loading-spinner"></div>

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
        Welcome!
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

    <div class="header-logo-row">

        <img
            src="assets/logo.png"
            class="header-logo">

    </div>

    <div class="header-info-row">

        <div
            id="global-timer"
            class="global-timer">

            ⏱
            ${
                typeof remainingTime !== "undefined"
                ? `${Math.floor(remainingTime/60)}:${String(remainingTime%60).padStart(2,"0")}`
                : ""
            }

        </div>

        <button
            id="openPalette"
            class="header-palette-btn">

            <span></span>
            <span></span>
            <span></span>
            <span></span>

        </button>

    </div>

</div>

<div class="exam-title-bar">

    ${question.examName || ""}

</div>      
      <div class="question-box">

    <div class="question-content">

        <div class="question-badge">
    Q. ${index + 1}${index === 0 ? " • AJ01" : ""}
</div>

        <div class="question-text">
            ${question.question}
        </div>

    </div>

</div>
        <hr class="question-divider">

<div class="options-box">

    <button
        class="option-btn ${selectedAnswer=="1" ? "selected" : ""}"
        data-option="1">

        <span class="option-label">
            A.
        </span>

        <span class="option-text">
            ${question.option1}
        </span>

    </button>

    <button
        class="option-btn ${selectedAnswer=="2" ? "selected" : ""}"
        data-option="2">

        <span class="option-label">
            B.
        </span>

        <span class="option-text">
            ${question.option2}
        </span>

    </button>

    <button
        class="option-btn ${selectedAnswer=="3" ? "selected" : ""}"
        data-option="3">

        <span class="option-label">
            C.
        </span>

        <span class="option-text">
            ${question.option3}
        </span>

    </button>

    <button
        class="option-btn ${selectedAnswer=="4" ? "selected" : ""}"
        data-option="4">

        <span class="option-label">
            D.
        </span>

        <span class="option-text">
            ${question.option4}
        </span>

    </button>

    ${question.option5Text ? `

    <button
        class="option-btn ${selectedAnswer=="5" ? "selected" : ""}"
        data-option="5">

        <span class="option-label">
            E.
        </span>

        <span class="option-text">
            ${question.option5Text}
        </span>

    </button>

    ` : ""}

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


        <div class="watermark">

            ${question.watermarkText || ""}

        </div>
<div
    id="paletteDrawer"
    class="palette-drawer">

<div class="palette-header">

    <button
        id="closePalette"
        class="palette-back-btn">

        ←

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

<h2 class="result-academy">

AJ हिंGLISH Academy

</h2>

<div class="result-divider"></div>

<h1 class="result-title">

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

    ❌ <strong>छोड़े गए प्रश्न :</strong>
    ${result.blankCount}

</div>

<div class="disq-line">

    ✅ <strong>अनुमत सीमा :</strong>
    ${Math.floor(result.total * 0.10)} प्रश्न

</div>

<div class="disq-rule">

    <strong>RPSC नियम:</strong><br>

    10% से अधिक प्रश्नों में किसी भी विकल्प को अंकित नहीं करने पर अभ्यर्थी अयोग्य माना जाएगा।

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
    +${result.correctMarks} Marks
</small>

    </div>

    <div class="result-card wrong-card">

        <div>❌ Incorrect Answers</div>

        <h2>${result.wrong}</h2>

        <small>
    -${result.negativeMarks} Marks
</small>

    </div>

    <div class="result-card unattempted-card">

        <div>⚪ Left Blank</div>

        <h2>${result.blankCount}</h2>

        <small>
            No Marks
        </small>

    </div>
    <div class="result-card optione-card">

    <div>🟡 Option E</div>

    <h2>${result.optionECount}</h2>

    <small>(No Marks)</small>

</div>

</div>

<div class="summary-card maximum-card">

    <div>🏆 Your Marks</div>

    <h2>
        ${result.score}
    </h2>

    <small>
        Maximum Marks : ${result.maximumMarks}
    </small>

</div>

    <div class="summary-card percentage-card">

        <div>📊 Percentage</div>

        <h2>
            ${result.percentage}%
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

        <div class="result-buttons">

    <button id="reviewAnswersBtn">
        Review Answers
    </button>

    <button id="restartTestBtn">
        Restart Test
    </button>

    <button
        id="joinTelegramResult"
        class="telegram-btn">

        🚀 For More Tests

    </button>

</div>

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

${
    currentQuestion.explanation
        ? formatText(currentQuestion.explanation)
        : "Explanation Not Available"
}

</div>

${ currentQuestion.topicTadka ? `
<hr class="topic-divider">
<div class="topic-tadka-box">

<button id="topicTadkaBtn"
class="topic-tadka-btn">

🌶️ Topic Tadka

</button>

</div>
` : ""}

</div>
        <div
id="topicTadkaPopup"
class="topic-tadka-popup">

<div class="topic-popup-card">

<div class="topic-popup-header">

<h3>🌶️ Topic Tadka</h3>

<button
id="closeTopicPopup">

✕

</button>

</div>

<div class="topic-popup-content">

${
    formatText(currentQuestion.topicTadka)
}
</div>
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
            window.scrollTo(0, 0);
                
            }

        };
    }


if (nextBtn) {
    nextBtn.onclick = () => {
        
        if (index < filteredQuestions.length - 1) {
            showReviewScreen(index + 1);
            window.scrollTo(0, 0);
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
    const topicTadkaBtn =
    document.getElementById(
        "topicTadkaBtn"
    );

const topicTadkaPopup =
    document.getElementById(
        "topicTadkaPopup"
    );

const closeTopicPopup =
    document.getElementById(
        "closeTopicPopup"
    );

if (
    topicTadkaBtn &&
    topicTadkaPopup
) {
    
    topicTadkaBtn.onclick = () => {
        
        topicTadkaPopup.classList.add(
            "show"
        );
        
        document.body.style.overflow =
            "hidden";
        
    };
    
}

if (
    closeTopicPopup &&
    topicTadkaPopup
) {
    
    closeTopicPopup.onclick = () => {
        
        topicTadkaPopup.classList.remove(
            "show"
        );
        
        document.body.style.overflow =
            "";
        
    };
    
}

if (topicTadkaPopup) {
    
    topicTadkaPopup.onclick = e => {
        
        if (
            e.target === topicTadkaPopup
        ) {
            
            topicTadkaPopup.classList.remove(
                "show"
            );
            
            document.body.style.overflow =
                "";
            
        }
        
    };
    
}

document.addEventListener(
    "keydown",
    e => {
        
        if (
            e.key === "Escape" &&
            topicTadkaPopup &&
            topicTadkaPopup.classList.contains(
                "show"
            )
        ) {
            
            topicTadkaPopup.classList.remove(
                "show"
            );
            
            document.body.style.overflow =
                "";
            
        }
        
    }
);
window.scrollTo(0, 0);
}