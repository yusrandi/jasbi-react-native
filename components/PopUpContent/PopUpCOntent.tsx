import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icons from "@expo/vector-icons/FontAwesome";


interface props {
    pressAction: () => void
    pressYesAction: () => void
    subTitle: string
}
export default function PopUpCOntent({ pressAction, pressYesAction, subTitle }: props) {
    return (
        <View style={styles.popupContent}>
            <Image source={require('../../assets/images/thinking.png')} style={styles.popupImage} />
            <View style={styles.popupTextContainer}>
                <Text style={styles.popupHeading}>Dialog Confirm!</Text>
                <Text style={styles.popupDescriptionText}>
                    So, {subTitle}?
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <TouchableOpacity
                    onPress={() => pressYesAction()}
                    style={[styles.actionButton, { backgroundColor: '#00b48b' }]}>
                    <Icons name="check" style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => pressAction()}
                    style={[styles.actionButton, { backgroundColor: '#d0594c' }]}>
                    <Icons name="times" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    popupContent: { justifyContent: 'center', alignItems: 'center' },
    popupImage: { width: 100, height: 100 },
    popupTextContainer: { marginVertical: 12 },
    popupDescriptionText: { textAlign: 'center', fontSize: 12, color: '#666' },
    popupHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 7,
    },
    actionButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginHorizontal: 5,
    },
    buttonIcon: { fontSize: 20, color: '#FFF' },
})
