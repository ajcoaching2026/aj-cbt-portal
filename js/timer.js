let totalTime = 0;
let remainingTime = 0;
let timerInterval = null;

function startTimer(seconds) {

    totalTime = seconds;
    remainingTime = seconds;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        remainingTime--;

        const timerEl =
            document.getElementById("global-timer");

        if (timerEl) {

            const min =
                Math.floor(remainingTime / 60);

            const sec =
                remainingTime % 60;

            timerEl.innerText =
                `${min}:${sec
                    .toString()
                    .padStart(2, "0")}`;
        }

        if (remainingTime <= 0) {

            clearInterval(timerInterval);

            if (
                typeof finishExam === "function"
            ) {
                finishExam();
            }
        }

    }, 1000);
}

function stopTimer() {

    clearInterval(timerInterval);
}