const STORAGE_KEY = "AJ_CBT_PORTAL_STATE";

function saveState(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

function loadState() {
    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );
    } catch {
        return null;
    }
}

function clearState() {
    localStorage.removeItem(STORAGE_KEY);
}