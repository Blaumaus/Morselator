import { Clipboard, Alert, ToastAndroid, Platform } from 'react-native'
// import Clipboard from '@react-native-community/clipboard' // https://stackoverflow.com/questions/60945656/react-native-error-setting-and-getting-text-from-clipboard
import Torch from 'react-native-torch'
import { Lang } from '../Home/interfaces'

/* Stops the current thread for provided amount of time
 *
 * @param {number} amount of time (in ms) to sleep
 */
const _sleep = (ms: number): Promise<any> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/* Swaps values in object by keys. Returns a modified object.
 *
 * @param {object} the object being manipulated
 * @param {any} the first key by which the value swaps
 * @param {any} the second key by which the value swaps
 */
const swap = (obj: object, key1: string, key2: string): object => {
    const clone: object = JSON.parse(JSON.stringify(obj))

    // [clone[key1], clone[key2]] = [clone[key2], clone[key1]]
    const temp: any = clone[key1]
    clone[key1] = clone[key2]
    clone[key2] = temp

    return clone
}

/* Copies provided text into clipboard.
 *
 * @param {string} the text to copy
 */
const copyToClipboard = (text: string): void => {
    Clipboard.setString(text)
}

/* Checks Camera API permission.
 *
 * @return {bool} the result of camera API check
 */
const checkCamera = async (): Promise<boolean> => {
    /* const allowed = await Torch.requestCameraPermission(
        'Camera permission',
        'The app requires camera permission to use the torch on the back of your phone.'
    )

    return allowed */

    return true
}

/* Turns the torch on or off.
 *
 * @param {bool} the state of the torch
 * @return {bool} the result of camera API call
 */
const switchTorch = async (state: boolean): Promise<boolean> => {
    try {
        await Torch.switchState(state)
        return true
    } catch (e) {
        console.warn('The torch is not accessible. Make sure the app has camera permissions allowed.')
        return false
    }
}

/* Turns the torch on for N ms.
 *
 * @param {number} the amount of milliseconds to keep the torch on
 */
const torchFor = async (ms: number): Promise<void> => {
    switchTorch(true)
    await _sleep(ms)
    switchTorch(false)
}

const displayMessage = (msg: string): void => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.LONG)
    else Alert.alert('', msg)
}

const displayMorse = async (data: string, torch: () => boolean, setTorch: (torch: boolean) => void): Promise<void> => {
    for (let i = 0; torch() && i < data.length; ++i) {
        if (data[i] === '.') await torchFor(300)
        else if (data[i] === '-') await torchFor(900)
        await _sleep(300)
    }

    setTorch(false)
}

const getCurrentCode = (lang: Lang): string => {
    return lang.from === 'morse' ? lang.into : lang.from
}

// TODO: Refactor
// Check if translating from more
const fromMorse = (lang: Lang): boolean => {
    return lang.from === 'morse'
}

export {
    swap, copyToClipboard, checkCamera, displayMorse, getCurrentCode, fromMorse, displayMessage
}