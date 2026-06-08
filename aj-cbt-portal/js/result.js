function calculateResult() {

    let total =
        questions.length;

    let attempted =
        questions.filter(
            q => q.userAnswer !== ""
        ).length;

    let unattempted =
        total - attempted;

    let correct = 0;
    let wrong = 0;

    questions.forEach(q => {

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

    let percentage =
        total > 0
            ? (
                correct / total
              ) * 100
            : 0;

    return {

        total,
        attempted,
        unattempted,
        correct,
        wrong,
        score,
        percentage:
            percentage.toFixed(2)

    };

}