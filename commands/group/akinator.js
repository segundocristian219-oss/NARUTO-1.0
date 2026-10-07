const API_URL = 'https://dix.lat';
const activeGames = Object.create(null);
const ANSWERS = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4
};

const answerNames = {
    1: 'Sí',
    2: 'No',
    3: 'No lo sé',
    4: 'Probablemente sí',
    5: 'Probablemente no'
};

function getGame(chatId) {
    return activeGames[chatId];
}

function deleteGame(chatId) {
    const game = activeGames[chatId];
    if (!game) return;
    if (game.timeout) {
        clearTimeout(game.timeout);
    }
    delete activeGames[chatId];
}

function createTimeout(chatId, sock) {
    return setTimeout(async () => {
        const game = activeGames[chatId];
        if (!game) return;
        delete activeGames[chatId];
        try {
            await sock.sendMessage(chatId, {
                text: `✎ *Tiempo agotado.*\nLa partida de *Akinator* ha terminado porque no hubo respuesta.`
            });
        } catch {}
    }, 120000);
}

function restartTimeout(chatId, sock) {
    const game = activeGames[chatId];
    if (!game) return;
    if (game.timeout) {
        clearTimeout(game.timeout);
    }
    game.timeout = createTimeout(chatId, sock);
}

function buildQuestion(data) {
    const progress = typeof data.progress === 'number' ? Math.round(data.progress) : 0;
    return `「✿」*AKINATOR*

> ${data.question} (*${progress}%*)

1 » Sí
2 » No
3 » No lo sé
4 » Probablemente sí
5 » Probablemente no

_Responde únicamente con un número del 1 al 5._`;
}

async function requestAkinator(params) {
    const url = new URL('/v1/aki', API_URL);
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data || data.success === false) {
        throw new Error(data?.message || data?.error || 'La API rechazó la solicitud.');
    }
    return data;
}

async function startGame(chatId, userId, sock) {
    const data = await requestAkinator({
        action: 'start',
        region: 'es'
    });
    if (!data.session || !data.signature || !data.baseUrl) {
        throw new Error('La API no devolvió los datos necesarios para iniciar la partida.');
    }
    activeGames[chatId] = {
        user: userId,
        session: data.session,
        signature: data.signature,
        step: data.step ?? 0,
        sid: data.sid,
        baseUrl: data.baseUrl,
        question: data.question,
        progress: data.progress ?? 0,
        timeout: null
    };

    activeGames[chatId].timeout = createTimeout(chatId, sock);

    return data;
}

async function answerGame(chatId, answer, sock) {
    const game = activeGames[chatId];

    if (!game) {
        throw new Error('No hay una partida activa.');
    }

    const data = await requestAkinator({
        action: 'answer',
        region: 'es',
        session: game.session,
        signature: game.signature,
        step: game.step,
        answer,
        baseUrl: game.baseUrl
    });

    if (data.isWin) {
        deleteGame(chatId);
        return data;
    }

    if (!data.question) {
        deleteGame(chatId);
        throw new Error('La API no devolvió la siguiente pregunta.');
    }

    game.step = data.step ?? game.step + 1;
    game.question = data.question;
    game.progress = data.progress ?? game.progress;

    if (data.session) {
        game.session = data.session;
    }

    if (data.signature) {
        game.signature = data.signature;
    }

    if (data.baseUrl) {
        game.baseUrl = data.baseUrl;
    }

    if (data.sid !== undefined) {
        game.sid = data.sid;
    }

    restartTimeout(chatId, sock);

    return data;
}

export default {
    command: ['akinator', 'aki'],
    category: 'games',
    description: 'Juega una partida de Akinator.',
    before: async ({ msg, sock }) => {
        const chatId = msg.chat;
        const game = getGame(chatId);
        if (!game) {
            return;
        }
        const text = msg.text?.trim();
        if (!text) return;

        const answerNumber = Number(text);

        if (!Number.isInteger(answerNumber) || !(answerNumber in ANSWERS)) {
    return;
}

        if (msg.sender !== game.user) {
            return true;
        }

        try {
            const answer = ANSWERS[answerNumber];
            const data = await answerGame(chatId, answer, sock);

            if (data.isWin) {
                const name = data.suggestion_name || 'Desconocido';
                const description = data.suggestion_desc || 'Sin información';
                const photo = data.suggestion_photo;
                const text = `ꕥ *¡Creo que lo tengo!*

➩ *${name}*
❀ ${description}`;

                if (photo) {
                    try {
                        await sock.sendMessage(chatId, { image: { url: photo }, caption: text }, { quoted: msg });
                    } catch {
                        await msg.reply(text);
                    }
                } else {
                    await msg.reply(text);
                }
                return true;
            }
            await msg.reply(buildQuestion(data));
        } catch (e) {
            deleteGame(chatId);
            await msg.reply(`⚠︎ Se ha producido un problema con *Akinator*.\n\n> [Error: *${e.message}*]`);
        }
        return true;
    },

    run: async ({ msg, sock, usedPrefix, command }) => {
        try {
            const chatId = msg.chat;
            const userId = msg.sender;
            const currentGame = getGame(chatId);
            if (currentGame) {
                if (currentGame.user === userId) {
                    return msg.reply(
                        `「✿」 Ya tienes una partida de *Akinator* activa.\n\n` +
                        `> *${currentGame.question}*\n\n` +
                        `Responde con un número del *1 al 5*.\n\n` +
                        `_La partida termina automáticamente después de 2 minutos sin respuesta._`
                    );
                }
                return msg.reply(`《✧》 Ya hay una partida de *Akinator* en curso en este grupo.\n\n> Espera a que termine antes de iniciar otra.`);
            }
            const data = await startGame(chatId, userId, sock);
            await msg.reply(buildQuestion(data));

        } catch (e) {
            deleteGame(msg.chat);
            return msg.reply(`⚠︎ No se pudo iniciar *Akinator*.\n\n> [Error: *${e.message}*]`);
        }
    }
};