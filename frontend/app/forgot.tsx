import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    function handleSendReset() {
        if (!email) {
            alert("Digite seu email para recuperar a senha.");
            return;
        }
        // TODO: integrar backend de recuperação de senha
        console.log("Solicitação de reset para:", email);
        alert("Enviamos um link de recuperação para seu email.");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar senha</Text>
            <Text style={styles.subtitle}>Informe seu email para receber o link de redefinição.</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Pressable style={styles.button} onPress={handleSendReset}>
                <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>

            <Link href="/login" style={styles.linkText}>
                Voltar ao login
            </Link>
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
    linkText: {
        marginTop: 14,
        color: "#2c7be5",
        textAlign: "center",
        fontSize: 14,
        textDecorationLine: "underline",
    },
});