import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // LOADING
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 14,
    },
    backButtonError: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backButtonErrorText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },

    // CABEÇALHO
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#007AFF',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 8,
    },
    foto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerAvaliacao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerAvaliacaoTexto: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 8,
    },
    statusContainer: {
        marginTop: 5,
    },
    statusBadge: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // ABAS
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 15,
        marginHorizontal: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabActive: {
        backgroundColor: '#007AFF20',
    },
    tabText: {
        fontSize: 14,
        color: '#666',
    },
    tabTextActive: {
        color: '#007AFF',
        fontWeight: 'bold',
    },

    // CONTEÚDO
    content: {
        padding: 15,
    },

    // INFO CARD
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    especialidadeText: {
        color: '#007AFF',
        fontWeight: '500',
    },

    // STATS CARD
    statsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    statItem: {
        flex: 1,
        minWidth: '45%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        margin: 5,
    },
    statNumero: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },

    // SEÇÕES
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    historicoTitle: {
        marginTop: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 14,
    },

    // AGENDAMENTOS
    agendamentoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    agendamentoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    clienteNome: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    agendamentoData: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    agendamentoServico: {
        fontSize: 14,
        color: '#333',
    },

    // HISTÓRICO
    historicoCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
    },
    historicoCliente: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    historicoData: {
        fontSize: 11,
        color: '#999',
        marginBottom: 4,
    },
    historicoServico: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },

    // STATUS PEQUENO
    smallBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    smallBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },

    // AVALIAÇÕES
    avaliacaoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    avaliacaoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    avaliacaoCliente: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    avaliacaoStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avaliacaoNota: {
        fontSize: 12,
        color: '#FFB800',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    avaliacaoData: {
        fontSize: 11,
        color: '#999',
        marginBottom: 6,
    },
    avaliacaoComentario: {
        fontSize: 13,
        color: '#555',
        fontStyle: 'italic',
    },
});