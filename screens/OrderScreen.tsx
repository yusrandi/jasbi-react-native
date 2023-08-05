import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TransaksiType, TransaksiTypeResponse } from '../type/transaksi_type'
import { TransaksiApi } from '../api/TransaksiApi'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../utils/context/AuthContext'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import Font from '../constants/Font'
import API from '../constants/ApiUrl'
import { currencyFormatter } from '../utils/CurrencyFormatter'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import CustomDialog from '../components/CustomDialog/CustomDialog'
import PopUpCOntent from '../components/PopUpContent/PopUpCOntent'
import { KeranjangApi } from '../api/KeranjangApi'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import Spinner from 'react-native-loading-spinner-overlay'

export default function OrderScreen() {
    const { colors } = useTheme()
    const { userContext } = useContext(AuthContext)
    const [transaksis, setTransaksis] = useState<TransaksiType[]>([])
    const [transaksi, setTransaksi] = useState<TransaksiType>()
    const [refreshing, setRefreshing] = useState(true);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [isModalOpen, setModalStatus] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)



    useEffect(() => {
        getData()
    }, [])
    async function getData() {
        const dataResponse: TransaksiTypeResponse = await TransaksiApi()
        // console.log({ dataResponse });
        setTransaksis(dataResponse.responsedata.filter((data: TransaksiType) => data.customerId === userContext.id && data.status !== 'KERANJANG'))
        setRefreshing(false)
    }

    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    function CustomDialogModal() {
        return (
            <CustomDialog
                isVisible={isModalOpen}
                dismissAction={() => setModalStatus(false)}>
                <PopUpCOntent pressAction={() => setModalStatus(false)} pressYesAction={handleSubmit} subTitle='apakah anda sudah menerima' />
            </CustomDialog>
        )
    }

    function confirmDialog(item: TransaksiType) {

        setTransaksi({ ...item, status: "SELESAI" })
        if (item.status === "DITERIMA") setModalStatus(true)

    }

    async function handleSubmit() {
        console.log(`ID ${transaksi!.id}`);
        console.log(`User ID ${userContext!.id}`);
        setIsLoading(true)
        setModalStatus(false)


        try {
            const response: TransaksiTypeResponse = await KeranjangApi({
                id: transaksi?.id,
                productId: transaksi!.productId,
                datetime: transaksi?.datetime,
                transaksiCode: transaksi!.transaksiCode,
                customerId: userContext.id,
                qty: transaksi!.qty,
                total: transaksi!.total,
                file: transaksi!.file,
                status: 'SELESAI'

            } as TransaksiType)



            console.log({ response });

            Toast.show({
                position: 'bottom',
                type: 'success',
                text1: 'Jasbi',
                text2: `Success 👋`,
            });

            if (response.responsecode === 1) {
                setTransaksis(response.responsedata.filter((data: TransaksiType) => data.customerId === userContext.id && data.status !== 'KERANJANG'))
            }
        } catch (error) {
            console.log({ error });

        }

        setIsLoading(false)



    }

    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing }}>
            <FlatList
                data={transaksis}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                }
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

                                {
                                    item.status === "DITERIMA" ?
                                        <View>
                                            <View style={{ marginVertical: Spacing, borderTopColor: 'grey', borderTopWidth: 0.5 }} />
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ flex: 1, opacity: 0.5, fontSize: FontSize.small / 2 + 4 }}>silahkan konfirmasi setelah menerima dan mengecek pesanan</Text>
                                                <TouchableOpacity onPress={() => confirmDialog(item)} style={{ backgroundColor: colors.primary, padding: Spacing, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: Spacing * 2 }}>
                                                    <Text style={{ color: 'white', fontSize: FontSize.small / 2 + 4 }}>Pesanan Diterima</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        : null
                                }
                            </View>
                        </View>
                    );
                }}
            />
            <CustomDialogModal />
            <Spinner
                visible={isLoading}
                textContent={'...'}
                textStyle={{ color: 'white' }}
            />
            <Toast />

        </View>
    )
}