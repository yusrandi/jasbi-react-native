import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TabsStackScreenProps } from '../navigators/TabsNavigator';
import { useTheme } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Icons from "@expo/vector-icons/AntDesign";
import { StatusBar } from 'expo-status-bar';
import FilterView from '../components/FilterView';
import MasonryList from "reanimated-masonry-list";
import { KategoriApi } from '../api/KategoriApi';
import { KategoriType, KategoriTypeResponse } from '../type/kategori_type';
import axios from 'axios'
import { ProductType, ProductTypeResponse } from '../type/product_type';
import { ProductApi } from '../api/ProductApi';
import API from '../constants/ApiUrl';
import { currencyFormatter } from '../utils/CurrencyFormatter';
import { getData, removeValue } from '../utils/LocalStorage';
import { UserType } from '../type/user_type';
import { AuthContext } from '../utils/context/AuthContext';
import HomeProduct from './home/HomeProduct';
import FontSize from '../constants/FontSize';



export default function HomeScreen({ navigation }: TabsStackScreenProps<"home">) {
    const AVATAR_URL = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

    const { colors } = useTheme();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [kategoris, setKategoris] = useState<KategoriType[]>([])
    const [kategori, setKategori] = useState<KategoriType>({} as KategoriType)
    const [products, setProducts] = useState<ProductType[]>([])

    const { isLoading, logOut, userContext, isLoggedIn } = useContext(AuthContext)
    const [categoryIndex, setCategoryIndex] = useState(0);

    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    useEffect(() => {
        kategorisFromApi()
    }, [])
    useEffect(() => {
        productsFromApi()
    }, [])

    async function kategorisFromApi() {
        const kategoriResponse: KategoriTypeResponse = await KategoriApi()
        // console.log({ kategoriResponse });
        const listKategori: KategoriType[] = kategoriResponse.responsedata
        setKategoris(listKategori)
        setKategori(listKategori[0])

    }

    async function productsFromApi() {
        const response: ProductTypeResponse = await ProductApi()
        setProducts(response.responsedata)
        // console.log({ response });
    }
    function Header() {
        return (
            <View style={{ paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image source={{ uri: AVATAR_URL, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8, color: colors.text, }} numberOfLines={1}>
                        Hi, {userContext?.name} 👋
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        {userContext?.address}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('cart')}
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icons name="shoppingcart" size={32} color={colors.text} style={{ position: 'relative' }} />
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                width: 16,
                                height: 16,
                                borderRadius: 15 / 2,
                                right: 0,
                                top: +10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "#FFFFFF",
                                    fontSize: FontSize.medium,
                                }}>
                                *
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function SearchBar() {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 12 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                        alignItems: "center",
                        paddingHorizontal: 24,
                        flexDirection: "row",
                        gap: 12,
                    }}
                >
                    <Icons
                        name="search1"
                        size={24}
                        color={colors.text}
                        style={{ opacity: 0.5 }}
                    />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: colors.text,
                            opacity: 0.5,
                        }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openFilterModal}
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        backgroundColor: colors.primary,
                    }}
                >
                    <Icons name="API" size={24} color={colors.background} />
                </TouchableOpacity>
            </View>
        )
    }
    function BottomModal() {
        return (
            <BottomSheetModal
                snapPoints={["85%"]}
                index={0}
                ref={bottomSheetModalRef}
                // backdropComponent={(props) => <CustomBackdrop {...props} />}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: colors.card,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.primary,
                }}
            >
                <FilterView />
            </BottomSheetModal>
        )
    }

    function CollectionView() {
        return (
            <View style={{ paddingHorizontal: 24 }}>
                {/* Title bar */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
                    >
                        New Collections
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ color: colors.primary }}>See All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
                    <Card
                        onPress={() => {
                            // navigation.navigate("cart");
                        }}
                        price={130}
                        imageUrl="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                    />
                    <View style={{ flex: 1, gap: 12 }}>
                        <Card
                            onPress={() => {
                                // navigation.navigate("Details", {
                                //     id: "456",
                                // });
                            }}
                            price={120}
                            imageUrl="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                        />
                        <Card
                            onPress={() => {

                            }}
                            price={170}
                            imageUrl="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
                        />
                    </View>
                </View>
            </View>
        )
    }

    function CategorySection() {
        // setKategoris(...kategoris, {id: 0, name: "All"})
        return (
            <FlatList
                data={kategoris}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    gap: 12,
                }}
                renderItem={({ item, index }) => {
                    const isSelected = kategori.id === item.id;
                    return (
                        <TouchableOpacity
                            onPress={() => setKategori(item)}
                            style={{
                                backgroundColor: isSelected ? colors.primary : colors.card,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                borderRadius: 100,
                                borderWidth: isSelected ? 0 : 1,
                                borderColor: colors.border,
                            }}
                        >
                            <Text
                                style={{
                                    color: isSelected ? colors.background : colors.text,
                                    fontWeight: "600",
                                    fontSize: 14,
                                    opacity: isSelected ? 1 : 0.5,
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        )
    }



    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
                <StatusBar style={'auto'} />
                <View style={{ height: 10 }}></View>
                <Header />
                {/* <SearchBar /> */}
                {/* <CollectionView /> */}
                <CategorySection />
                <HomeProduct kategori={kategori} listProduct={products.filter((value: ProductType) => value.kategoriId === kategori.id)} navigation={navigation} />
                {/* <MansonaryView /> */}
            </SafeAreaView>
            <BottomModal />

        </ScrollView>
    )
}
const Card = ({
    price,
    imageUrl,
    onPress,
}: {
    price: number;
    imageUrl: string;
    onPress?: () => void;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
                borderRadius: 24,
            }}
        >
            <Image
                source={{
                    uri: imageUrl,
                }}
                resizeMode="cover"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
            />
            <View
                style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderRadius: 100,
                }}
            >
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
                    {price} K
                </Text>
            </View>
        </TouchableOpacity>
    );
};

