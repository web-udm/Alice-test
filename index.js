const { Alice, Scene, Stage, Reply } = require('yandex-dialogs-sdk');
const alice = new Alice();
const stage = new Stage();
const SCENE_START_GAME = 'SCENE_START_GAME';
const startGame = new Scene(SCENE_START_GAME);
const quotes = require('./quotes/quotes.json');

alice.command('', async ctx => {
    return Reply.text('Это игра "Угадай цитату из фильма". Все просто: я произношу фразу, а вы называете фильм, ' +
        'в котором она звучала. Начнем?');
});

startGame.command('/^.+$/', ctx => {
    const userAnswer = ctx.message;
    const answer = ctx.session.get('quote'['answer']);

    if (userAnswer === answer) {
        return Reply.text('Круто, ты угадал');
    } else {
        return Reply.text('Ты не угадал. Попробуй есчо');
    }
});

stage.addScene(startGame);
alice.use(stage.getMiddleware());
alice.command(['давай', 'да', 'начнем', 'начать', 'еще', 'дальше'], ctx => {
    ctx.enter(SCENE_START_GAME);
    ctx.session.set('quote', quotes["godfather-1"]);
    return Reply.text("Хорошо" + ctx.session.get('quote'['quote']));
});

alice.any(async ctx => Reply.text('Простите, не поняла вас'));

const server = alice.listen(3001, '/');