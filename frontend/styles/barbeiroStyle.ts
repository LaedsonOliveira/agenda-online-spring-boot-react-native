import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    foto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    nomeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    inativoBadge: {
        backgroundColor: '#F44336',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    inativoText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        gap: 15,
    },
    rowAvaliacao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 2,
    },
    avaliacaoTexto: {
        fontSize: 12,
        color: '#666',
    },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
    },
    especialidadeText: {
        color: '#007AFF',
        fontWeight: '500',
    },
});