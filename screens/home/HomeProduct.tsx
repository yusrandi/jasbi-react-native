import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { KategoriType, KategoriTypeResponse } from '../../type/kategori_type'
import { ProductType } from '../../type/product_type'
import MasonryList from "reanimated-masonry-list";
import API from '../../constants/ApiUrl';
import { useTheme } from '@react-navigation/native';
import { currencyFormatter } from '../../utils/CurrencyFormatter';
import Icons from "@expo/vector-icons/AntDesign";
import Spinner from 'react-native-loading-spinner-overlay';
import { KeranjangApi } from '../../api/KeranjangApi';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { UserType } from '../../type/user_type';
import { AuthContext } from '../../utils/context/AuthContext';
import { TransaksiType, TransaksiTypeResponse } from '../../type/transaksi_type';


interface props {
    kategori: KategoriType,
    listProduct: ProductType[],
    navigation: any
}
export default function HomeProduct({ kategori, listProduct, navigation }: props) {

    const { colors } = useTheme();
    const [product, setProduct] = useState<ProductType>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { userContext } = useContext(AuthContext)

    function handleChart() {
        console.log('handleChart');
        console.log({ product });


    }

    function MansonaryView() {
        return (
            <MasonryList
                keyExtractor={item => item.id.toString()}
                data={listProduct}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }: any) => {
                    console.log(`${API}/products/${item.image}`);
                    return (
                        <TouchableOpacity style={{ padding: 6 }}

                            onPress={() => {
                                navigation.navigate("detail", {
                                    product: item
                                });
                            }}

                        >
                            <View
                                style={{
                                    aspectRatio: i === 0 ? 2 / 3 : 1,
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: 24,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: `${API}/products/${item.image}`,
                                    }}
                                    resizeMode="cover"
                                    style={StyleSheet.absoluteFill}
                                />
                                <View
                                    style={[
                                        StyleSheet.absoluteFill,
                                        {
                                            padding: 12,
                                        },
                                    ]}
                                >
                                    <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                fontWeight: "600",
                                                color: "#fff",
                                                textShadowColor: "rgba(0,0,0,0.2)",
                                                textShadowOffset: {
                                                    height: 1,
                                                    width: 0,
                                                },
                                                textShadowRadius: 4,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <View
                                            style={{
                                                backgroundColor: colors.card,
                                                borderRadius: 100,
                                                height: 32,
                                                aspectRatio: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Icons
                                                name="like1"
                                                size={20}
                                                color={colors.text}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            backgroundColor: "rgba(0,0,0,0.3)",
                                            alignItems: "center",
                                            padding: 6,
                                            borderRadius: 100,
                                            overflow: "hidden",
                                        }}

                                    >
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                fontWeight: "600",
                                                color: "#fff",
                                                marginLeft: 8,
                                            }}
                                            numberOfLines={1}
                                        >
                                            {currencyFormatter(item.price)}
                                            {/* {`${API}/product/${item.image}`} */}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={
                                                async () => {
                                                    setProduct(item)
                                                    console.log({ item });
                                                    setIsLoading(true)

                                                    try {
                                                        const response: TransaksiTypeResponse = await KeranjangApi({
                                                            id: 0,
                                                            productId: item.id,
                                                            datetime: '',
                                                            transaksiCode: '',
                                                            customerId: userContext.id,
                                                            qty: 1,
                                                            total: item.price,
                                                            file: '',
                                                            status: 'KERANJANG'

                                                        } as TransaksiType)



                                                        console.log({ response });

                                                        if (response.responsecode !== 1) {
                                                            Toast.show({
                                                                position: 'bottom',
                                                                type: 'error',
                                                                text1: 'Jasbi',
                                                                text2: `${response.responsemsg} 👋`,
                                                            });
                                                        }
                                                    } catch (error) {
                                                        console.log({ error });

                                                    }

                                                    setIsLoading(false)


                                                }
                                            }
                                            style={{
                                                paddingHorizontal: 12,
                                                paddingVertical: 8,
                                                borderRadius: 100,
                                                backgroundColor: "#fff",
                                            }}
                                        >
                                            <Icons name="shoppingcart" size={18} color="#000" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                onEndReachedThreshold={0.1}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <MansonaryView />
            <Spinner
                visible={isLoading}
                textContent={'...'}
                textStyle={{ color: 'white' }}
            />
            <Toast />
        </View>
    )
}