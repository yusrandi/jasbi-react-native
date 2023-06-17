import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { RootStackScreenProps } from '../navigators/RootNavigator';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icons from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import API from '../constants/ApiUrl';
import { currencyFormatter } from '../utils/CurrencyFormatter';
import FontSize from '../constants/FontSize';
import Spinner from 'react-native-loading-spinner-overlay';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AuthContext } from '../utils/context/AuthContext';
import { TransaksiType, TransaksiTypeResponse } from '../type/transaksi_type';
import { KeranjangApi } from '../api/KeranjangApi';

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function DetailScreen({
    navigation,
    route: {
        params: { product },
    },
}: RootStackScreenProps<"detail">) {

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(SIZES[0]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { userContext } = useContext(AuthContext)
    const [transaksi, setTransaksi] = useState<TransaksiType>()

    async function handleCheckOut(st: string) {
        console.log({ product });
        console.log({ count });
        console.log({ userContext });

        if (product !== undefined) {
            setIsLoading(true)

            try {
                const response: TransaksiTypeResponse = await KeranjangApi({
                    id: 0,
                    productId: product.id,
                    datetime: '',
                    transaksiCode: '',
                    customerId: userContext.id,
                    qty: count,
                    total: product.price * count,
                    file: '',
                    status: 'KERANJANG'

                } as TransaksiType)

                console.log({ response });
                const dataTransaksi: TransaksiType = response.responsedata.filter((data: TransaksiType) => data.customerId === userContext.id && data.productId === product.id && data.status === 'KERANJANG')[0]
                setTransaksi(dataTransaksi)

                console.log({ dataTransaksi });

                if (st === 'keranjang') {
                    Toast.show({
                        position: 'bottom',
                        type: 'error',
                        text1: 'Jasbi',
                        text2: `${response.responsemsg} 👋`,
                    });

                } else {

                    if (dataTransaksi !== undefined) {
                        navigation.navigate('payment', {
                            transaksi: dataTransaksi!
                        })
                    }

                }


            } catch (error) {
                console.log({ error });

            }
            setIsLoading(false)

        }

    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style='light' />
            <Image
                source={{
                    uri: `${API}/products/${product.image}`,
                }}
                style={{ flex: 1 }}
            />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
            >
                <StatusBar style="light" />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        gap: 8,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 52,
                            backgroundColor: 'white',
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 52,
                            borderWidth: 1,
                            borderColor: "#fff",
                        }}
                    >
                        <Icons name="arrowleft" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        style={{
                            width: 52,
                            aspectRatio: 1,
                            backgroundColor: 'white',
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 52,
                            borderWidth: 1,
                            borderColor: "#fff",
                        }}
                    >
                        <Icons name="like2" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCheckOut('keranjang')}
                        style={{
                            width: 52,
                            backgroundColor: 'white',
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 52,
                            borderWidth: 1,
                            borderColor: "#fff",
                        }}
                    >
                        <Icons name="shoppingcart" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <BottomSheet
                detached
                snapPoints={[500, 500]}
                index={0}
                style={{ marginHorizontal: 20 }}
                bottomInset={insets.bottom + 20}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: colors.background,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.primary,
                }}
            >
                <View style={{ padding: 16, gap: 16, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }}>
                        {product.name}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", gap: 2 }}>
                                {new Array(5).fill("").map((_, i) => (
                                    <Icons
                                        key={i}
                                        name={i < 3 ? "star" : "staro"}
                                        color="#facc15"
                                        size={20}
                                    />
                                ))}
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.text,
                                    opacity: 0.5,
                                    marginTop: 4,
                                }}
                            >
                                3.0 (250K Reviews)
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
                                backgroundColor: colors.primary,
                                padding: 6,
                                borderRadius: 100,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setCount((count) => Math.max(1, count - 1))}
                                style={{
                                    backgroundColor: colors.card,
                                    width: 34,
                                    aspectRatio: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 34,
                                }}
                            >
                                <Icons name="minus" size={20} color={colors.text} />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.background,
                                }}
                            >
                                {count}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setCount((count) => Math.min(10, count + 1))}
                                style={{
                                    backgroundColor: colors.card,
                                    width: 34,
                                    aspectRatio: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 34,
                                }}
                            >
                                <Icons name="plus" size={20} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.text,
                                    textTransform: "uppercase",
                                }}
                            >
                                Model is 6'1'', Size M
                            </Text>
                            <Text style={{ color: colors.text, opacity: 0.5 }}>
                                Size guide
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 6,
                                marginTop: 6,
                            }}
                        >
                            {SIZES.map((s, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => setSize(s)}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: s === size ? colors.primary : colors.card,
                                        borderRadius: 44,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: s === size ? colors.card : colors.text,
                                            fontWeight: "600",
                                            fontSize: 16,
                                        }}
                                    >
                                        {s}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                marginBottom: 6,
                                color: colors.text,
                            }}
                        >
                            Description
                        </Text>
                        <Text
                            style={{ color: colors.text, opacity: 0.75 }}
                            numberOfLines={3}
                        >
                            {product.description}
                        </Text>
                    </View>

                    <View style={{ flex: 1 }} />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{ color: colors.text, opacity: 0.75, marginBottom: 4 }}
                            >
                                Total
                            </Text>
                            <Text
                                style={{ color: colors.text, fontSize: FontSize.large, fontWeight: "600" }}
                            >
                                {currencyFormatter(product.price)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => handleCheckOut('checkout')}
                            style={{
                                backgroundColor: colors.primary,
                                height: 64,
                                borderRadius: 64,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.background,
                                    paddingHorizontal: 16,
                                }}
                            >
                                Checkout
                            </Text>

                            <View
                                style={{
                                    backgroundColor: colors.card,
                                    width: 40,
                                    aspectRatio: 1,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icons name="arrowright" size={24} color={colors.text} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>

            <Spinner
                visible={isLoading}
                textContent={'...'}
                textStyle={{ color: 'white' }}
            />
            <Toast />


        </View>
    )
}