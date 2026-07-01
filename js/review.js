function getReviewQuestions() {

    return questions.filter(
        q => q.review === true
    );

}

function getReviewedCount() {

    return questions.filter(
        q => q.review === true
    ).length;

}

function toggleReview(questionIndex) {

    questions[questionIndex].review =
        !questions[questionIndex].review;

}

function clearReview(questionIndex) {

    questions[questionIndex].review = false;

}

function isReviewMarked(questionIndex) {

    return questions[questionIndex].review === true;

}
function getReviewSummary() {

    const reviewed =
        getReviewQuestions();

    return {

        totalReviewed:
            reviewed.length,

        reviewedQuestions:
            reviewed

    };

}
function hasReviewedQuestions() {

    return (
        getReviewedCount() > 0
    );

}
function getNextReviewedQuestion(
    currentIndex
) {

    for (
        let i =
            currentIndex + 1;
        i < questions.length;
        i++
    ) {

        if (
            questions[i].review
        ) {

            return i;

        }

    }

    return -1;

}
function getPreviousReviewedQuestion(
    currentIndex
) {

    for (
        let i =
            currentIndex - 1;
        i >= 0;
        i--
    ) {

        if (
            questions[i].review
        ) {

            return i;

        }

    }

    return -1;

}