const P = require("pino")
const fs = require('fs')
const fetch = require('node-fetch')
const { default: makeWASocket, generateWAMessageFromContent, DisconnectReason, AnyMessageContent, relayMessage, delay, useSingleFileAuthState, makeInMemoryStore } = require('@adiwajshing/baileys-md')
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })
store.readFromFile('./baileys-md.json')
setInterval(() => {
	store.writeToFile('./baileys-md.json')
}, 10_000)
const { state, saveState } = useSingleFileAuthState('./session-md.json')

// start a connection
const startSock = () => {
    
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Rzx Bot','Chrome','1.0.0'],
        auth: state
    })
    
    store.bind(sock.ev)

    sock.ev.on('messages.upsert', async m => {
        //console.log(JSON.stringify(m, undefined, 2))
        
        const msg = m.messages[0]
        require('./choco.js')(sock, msg, m)
        //await sock.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [msg.key.id])
    })

    sock.ev.on('messages.update', m => console.log(m))
    sock.ev.on('presence.update', m => console.log(m))
    sock.ev.on('chats.update', m => console.log(m))
    sock.ev.on('contacts.update', m => console.log(m))

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startSock() : console.log('Koneksi Terputus...')
        }
        console.log('Connection Update', update)
    })
    
    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveState)
    
    sock.sendMessageFromContent = async(mess, obj, opt = {}) => {
    let prepare = await generateWAMessageFromContent(typeof mess == 'object'?mess.key.remoteJid: mess, obj, opt)
    await sock.relayMessage(prepare.key.remoteJid, prepare.message, {
      messageId: prepare.key.id
    })
    return prepare
    }
    
    sock.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await sock.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    sock.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await sock.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    
    sock.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await sock.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    sock.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await sock.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    sock.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await sock.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    return sock
}

startSock()
