let questions = [];
let currentQuestion = 0;

async function loadQuestions() {
    try {
        showLoading();

        const response = await fetch(CONFIG.CSV_URL);
        const csvText = await response.text();

const rows = csvText
    .trim()
    .split("\n")
    .map(row => {
        const matches = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(cell => cell.replace(/^"|"$/g, "")) : [];
    });

        const headers = rows[0];

        questions = rows.slice(1).map(row => ({
            question: row[1] || "",
            option1: row[2] || "",
            option2: row[3] || "",
            option3: row[4] || "",
            option4: row[5] || "",
            
            explanation: row[7] || "",
            aiAnswer: row[12] || "",
            answerNumber: row[13] || "",
            examName: row[15] || "",
            telegramLink: row[19] || "",
            timePerQuestion: parseInt(row[20]) || 60,
            positiveMarks: parseFloat(row[21]) || 1,
            negativeMarks: parseFloat(row[22]) || 0,
            option5Text: row[23] || "",
            instructionsHindi: row[24] || "",
            instructions4: row[25] || "",
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
                    .instructions4
            );

            const beginBtn =
                document.getElementById(
                    "beginTest"
                );

            if (beginBtn) {

                beginBtn.onclick = () => {
                    

                    const totalSeconds =
                        questions.reduce(
                            (sum, q) =>
                                sum +
                                q.timePerQuestion,
                            0
                        );

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

    if (nextBtn) {

        nextBtn.onclick = () => {

            if (
                currentQuestion <
                questions.length - 1
            ) {
                currentQuestion++;
                renderQuestion();
            }
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

    const submitBtn =
        document.getElementById(
            "submitExam"
        );

    if (submitBtn) {

    submitBtn.onclick = () => {

    const result =
        calculateResult();

    showResult(result);
    bindResultEvents();

};

    };

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

            window.open(
                CONFIG.TELEGRAM_URL,
                "_blank"
            );

        };
    }
}