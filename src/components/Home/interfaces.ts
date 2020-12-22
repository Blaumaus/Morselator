interface Lang {
    from: string,
    into: string
}

interface SelectorProps {
    lang: Lang,
    setLang: (lang: any /* Lang | object */) => any,
    setInput: (input: string) => any,
    navigation: any,
    theme: any
}

interface KeyboardProps {
    setInput: (text: any) => void
}

export type {
    Lang, SelectorProps, KeyboardProps
}