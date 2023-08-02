const chat = document.querySelector(".chat-widget");
const input = chat.querySelector(".chat-widget__input");
const chatArea = chat.querySelector(".chat-widget__messages");
const container = chat.querySelector(".chat-widget__messages-container");
let timeOut = null;

const botMessageList = [
    "Добрый день",
    "До свидания",
    "Вам помочь?",
    "yare yare daze",
]

function getTimeNow() {
    const time = new Date(Date.now());
    return `${time.getHours()}:${time.getMinutes()}`;
}

function createUserMessage(message) {
    const time = getTimeNow();
    return `
        <div class="message message_client">
            <div class="message__time">${time}</div>
            <div class="message__text">${message}</div>
        </div>
    `;
}

function createBotMessage(message) {
    const time = getTimeNow();
    return `
        <div class="message">
            <div class="message__time">${time}</div>
            <div class="message__text">${message}</div>
        </div>
    `;
}

function getRandomBotMessage(botMessageList) {
    return botMessageList[Math.floor(Math.random() * botMessageList.length)];
}

chat.addEventListener("click", event => {
    chat.classList.add("chat-widget_active");
});

chat.addEventListener("keydown", event => {
    if(event.code !== "Enter") {
        return;
    }

    if(input.value.length === 0) {
        return;
    }

    chatArea.innerHTML += createUserMessage(input.value);
    chatArea.innerHTML += createBotMessage(getRandomBotMessage(botMessageList));
    
    input.value = "";
    container.scrollTop = container.scrollHeight;
});



input.addEventListener("focus", event => {
    timeOut = setTimeout(() => {
        chatArea.innerHTML += createBotMessage("Есть вопрос?");
    }, 30000);
});


input.addEventListener("blur", event => {
    clearTimeout(timeOut);
});