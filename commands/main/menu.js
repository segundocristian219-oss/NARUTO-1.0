 import fetch from 'node-fetch';
import { getDevice, prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fs from 'fs';
import axios from 'axios';
import moment from 'moment-timezone';
import { bodyMenu, menuObject } from '../../core/commands.js';
import db from '#db';

function normalize(text = '') {
  text = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  return text.endsWith('s') ? text.slice(0, -1) : text;
}

const menuMessages = {
  es: {
    invalidCategory: (category, categories, prefix) =>
      `《✧》 La categoría *${category}* no existe, las categorías disponibles son: *${categories}*.\n> Para ver la lista completa escribe *${prefix}menu*\n> Para ver los comandos de una categoría escribe *${prefix}menu [categoría]*\n> Ejemplo: *${prefix}menu anime*`,
    error: (prefix, command, error) =>
      `> Ocurrió un error inesperado al ejecutar el comando *${prefix + command}*. Intenta nuevamente o contacta al soporte si el problema persiste.\n> [Error: *${error}*]`
  },

  en: {
    invalidCategory: (category, categories, prefix) =>
      `《✧》 The category *${category}* does not exist. Available categories are: *${categories}*.\n> To see the complete list, type *${prefix}menu*\n> To see the commands of a category, type *${prefix}menu [category]*\n> Example: *${prefix}menu anime*`,
    error: (prefix, command, error) =>
      `> An unexpected error occurred while executing the command *${prefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${error}*]`
  },

  id: {
    invalidCategory: (category, categories, prefix) =>
      `《✧》 Kategori *${category}* tidak ditemukan. Kategori yang tersedia adalah: *${categories}*.\n> Untuk melihat daftar lengkap, ketik *${prefix}menu*\n> Untuk melihat perintah dalam suatu kategori, ketik *${prefix}menu [kategori]*\n> Contoh: *${prefix}menu anime*`,
    error: (prefix, command, error) =>
      `> Terjadi kesalahan tak terduga saat menjalankan perintah *${prefix + command}*. Silakan coba lagi atau hubungi dukungan jika masalah terus berlanjut.\n> [Error: *${error}*]`
  }
};

export default {
  command: ['allmenu', 'help', 'menu', 'ayuda'],
  category: 'main',
  description: 'Ver el menú de comandos.',

  run: async ({ msg, sock, args, userLang, usedPrefix, command, text }) => {
    try {
      const lang = ['es', 'en', 'id'].includes(userLang) ? userLang : 'es';

      const now = new Date();
      const colombianTime = new Date(
        now.toLocaleString('en-US', {
          timeZone: 'America/Caracas'
        })
      );

      const tiempo = colombianTime
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
        .replace(/,/g, '');

      const tempo = moment.tz('America/Caracas').format('hh:mm A');

      const botId = sock?.user?.id.split(':')[0] + '@s.whatsapp.net';

      const botSettings = db.getSettings(botId) || {};

      const botname = botSettings.botname || '';
      const namebot = botSettings.namebot || '';
      const banner = botSettings.banner || '';
      const owner = botSettings.owner || '';
      const canalId = botSettings.newsletter_id || '';
      const canalName = botSettings.nameid || '';
      const prefix = botSettings.prefix;

      const link = 'https://dix.lat/s/fz8fc';

      const isOficialBot =
        botId ===
        (
          (global.sock?.user?.id?.split(':')[0] ?? null) &&
          (
            (global.sock?.user?.id?.split(':')[0] ?? null) &&
            (global.sock.user.id.split(':')[0] + '@s.whatsapp.net')
          )
        );

      const botType = isOficialBot ? 'Principal/Owner' : 'Sub Bot';

      const users = db.getUser();
      const usersCount = users?.length || 0;

      const device = getDevice(msg.key.id);

      const userGlobal = db.getUser(msg.sender);
      const sender = userGlobal?.name || msg.pushName || 'Usuario';

      const time = sock.uptime
        ? formatearMs(Date.now() - sock.uptime)
        : 'Desconocido';

      const alias = {
        anime: ['anime', 'reacciones'],
        downloads: ['downloads', 'descargas'],
        economia: ['economia', 'economy', 'eco'],
        gacha: ['gacha', 'rpg'],
        grupo: ['grupo', 'group'],
        nsfw: ['nsfw', '+18'],
        profile: ['profile', 'perfil'],
        sockets: ['sockets', 'bots'],
        stickers: ['stickers', 'sticker'],
        utils: ['utils', 'utilidades', 'herramientas']
      };

      const input = normalize(args[0] || '');

      const cat = Object.keys(alias).find(
        key => alias[key].map(normalize).includes(input)
      );

      const category = `${
        cat
          ? ` para \`${cat}\``
          : '. *(˶ᵔ ᵕ ᔓᔔ˶)*'
      }`;

      const messages = menuMessages[lang] || menuMessages.es;

      if (args[0] && !cat) {
        return msg.reply(
          messages.invalidCategory(
            args[0],
            Object.keys(alias).join(', '),
            usedPrefix
          )
        );
      }

      const sections = menuObject[lang] || menuObject.es;
      const selectedBodyMenu = bodyMenu[lang] || bodyMenu.es;

      const content = cat
        ? String(sections[cat] || '')
        : Object.values(sections)
            .map(section => String(section || ''))
            .join('\n\n');

      const more = String.fromCharCode(8206).repeat(4001);

      let menu = selectedBodyMenu
        ? String(selectedBodyMenu) + '\n' + more + '\n' + content
        : content;

      const replacements = {
        $owner: owner
          ? (
              !isNaN(owner.replace(/@s\.whatsapp\.net$/, ''))
                ? (db.getUser(owner))?.name || owner.split('@')[0]
                : owner
            )
          : 'Oculto por privacidad',

        $botType: botType,
        $device: device,
        $tiempo: tiempo,
        $tempo: tempo,
        $users: usersCount.toLocaleString(),
        $link: link,
        $cat: category,
        $sender: sender,
        $botname: botname,
        $namebot: namebot,
        $prefix: usedPrefix,
        $uptime: time
      };

      for (const [key, value] of Object.entries(replacements)) {
        menu = menu.replace(
          new RegExp(`\\${key}`, 'g'),
          String(value)
        );
      }

      await sock.sendMessage(
        msg.chat,
        banner.includes('.mp4') || banner.includes('.webm')
          ? {
              video: { url: banner },
              gifPlayback: true,
              caption: menu.trim(),
              contextInfo: {
                mentionedJid: [owner, msg.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: canalId,
                  serverMessageId: '0',
                  newsletterName: canalName
                }
              }
            }
          : {
              text: menu.trim(),
              linkPreview:
                link && banner
                  ? await prepareWAMessageMedia(
                      {
                        image: { url: banner }
                      },
                      {
                        upload: sock.waUploadToServer,
                        mediaTypeOverride: 'thumbnail-link'
                      }
                    ).then(({ imageMessage }) => ({
                      'canonical-url': link,
                      'matched-text': link,
                      title: botname,
                      description: `${namebot}, mᥲძᥱ ᥕі𝗍һ ᑲᥡ ${dev}`,
                      jpegThumbnail: imageMessage?.jpegThumbnail
                        ? Buffer.from(imageMessage.jpegThumbnail)
                        : undefined,
                      highQualityThumbnail: imageMessage || undefined
                    }))
                  : undefined,

              contextInfo: {
                mentionedJid: [owner, msg.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: canalId,
                  serverMessageId: '0',
                  newsletterName: canalName
                }
              }
            },
        { quoted: msg }
      );

    } catch (e) {
      const lang = ['es', 'en', 'id'].includes(userLang)
        ? userLang
        : 'es';

      const messages = menuMessages[lang] || menuMessages.es;

      await msg.reply(
        messages.error(
          usedPrefix,
          command,
          e.message
        )
      );
    }
  }
};

function formatearMs(ms) {
  const segundos = Math.floor(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  return [
    dias && `${dias}d`,
    `${horas % 24}h`,
    `${minutos % 60}m`,
    `${segundos % 60}s`
  ]
    .filter(Boolean)
    .join(' ');
}