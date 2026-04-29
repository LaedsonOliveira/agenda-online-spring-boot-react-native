import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        if (!email || !password) {
            alert("Informe email e senha para entrar.");
            return;
        }
        // TODO: integrar backend real de autenticação
        console.log("Email:", email);
        console.log("Senha:", password);
        router.replace("/(tabs)/agendamento" as any);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.subtitle}>
                Entre na sua conta para acessar seus agendamentos
            </Text>

            <TextInput
                placeholder="Digite seu email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Digite sua senha"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <Pressable onPress={() => router.push("/forgot" as any)} style={styles.linkButton}>
                <Text style={styles.linkText}>Esqueci minha senha</Text>
            </Pressable>

            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Ainda não tem conta?</Text>
                <Link href={"/register" as any} style={styles.linkText}>Cadastrar</Link>
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
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#2c3e50",
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
        color: "#555",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 14,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: "#fff",
    },

    button: {
        backgroundColor: "#2c7be5",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    linkButton: {
        marginTop: 12,
        alignItems: "center",
    },

    linkText: {
        color: "#2c7be5",
        fontSize: 14,
        textDecorationLine: "underline",
    },

    footerRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },

    footerText: {
        color: "#555",
        fontSize: 14,
    },
});