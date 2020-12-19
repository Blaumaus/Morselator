import { data } from '../../assets/dictionaries'

// TODO: Refactor, so the method won't process the whole text again and again but changes only
const translate = (text: string, from: string, into: string): string => {
    if (from === 'morse') {
        const lang = data.find(el => el.code === into)?.data
        if (!lang) return 'Translation error'

        const keys: string[] = Object.keys(lang)
        return text.split(' ').map(ch => keys.find(key => lang[key] === ch) || '').join('')
    } else if (into === 'morse') {
        const lang = data.find(el => el.code === from)?.data
        if (!lang) return 'Translation error'

        return text.split('').map(ch => lang[ch.toLowerCase()] || '').join(' ')
    }

    return 'Translation error'
}

export default translate