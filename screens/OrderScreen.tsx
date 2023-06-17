import { View, Text, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TransaksiType, TransaksiTypeResponse } from '../type/transaksi_type'
import { TransaksiApi } from '../api/TransaksiApi'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../utils/context/AuthContext'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import Font from '../constants/Font'
import API from '../constants/ApiUrl'
import { currencyFormatter } from '../utils/CurrencyFormatter'

export default function OrderScreen() {
    const { colors } = useTheme()
    const { userContext } = useContext(AuthContext)
    const [transaksis, setTransaksis] = useState<TransaksiType[]>([])

    useEffect(() => {
        getData()
    }, [])
    async function getData() {
        const dataResponse: TransaksiTypeResponse = await TransaksiApi()
        console.log({ dataResponse });
        setTransaksis(dataResponse.responsedata.filter((data: TransaksiType) => data.customerId === userContext.id && data.status !== 'KERANJANG'))
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing }}>
            <FlatList
                data={transaksis}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Spacing * 5,
                    paddingHorizontal: Spacing,
                    gap: Spacing

                }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ backgroundColor: 'white', padding: Spacing * 2, borderRadius: Spacing * 2 }}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: FontSize.small / 2 + 4, }}>{item.transaksiCode}</Text>
                                        <Text style={{ fontSize: FontSize.small / 2 + 4, color: 'grey', }}>{item.datetime}</Text>
                                    </View>
                                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.small, color: colors.primary }} >{item.status}</Text>
                                </View>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: Spacing, gap: Spacing * 2, alignItems: 'center' }}>

                                    <Image source={{ uri: `${API}/products/${item.product.image}`, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                                    <View style={{ flex: 1 }}>
                                        <View>
                                            <Text style={{ fontSize: FontSize.medium, color: colors.text, }} numberOfLines={1}>
                                                {item.product.name}
                                            </Text>
                                            <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: FontSize.small }}>1x</Text>
                                            <Text style={{ color: 'grey', fontSize: FontSize.small }}>{currencyFormatter(item.product.price)}</Text>

                                        </View>

                                    </View>
                                </View>
                                <Text>Rp. {currencyFormatter(item.total)}</Text>

                            </View>
                        </View>
                    );
                }}
            />
        </View>
    )
}