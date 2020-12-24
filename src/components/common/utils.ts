import { Alert, ToastAndroid, Platform, PermissionsAndroid } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
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

/* Returns text from clipboard.
 */
const getFromClipboard = async(): Promise<string> => {
    return await Clipboard.getString()
}

/* Checks Camera API permission.
 *
 * @return {Promise<boolean>} the result of camera API check
 */
const checkCamera = async (): Promise<boolean> => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: "Camera permission",
            message: 'The app requires camera permission to use the torch on the back of your phone.',
            buttonPositive: "OK"
          }
        )
        
        return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
        console.warn(err)
        return false
    }
}

/* Turns the torch on or off.
 *
 * @param {bool} the state of the torch
 * @return {Promise<boolean>} the result of camera API call
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
 * @return {Promise<void>}
 */
const torchFor = async (ms: number): Promise<void> => {
    switchTorch(true)
    await _sleep(ms)
    switchTorch(false)
}

/* Displays the provided message using Toast API (android) or alert (ios) 
 *
 * @param {string} the message to output
 * @param {boolean} [short=false] the message will be displayed for a short or long time
 */
const displayMessage = (msg: string, short: boolean = false): void => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, short ? ToastAndroid.SHORT : ToastAndroid.LONG)
    else Alert.alert('', msg)
}

/* Displays the morse code using torch 
 *
 * @param {string} the message to output
 * @param {fucntion} the callback to torch state
 * @return {Promise<void>}
 */
const displayMorse = async (data: string, setTorch: (torch: boolean) => void): Promise<void> => {
    for (let i = 0; i < data.length; ++i) {
        if (data[i] === '.') await torchFor(300)
        else if (data[i] === '-') await torchFor(900)
        await _sleep(300)
    }

    setTorch(false)
}

/* Returns the language code, which is used in pair with 'morse' 
 *
 * @param {Lang} the language object
 * @return {string} the language code
 */
const getCurrentCode = (lang: Lang): string => {
    return lang.from === 'morse' ? lang.into : lang.from
}

/* Checks if we are currently translating from morse code 
 *
 * @param {Lang} the language object
 * @return {boolean} translating from morse code or not
 */
const fromMorse = (lang: Lang): boolean => {
    return lang.from === 'morse'
}

export {
    swap, copyToClipboard, checkCamera, displayMorse, getCurrentCode, fromMorse, displayMessage, getFromClipboard
}