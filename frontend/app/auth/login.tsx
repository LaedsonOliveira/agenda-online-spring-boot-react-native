
import React, { useState } from "react";
import Logo from '@/assets/logo.png'
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Text, View, Image, Alert, Pressable, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { loginCliente, loginProprietario } from '@/utils/api';
import { loginStyles } from '@/styles/loginStyles';

export default function Login() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const initialRole = params.role === 'DONO' ? 'DONO' : 'CLIENTE';

    const [email, setEmail] = useState('@exemplo.com');
    const [password, setPassword] = useState('12345678');
    const [role, setRole] = useState<'CLIENTE' | 'DONO'>(initialRole);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getLogin() {
        if (!email || !password) {
            return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
        }

        setLoading(true);

        try {
            if (role === 'DONO') {
                const proprietario = await loginProprietario(email, password);
                Alert.alert('Sucesso', `Bem-vindo ${proprietario.nome}!`);
                const proprietarioId = proprietario.id?.toString();
                const query = proprietarioId ? `?proprietarioId=${proprietarioId}` : '';
                return router.replace(`/estabelecimento/dashboard${query}`);
            }

            const cliente = await loginCliente(email, password);
            Alert.alert('Sucesso', `Bem-vindo ${cliente.nome}!`);
            const clienteId = cliente.id?.toString();
            const estabelecimentoId = cliente.estabelecimentoId?.toString();
            const queryParts = [];

            if (clienteId) queryParts.push(`clienteId=${clienteId}`);
            if (estabelecimentoId) queryParts.push(`estabelecimentoId=${estabelecimentoId}`);

            const query = queryParts.length ? `?${queryParts.join('&')}` : '';
            router.replace(`/(cliente)/agendamento${query}`);
        } catch (error) {
            console.log('Login error', error);
            const message = error instanceof Error ? error.message : 'Não foi possível conectar ao servidor.';
            Alert.alert('Erro', message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={loginStyles.container}>

                        {/* Logo */}
                        <View style={loginStyles.boxTop}>
                            <Image
                                source={Logo}
                                style={loginStyles.logo}
                                resizeMode="contain"
                            />
                            <Text style={loginStyles.text}>Agenda Barbeiro</Text>

                            {/* Entrada Cliente | Dono */}
                            <View style={loginStyles.roleSelectorContainer}>
                                <Text style={loginStyles.titleInput}>ENTRAR COMO</Text>
                                <View style={loginStyles.roleOptions}>
                                    {[
                                        { value: 'CLIENTE', label: 'Cliente' },
                                        { value: 'DONO', label: 'Dono' },
                                    ].map((item) => (
                                        <Pressable
                                            key={item.value}
                                            style={[
                                                loginStyles.roleButton,
                                                role === item.value && loginStyles.roleButtonActive,
                                            ]}
                                            onPress={() => setRole(item.value as 'CLIENTE' | 'DONO')}
                                        >
                                            <Text style={[
                                                loginStyles.roleButtonText,
                                                role === item.value && loginStyles.roleButtonTextActive,
                                            ]}>
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={loginStyles.boxMid}>
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
                        <View style={loginStyles.boxBottom}>
                            <Button text="ENTRAR" loading={loading} onPress={() => getLogin()} />
                            <Text style={loginStyles.textBottom}>Não tem conta? <Text style={loginStyles.textBottomCreate} onPress={() => router.push('/auth/register')}>Crie agora</Text></Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
