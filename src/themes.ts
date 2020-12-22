const whiteTheme: object = {
    descTextColor: 'black',
    backgroundColor: '#f2f2f2',
    headerBackgroundColor: '#f8f8f8',
    actionTextColor: '#043087', // icons' and pressable text's colour
    textInputPlaceholder: '#d3d3d3'
}

const darkTheme: object = {
    descTextColor: 'white',
    backgroundColor: '#2a2a2e',
    headerBackgroundColor: '#0a0e14',
    actionTextColor: '#39bad9', 
    textInputPlaceholder: '#f0fff0'
}

const themes: object = {
    white: {...whiteTheme},
    dark: {...darkTheme}
}

const getThemeParam = (param: string, theme: 'white' | 'dark' = 'white'): string => {
    return themes[theme][param]
}

export {
    themes, getThemeParam
}