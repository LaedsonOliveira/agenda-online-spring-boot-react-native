import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    editButton: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    photoContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 15,
    },
    photoText: {
        marginTop: 10,
        fontSize: 12,
        color: '#666',
    },
    form: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 15,
    },
    field: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputDisabled: {
        backgroundColor: '#f5f5f5',
        color: '#999',
    },
    logoutButton: {
        backgroundColor: '#F44336',
        margin: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});