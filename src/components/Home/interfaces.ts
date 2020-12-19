interface Lang {
    from: string,
    into: string
}

interface SelectorProps {
    lang: Lang,
    setLang: () => any,
    setInput: () => any
}

interface KeyboardProps {
    setInput: (text: any) => void,
}

export {
    Lang, SelectorProps
}