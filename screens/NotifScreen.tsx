import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { CustomDefaultTheme } from '../themes/AppThemes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotifType, NotifTypeResponse } from '../type/notif_type'
import { NotifikasiApi } from '../api/NotifikasiApi'
import { AuthContext } from '../utils/context/AuthContext'
import FontSize from '../constants/FontSize'
import { currencyFormatter } from '../utils/CurrencyFormatter'
import Spacing from '../constants/Spacing'
import API from '../constants/ApiUrl'
import Font from '../constants/Font'


export default function NotifScreen() {
    const { colors } = useTheme()
    const { userContext } = useContext(AuthContext)
    const [notifikasis, setNotifikasis] = useState<NotifType[]>([])

    useEffect(() => {
        getNotifikasi()
    }, [])
    async function getNotifikasi() {
        const notifResponse: NotifTypeResponse = await NotifikasiApi(userContext.id)
        console.log({ notifResponse });
        setNotifikasis(notifResponse.responsedata)
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={notifikasis}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Spacing * 5,
                    paddingHorizontal: Spacing

                }}
                renderItem={({ item, index }) => {
                    const topLineStyle = index == 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
                    const bottomLineStyle = index == notifikasis.length - 1 ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: FontSize.small / 2 + 4, color: 'grey', }}>{item.datetime}</Text>
                                <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.small / 2 + 4 }} >{item.status}</Text>
                            </View> */}
                            <View style={[styles.row, { flex: 4 }]}>
                                <View style={styles.timeline}>
                                    <View style={styles.line}>
                                        <View style={topLineStyle} />
                                        <View style={bottomLineStyle} />
                                    </View>
                                    <View style={styles.dot} />
                                </View>
                                <View style={styles.content}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: FontSize.small / 2 + 4, }}>{item.transaksi.transaksiCode}</Text>
                                            <Text style={{ fontSize: FontSize.small / 2 + 4, color: 'grey', }}>{item.datetime}</Text>
                                        </View>
                                        <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.small, color: colors.primary }} >{item.status}</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: Spacing, gap: Spacing * 2, alignItems: 'center' }}>

                                        <Image source={{ uri: `${API}/products/${item.transaksi.product.image}`, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                                        <View style={{ flex: 1 }}>
                                            <View>
                                                <Text style={{ fontSize: FontSize.medium, color: colors.text, }} numberOfLines={1}>
                                                    {item.transaksi.product.name}
                                                </Text>
                                                <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: FontSize.small }}>1x</Text>
                                                <Text style={{ color: 'grey', fontSize: FontSize.small }}>{currencyFormatter(item.transaksi.product.price)}</Text>

                                            </View>

                                        </View>
                                    </View>
                                    <Text>Rp. {currencyFormatter(item.transaksi.total)}</Text>

                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row: {
        padding: 4,
        paddingLeft: 0,
    },
    content: {
        marginLeft: 40,
        backgroundColor: 'white',
        padding: Spacing * 2,
        borderRadius: Spacing
    },
    timeline: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 40,
        justifyContent: 'center', // center the dot
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 18,
        width: 4,
        bottom: 0,
    },
    topLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'grey',
    },
    bottomLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'grey',
    },
    hiddenLine: {
        width: 0,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: CustomDefaultTheme.colors.primary,
    },
});