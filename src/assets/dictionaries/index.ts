import en from './en.json'
import ru from './ru.json'
import ua from './ua.json'

interface JSONLang {
    name: string
    code: string
    data: object
}

const data: JSONLang[] = [
    { name: en.name, code: en.code, data: en.data },
    { name: ru.name, code: ru.code, data: ru.data },
    { name: ua.name, code: ua.code, data: ua.data },
]

export {
   data
}