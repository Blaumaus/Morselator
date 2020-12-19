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
    onChange: (text: string) => void,
    visible: bool
}

export {
    Lang, SelectorProps
}