import { StyleSheet } from 'react-native';

export const modalBarbeiroStyles = StyleSheet.create({
    // ============================================
    // ESTILOS DO MODAL
    // ============================================
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxWidth: 400,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        padding: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },

    // ============================================
    // ESTILOS DA FOTO
    // ============================================
    fotoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
        alignSelf: 'center',
    },
    foto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    fotoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fotoPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
        borderStyle: 'dashed',
    },
    fotoText: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    fotoBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF',
        borderRadius: 15,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },

    // ============================================
    // ESTILOS DOS INPUTS
    // ============================================
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    // ============================================
    // ESTILOS DO STATUS
    // ============================================
    statusContainer: {
        marginTop: 10,
    },
    statusButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    statusButtonActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    statusButtonInactive: {
        backgroundColor: '#F44336',
        borderColor: '#F44336',
    },
    statusButtonText: {
        fontSize: 14,
        color: '#666',
    },
    statusButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    statusButtonTextInactive: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // ============================================
    // ESTILOS DOS BOTÕES DO MODAL
    // ============================================
    modalButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});