import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import Icons from "@expo/vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';
import Spacing from '../constants/Spacing';
import { currencyFormatter } from '../utils/CurrencyFormatter';
import { AuthContext } from '../utils/context/AuthContext';
import { TransaksiType, TransaksiTypeResponse } from '../type/transaksi_type';
import { TransaksiApi } from '../api/TransaksiApi';
import API from '../constants/ApiUrl';
import CustomDialog from '../components/CustomDialog/CustomDialog';
import PopUpCOntent from '../components/PopUpContent/PopUpCOntent';
import { TransaksiDeleteApi } from '../api/TransaksiDeleteApi';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


export default function CartScreen({ navigation }: RootStackScreenProps<"cart">) {


    const { colors } = useTheme()
    const { userContext } = useContext(AuthContext)
    const [transaksis, setTransaksis] = useState<TransaksiType[]>([])
    const [transaksi, setTransaksi] = useState<TransaksiType>({} as TransaksiType)

    const [isModalOpen, setModalStatus] = useState(false);


    useEffect(() => {
        getData()
    }, [])
    async function getData() {
        const dataResponse: TransaksiTypeResponse = await TransaksiApi()
        console.log({ dataResponse });
        setTransaksis(dataResponse.responsedata.filter((data: TransaksiType) => data.customerId === userContext.id && data.status === 'KERANJANG'))
    }


    function Header() {
        return (
            <View style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: colors.primary }}>
                <StatusBar style="dark" />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        gap: 18,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 52,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 52,
                            borderWidth: 1,
                            borderColor: "grey",
                        }}
                    >
                        <Icons name="arrowleft" size={24} color={"grey"} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>

                        <Text style={{ color: colors.text, fontSize: FontSize.large, fontFamily: Font['poppins-bold'] }} numberOfLines={1}>
                            Keranjang
                        </Text>

                    </View>

                </View>
            </View>
        )
    }

    function CustomDialogModal() {
        return (
            <CustomDialog
                isVisible={isModalOpen}
                dismissAction={() => setModalStatus(false)}>
                <PopUpCOntent pressAction={() => setModalStatus(false)} pressYesAction={handleSubmit} subTitle='apakah anda ingin membatalkan produk ini ' />
            </CustomDialog>
        )
    }

    async function handleSubmit() {
        console.log({ transaksi });

        try {
            const response: TransaksiTypeResponse = await TransaksiDeleteApi(transaksi.id.toString())



            console.log({ response });

            if (response.responsecode === 1) {
                setTransaksis(response.responsedata.filter((data: TransaksiType) => data.customerId === userContext.id && data.status === 'KERANJANG'))
            } else {
                Toast.show({
                    text1: 'Jasbi',
                    text2: `${response.responsemsg} 👋`,
                });
            }
        } catch (error) {
            console.log({ error });

        }
        setModalStatus(false)

    }



    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 10 }} />
            <Header />
            <View style={{ flex: 1, paddingVertical: Spacing * 2, gap: 2 }} >


                <FlatList
                    data={transaksis}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: Spacing * 3,
                        paddingHorizontal: Spacing,
                        gap: Spacing

                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: Spacing, gap: Spacing * 2, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('payment', {
                                        transaksi: item!
                                    })}
                                    style={{ flexDirection: 'row', flex: 1, gap: Spacing * 2, alignItems: 'center' }}>
                                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: FontSize.small }}>{item.qty}x</Text>
                                    <Image source={{ uri: `${API}/products/${item.product.image}` }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: FontSize.medium, color: colors.text, }} numberOfLines={1}>
                                            {item.product.name}
                                        </Text>
                                        <Text style={{ fontSize: FontSize.small / 2 + 4, color: colors.text, opacity: 0.5 }} numberOfLines={1}>
                                            Rp.{currencyFormatter(item.product.price)}
                                        </Text>

                                    </View>
                                    <Text style={{ color: 'grey', fontSize: FontSize.small }}>Rp.{currencyFormatter(item.qty * item.product.price)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log(item.id);

                                        setTransaksi(item)
                                        setModalStatus(true)
                                    }}
                                    style={{ alignItems: 'center' }}>

                                    <Text style={{ color: colors.primary, fontSize: FontSize.small }}>Remove</Text>
                                </TouchableOpacity>
                            </View>

                        );
                    }}
                />
            </View>
            <View style={{ backgroundColor: 'white', padding: Spacing * 2, gap: Spacing }} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'grey', fontSize: FontSize.small }}>Subtotal</Text>
                    <Text style={{ color: 'grey', fontSize: FontSize.small }}>Rp. {currencyFormatter(transaksis.reduce((total: number, value: TransaksiType) => total = total + (value.product.price * value.qty), 0))}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'grey', fontSize: FontSize.small }}>Tax</Text>
                    <Text style={{ color: 'grey', fontSize: FontSize.small }}>0 K</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontSize: FontSize.large }}>Total</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: FontSize.large }}>Rp. {currencyFormatter(transaksis.reduce((total: number, value: TransaksiType) => total = total + (value.product.price * value.qty), 0))}</Text>
                </View>
                {/* <TouchableOpacity
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: colors.primary,
                        marginVertical: Spacing,
                        borderRadius: Spacing,
                        shadowColor: colors.primary,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing * Spacing,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-bold"],
                            color: colors.card,
                            textAlign: "center",
                            fontSize: FontSize.large,
                        }}
                    >
                        Place Order
                    </Text>
                </TouchableOpacity> */}

            </View>
            <CustomDialogModal />
        </View>
    )
}