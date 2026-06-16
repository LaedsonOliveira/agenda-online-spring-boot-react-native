import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
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
    content: {
        flex: 1,
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    diaNome: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    horariosContainer: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 15,
    },
    horarioButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    horarioLabel: {
        fontSize: 12,
        color: '#666',
    },
    horarioValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        margin: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});