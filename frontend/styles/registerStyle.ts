import { StyleSheet } from "react-native";
import { themas } from "@/app/global/themes";

export const styles = StyleSheet.create({
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