
import { useEffect, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { registerStyles } from '@/styles/registerStyles';
import { fetchEstabelecimentos, createEstabelecimento, registerCliente, registerProprietario } from '@/utils/api';

interface Estabelecimento {
    id: string;
    nome: string;
}

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [role, setRole] = useState<"CLIENTE" | "DONO">("CLIENTE");
    const [estabelecimentoId, setEstabelecimentoId] = useState("");
    const [estabelecimentoNome, setEstabelecimentoNome] = useState("");
    const [estabelecimentoEndereco, setEstabelecimentoEndereco] = useState("");
    const [estabelecimentoTelefone, setEstabelecimentoTelefone] = useState("");
    const [estabelecimentoEmail, setEstabelecimentoEmail] = useState("");
    const [estabelecimentoWhatsapp, setEstabelecimentoWhatsapp] = useState("");
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingEstabelecimentos, setLoadingEstabelecimentos] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadEstabelecimentos() {
            try {
                const data = await fetchEstabelecimentos();
                setEstabelecimentos(data);
                setEstabelecimentoId(data[0]?.id ?? "");
            } catch (error) {
                console.log(error);
                setErrorMessage("Não foi possível carregar os estabelecimentos. Tente novamente mais tarde.");
            } finally {
                setLoadingEstabelecimentos(false);
            }
        }

        loadEstabelecimentos();
    }, []);

    function validateForm() {
        if (!name || !email || !whatsapp || !password || !confirmPassword) {
            setErrorMessage("Preencha todos os campos obrigatórios.");
            return false;
        }

        if (role !== "DONO" && !estabelecimentoId) {
            setErrorMessage("Selecione um estabelecimento.");
            return false;
        }

        if (role === "DONO" && (!estabelecimentoNome || !estabelecimentoEndereco)) {
            setErrorMessage("Preencha o nome e endereço do estabelecimento.");
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage("As senhas não conferem.");
            return false;
        }

        if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
            setErrorMessage("Data de nascimento deve estar no formato YYYY-MM-DD.");
            return false;
        }
        return true;
    }

    async function handleRegister() {
        setErrorMessage("");

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            let selectedEstabelecimentoId = estabelecimentoId;

            if (role === "DONO") {
                const proprietario = await registerProprietario({
                    nome: name,
                    email,
                    senha: password,
                    whatsapp,
                });

                const estabelecimento = await createEstabelecimento({
                    nome: estabelecimentoNome,
                    endereco: estabelecimentoEndereco,
                    telefone: estabelecimentoTelefone || undefined,
                    whatsapp: estabelecimentoWhatsapp || whatsapp,
                    email: estabelecimentoEmail || undefined,
                    tipoNegocio: "BARBEARIA",
                    proprietarioId: proprietario.id,
                });
                selectedEstabelecimentoId = estabelecimento.id;
            } else {
                await registerCliente({
                    nome: name,
                    email,
                    senha: password,
                    whatsapp,
                    estabelecimentoId: selectedEstabelecimentoId,
                    dataNascimento: birthDate || undefined,
                });
            }

            router.replace(`/auth/login?role=${role}`);
        } catch (error) {
            console.log(error);
            setErrorMessage(error instanceof Error ? error.message : "Erro de conexão com o servidor. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView
                contentContainerStyle={registerStyles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
            >
                <Text style={registerStyles.title}>Criar conta</Text>
                <Text style={registerStyles.subtitle}>Escolha seu perfil e cadastre-se para usar o app.</Text>

                <View style={registerStyles.form}>
                    <Input title="NOME COMPLETO" value={name} onChangeText={setName} multiline={false} />
                    <Input title="E-MAIL" value={email} onChangeText={setEmail} multiline={false} keyboardType="email-address" autoCapitalize="none" />
                    <Input title="WHATSAPP" value={whatsapp} onChangeText={setWhatsapp} multiline={false} keyboardType="phone-pad" />
                    <Input title="SENHA" value={password} onChangeText={setPassword} multiline={false} secureTextEntry />
                    <Input title="CONFIRMAR SENHA" value={confirmPassword} onChangeText={setConfirmPassword} multiline={false} secureTextEntry />
                    <Input title="DATA DE NASCIMENTO (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} multiline={false} />

                    <View style={registerStyles.selectContainer}>
                        <Text style={registerStyles.inputLabel}>PERFIL</Text>
                        <View style={registerStyles.optionsList}>
                            {[
                                { value: "CLIENTE", label: "Cliente" },
                                { value: "DONO", label: "Dono do estabelecimento" },
                            ].map((item) => (
                                <Pressable
                                    key={item.value}
                                    style={[
                                        registerStyles.optionButton,
                                        role === item.value && registerStyles.optionButtonActive,
                                    ]}
                                    onPress={() => setRole(item.value as "CLIENTE" | "DONO")}
                                >
                                    <Text style={[registerStyles.optionText, role === item.value && registerStyles.optionTextActive]}>{item.label}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {role === "DONO" ? (
                        <View style={registerStyles.selectContainer}>
                            <Text style={registerStyles.inputLabel}>CRIAR ESTABELECIMENTO</Text>
                            <Input title="NOME DO ESTABELECIMENTO" value={estabelecimentoNome} onChangeText={setEstabelecimentoNome} multiline={false} />
                            <Input title="ENDEREÇO" value={estabelecimentoEndereco} onChangeText={setEstabelecimentoEndereco} multiline={false} />
                            <Input title="TELEFONE DO ESTABELECIMENTO" value={estabelecimentoTelefone} onChangeText={setEstabelecimentoTelefone} multiline={false} keyboardType="phone-pad" />
                            <Input title="WHATSAPP DO ESTABELECIMENTO" value={estabelecimentoWhatsapp} onChangeText={setEstabelecimentoWhatsapp} multiline={false} keyboardType="phone-pad" />
                            <Input title="E-MAIL DO ESTABELECIMENTO" value={estabelecimentoEmail} onChangeText={setEstabelecimentoEmail} multiline={false} keyboardType="email-address" autoCapitalize="none" />
                        </View>
                    ) : (
                        <View style={registerStyles.selectContainer}>
                            <Text style={registerStyles.inputLabel}>ESTABELECIMENTO</Text>
                            {loadingEstabelecimentos ? (
                                <ActivityIndicator size="small" color={'#1851A2'} />
                            ) : estabelecimentos.length === 0 ? (
                                <Text style={registerStyles.emptyText}>Nenhum estabelecimento disponível</Text>
                            ) : (
                                <View style={registerStyles.optionsList}>
                                    {estabelecimentos.map((item) => (
                                        <Pressable
                                            key={item.id}
                                            style={[
                                                registerStyles.optionButton,
                                                item.id === estabelecimentoId && registerStyles.optionButtonActive,
                                            ]}
                                            onPress={() => setEstabelecimentoId(item.id)}
                                        >
                                            <Text style={[registerStyles.optionText, item.id === estabelecimentoId && registerStyles.optionTextActive]}>{item.nome}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {errorMessage ? <Text style={registerStyles.errorText}>{errorMessage}</Text> : null}

                    <Button
                        text={loading ? "Cadastrando..." : "Cadastrar"}
                        onPress={handleRegister}
                        disabled={
                            loading ||
                            (role !== "DONO" && (loadingEstabelecimentos || estabelecimentos.length === 0))
                        }
                    />
                </View>

                <View style={registerStyles.footerRow}>
                    <Text style={registerStyles.footerText}>Já possui conta?</Text>
                    <Link href="/auth/login" style={registerStyles.linkText}>Entrar</Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

