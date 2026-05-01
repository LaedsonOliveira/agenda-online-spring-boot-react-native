import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { themas } from "@/app/global/themes";

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
    const [role, setRole] = useState<"CLIENTE" | "FUNCIONARIO" | "DONO">("CLIENTE");
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

    const BACKEND_API_URL = "http://localhost:8080/api";

    useEffect(() => {
        async function loadEstabelecimentos() {
            try {
                const response = await fetch(`${BACKEND_API_URL}/estabelecimentos`);
                if (!response.ok) {
                    throw new Error("Falha ao carregar estabelecimentos");
                }
                const data = await response.json();
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

    async function createEstabelecimento() {
        const response = await fetch(`${BACKEND_API_URL}/estabelecimentos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: estabelecimentoNome,
                endereco: estabelecimentoEndereco,
                telefone: estabelecimentoTelefone || undefined,
                whatsapp: estabelecimentoWhatsapp || whatsapp,
                email: estabelecimentoEmail || undefined,
                tipoNegocio: "BARBEARIA",
            }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => null);
            throw new Error(body?.message || "Falha ao criar estabelecimento.");
        }

        return response.json();
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
                const estabelecimento = await createEstabelecimento();
                selectedEstabelecimentoId = estabelecimento.id;
            }

            const response = await fetch(`${BACKEND_API_URL}/clientes/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: name,
                    email,
                    senha: password,
                    whatsapp,
                    estabelecimentoId: selectedEstabelecimentoId,
                    dataNascimento: birthDate || undefined,
                }),
            });

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                setErrorMessage(body?.message || "Falha ao cadastrar. Verifique os dados e tente novamente.");
                return;
            }

            router.replace("/login");
        } catch (error) {
            console.log(error);
            setErrorMessage(error instanceof Error ? error.message : "Erro de conexão com o servidor. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Escolha seu perfil e cadastre-se para usar o app.</Text>

            <View style={styles.form}>
                <Input title="NOME COMPLETO" value={name} onChangeText={setName} multiline={false} />
                <Input title="E-MAIL" value={email} onChangeText={setEmail} multiline={false} keyboardType="email-address" autoCapitalize="none" />
                <Input title="WHATSAPP" value={whatsapp} onChangeText={setWhatsapp} multiline={false} keyboardType="phone-pad" />
                <Input title="SENHA" value={password} onChangeText={setPassword} multiline={false} secureTextEntry />
                <Input title="CONFIRMAR SENHA" value={confirmPassword} onChangeText={setConfirmPassword} multiline={false} secureTextEntry />
                <Input title="DATA DE NASCIMENTO (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} multiline={false} />

                <View style={styles.selectContainer}>
                    <Text style={styles.inputLabel}>PERFIL</Text>
                    <View style={styles.optionsList}>
                        {[
                            { value: "CLIENTE", label: "Cliente" },
                            { value: "FUNCIONARIO", label: "Funcionário" },
                            { value: "DONO", label: "Dono do estabelecimento" },
                        ].map((item) => (
                            <Pressable
                                key={item.value}
                                style={[
                                    styles.optionButton,
                                    role === item.value && styles.optionButtonActive,
                                ]}
                                onPress={() => setRole(item.value as "CLIENTE" | "FUNCIONARIO" | "DONO")}
                            >
                                <Text style={[styles.optionText, role === item.value && styles.optionTextActive]}>{item.label}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {role === "DONO" ? (
                    <View style={styles.selectContainer}>
                        <Text style={styles.inputLabel}>CRIAR ESTABELECIMENTO</Text>
                        <Input title="NOME DO ESTABELECIMENTO" value={estabelecimentoNome} onChangeText={setEstabelecimentoNome} multiline={false} />
                        <Input title="ENDEREÇO" value={estabelecimentoEndereco} onChangeText={setEstabelecimentoEndereco} multiline={false} />
                        <Input title="TELEFONE DO ESTABELECIMENTO" value={estabelecimentoTelefone} onChangeText={setEstabelecimentoTelefone} multiline={false} keyboardType="phone-pad" />
                        <Input title="WHATSAPP DO ESTABELECIMENTO" value={estabelecimentoWhatsapp} onChangeText={setEstabelecimentoWhatsapp} multiline={false} keyboardType="phone-pad" />
                        <Input title="E-MAIL DO ESTABELECIMENTO" value={estabelecimentoEmail} onChangeText={setEstabelecimentoEmail} multiline={false} keyboardType="email-address" autoCapitalize="none" />
                    </View>
                ) : (
                    <View style={styles.selectContainer}>
                        <Text style={styles.inputLabel}>ESTABELECIMENTO</Text>
                        {loadingEstabelecimentos ? (
                            <ActivityIndicator size="small" color={themas.Colors.primary} />
                        ) : estabelecimentos.length === 0 ? (
                            <Text style={styles.emptyText}>Nenhum estabelecimento disponível</Text>
                        ) : (
                            <View style={styles.optionsList}>
                                {estabelecimentos.map((item) => (
                                    <Pressable
                                        key={item.id}
                                        style={[
                                            styles.optionButton,
                                            item.id === estabelecimentoId && styles.optionButtonActive,
                                        ]}
                                        onPress={() => setEstabelecimentoId(item.id)}
                                    >
                                        <Text style={[styles.optionText, item.id === estabelecimentoId && styles.optionTextActive]}>{item.nome}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <Button
                    text={loading ? "Cadastrando..." : "Cadastrar"}
                    onPress={handleRegister}
                    disabled={
                        loading ||
                        (role !== "DONO" && (loadingEstabelecimentos || estabelecimentos.length === 0))
                    }
                />
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Já possui conta?</Text>
                <Link href="/login" style={styles.linkText}>Entrar</Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: "#f7f9fc",
        alignItems: "stretch",
        justifyContent: "center",
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#18263f",
        textAlign: "center",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#5b6975",
        textAlign: "center",
        marginBottom: 24,
    },
    form: {
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 12,
        color: "#7b8490",
        marginBottom: 8,
    },
    selectContainer: {
        marginBottom: 12,
    },
    optionsList: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d1d5db",
        backgroundColor: "#fff",
        marginRight: 10,
        marginBottom: 10,
    },
    optionButtonActive: {
        backgroundColor: themas.Colors.primary,
        borderColor: themas.Colors.primary,
    },
    optionText: {
        color: "#374151",
        fontSize: 14,
    },
    optionTextActive: {
        color: "#fff",
    },
    emptyText: {
        color: "#9ca3af",
        fontSize: 14,
    },
    errorText: {
        color: themas.Colors.red,
        marginBottom: 10,
        textAlign: "center",
    },
    footerRow: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    footerText: {
        color: "#5b6975",
        fontSize: 14,
    },
    linkText: {
        color: themas.Colors.primary,
        fontSize: 14,
        textDecorationLine: "underline",
    },
});