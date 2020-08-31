if (document.getElementById('userNameOverflow').textContent.trim() != "Login")
    chrome.runtime.sendMessage({ greeting: 'startQuiz' });