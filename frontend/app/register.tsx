import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleRegister() {
        if (!name || !email || !password || !confirmPassword) {
            alert("Preencha todos os campos.");
            return;
        }
        if (password !== confirmPassword) {
            alert("As senhas não conferem.");
            return;
        }
        // TODO: integrar backend de cadastro
        console.log("Cadastro realizado:", { name, email });
        alert("Cadastro realizado com sucesso! Faça login.");
        router.replace("/login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar administrador</Text>
            <Text style={styles.subtitle}>Crie sua conta para gerenciar agendamentos.</Text>

            <TextInput
                placeholder="Nome completo"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Senha"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirmar senha"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>

            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Já possui conta?</Text>
                <Link href="/login" style={styles.linkText}>Entrar</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#2c3e50",
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: 20,
        color: "#555",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 14,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#2c7be5",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerRow: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    footerText: {
        color: "#555",
        fontSize: 14,
    },
    linkText: {
        color: "#2c7be5",
        fontSize: 14,
        textDecorationLine: "underline",
    },
});