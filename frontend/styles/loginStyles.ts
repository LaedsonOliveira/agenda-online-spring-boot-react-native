import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    boxTop: {
        flex: 0.45,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        paddingHorizontal: 24,
    },

    boxMid: {
        flex: 0.35,
        width: "100%",
        paddingHorizontal: 24,
        justifyContent: "center",
    },

    boxBottom: {
        flex: 0.2,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    logo: {
        width: 90,
        height: 90,
        marginBottom: 16,
    },

    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24,
    },

    titleInput: {
        marginLeft: 5,
        marginTop: 20,
        fontSize: 12,
        color: "#888",
        textTransform: "uppercase",
    },

    boxInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#D7D8D7",
        backgroundColor: "#F1F7FA",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
        height: "100%",
        color: "#000000", // texto digitado
        fontSize: 16,
    },

    boxIcon: {
        width: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        width: "70%",
        height: 50,
        borderRadius: 25,
        backgroundColor: "#1851A2",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        marginTop: 20,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    textBottom: {
        fontSize: 15,
        color: "#777",
    },

    textBottomCreate: {
        fontSize: 15,
        color: "#1851A2",
        fontWeight: "600",
    },

    roleSelectorContainer: {
        width: '100%',
        marginTop: 16,
    },

    roleOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },

    roleButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D7D8D7',
        borderRadius: 25,
        paddingVertical: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F7FA',
    },

    roleButtonActive: {
        borderColor: '#1851A2',
        backgroundColor: '#E6F0FF',
    },

    roleButtonText: {
        color: '#333',
        fontWeight: '600',
    },

    roleButtonTextActive: {
        color: '#1851A2',
    },
});