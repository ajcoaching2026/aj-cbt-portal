
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
function renderQuestionText(text) {
    
    return formatText(text || "");
    
}


function renderOptionText(text) {
    
    return formatText(text || "");
    
}


function renderOptions(question, mode = "exam") {
    
    const options = [
        question.option1,
        question.option2,
        question.option3,
        question.option4
    ];
    
    // Future Support (Option E)
    if (question.option5Text) {
        options.push(question.option5Text);
    }
    
    return options.map((text, i) => {
        
        const optionNo = String(i + 1);
        const optionLabel = String.fromCharCode(65 + i);
        
        let stateClass = "";
        
        if (mode === "exam") {
            
            if (question.userAnswer === optionNo) {
                stateClass = "selected";
            }
            
        } else if (mode === "review") {
    
    // Always highlight the correct answer
    if (question.answerNumber === optionNo) {
        stateClass = "correct";
    }
    
    // Mark wrong only for A-D.
    // Option E (Unattempted Question) should never become red.
    else if (
        question.userAnswer === optionNo &&
        optionNo !== "5"
    ) {
        stateClass = "wrong";
    }
    
}
        
        return `

<button
    class="option-btn ${stateClass}"
    ${mode === "exam"
        ? `data-option="${optionNo}"`
        : ""}>

    <span class="option-label">
        ${optionLabel}.
    </span>

    <span class="option-text">
    ${renderOptionText(text)}
</span>

</button>

`;
        
    }).join("");
}
    

function showExam(question, index, total) {
    hideAllScreens();

document.getElementById(
    "exam-screen"
).style.display = "block";


        
        
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
    Q. ${index + 1}${index === 0 ? " • AJ02" : ""}
</div>

        <div class="question-text">
            ${renderQuestionText(question.question)}
        </div>

    </div>

</div>
        <hr class="question-divider">

<div class="options-box">

    ${renderOptions(question, "exam")}

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

        <div class="result-header">
<div class="result-header">

    <div class="result-page-title">

        Test Result

    </div>

    <div class="result-brand">

        <img
        src="assets/logo.png"
        class="result-logo">

        <div class="result-brand-text">

            <div class="result-academy">

                AJ हिंGLISH Academy

            </div>

            <div class="result-tagline">

                <span class="tag-orange">ज्ञान</span>

                <span class="tag-dot">•</span>

                <span class="tag-blue">Growth</span>

                <span class="tag-dot">•</span>

                <span class="tag-orange">Success</span>

            </div>

        </div>

    </div>

</div>

</div>
            ${
result.disqualified
?
`
<div class="disqualified-box">

    <div class="disq-left">

        <div class="disq-title">

            ⚠️ अयोग्यता सूचना

        </div>

        <div class="disq-item">

            ❌ <strong>छोड़े गए प्रश्न :</strong>

            ${result.blankCount}

        </div>

        <div class="disq-item">

            ✅ <strong>अनुमत सीमा :</strong>

            ${Math.floor(result.total * 0.10)} प्रश्न

        </div>

    </div>

    <div class="disq-divider"></div>

    <div class="disq-right">

        <div class="disq-rule-title">

            RPSC नियम:

        </div>

        <div class="disq-rule-text">

            10% से अधिक प्रश्नों में किसी भी विकल्प को अंकित नहीं करने पर अभ्यर्थी अयोग्य माना जाएगा।

        </div>

    </div>

</div>
`
:
""
}

<div class="score-banner">

    <div class="score-left">

        <div class="score-trophy">
            <img src="assets/trophy.png" alt="Trophy">
        </div>

        <div class="score-content">

            <div class="score-label">
                Your Score
            </div>

            <div class="score-main">

                <span class="score-value">${result.score}</span>

                <span class="score-total">/ ${result.maximumMarks}</span>

            </div>

            <div class="score-badge">
                ${result.percentage}%
            </div>

        </div>

    </div>

</div>

<div class="result-stats">

    <div class="result-card correct-card">

        <div class="result-card-icon">✓</div>

        <div class="result-card-title">
            Correct
        </div>

        <h2 class="correct-number">${result.correct}</h2>

        <div class="result-card-subtitle">
            Questions
        </div>

        <div class="marks-chip positive-chip">
            +${result.correctMarks} Marks
        </div>

    </div>

    <div class="result-card wrong-card">

        <div class="result-card-icon">✕</div>

        <div class="result-card-title">
            Incorrect
        </div>

        <h2 class="wrong-number">${result.wrong}</h2>

        <div class="result-card-subtitle">
            Questions
        </div>

        <div class="marks-chip negative-chip">
            -${result.negativeMarks} Marks
        </div>

    </div>

    <div class="result-card unattempted-card">

        <div class="result-card-icon">○</div>

        <div class="result-card-title">
            Not Attempted
        </div>

        <h2 class="blank-number">${result.blankCount}</h2>

        <div class="result-card-subtitle">
            Questions
        </div>

        <div class="marks-chip neutral-chip">
            0 Marks
        </div>

    </div>

</div>


<div class="test-summary-card">

    <div class="test-summary-title">

        📋 Test Summary

    </div>

    <div class="test-summary-grid">

      <div class="summary-item">

    <div class="summary-icon">📋</div>

    <div class="summary-label">
        Total Questions
    </div>

    <div class="summary-value">
        ${result.total}
    </div>

</div>

<div class="summary-item">

    <div class="summary-icon">✅</div>

    <div class="summary-label">
        Attempted
    </div>

    <div class="summary-value">
        ${result.attempted}
    </div>

</div>

<div class="summary-item">

    <div class="summary-icon">🕒</div>

    <div class="summary-label">
        Time Taken
    </div>

    <div class="summary-value">
        ${result.timeTaken}
    </div>

</div>    </div>

</div>
        <div class="result-buttons">

    <button
        id="reviewAnswersBtn"
        class="primary-btn">

        📖 Review Answers

    </button>

    <button
        id="restartTestBtn"
        class="secondary-btn">

        🔄 Restart Test

    </button>

    <button
        id="joinTelegramResult"
        class="telegram-btn">

        📚 For More Testss

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

    <div class="question-content">

        <div class="question-badge">
            Q. ${currentQuestion.index + 1}
        </div>

        <div class="question-text">
            ${renderQuestionText(currentQuestion.question)}
        </div>

    </div>

</div>

<hr class="question-divider">

        <div class="options-box">

    ${renderOptions(currentQuestion, "review")}

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