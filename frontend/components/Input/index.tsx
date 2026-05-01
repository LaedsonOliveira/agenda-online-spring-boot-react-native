import React, { forwardRef, LegacyRef } from "react";
import { TextInput, View, TextInputProps, Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

import { StyleSheet, Dimensions } from "react-native";
import { themas } from "@/app/global/themes";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRigth?: IconComponent,
    iconLeftName?: string,
    iconRightName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRigthPress?: () => void,
    height?: number,
    labelStyle?: StyleProp<TextStyle>
}

export const Input = forwardRef((props: Props, ref: LegacyRef<TextInput> | null) => {
    const {
        IconLeft,
        IconRigth,
        iconLeftName,
        iconRightName,
        title,
        onIconLeftPress,
        onIconRigthPress,
        height,
        labelStyle,
        multiline = false,
        ...rest
    } = props;

    Input.displayName = 'Input';
    return (
        <>
            {title && <Text style={[styles.titleInput, labelStyle]}>{title}</Text>}
            <View style={[styles.boxInput, { height: height ?? 40, padding: 5 }]}>
                {IconLeft && iconLeftName && (
                    <TouchableOpacity onPress={onIconLeftPress} style={styles.Button}>
                        <IconLeft name={iconLeftName as any} size={20} color={themas.Colors.gray} style={styles.Icon} />
                    </TouchableOpacity>
                )}
                <TextInput
                    style={[styles.input]}
                    ref={ref}
                    multiline={multiline}
                    numberOfLines={multiline ? undefined : 1}
                    {...rest}
                />
                {IconRigth && iconRightName && (
                    <TouchableOpacity onPress={onIconRigthPress} style={styles.Button}>
                        <IconRigth name={iconRightName as any} size={20} color={themas.Colors.gray} style={styles.Icon} />
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
});


export const styles = StyleSheet.create({
    boxInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: themas.Colors.lightGray,
        backgroundColor: themas.Colors.bgScreen,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        borderRadius: 40,
        paddingHorizontal: 10,
        paddingVertical: 0,
        textAlignVertical: 'center',
        includeFontPadding: false,
        color: themas.Colors.secondary ?? '#000',
    },
    titleInput: {
        marginLeft: 5,
        color: themas.Colors.gray,
        marginTop: 20
    },
    Button: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icon: {
        width: '100%',
    }

})