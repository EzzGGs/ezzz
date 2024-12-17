const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!tc')) {
        const args = message.content.split(' ');
        if (args[1]) {
            const tc = args[1];
            try {
                const response = await axios.get(`https://srgla-api.glitch.me/tcpro.php?tc=${tc}`);
                const data = response.data;

                const embed = new EmbedBuilder()
                    .setTitle('TC Bilgi')
                    .setColor(0x1abc9c)
                    .addFields(
                        { name: 'TC Kimlik Numarası', value: tc, inline: true },
                        { name: 'Sonuç', value: JSON.stringify(data, null, 2), inline: false }
                    )
                    .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Hata:', error.response ? error.response.data : error.message);
                message.channel.send('❌ Veri çekilirken bir hata oluştu.');
            }
        } else {
            message.channel.send('Lütfen bir TC kimlik numarası giriniz.');
        }
    }

    if (message.content.startsWith('!adres')) {
        const args = message.content.split(' ');
        if (args[1]) {
            const tc = args[1];
            try {
                const response = await axios.get(`https://srgla-api.glitch.me/adres.php?tc=${tc}`);
                const data = response.data;

                const embed = new EmbedBuilder()
                    .setTitle('Adres Bilgi')
                    .setColor(0x3498db)
                    .addFields(
                        { name: 'TC Kimlik Numarası', value: tc, inline: true },
                        { name: 'Sonuç', value: JSON.stringify(data, null, 2), inline: false }
                    )
                    .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Hata:', error.response ? error.response.data : error.message);
                message.channel.send('❌ Adres verisi çekilirken bir hata oluştu.');
            }
        } else {
            message.channel.send('Lütfen bir TC kimlik numarası giriniz.');
        }
    }

    if (message.content.startsWith('!gsm')) {
        const args = message.content.split(' ');
        if (args[1]) {
            const tc = args[1];
            try {
                const response = await axios.get(`https://srgla-api.glitch.me/tcgsm.php?tc=${tc}`);
                const data = response.data;

                const embed = new EmbedBuilder()
                    .setTitle('GSM Bilgi')
                    .setColor(0xe74c3c)
                    .addFields(
                        { name: 'TC Kimlik Numarası', value: tc, inline: true },
                        { name: 'Sonuç', value: JSON.stringify(data, null, 2), inline: false }
                    )
                    .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Hata:', error.response ? error.response.data : error.message);
                message.channel.send('❌ GSM verisi çekilirken bir hata oluştu.');
            }
        } else {
            message.channel.send('Lütfen bir TC kimlik numarası giriniz.');
        }
    }

    if (message.content === '!yardım') {
        const embed = new EmbedBuilder()
            .setTitle('✨ EzGen ✨')
            .setColor(0x00ff00)
            .setDescription(`
             ✨Sorgu Komutları               
📌  !tc = tc den kişisel bilgileri
📌  !gsm = tc den gsm
📌  !adres = tc den adres
📌  !aile = tc den aile bilgileri
📌  !adsoyad = ad soyad dan kişisel bilgileri

            ✨gen komutları
📌  !gen netflix = netflix hesabı 
📌  !gen exxen = exxen hesabı
📌  !gen craftrise = craftrise hesabı
📌  !gen blutv = blutv heabı

Codded By EzzGGs
            `);

        message.channel.send({ embeds: [embed] });
    }

    if (message.content === '!gen craftrise') {
        fs.readFile('craftrise.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Hata:', err);
                message.channel.send('❌ Dosya okunurken bir hata oluştu.');
                return;
            }

            const lines = data.split('\n');
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            const [account, password] = randomLine.split(':');

            const embed = new EmbedBuilder()
                .setTitle('EzGen / Craftrise Hesap')
                .setColor(0xff5733)
                .setDescription(`Hesap: ${account}\nŞifre: ${password}`)
                .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

            message.channel.send({ embeds: [embed] });
        });
    }

    if (message.content === '!gen netflix') {
        fs.readFile('netflix.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Hata:', err);
                message.channel.send('❌ Netflix dosyası okunurken bir hata oluştu.');
                return;
            }

            const lines = data.split('\n');
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            const [account, password] = randomLine.split(':');

            const embed = new EmbedBuilder()
                .setTitle('EzGen / Netflix Hesap')
                .setColor(0xff5733)
                .setDescription(`Hesap: ${account}\nŞifre: ${password}`)
                .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

            message.channel.send({ embeds: [embed] });
        });
    }

    if (message.content === '!gen blutv') {
        fs.readFile('blutv.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Hata:', err);
                message.channel.send('❌ BluTV dosyası okunurken bir hata oluştu.');
                return;
            }

            const lines = data.split('\n');
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            const [account, password] = randomLine.split(':');

            const embed = new EmbedBuilder()
                .setTitle('EzGen / BluTV Hesap')
                .setColor(0x3498db)
                .setDescription(`Hesap: ${account}\nŞifre: ${password}`)
                .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

            message.channel.send({ embeds: [embed] });
        });
    }

    if (message.content === '!gen exxen') {
        fs.readFile('exxen.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Hata:', err);
                message.channel.send('❌ Exxen dosyası okunurken bir hata oluştu.');
                return;
            }

            const lines = data.split('\n');
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            const [account, password] = randomLine.split(':');

            const embed = new EmbedBuilder()
                .setTitle('EzGen / Exxen Hesap')
                .setColor(0xe74c3c)
                .setDescription(`Hesap: ${account}\nŞifre: ${password}`)
                .setFooter({ text: 'EzGen tarafından sağlanmıştır.' });

            message.channel.send({ embeds: [embed] });
        });
    }
});

client.login(process.env.TOKEN);
