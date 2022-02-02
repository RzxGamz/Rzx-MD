const 
     { 
          baileys, 
          delay, 
          generateForwardMessageContent, 
          prepareWAMessageMedia,
          generateWAMessageFromContent, 
          relayMessage,
          generateMessageID, 
          downloadContentFromMessage,
          BufferJSON, 
          WA_DEFAULT_EPHEMERAL,
          downloadHistory, 
          WAProto,
          proto, 
          getMessage, 
          generateWAMessageContent
     } = require("@adiwajshing/baileys-md")
const fs = require("fs")
const cheerio = require("cheerio")
const moment = require("moment-timezone")
const { exec, spawn } = require("child_process")
const axios = require('axios')
const fetch = require('node-fetch')
const util = require('util')
const brainly = require('brainly-scraper')
const google = require('google-it')
const ytsearch = require('yt-search')

const { kompas, inews, youtube, facebook, quotes, igdl, igdl2, igstalk, igstory, tiktok, twitter, joox, covid, pin, pinterest, wallpaper, wikimedia, porno, hentai, quotesAnime, listsurah, surah, tafsirsurah, film, manga, anime, character, jadwalbola, jadwaltv, jadwalsholat, drakor, otakudesu, ongoing, komiku, tebakgambar, sholat, lirik, chara, wattpad, playstore, linkwa, telesticker, stickersearch, webtoon, surah2, fbdown, twitter2, upload } = require("./lib/scrape")
const { kyun, clockString, fetchJson, fetchText, jsonformat, randomNomor, sleep, getBuffer, getGroupAdmins, getRandom } = require("./lib/funct")
const { color, bgcolor } = require("./lib/color")

const ownerNumber = ["62882250664733@s.whatsapp.net","6283894905341@s.whatsapp.net"]
const imgRzx3d = fs.readFileSync('/sdcard/Download/rzxbot3d.jpg')
const imgRzxneon = fs.readFileSync('/sdcard/Download/rzxbotneon.jpg')
const imgRzxtw = fs.readFileSync('/sdcard/Download/rzxbottw.jpg')

module.exports = async(sock, msg, m) => {
	try {
		const from = msg.key.remoteJid
		const type = Object.keys(msg.message)[0]
        const content = JSON.stringify(msg.message)
        const chats = (type === 'conversation') ? msg.message.conversation : (type == 'imageMessage') ? msg.message.imageMessage.caption : (type == 'videoMessage') ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : ''
        const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα¦|/\\©^]/.test(chats) ? chats.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα¦|/\\©^]/gi) : '/'
        const command = chats.toLowerCase().split(' ')[0] || '' //const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
	    const args = chats.split(' ')
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const isPrivate = msg.key.remoteJid.endsWith('@s.whatsapp.net')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
        const senderNumber = sender.split("@")[0] 
        const pushname = msg.pushName
        const isCmd = chats.startsWith(prefix)
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.m || quoted).mimetype || ''
		const isMedia = /image|video|sticker|audio/.test(mime)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
	    const groupName = isGroup ? groupMetadata.subject : ''
	    const groupId = isGroup ? groupMetadata.id : ''
	    const groupMembers = isGroup ? groupMetadata.participants : ''
	    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
	    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
	    const isBotAdmins = groupAdmins.includes(botNumber) || false
	    const isGroupAdmins = groupAdmins.includes(sender) || false
	    const isAdmin = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender) || false
        const isWelcome = false
        const ucapan = "Selamat "+ moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const times = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss')
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
        const more = String.fromCharCode(8206)
		const readmore = more.repeat(4001)
		
		sock.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        if (!isWelcome) return
        try {
            let metadata = await sock.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                try {
                    ppuser = await sock.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                if (anu.action == 'add') {
                    sock.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}` })
                } else if (anu.action == 'remove') {
                    sock.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}` })
                }
            }
        } catch (err) {
            console.log(err)
            }
        })
        
//=========================================================================================//

        myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        myDays = ['Minggu','Senin','Selasa','Rabu','Kamis',"Jum'at",'Sabtu'];
        var tgl = new Date();
        var detik = tgl.getSeconds();
        var menit = tgl.getMinutes();
        var jam = tgl.getHours();
	    var ampm = jam >= 12 ? 'PM' : 'AM';
	    var day = tgl.getDate()
	    var bulan = tgl.getMonth()
	    var thisMonth = myMonths[bulan];
	    var thisDay = tgl.getDay()
	    var thisDay = myDays[thisDay];
	    var yy = tgl.getYear()
	    var year = (yy < 1000) ? yy + 1900 : yy;

        const mess = {
        	wait: "Loading...",
            sukses: "Sukses",
            error: "Maaf kak fitur ini error\n\nKamu bisa melaporkan nya ke owner dengan ketik */report (isi pesan)*",
            invL: "Masukkan link!",
            invQ: "Masukkan query!",
            owner: "Fitur ini khusus owner!",
            group: "Fitur ini hanya bisa di grup!",
            private: "Fitur ini hanya bisa di private chat!",
            admin: "Fitur ini hanya bisa di gunakan oleh admin!",
            botAdmin: "Fitur ini hanya bisa di gunakan ketika bot menjadi admin!"
        }
        
        const fvimg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "fileLength": "50000000000", "viewOnce": true } }, "status": "DELIVERY_ACK" }
        const fvvid = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "videoMessage": { "title": `Choco Bot`,"h": `Choco Bot`,'duration': '99999','caption': `Choco Bot`,"viewOnce": true }}, "status": "SERVER_ACK"}
        
        const faketroli =  {
                key: {
			       fromMe: false,
			       participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "16505434800@s.whatsapp.net" } : {})
		        },
		   message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": imgRzx3d
					},
					"title": "Rzx Bot",
					"description": "@Rzxgamz", 
					"currencyCode": "USD",
					"priceAmount1000": "5000000",
					"salePriceAmount1000": "500",
					"url": "https://github.com/RzxGamz",
					"retailerId": `000000`,
					"productImageCount": 5
				},
				    "businessOwnerJid": `0@s.whatsapp.net`
		            }
	            }
            }
        
        const reply = (teks) => {
        	return sock.sendMessage(from, { text: teks }, { quoted: msg })
        }
       
        const sendMess = (msg, teks, men, qwt) => {
             return sock.sendMessage(typeof msg == 'object'?msg.key.remoteJid: typeof msg == 'object'? msg.key.remoteJid: msg, { text: teks, mentions: men ? men : [] }, { quoted: qwt ? qwt : msg })
        }
       
        const sendFileFromUrl = async (from, url, caption, msg, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return sock.sendMessage(from, { video: await getBuffer(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
            }
            let type = mime.split("/")[0]+"Message"
            if(mime === "application/pdf"){
                return sock.sendMessage(from, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, mentions: men ? men : []}, {quoted: msg })
            }
            if(mime.split("/")[0] === "image"){
                return sock.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "video"){
                return sock.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "audio"){
                return sock.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio'}, {quoted: msg })
            }
        }
        
        function randomNo (angka) {
           return Math.floor(Math.random() * angka) + 1
        }
        
//=========================================================================================//
        
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuoted = (type == 'extendedTextMessage')
        
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        
        if (!msg.key.fromMe) return
        if (chats) { console.log(color("[ MESSAGE ]  ", "yellow"), color(time), "Pesan: ", color(chats), "||", "Type: ", color(type), "||", "In: ", color(from)) }
        
        switch (command) {
        
        case prefix+'menu': case prefix+'help': 
        menu = 
`*Hi ${pushname}*
*${ucapan}*

*Downloader*
• ${prefix}play
• ${prefix}ytsearch
• ${prefix}youtube
• ${prefix}ytmp4
• ${prefix}ytmp3
• ${prefix}tiktok
• ${prefix}brainly
• ${prefix}igstalk

*News*
• ${prefix}kompas
• ${prefix}inews

*Jadwal*
• ${prefix}jadwalbola
• ${prefix}jadwaltv
• ${prefix}jadwalsholat

*Search*
• ${prefix}pinterest
• ${prefix}wikimedia
• ${prefix}film
• ${prefix}anime
• ${prefix}manga
• ${prefix}character
• ${prefix}drakor

*Surah*
• ${prefix}listsurah
• ${prefix}surah
• ${prefix}tafsirsurah

*Other*
• ${prefix}simi
• ${prefix}chat
• ${prefix}hidetag
• ${prefix}spam
• ${prefix}get
• ${prefix}tinyurl
• ${prefix}readmore
• ${prefix}upsw

*Broadcast*
• ${prefix}bc
• ${prefix}bclink
• ${prefix}bclist
`
        sock.sendMessageFromContent(from, {
             templateMessage: {
                 hydratedTemplate: {
                   hydratedContentText: menu,
                   locationMessage: { 
                   jpegThumbnail: imgRzxneon },
                   hydratedFooterText: "Rzx Bot",
                   hydratedButtons: [
                  {index: 1, urlButton: {displayText: 'Script', url: 'https://github.com/RzxGamz'}},
                  {index: 2, quickReplyButton: {displayText: 'OWNER', id: '/owner'}},
                  {index: 3, quickReplyButton: {displayText: 'DONASI', id: '/donasi'}},
                  ]
        }}}, { quoted: fvvid })
        break

        // Downloader
        case prefix+'play': 
        if (!q) return reply(mess.invQ)
		datas = await ytsearch(q);
		res = datas.all 
        txt = `𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙋𝙇𝘼𝙔\n\n• Title: ${res[0].title}\n• Durasi: ${res[0].timestamp}\n• Upload: ${res[0].ago}\n• Views: ${res[0].views}\n• Link: ${res[0].url}`
        sock.sendMessage(from, { caption: txt, image: { url: res[0].image }, buttons: [{buttonId:`.ytmp4 ${res[0].url}`,buttonText:{displayText:`VIDEO`},type:1},{buttonId:`.ytmp3 ${res[0].url}`,buttonText:{displayText:`AUDIO`},type:1}], headerType: 'IMAGE' }, { quoted: msg })
        break
        case prefix+'ytsearch': case prefix+'yts':
		if (!q) return reply(mess.invQ)
    	datas = await ytsearch(q);
    	res = datas.all 
        txt = "𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙋𝙇𝘼𝙔\n\n"
        datas.all.map((vid) => {
        txt += `• Title: ${vid.title}\n`
        txt += `• Durasi: ${vid.timestamp}\n`
        txt += `• Upload: ${vid.ago}\n`
        txt += `• Link: ${vid.url}\n\n`
        })
        sock.sendMessage(from, { image: { url: res[0].image }, caption: txt }, { quoted: msg })
        break
        case prefix+'youtube': case prefix+'ytdl': case prefix+'yt':
        if (!q) return reply(mess.invL)
        if (!q.includes('youtu.be') && !q.includes('youtube.com')) return reply("Pastikan link sudah benar!")
        reply(mess.wait)
        youtube(q).then(async res => {
    	txt = `• Title : ${res.title}\n• Quality : ${res.quality}\n• Link : ${res.link}`
        sock.sendMessage(from, { caption: txt, image: { url: res.thumb }, buttons: [{buttonId:`.ytmp4 ${q}`,buttonText:{displayText:`VIDEO (${res.size})`},type:1},{buttonId:`.ytmp3 ${q}`,buttonText:{displayText:`AUDIO (${res.size_mp3})`},type:1}], headerType: 'IMAGE' }, { quoted: msg })
        }).catch(e => reply(e))
        break
        case prefix+'ytmp4': case prefix+'youtubemp4': {
        if (!q) return reply(mess.invL)
        if (!q.includes('youtu.be') && !q.includes('youtube.com')) return reply("Pastikan link sudah benar!")
        reply(mess.wait)
        youtube(q).then(async res => {
        	if (res.sizeN >= 20) return reply(`*Tidak dapat mendownload video*\nSize terdeteksi melebihi 20 MB\nSilahkan download sendiri\n${res.link}`)
        sock.sendVideo(from, res.link, '', msg, false, { fileLength: "50000000000" })
        }).catch(e => reply(e))}
        break
        case prefix+'ytmp3': case prefix+'youtubemp3': {
        if (!q) return reply(mess.invL)
        if (!q.includes('youtu.be') && !q.includes('youtube.com')) return reply("Pastikan link sudah benar!")
        reply(mess.wait)
        youtube(q).then(async res => {
        	if (res.sizeNMp3 >= 20) return reply(`*Tidak dapat mendownload audio*\nSize terdeteksi melebihi 20 MB\nSilahkan download sendiri\n${res.mp3}`)
        sock.sendAudio(from, res.mp3, msg, false, { fileLength: "50000000000" })
        }).catch(e => reply(e))}
        break
        case prefix+'tiktok': case prefix+'tiktokdl': case prefix+'tiktoknowm': {
        if (!q) return reply(mess.invL)
        if (!q.includes('tiktok.com')) return reply("Pastikan link sudah benar!")
        reply(mess.wait)
        tiktok(`${q}`).then(async res => {
        sock.sendMessage(from, { caption: `• Nowm: ${res.nowm}\n• Wm: ${res.wm}\n• Audio: ${res.audio}`, video: { url: res.nowm }, buttons: [{buttonId:`.ttaud ${q}`,buttonText:{displayText:`AUDIO`},type:1}], headerType: 'VIDEO' }, { quoted: msg })
        }).catch(e => reply(e))}
        break
        case prefix+'ttaud': case prefix+'tiktokaud': case prefix+'tiktokaudio': {
        reply(mess.wait)
        tiktok(`${q}`).then(async res => {
        sock.sendAudio(from, res.audio, msg, false)
        }).catch(e => reply(e))}
        break
        case prefix+'brainly': {
        	if (!q) return reply("Masukkan pertanyaan")
        	reply(mess.wait)
        	brainly(q).then(async res => {
        	let txt = `Brainly\n\n`
        	for (let p of res.data) {
        	txt += `• Pertanyaan : ${p.pertanyaan}\n• Jawaban : ${p.jawaban[0].text}\n\n`
            }
        sock.sendMessage(from, { text: txt }, { quoted: msg })
        }).catch(e => reply(e)) }
        break
        case prefix+'igdl': case prefix+'ig': {
        	if (!q) return reply(mess.invL)
            reply(mess.wait)
            igdl2(q).then(async data => {
            	for (let res of data) {
            	if (res.type === 'image') {
            	sock.sendMessage(from, { image: { url: res.downloadUrl }, caption: res.url }, { quoted: msg })
            } else if (res.type === 'video') {
            	sock.sendMessage(from, { video: { url: res.downloadUrl }, caption: res.url }, { quoted: msg })
            } else {
            	reply("Error type is not defined")
            }
          }
        }).catch(e => reply(e))}
        break
        case prefix+'igstalk': {
        	if (!q) return reply("Masukkan username")
            reply(mess.wait)
            igstalk(q).then(async res => {
            	let txt = `IG Stalk\n\n• Username : @${res.username}\n• Full Name : ${res.fullName}\n• Bio : ${res.biography}\n• Followers : ${res.followers}\n• Following : ${res.following}\n• Business Account : ${res.isBusinessAccount}\n• Private : ${res.isPrivate}\n• Verified : ${res.isVerified}\n• Jumlah Post : ${res.postsCount}`
            sock.sendMessage(from, { image: { url: res.profilePicHD }, caption: txt }, { quoted: msg })
            }).catch(e => reply(e))
        }
        break
        
        //News
        case prefix+'kompas': case prefix+'kompasnews': {
            kompas().then(async data => {
            let txt = `𝙆𝙤𝙢𝙥𝙖𝙨 𝙉𝙚𝙬𝙨\n\n`
            for (let res of data) {
                txt += `• Judul: ${res.berita}\n`
                txt += `• Di upload: ${res.upload_time}\n`
                txt += `• Type: ${res.type_berita}\n`
                txt += `• Link: ${res.link}\n\n`
            }
            sock.sendMessage(from, { text: txt }, { quoted: msg })
        }).catch(e => reply(e))}
        break
        case prefix+'inews': {
            inews().then(async data => {
            let txt = `𝙄 𝙉𝙚𝙬𝙨\n\n`
            for (let res of data) {
                txt += `• Judul: ${res.berita}\n`
                txt += `• Info: ${res.info_berita}\n`
                txt += `• Di upload: ${res.upload_time}\n`
                txt += `• Link: ${res.link}\n\n`
            }
            sock.sendMessage(from, { text: txt }, { quoted: msg })
        }).catch(e => reply(e))}
        break
        
        //Jadwal
        case prefix+'jadwalbola': {
        	jadwalbola().then(async data => {
        	let txt = "*Jadwal Bola*\n\n"
        	for (let res of data) {
        	txt += `• Jadwal : ${res.jadwal}\n`
            txt += `• Tanggal : ${res.tanggal}\n`
            txt += `• Jam : ${res.jam}\n`
            txt += `• Link : ${res.url}\n\n`
            }
            sock.sendMessage(from, { image: { url: data[0].thumb }, caption: txt }, { quoted: msg })
        }).catch(e => reply(e))}
        break
        case prefix+'jadwaltv': {
        	jadwaltv().then(async data => {
        	let txt = "*Jadwal Acara Televisi*\n\n"
        	for (let res of data) {
        	txt += `• Acara : ${res.acara}\n`
            txt += `• Channel : ${res.channel}\n`
            txt += `• Jam : ${res.jam}\n`
            txt += `• Source : ${res.source}\n\n`
            sock.sendMessage(from, { text: txt }, { quoted: msg })
            }
        }).catch(e => reply(e))}
        break
        case prefix+'jadwalsholat': case prefix+'jadwalsolat': {
        	if (!q) return reply(mess.invQ)
        	jadwalsholat(q).then(async res => {
        	let txt = "*Jadwal Sholat*\n\n"
            txt += `• Tanggal : ${res.tanggal}\n\n`
            txt += `• Imsyak : ${res.imsyak}\n`
            txt += `• Subuh : ${res.subuh}\n`
            txt += `• Dzuhur : ${res.dzuhur}\n`
            txt += `• Ashar : ${res.ashar}\n`
            txt += `• Maghrib : ${res.maghrib}\n`
            txt += `• Isya : ${res.isya}\n`
            sock.sendMessage(from, { text: txt }, { quoted: msg })
        }).catch(e => reply(e))}
        break
        
        //Search
        case prefix+'google': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
            google(q).then(async data => {
            	reply(data)
            }).catch(e => reply(e))
        }
        break
        case prefix+'googlesearch': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
            res = await fetchJson(`https://www.google.com/search?q=${q}`)
            reply(res)
        }
        break
        case prefix+'pinterest': case prefix+'pin': case prefix+'image': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
        	pinterest(q).then(async data => {
        	let url = data[Math.floor(Math.random() * data.length)]
            sock.sendMessage(from, { image: { url: url }, caption: "PINTEREST" }, { quoted: msg })
        	}).catch(e => reply(e))
        }
        break
        case prefix+'wikimedia': case prefix+'wikim': case prefix+'mediawiki': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
        	wikimedia(q).then(async data => {
        	let txt = "WIKIMEDIA\n\n"
        	for (let p of data) {
            txt += `• Title : ${p.title}\n`
            txt += `• Source : ${p.source}\n`
            txt += `• Image : ${p.image}\n\n`
            }
            sock.sendMessage(from, { text: txt }, { quoted: msg })
        	}).catch(e => reply(e))
        }
        break
        case prefix+'film': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
        	film(q).then(async data => {
        	let txt = "FILM\n\n"
        	for (let res of data) {
        	txt += `• Title : ${res.judul}\n`
            txt += `• Quality : ${res.quality}\n`
            txt += `• Type : ${res.type}\n`
            txt += `• Upload : ${res.type}\n`
            txt += `• Link : ${res.link}\n\n`
            }
        sock.sendMessage(from, { image: { url: data[0].thumb }, caption: txt }, { quoted: msg })
        }).catch(e => reply(e))
        }
        break
        case prefix+'anime': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
        	anime(q).then(async data => {
        	let txt = "ANIME\n\n"
        	for (let res of data) {
        	txt += `• Title : ${res.judul}\n`
            txt += `• Link : ${res.link}\n\n`
            }
        sock.sendMessage(from, { image: { url: data[0].thumbnail }, caption: txt }, { quoted: msg })
        }).catch(e => reply(e))
        }
        break
        case prefix+'manga': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
        	manga(q).then(async data => {
        	let txt = "MANGA\n\n"
        	for (let res of data) {
        	txt += `• Title : ${res.judul}\n`
            txt += `• Link : ${res.link}\n\n`
            }
            sock.sendMessage(from, { image: { url: data[0].thumbnail }, caption: txt }, { quoted: msg })
        }).catch(e => reply(e))
        }
        break
        case prefix+'character': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
        	character(q).then(async data => {
        	let txt = "CHARACTER\n\n"
        	for (let res of data) {
        	txt += `• Title : ${res.character}\n`
            txt += `• Thumbnail : ${res.thumbnail}\n`
            txt += `• Link : ${res.link}\n\n`
            }
        sock.sendMessage(from, { text: txt }, { quoted: msg })
        }).catch(e => reply(e))
        }
        break
        case prefix+'drakor': {
        	if (!q) return reply(mess.invQ)
            reply(mess.wait)
            drakor(q).then(async data => {
            	let txt = "DRAKOR\n\n"
                for (let res of data) {
                	txt += `• Title : ${res.judul}\n`
                    txt += `• Years : ${res.years}\n`
                    txt += `• Genre : ${res.genre}\n`
                    txt += `• Url : ${res.url}\n`
                 }
                 sock.sendMessage(from, { image: { url: data[0].thumbnail }, caption: txt }, { quoted: msg })
        }).catch(e => reply(e))
        }
        break
        
        //Surah
        case prefix+'listsurah': {
        	listsurah().then(async res => {
            sock.sendMessage(from, { text: res.listsurah }, { quoted: msg })
            }).catch(e => reply(e))
        }
        break
        case prefix+'surah': case prefix+'surat': {
        	if (!q) return reply("Masukkan nama surah\n\nKetik /listsurah untuk melihat list surah")
            reply(mess.wait)
        	surah(q).then( data => {
        	let txt = `*Surah ${q}*\n\n`
            for (let res of data) {
            	txt += `• Arab : ${res.arab}\n`
                txt += `• Latin : ${res.latin}\n`
                txt += `• Translate : ${res.translate}\n\n`
            }
            sock.sendMessage(from, { text: txt }, { quoted: msg })
            }).catch(e => reply(e))
        }
        break
        case prefix+'tafsirsurah': {
        	if (!q) return reply("Masukkan nama surah")
        	reply(mess.wait)
        	tafsirsurah(q).then( data => {
        	let txt = "*Tafsir Surah*\n\n"
            for (let res of data) {
            	txt += `• Surah : ${res.surah}\n`
                txt += `• Tafsir : ${res.tafsir}\n`
                txt += `• Type : ${res.type}\n`
                txt += `• Source : ${res.source}\n\n`
             }
             sock.sendMessage(from, { text: txt }, { quoted: msg })
             }).catch(e => reply(e))
        }
        break
        
        // Other
        case prefix+'spam': {
        if (!isOwner) return reply(mess.owner)
        let argze = q.split("|")
        for (let i = 0; i < argze[1]; i++) {
         	sock.sendMessage(from, { text: argze[0] })
        }}
        break
        case prefix+'hidetag': case prefix+'ht': case prefix+'announce': {
        if (!isAdmin) return reply(mess.admin)
        if (!isOwner) return reply(mess.owner)
        let mem = []
        for (let no of groupMembers) {
	          mem.push(no.id)
        }
        sock.sendMessage(from, { text: q, mentions: mem })
        }
        break
        case prefix+'tagall': case prefix+'infoall': {
        if (!isGroup) return reply(mess.group)
        if (!isGroupAdmins && !isOwner) return reply(mess.admin)
        let teks = `*TAG ALL MEMBER*\n\n• *INFORMASI :* ${q ? q : 'Nothing'}\n\n`+readmore
        let I = 1
		for (let mem of groupMembers) {
		    teks += `${I++} @${mem.id.split('@')[0]}\n`
		}
        sock.sendMessage(from, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: msg })
        }
        break
        case prefix+'chat': {
        	if (!q.split("|")) return reply("Contoh penggunaan : /chat 628XXXX | Hello")
            if (q.startsWith("08")) return reply("Awali nomor dengan 628XXX")
        	sock.sendMessage(q.split("|")[0]+"@s.whatsapp.net", { text: `${q.split("|")[1]}` })
        }
        break
        case prefix+'simi': {
        if (!q) return reply(mess.invQ)
        fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`).then(res => {
          	reply(res.success)
        })}
        break
        case prefix+'get': case prefix+'inspect': {
            if(!q) return reply('linknya?')
            fetch(q).then(res => res.text())  
            .then(bu =>{
            reply(bu)
            })   
         }
        break
        case prefix+'tinyurl': {
            try {
              anu = await axios.get(`https://tinyurl.com/api-create.php?url=${q}`)
              reply(`${anu.data}`)
              } catch (e) {
              emror = String(e)
              reply(`${e}`)
            }
        }
        break
        case prefix+'readmore': {
        	if (!q.split("|")) return reply("Contoh : /readmore text1 | text2")
        	sock.sendMessage(from, { text: q.split("|")[0]+readmore+q.split("|")[1] }, {quoted: msg})
        }
        break
        case prefix+'teruskan': {
        	sock.sendMessage(from, { text: q, contextInfo: { forwardingScore: 999, isForwarded: true }}, { quoted: msg })
        }
        break
        case prefix+'getcode': {
        	return randomNo('999999')
        }
        break
        
        // Upload status
        case prefix+'upsw': case prefix+'uploadstatus': {
        	if (!isOwner) return reply(mess.owner)
            sock.sendMessage("status@broadcast", { text: q })
            reply("Sukses Upload Status")
            }
        break
        
        // Broadcast
        case prefix+'bc': case prefix+'broadcast': {
        	if (!isOwner) return reply(mess.owner)
            let getchat = await sock.chats.all()
            for (let no of getchat) {
            	sock.sendMessage(no.jid, { text: q }, { quoted: faketroli })
            }
            reply("Sukses Broadcast")
        }
        break
        case prefix+'bclink': case prefix+'broadcastlink': {
        	if (!isOwner) return reply(mess.owner)
            if (!q.split("|")) return reply("Contoh : /bclink text | titlebutton | url")
            let getchat = await sock.chats.all()
            for (let no of getchat) {
            sock.sendMessageFromContent(no.jid, {
            templateMessage: {
                 hydratedTemplate: {
                   hydratedContentText: q.split("|")[0],
                   locationMessage: { jpegThumbnail: imgRzxneon },
                   hydratedFooterText: "Broadcast",
                   hydratedButtons: [ {index: 1, urlButton: { displayText: q.split("|")[1], url: q.split("|")[2] }} ]
            }}}, { quoted: fvvid })
            }
            reply("Sukses Broadcast")
        }
        break
        case prefix+'bclist': case prefix+'broadcastlist': {
        	if (!isOwner) return reply(mess.owner)
            if (!q.split("|")) return reply("Contoh : /bclist text | footer | titlebutton | buttontext | listbutton")
            let getchat = await sock.chats.all()
            for (let no of getchat) {
            	sock.sendMessage(no.jid, { text: q.split("|")[0], footer: q.split("|")[1], title: q.split("|")[2], buttonText: q.split("|")[3], sections: q.split("|")[4] })
            }
            reply("Sukses Broadcast")
        }
        break
        
        // Settings
        case prefix+'welcome': {
        	if (!isOwner) return reply(mess.owner)
            if (q === 'on') {
            	isWelcome = true
                reply("Mengaktifkan welcome message")
            } else if (q === 'off') {
            	isWelcome = false
                reply("Menonaktifkan welcome message")
            }
        }
        break
        
        // Send image or video from url
        case prefix+'sendimage':
        sock.sendMessage(from, { image: { url: q }, fileLength: "50000000000" }, { msg })
        break
        case prefix+'sendvideo':
        sock.sendMessage(from, { video: { url: q }, fileLength: "50000000000" }, { msg })
        break
        
        case prefix+'owner': case prefix+'creator': {
            const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Choco\n' // full name
            + 'ORG:Developer Rzx Bot;\n' // the organization of the contact
            + 'item1.TEL;waid=6283894905341:+62 83894905341\n' // WhatsApp ID + phone number
            + 'item1.X-ABLabel:Creator Rzx Bot\n'
            + 'item2.TEL;waid=6288225066473:+62 88225066473\n' // WhatsApp ID + phone number
            + 'item2.X-ABLabel:2nd Number\n'
            + 'item3.EMAIL;type=INTERNET:chocoganz250@gmail.com\n' // your email
            + 'item3.X-ABLabel:Email\n'
            + 'item4.URL;Web: https://github.com/RzxGamz\n' // your link
            + 'item4.X-ABLabel:Github\n'
            + 'END:VCARD'
            await sock.sendMessage(from, { contacts: { displayname: "Rzx Gamz", contacts: [{ vcard }] }}, { quoted: msg })
        }
        break
        
        default:
        if (isOwner){
        if (chats.startsWith("> ")){
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    reply(evaled)
                } catch (err) {
                    reply(`${err}`)
               }
         } else if (chats.startsWith('=>')) {
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return reply(bang)
                    }
                    try {
                        reply(util.format(eval(`(async () => { return ${q} })()`)))
                    } catch (e) {
                        reply(String(e))
                    }
                } else if (chats.startsWith("$ ")){
                exec(chats.slice(2), (err, stdout) => {
					if (err) return reply(`${err}`)
					if (stdout) reply(`${stdout}`)
				    })
                }
        }
        
        }
            } catch (e) {
               console.log(color(e, 'red'))
            }
        }
        
 let file = require.resolve(__filename)
    fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update '${__filename}'`)
	delete require.cache[file]
	require(file)
})