import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>AgendaApp</Text>

            <Text style={styles.subtitle}>
                Organize seus agendamentos de forma simples e rápida.
            </Text>

            <Text style={styles.description}>
                Este aplicativo permite que clientes realizem agendamentos em
                estabelecimentos como barbearias, salões de beleza e consultórios.
                Você poderá marcar horários, visualizar seus agendamentos e receber
                confirmações automaticamente.
            </Text>

            <Text style={styles.description}>
                Para começar, faça login na sua conta e gerencie seus horários de forma
                prática.
            </Text>

            <Link href="/login" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Ir para Login</Text>
                </Pressable>
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
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#2c3e50",
    },

    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        color: "#555",
    },

    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 15,
        color: "#444",
        lineHeight: 22,
    },

    button: {
        marginTop: 30,
        backgroundColor: "#2c7be5",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});