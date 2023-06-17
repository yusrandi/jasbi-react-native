import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dialog } from 'react-native-simple-dialogs'

interface props {
    isVisible: boolean
    dismissAction: () => void
    children: any

}
export default function CustomDialog({ isVisible, dismissAction, children }: props) {
    return (
        <Dialog
            visible={!!isVisible}
            dialogStyle={styles.dialogContainer}
            onTouchOutside={() => dismissAction()}
            animationType="fade">
            {children}
        </Dialog>
    )
}
const styles = StyleSheet.create({
    dialogContainer: { backgroundColor: '#FFF', borderRadius: 20 },
})