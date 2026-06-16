import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
    // ============================================
    // ESTILOS GERAIS DO CONTAINER
    // ============================================
    container: {
        flex: 1,                     // Ocupa toda a tela
        backgroundColor: '#f5f5f5',  // Cor de fundo cinza claro
    },

    // ============================================
    // CABEÇALHO
    // ============================================
    header: {
        padding: 20,                 // Espaçamento interno
        backgroundColor: '#fff',     // Fundo branco
        borderBottomWidth: 1,        // Borda inferior
        borderBottomColor: '#e0e0e0', // Cor da borda
    },
    title: {
        fontSize: 28,                // Tamanho da fonte
        fontWeight: 'bold',          // Negrito
        color: '#000',               // Cor preta
    },
    subtitle: {
        fontSize: 14,                // Tamanho da fonte
        color: '#666',               // Cor cinza
        marginTop: 5,               // Espaçamento superior
    },

    // ============================================
    // GRID DE CARDS (ESTATÍSTICAS)
    // ============================================
    statsGrid: {
        flexDirection: 'row',        // Layout em linha
        flexWrap: 'wrap',           // Quebra linha quando necessário
        padding: 10,                // Espaçamento interno
        gap: 10,                    // Espaço entre os cards
    },
    statCard: {
        flex: 1,                    // Ocupa o espaço disponível
        minWidth: '45%',            // Largura mínima
        backgroundColor: '#fff',    // Fundo branco
        borderRadius: 12,          // Bordas arredondadas
        padding: 15,               // Espaçamento interno
        alignItems: 'center',      // Centraliza conteúdo
        shadowColor: '#000',       // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Offset da sombra
        shadowOpacity: 0.05,       // Opacidade da sombra
        shadowRadius: 4,           // Raio da sombra
        elevation: 2,              // Sombra no Android
    },
    statIcon: {
        width: 50,                 // Largura do ícone
        height: 50,                // Altura do ícone
        borderRadius: 25,         // Bordas arredondadas (círculo)
        alignItems: 'center',      // Centraliza horizontal
        justifyContent: 'center',  // Centraliza vertical
        marginBottom: 10,         // Espaço abaixo do ícone
    },
    statValue: {
        fontSize: 24,              // Tamanho do número
        fontWeight: 'bold',        // Negrito
        color: '#000',             // Cor preta
    },
    statTitle: {
        fontSize: 12,              // Tamanho do texto
        color: '#666',             // Cor cinza
        textAlign: 'center',       // Texto centralizado
    },

    // ============================================
    // BOTÃO PRINCIPAL - VER TODOS AGENDAMENTOS
    // ============================================
    verAgendamentosButton: {
        flexDirection: 'row',       // Ícone e texto lado a lado
        alignItems: 'center',       // Centraliza vertical
        justifyContent: 'center',   // Centraliza horizontal
        gap: 10,                    // Espaço entre ícone e texto
        backgroundColor: '#007AFF', // Fundo azul
        marginHorizontal: 15,       // Margem nas laterais
        marginTop: 10,              // Margem superior
        marginBottom: 5,            // Margem inferior
        padding: 15,                // Espaçamento interno
        borderRadius: 12,          // Bordas arredondadas
        shadowColor: '#000',        // Sombra
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    verAgendamentosText: {
        color: '#fff',              // Texto branco
        fontWeight: 'bold',         // Negrito
        fontSize: 16,              // Tamanho da fonte
    },

    // ============================================
    // SEÇÃO DE PRÓXIMOS AGENDAMENTOS
    // ============================================
    section: {
        backgroundColor: '#fff',    // Fundo branco
        marginTop: 15,             // Margem superior
        marginHorizontal: 15,      // Margem nas laterais
        paddingHorizontal: 15,     // Espaçamento lateral interno
        paddingVertical: 15,       // Espaçamento vertical interno
        borderRadius: 12,          // Bordas arredondadas
    },
    sectionHeader: {
        flexDirection: 'row',       // Título e "Ver todos" lado a lado
        justifyContent: 'space-between', // Espaço entre eles
        alignItems: 'center',       // Centraliza vertical
        marginBottom: 15,          // Espaço abaixo
    },
    sectionTitle: {
        fontSize: 18,              // Tamanho do título
        fontWeight: 'bold',         // Negrito
        color: '#000',             // Cor preta
    },
    seeAll: {
        color: '#007AFF',          // Cor azul
        fontSize: 14,              // Tamanho da fonte
    },

    // ============================================
    // CARD DE AGENDAMENTO (LISTA)
    // ============================================
    appointmentCard: {
        flexDirection: 'row',       // Info e horário lado a lado
        justifyContent: 'space-between', // Espaço entre eles
        alignItems: 'center',       // Centraliza vertical
        paddingVertical: 12,       // Espaçamento vertical
        borderBottomWidth: 1,      // Linha divisória
        borderBottomColor: '#f0f0f0', // Cor da linha
    },
    appointmentInfo: {
        flex: 1,                   // Ocupa o espaço disponível
    },
    clienteName: {
        fontSize: 16,              // Tamanho do nome
        fontWeight: '500',         // Peso médio
        color: '#000',             // Cor preta
    },
    appointmentDetails: {
        fontSize: 12,              // Tamanho do detalhe
        color: '#666',             // Cor cinza
        marginTop: 4,             // Espaço acima
    },
    appointmentTime: {
        flexDirection: 'row',       // Ícone e hora lado a lado
        alignItems: 'center',       // Centraliza vertical
        gap: 4,                    // Espaço entre ícone e hora
        backgroundColor: '#f5f5f5', // Fundo cinza claro
        paddingHorizontal: 10,      // Espaçamento lateral
        paddingVertical: 5,        // Espaçamento vertical
        borderRadius: 15,          // Bordas arredondadas
    },
    timeText: {
        fontSize: 14,              // Tamanho da hora
        color: '#666',             // Cor cinza
    },

    // ============================================
    // BOTÕES RÁPIDOS (AÇÕES)
    // ============================================
    quickActions: {
        flexDirection: 'row',       // Botões lado a lado
        gap: 10,                   // Espaço entre os botões
        padding: 15,               // Espaçamento interno
        marginBottom: 20,          // Margem inferior
    },
    actionButton: {
        flex: 1,                   // Ocupa espaço igual
        flexDirection: 'row',       // Ícone e texto lado a lado
        alignItems: 'center',       // Centraliza vertical
        justifyContent: 'center',   // Centraliza horizontal
        gap: 8,                    // Espaço entre ícone e texto
        backgroundColor: '#007AFF', // Fundo azul
        padding: 15,               // Espaçamento interno
        borderRadius: 10,          // Bordas arredondadas
    },
    actionText: {
        color: '#fff',             // Texto branco
        fontWeight: 'bold',         // Negrito
        fontSize: 14,              // Tamanho da fonte
    },

    // ============================================
    // BOTÃO SECUNDÁRIO (RELATÓRIOS)
    // ============================================
    secondaryButton: {
        backgroundColor: '#fff',    // Fundo branco
        borderWidth: 1,            // Borda
        borderColor: '#007AFF',    // Cor da borda
    },
    secondaryText: {
        color: '#007AFF',          // Texto azul
    },
});