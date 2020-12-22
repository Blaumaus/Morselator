import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

type IconParams = {
    src: any,
    onPress: () => void,
    style: object,
    disabled?: boolean
}

const Icon: React.FC<IconParams> = ({ src, onPress, style, disabled = false, ...rest }: IconParams) => (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled} {...rest}>
        <Image source={src} resizeMethod="scale" style={[style, disabled && { opacity: .5 }]} />
    </TouchableOpacity>
)

export default Icon