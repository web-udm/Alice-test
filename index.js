const { Alice, Reply } = require('yandex-dialogs-sdk');
const alice = new Alice();

alice.any( async ctx => {
    return Reply.text('Это игра "Угадай цитату из фильма". Все просто: я произношу фразу, а вы называете фильм, ' +
        'в котором она звучала. Начнем?');
});

const server = alice.listen(3001, '/');