import React, { useState } from "react";
import Logo from '@/assets/logo.png'
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Text, View, Image, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { themas } from "@/app/global/themes"
import { StyleSheet, Dimensions } from "react-native";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('exemplo@gmail.com');
    const [password, setPassword] = useState('12345');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const BACKEND_API_URL = 'http://localhost:8080/api';

    async function getLogin() {
        if (!email || !password) {
            return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
        }

        try {
            // setLoading(true);

            // const response = await fetch(`${BACKEND_API_URL}/clientes/login`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email,
            //         senha: password
            //     })
            // });

            // if (!response.ok) {
            //     const errorBody = await response.json().catch(() => null);
            //     const message = errorBody?.message || 'E-mail ou senha inválidos!';
            //     return Alert.alert('Atenção', message);
            // }

            // const cliente = await response.json();
            // Alert.alert('Sucesso', `Bem-vindo ${cliente.nome}!`);
            router.replace('/home');
        } catch (error) {
            console.log('Login error', error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Bem vindo de volta!</Text>
            </View>
            <View style={styles.boxMid}>
                <Input
                    title="ENDEREÇO E-MAIL"
                    value={email}
                    onChangeText={setEmail}
                    IconRigth={MaterialIcons}
                    iconRightName="email"
                    onIconRigthPress={() => console.log('OLA')}
                />
                <Input
                    title="SENHA"
                    value={password}
                    onChangeText={setPassword}
                    IconRigth={Octicons}
                    iconRightName={showPassword ? "eye" : "eye-closed"}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                    secureTextEntry={!showPassword}
                    multiline={false}
                />
            </View>
            <View style={styles.boxBottom}>
                <Button text="ENTRAR" loading={loading} onPress={() => getLogin()} />
                <Text style={styles.textBottom}>Não tem conta? <Text style={styles.textBottomCreate} onPress={() => router.push('/register')}>Crie agora</Text></Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxTop: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxMid: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
        paddingHorizontal: 37,
    },
    boxBottom: {
        height: Dimensions.get('window').height / 3,
        // backgroundColor:'green',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    boxInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: themas.Colors.lightGray,
        backgroundColor: themas.Colors.bgScreen,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 40
    },
    text: {
        marginTop: 35,
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        // backgroundColor:'red',
        height: '100%',
        width: '100%',
        borderRadius: 40,
        // paddingHorizontal:20
    },
    boxIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    titleInput: {
        marginLeft: 5,
        color: themas.Colors.gray,
        marginTop: 20
    },
    textBottom: {
        fontSize: 16,
        color: themas.Colors.gray
    },
    textBottomCreate: {
        fontSize: 16,
        color: themas.Colors.primary
    }
})