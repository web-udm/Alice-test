const { Alice, Reply } = require('yandex-dialogs-sdk');
const alice = new Alice();

alice.any(async ctx => Reply.text('Привет, я мяви-какави'));

const server = alice.listen(3001, '/');