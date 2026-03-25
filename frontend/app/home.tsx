import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/(tabs)");
    }, [router]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carregando painel...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 18,
        color: "#555",
    },
});