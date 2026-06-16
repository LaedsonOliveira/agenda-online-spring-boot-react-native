import { StyleSheet } from 'react-native';

export const agendamentoStyles = StyleSheet.create({
    // ============================================
    // ESTILOS GERAIS
    // ============================================
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    barberiaNome: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // ============================================
    // ESTILOS PARA DATAS (PickerDeData)
    // ============================================
    datesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    dateButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },

    // ============================================
    // ESTILOS PARA HORÁRIOS (PickerDeHorario)
    // ============================================
    timesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    timeButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        minWidth: 80,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },

    // ============================================
    // ESTILOS PARA CORTES/SERVIÇOS (ListaDeCortes)
    // ============================================
    cutOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#007AFF',
    },
    checkmark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cutName: {
        fontSize: 16,
        color: '#333',
    },
    cutPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },

    // ============================================
    // ESTILOS PARA BARBEIROS (ListaDeBarbeiros)
    // ============================================
    barbersContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    barberButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    barberText: {
        fontSize: 14,
        color: '#666',
    },

    // ============================================
    // ESTILOS DE SELEÇÃO (usados por vários componentes)
    // ============================================
    selectedButton: {
        backgroundColor: '#007AFF',
    },
    selectedText: {
        color: '#fff',
    },
    selectedOption: {
        backgroundColor: '#E6F0FF',
    },

    // ============================================
    // ESTILOS PARA TOTAL (CalcularTotal)
    // ============================================
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
    },

    // ============================================
    // ESTILOS DO MODAL (ModalConfirmacao)
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
        width: '85%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    modalContent: {
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        color: '#666',
    },
    modalResumo: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    modalResumoText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    modalTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCancelText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalConfirmButton: {
        flex: 1,
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalConfirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // ============================================
    // ESTILOS DO COMPONENTE AGENDAMENTOS LIST
    // ============================================
    header: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    resumoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    resumoItem: {
        alignItems: 'center',
    },
    resumoNumero: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    resumoLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    filtrosContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    filtroBotao: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
    },
    filtroAtivo: {
        backgroundColor: '#007AFF',
    },
    filtroTexto: {
        fontSize: 14,
        color: '#666',
    },
    filtroTextoAtivo: {
        color: '#fff',
        fontWeight: 'bold',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        marginTop: 20,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
    content: {
        flex: 1,
        padding: 15,
    },
    dataSection: {
        marginBottom: 20,
    },
    dataHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    dataTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    dataBadge: {
        backgroundColor: '#007AFF20',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dataBadgeTexto: {
        fontSize: 12,
        color: '#007AFF',
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    clienteNome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    cardContent: {
        gap: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    actionButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmarButton: {
        backgroundColor: '#4CAF50',
    },
    confirmarText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    realizadoButton: {
        backgroundColor: '#2196F3',
    },
    realizadoText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    cancelarButton: {
        backgroundColor: '#F44336',
    },
    cancelarText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },

    // ============================================
    // ESTILOS PARA TELA DE SERVIÇOS
    // ============================================
    servicosHeader: {
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
    servicosContent: {
        flex: 1,
        padding: 15,
    },
    servicoCard: {
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
    servicoCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    servicoNome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    servicoDetalhes: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    servicoInativoText: {
        fontSize: 12,
        color: '#F44336',
        marginTop: 4,
    },
    servicoActions: {
        flexDirection: 'row',
        gap: 15,
    },
});