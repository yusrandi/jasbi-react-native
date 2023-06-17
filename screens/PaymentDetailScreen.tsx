import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import { StatusBar } from 'expo-status-bar'
import Icons from "@expo/vector-icons/FontAwesome5";
import FontSize from '../constants/FontSize';
import { useTheme } from '@react-navigation/native';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { currencyFormatter } from '../utils/CurrencyFormatter';
import API from '../constants/ApiUrl';
import * as ImagePicker from 'expo-image-picker'
import { Camera, CameraType } from 'expo-camera';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PopUpCOntent from '../components/PopUpContent/PopUpCOntent';
import CustomDialog from '../components/CustomDialog/CustomDialog';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AuthContext } from '../utils/context/AuthContext';
import { Platform } from 'react-native';


export default function PaymentDetailScreen({ navigation, route: {
    params: { transaksi },
}, }: RootStackScreenProps<"payment">) {
    const { colors } = useTheme();

    const [image, setImage] = useState('');
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [isModalOpen, setModalStatus] = useState(false);

    const { userContext } = useContext(AuthContext)

    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);


    const showImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const openCamera = async () => {

        let permissionResult = await ImagePicker.getCameraPermissionsAsync();
        if (permissionResult.status !== 'granted') {
            permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        }
        if (permissionResult.status !== 'granted') {
            alert("You must turn on camera permissions to record a video.");
        }
        // console.log({ permissionResult });


        else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
            });

            // Explore the result
            console.log({ result });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                console.log(result.assets[0].uri);
            }
        }
    }

    function Header() {
        return (
            <View style={{ backgroundColor: 'white' }}>
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
                            borderColor: "black",
                        }}
                    >
                        <Icons name="arrow-left" size={24} color={"black"} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>

                        <Text style={{ color: colors.text, fontSize: FontSize.large }} numberOfLines={1}>
                            Payment
                        </Text>

                    </View>

                </View>
            </View>
        )
    }
    function Item() {
        return (
            <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: Spacing, gap: Spacing * 2, alignItems: 'center' }}>
                <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: FontSize.small }}>{transaksi.qty}x</Text>
                <Image source={{ uri: `${API}/products/${transaksi.product.image}` }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: FontSize.medium, marginBottom: 8, color: colors.text, }} numberOfLines={1}>
                        {transaksi.product.name}
                    </Text>

                </View>
                <Text style={{ color: 'grey', fontSize: FontSize.small }}>Rp. {currencyFormatter(transaksi.total)}</Text>
            </View>
        )
    }

    function BottomModal() {
        return (
            <BottomSheetModal
                snapPoints={["25%"]}
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

                <View style={{ padding: Spacing * 2, gap: 10 }}>
                    <TouchableOpacity
                        onPress={
                            async () => {
                                const r = await showImagePicker()
                                console.log({ r });


                            }
                        }
                        style={{
                            padding: Spacing * 2,
                            backgroundColor: colors.primary,
                            borderRadius: Spacing * Spacing,
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
                            Pick From Galery
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={
                            async () => {
                                const r = await openCamera()
                                console.log({ r });


                            }
                        }
                        style={{
                            padding: Spacing * 2,
                            borderWidth: 1,
                            borderColor: colors.primary,
                            borderRadius: Spacing * Spacing,
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
                                color: colors.primary,
                                textAlign: "center",
                                fontSize: FontSize.large,
                            }}
                        >
                            Pick From Camera
                        </Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetModal>
        )
    }

    function CustomDialogModal() {
        return (
            <CustomDialog
                isVisible={isModalOpen}
                dismissAction={() => setModalStatus(false)}>
                <PopUpCOntent pressAction={() => setModalStatus(false)} pressYesAction={handleSubmit} subTitle='apakah anda ingin memesan produk ini ' />
            </CustomDialog>
        )
    }
    async function handleSubmit() {
        console.log(transaksi.product);
        console.log({ image });
        console.log({ userContext });

        let filename = image.substring(image.lastIndexOf('/') + 1, image.length)
        console.log({ filename });


        //Check if any file is selected or not
        //If file selected then create FormData
        var photo = {
            uri: image,
            type: 'image/jpeg',
            name: filename,
        };

        let formData = new FormData();
        formData.append('status', "DIPESAN");
        formData.append('imageName', transaksi.file);
        formData.append('myImage', photo);
        formData.append('qty', "1")
        formData.append('total', (transaksi.product.price * 1).toString())
        formData.append('customerId', userContext.id.toString())
        formData.append('productId', transaksi.product.id.toString())
        formData.append('id', transaksi.id.toString())


        try {
            let res = await fetch(
                `${API}/api/transaksi`,
                {
                    method: 'post',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                    },
                }
            );
            let responseJson = await res.json();
            console.log({ responseJson });

            if (responseJson.responsecode === 0) {
                Toast.show({
                    type: 'error',
                    text1: 'Jasbi',
                    text2: responseJson.responsemsg,
                });
            } else {
                navigation.navigate('tabs')
            }
        } catch (error) {
            console.log({ error });

        }


        setModalStatus(false)


    }
    return (
        <View style={{ flex: 1, paddingVertical: Spacing }}>
            <Header />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: 10 }} ></View>
                    <View style={[styles.mainCardView]}>
                        <Text style={{ fontFamily: Font['poppins-semiBold'], marginBottom: Spacing / 2 }} >Payment Detail</Text>
                        <Item />

                    </View>
                    <View style={[styles.mainCardView, { marginTop: Spacing, gap: Spacing }]}>
                        <Text style={{ fontFamily: Font['poppins-semiBold'], marginBottom: Spacing / 2 }} >Transfer to</Text>
                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, paddingBottom: Spacing }}>
                            <Text style={{ fontSize: FontSize.small, color: 'grey', fontFamily: Font['poppins-regular'] }} >Nomor Rekening</Text>
                            <Text style={{ fontSize: FontSize.small, fontFamily: Font['poppins-semiBold'] }}>12345678909302</Text>
                        </View>
                        <View style={{ paddingBottom: Spacing }}>
                            <Text style={{ fontSize: FontSize.small, color: 'grey', fontFamily: Font['poppins-regular'] }} >Total Pembayaran</Text>
                            <Text style={{ fontSize: FontSize.small, fontFamily: Font['poppins-semiBold'] }}>{currencyFormatter(750000)}</Text>
                        </View>


                    </View>
                    <View style={[styles.mainCardView, { marginTop: Spacing }]}>
                        <Text style={{ fontFamily: Font['poppins-semiBold'], marginBottom: Spacing / 2 }} >Upload Payment</Text>

                        <TouchableOpacity
                            onPress={
                                // async () => {
                                // const r = await openCamera()
                                // console.log({ r });
                                openFilterModal

                                // }
                            }
                            style={{ height: 250, borderColor: 'grey', borderWidth: 0.2, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', position: 'absolute' }}>
                                <Icons name='upload' size={50} color={'grey'} />
                                <Text style={{ fontFamily: Font['poppins-regular'], color: 'grey' }} >Upload File</Text>
                            </View>
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

            <View style={{ padding: 16, backgroundColor: 'white', gap: Spacing }}>
                <Text style={{ fontFamily: Font['poppins-semiBold'], marginBottom: Spacing }} >Payment Instruction</Text>
                <View style={{ paddingLeft: Spacing, gap: Spacing }}>
                    <Text style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, marginBottom: Spacing, paddingBottom: Spacing }} >Transfer via ATM</Text>
                    <Text style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, marginBottom: Spacing, paddingBottom: Spacing }} >Transfer via Internet Banking</Text>
                    <Text style={{ borderBottomColor: 'grey', borderBottomWidth: 0.2, marginBottom: Spacing, paddingBottom: Spacing }} >Transfer via Mobile Banking</Text>

                </View>

                <TouchableOpacity
                    onPress={() => {
                        if (image === '') {
                            Toast.show({
                                type: 'error',
                                text1: 'Jasbi',
                                text2: `Harap memilih bukti transfer terlebih dahulu 👋`,
                            });
                            return
                        }

                        setModalStatus(true)
                    }}
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: colors.primary,
                        borderRadius: Spacing * Spacing,
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
                        Buat Pesanan
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomModal />
            <CustomDialogModal />
            <Toast />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    mainCardView: {
        backgroundColor: Colors.white,
        borderRadius: Spacing,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'column',
        //   justifyContent: 'space-between',
        padding: Spacing * 2,

        marginBottom: 2,
        marginHorizontal: Spacing
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Colors.history_back,
        borderColor: Colors.color_eeeeee,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
})