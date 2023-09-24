import crypto from 'crypto-js'
import { config } from './config'

export const makeHash = (u0, u1) => {
    const key = u0 < u1 ? u0 + u1 : u1 + u0;
    const hash0 = crypto.HmacSHA256(key, config.SECRET).toString()
    return hash0
}

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
export const manageEmojis = (text) => {
    try {
        const emojiMap = {
            ':)': '😊',
            ':D': '😁',
            ':(': '😞',
            ':O': '😲',
            ';)': '😉',
            '>:(': '😡',
            ':-)': '😃',
            '<3': '❤️',
            ':P': '😛',
            ':3': '😺',
            '^_^': '😊',
            ':|': '😐',
            '>:O': '😠',
            ':*': '😘',
            ':@': '😠',
            ':s': '😖',
            ':/': '😕',
            ':X': '🤐',
            ':o)': '🤗',
            ':$': '🤑',
            ':\'(': '😢'
        }
        let newText = text;
        for (const key in emojiMap) {
            if (emojiMap.hasOwnProperty(key)) {
                const emoji = emojiMap[key];
                const regex = new RegExp(escapeRegExp(key), 'g')
                newText = newText.replace(regex, emoji)
            }
        }
        return newText
    } catch (err) {
        console.error(err)
        return text
    }
}