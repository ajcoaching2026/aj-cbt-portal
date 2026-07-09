let questions = [];

let currentQuestion = 0;
let examStartTime = 0;
let currentCsvUrl = CONFIG.CSV_URL;
const urlParams = new URLSearchParams(window.location.search);

const testCode = urlParams.get("test");
async function loadQuestions() {
    try {
        if (testCode) {
    
    const configResponse =
        await fetch(CONFIG.MASTER_CONFIG_URL);
    
    const configCsv =
        await configResponse.text();
    
    const configRows =
        Papa.parse(configCsv, {
            header: false,
            skipEmptyLines: true
        }).data;
    
    const match =
        configRows
        .slice(1)
        .find(row =>
            row[0].trim() === testCode &&
    row[3].trim().toUpperCase() === "YES"
        );
    
    if (match) {
        
        currentCsvUrl = match[1];
        console.log("Loaded Test:", testCode);
console.log("CSV URL:", currentCsvUrl);
        
    } else {
        
        alert("Test Not Found");
        
        return;
        
    }
    
}
        showLoading();

        const response = await fetch(currentCsvUrl);
        const csvText = await response.text();

const parsed = Papa.parse(
    csvText,
    {
        header: false,
        skipEmptyLines: true
    }
);

const rows = parsed.data;
        const headers = rows[0];
    
        questions = rows.slice(1).map(row => ({
            question: (row[1] || "")
    .replace(
        /_(.*?)_/g,
        "<u>$1</u>"
    ),
            option1: (row[2] || "")
    .replace(/_(.*?)_/g, "<u>$1</u>"),
    
    option2: (row[3] || "")
    .replace(/_(.*?)_/g, "<u>$1</u>"),
    
    option3: (row[4] || "")
    .replace(/_(.*?)_/g, "<u>$1</u>"),
    
    option4: (row[5] || "")
    .replace(/_(.*?)_/g, "<u>$1</u>"),
            
            explanation: (row[7] || "")
    .replace(
        /_(.*?)_/g,
        "<u>$1</u>"
    ),
    topicTadka: (row[8] || ""),
            aiAnswer: row[12] || "",
           answerNumber: row[13] || "",
examName: row[15] || "",
    telegramLink: row[19] || "",
totalTimeMinutes:
    parseInt(row[20]) || "",
positiveMarks: parseFloat(row[21]) || 1,
negativeMarks: parseFloat(row[22]) || 0,
            option5Text: row[23] || "",
            instructionsHindi: row[24] || "",
            instructionEnglish: row[25] || "",
            subject: row[26] || "",
topic: row[27] || "",
difficulty: row[28] || "",
questionImage: row[29] || "",
solutionImage: row[30] || "",
pauseAllowed: row[31] || "",
showResultInstantly: row[32] || "",
testType: row[33] || "",
watermarkText: row[34] || "",
customTheme: row[35] || "",
questionSource: row[36] || "",
            userAnswer: "",
            review: false
        }));

        if (!questions.length) {
            alert("No Questions Found");
            return;
        }

        setTimeout(() => {
            showLanding(
                questions[0].examName ||
                CONFIG.APP_NAME
            );

            bindLandingEvents();
        }, 1000);

    } catch (err) {
        console.error(err);
        alert("CSV Loading Failed");
    }
}

function bindLandingEvents() {

    const tgBtn =
        document.getElementById("joinTelegram");

    if (tgBtn) {
        tgBtn.onclick = () =>
            window.open(
                CONFIG.TELEGRAM_URL,
                "_blank"
            );
    }

    const startBtn =
        document.getElementById("startExam");

    if (startBtn) {
        startBtn.onclick = () => {

            showInstructions(
                questions[0]
                    .instructionsHindi,
                questions[0]
                    .instructionEnglish
            );

            const beginBtn =
                document.getElementById(
                    "beginTest"
                );

            if (beginBtn) {

                beginBtn.onclick = () => {
                    
examStartTime = Date.now();

                    let totalSeconds;

if (questions[0].totalTimeMinutes) {
    
    totalSeconds =
        questions[0].totalTimeMinutes * 60;
    
} else {
    
    totalSeconds =
        questions.length * 60;
    
}

startTimer(totalSeconds);

renderQuestion();
                };
            }
        };
    }
}

function renderQuestion() {

    showExam(
        questions[currentQuestion],
        currentQuestion,
        questions.length
    );

    bindQuestionEvents();
}

document.addEventListener(
    "DOMContentLoaded",
    loadQuestions
);
function bindQuestionEvents() {

    document
        .querySelectorAll(".option-btn")
        .forEach(btn => {

            btn.onclick = () => {

                questions[currentQuestion]
                    .userAnswer =
                    btn.dataset.option;
                renderQuestion();
            };
        });

    const nextBtn =
    document.getElementById("nextBtn");

if (
    nextBtn &&
    currentQuestion ===
    questions.length - 1
) {
    
    nextBtn.textContent =
        "🚀 Finish Test";
    
}

if (nextBtn) {
    
    nextBtn.onclick = () => {
        
        if (
            currentQuestion ===
            questions.length - 1
        ) {
            
            document
                .getElementById("paletteSubmitBtn")
                ?.click();
            
            return;
            
        }
        
        currentQuestion++;
        renderQuestion();
        
    };
    
}

    const prevBtn =
        document.getElementById("prevBtn");

    if (prevBtn) {

        prevBtn.onclick = () => {

            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
            }
        };
    }

    const reviewBtn =
        document.getElementById("reviewBtn");

    if (reviewBtn) {

        reviewBtn.onclick = () => {

            questions[currentQuestion]
                .review =
                !questions[currentQuestion]
                    .review;

            renderQuestion();
        };
    }
const openPalette =
    document.getElementById(
        "openPalette"
    );

const closePalette =
    document.getElementById(
        "closePalette"
    );

const paletteDrawer =
    document.getElementById(
        "paletteDrawer"
    );

if (
    openPalette &&
    paletteDrawer
) {
    
    openPalette.onclick = () => {
        
        paletteDrawer.classList.add(
            "show-palette"
        );
        
    };
    
}

if (
    closePalette &&
    paletteDrawer
) {
    
    closePalette.onclick = () => {
        
        paletteDrawer.classList.remove(
            "show-palette"
        );
        
    };
    
}

document
    .querySelectorAll(
        ".palette-btn"
    )
    .forEach(btn => {
        
        btn.onclick = () => {
            
            currentQuestion =
                parseInt(
                    btn.dataset.index
                );
            
            renderQuestion();
            
        };
        
    });
    const paletteSubmitBtn =
    document.getElementById(
        "paletteSubmitBtn"
    );

if (paletteSubmitBtn) {paletteSubmitBtn.onclick = () => {
    
    const answered =
        questions.filter(
            q => q.userAnswer
        ).length;
    
    const reviewed =
    questions.filter(
        q => q.review
    ).length;
    
    const unanswered =
        questions.length -
        answered;
    
    showSubmitModal(
    answered,
    unanswered,
    reviewed
);
    
};}
 

}

function bindResultEvents() {

    const reviewBtn =
        document.getElementById(
            "reviewAnswersBtn"
        );

    if (reviewBtn) {

        reviewBtn.onclick = () => {

            showReviewScreen(0);

        };
    }

    const restartBtn =
        document.getElementById(
            "restartTestBtn"
        );

    if (restartBtn) {

        restartBtn.onclick = () => {

            location.reload();

        };
    }

    const tgBtn =
        document.getElementById(
            "joinTelegramResult"
        );

    if (tgBtn) {

        tgBtn.onclick = () => {

            window.location.href =
    CONFIG.TELEGRAM_URL;
        };
    }

    
}
function showSubmitModal(
    answered,
    unanswered,
    reviewed
) {
    
    const old =
        document.getElementById(
            "submitModal"
        );
    
    if (old) {
        old.remove();
    }
    
    document.body.insertAdjacentHTML(
        "beforeend",
        
        `<div id="submitModal" class="submit-overlay">

<div class="submit-modal">

<div class="submit-row">

<span class="submit-icon">🕒</span> Time Left

<span id="submitTime">
${document.getElementById("global-timer")?.innerText || ""}
</span>

</div>

<div class="submit-row">

<span class="submit-icon">✓</span> Attempted

<span>${answered}</span>

</div>

<div class="submit-row">

<span class="submit-icon">○</span> Unattempted
<span>${unanswered}</span>

</div>

<div class="submit-row">

<span class="submit-icon">☆</span> Marked

<span>${reviewed}</span>

</div>

<div class="submit-row">

<span class="submit-icon orange-dot"></span> No option selected

<span>${unanswered}</span>

</div>

<div class="submit-text">

Are you sure you want to submit the test?

</div>

<div class="submit-buttons">

<button id="confirmSubmit">

Yes

</button>

<button id="cancelSubmit">

No

</button>

</div>

</div>

</div>`);
    
    document
        .getElementById("cancelSubmit")
        .onclick = () => {
            
            document
                .getElementById("submitModal")
                .remove();
            
        };
    
    document
        .getElementById("confirmSubmit")
        .onclick = () => {
            
            document
                .getElementById("submitModal")
                .remove();
            
            const result =
                calculateResult();
            
            showResult(result);
            
            bindResultEvents();
            
        };
    
}
