import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { agendamentoStyles } from '@/styles/agendamentoStyles';

// MOCK DE AGENDAMENTOS (mesmo de agendamentos.tsx)
const gerarData = (dias: number) => {
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return data.toISOString().split('T')[0];
};
const gerarHorario = (hora: number) => `${hora.toString().padStart(2, '0')}:00`;
const clientes = ['João Silva', 'Maria Souza', 'Pedro Santos', 'Ana Costa', 'Carlos Lima', 'Fernanda Rocha', 'Ricardo Alves', 'Patrícia Dias'];
const servicosLista = ['Cabelo', 'Barba', 'Cabelo + Barba', 'Sobrancelha', 'Pezinho', 'Platinado'];
const barbeirosLista = ['João Silva', 'Marcos Santos', 'Carlos Oliveira', 'Ricardo Souza'];
const gerarAgendamentosMock = (): Agendamento[] => {
    const agendamentos: Agendamento[] = [];
    let id = 1;
    for (let i = 30; i > 0; i--) {
        const data = gerarData(-i);
        if (Math.random() > 0.3) {
            const numAgendamentos = Math.floor(Math.random() * 5) + 1;
            for (let j = 0; j < numAgendamentos; j++) {
                const hora = Math.floor(Math.random() * 10) + 8;
                agendamentos.push({
                    id: (id++).toString(),
                    cliente: clientes[Math.floor(Math.random() * clientes.length)],
                    clienteId: (Math.floor(Math.random() * 50) + 1).toString(),
                    data,
                    horario: gerarHorario(hora),
                    servico: servicosLista[Math.floor(Math.random() * servicosLista.length)],
                    servicoId: (Math.floor(Math.random() * 6) + 1).toString(),
                    barbeiro: barbeirosLista[Math.floor(Math.random() * barbeirosLista.length)],
                    barbeiroId: (Math.floor(Math.random() * 4) + 1).toString(),
                    status: 'realizado',
                    valor: Math.floor(Math.random() * 80) + 20,
                    criadoEm: new Date().toISOString(),
                });
            }
        }
    }
    for (let i = 1; i <= 30; i++) {
        const data = gerarData(i);
        const numAgendamentos = Math.floor(Math.random() * 4);
        for (let j = 0; j < numAgendamentos; j++) {
            const hora = Math.floor(Math.random() * 10) + 8;
            const status = Math.random() > 0.7 ? 'pendente' : 'confirmado';
            agendamentos.push({
                id: (id++).toString(),
                cliente: clientes[Math.floor(Math.random() * clientes.length)],
                clienteId: (Math.floor(Math.random() * 50) + 1).toString(),
                data,
                horario: gerarHorario(hora),
                servico: servicosLista[Math.floor(Math.random() * servicosLista.length)],
                servicoId: (Math.floor(Math.random() * 6) + 1).toString(),
                barbeiro: barbeirosLista[Math.floor(Math.random() * barbeirosLista.length)],
                barbeiroId: (Math.floor(Math.random() * 4) + 1).toString(),
                status,
                valor: Math.floor(Math.random() * 80) + 20,
                criadoEm: new Date().toISOString(),
            });
        }
    }
    const hoje = new Date().toISOString().split('T')[0];
    const agendamentosHoje = [
        { cliente: 'João Silva', horario: '09:00', servico: 'Cabelo', barbeiro: 'João Silva', status: 'confirmado', valor: 30 },
        { cliente: 'Maria Souza', horario: '10:30', servico: 'Barba', barbeiro: 'Marcos Santos', status: 'pendente', valor: 25 },
        { cliente: 'Pedro Santos', horario: '11:00', servico: 'Cabelo + Barba', barbeiro: 'Carlos Oliveira', status: 'confirmado', valor: 50 },
        { cliente: 'Ana Costa', horario: '14:00', servico: 'Sobrancelha', barbeiro: 'João Silva', status: 'confirmado', valor: 15 },
        { cliente: 'Carlos Lima', horario: '15:30', servico: 'Cabelo', barbeiro: 'Ricardo Souza', status: 'pendente', valor: 30 },
        { cliente: 'Fernanda Rocha', horario: '16:00', servico: 'Barba', barbeiro: 'Marcos Santos', status: 'confirmado', valor: 25 },
        { cliente: 'Ricardo Alves', horario: '17:30', servico: 'Pezinho', barbeiro: 'Carlos Oliveira', status: 'pendente', valor: 10 },
        { cliente: 'Patrícia Dias', horario: '18:00', servico: 'Cabelo', barbeiro: 'João Silva', status: 'confirmado', valor: 30 },
    ];
    agendamentosHoje.forEach((ag) => {
        agendamentos.push({
            id: (id++).toString(),
            cliente: ag.cliente,
            clienteId: (Math.floor(Math.random() * 50) + 1).toString(),
            data: hoje,
            horario: ag.horario,
            servico: ag.servico,
            servicoId: (Math.floor(Math.random() * 6) + 1).toString(),
            barbeiro: ag.barbeiro,
            barbeiroId: (Math.floor(Math.random() * 4) + 1).toString(),
            status: ag.status,
            valor: ag.valor,
            criadoEm: new Date().toISOString(),
        });
    });
    return agendamentos;
};
const simularDelay = (ms: number = 500) => new Promise<void>(resolve => setTimeout(resolve, ms));
const buscarAgendamentosPorData = async (data: string): Promise<Agendamento[]> => {
    await simularDelay();
    return gerarAgendamentosMock().filter(a => a.data === data);
};
const buscarAgendamentosPorPeriodo = async (dataInicio: string, dataFim: string): Promise<Agendamento[]> => {
    await simularDelay();
    return gerarAgendamentosMock().filter(a => a.data >= dataInicio && a.data <= dataFim);
};
const atualizarStatusAgendamento = async (id: string, novoStatus: Agendamento['status']): Promise<void> => {
    await simularDelay(800);
    // Não faz nada, só simula
};
const buscarEstatisticas = async (periodo: FiltroPeriodo) => {
    await simularDelay();
    const hoje = new Date().toISOString().split('T')[0];
    let agendamentosFiltrados: Agendamento[] = [];
    const agendamentosMock = gerarAgendamentosMock();
    if (periodo === 'hoje') {
        agendamentosFiltrados = agendamentosMock.filter(a => a.data === hoje);
    } else if (periodo === 'semana') {
        const inicio = new Date();
        inicio.setDate(inicio.getDate() - inicio.getDay());
        const fim = new Date(inicio);
        fim.setDate(inicio.getDate() + 6);
        agendamentosFiltrados = agendamentosMock.filter(a =>
            a.data >= inicio.toISOString().split('T')[0] &&
            a.data <= fim.toISOString().split('T')[0]
        );
    } else {
        const inicio = new Date();
        inicio.setDate(1);
        const fim = new Date();
        fim.setMonth(fim.getMonth() + 1);
        fim.setDate(0);
        agendamentosFiltrados = agendamentosMock.filter(a =>
            a.data >= inicio.toISOString().split('T')[0] &&
            a.data <= fim.toISOString().split('T')[0]
        );
    }
    return {
        total: agendamentosFiltrados.length,
        confirmados: agendamentosFiltrados.filter(a => a.status === 'confirmado').length,
        pendentes: agendamentosFiltrados.filter(a => a.status === 'pendente').length,
        realizados: agendamentosFiltrados.filter(a => a.status === 'realizado').length,
        cancelados: agendamentosFiltrados.filter(a => a.status === 'cancelado').length,
        faturamento: agendamentosFiltrados.reduce((sum, a) => sum + a.valor, 0),
    };
};

interface Agendamento {
    id: string;
    cliente: string;
    clienteId: string;
    data: string;
    horario: string;
    servico: string;
    servicoId: string;
    barbeiro: string;
    barbeiroId: string;
    status: 'pendente' | 'confirmado' | 'realizado' | 'cancelado';
    valor: number;
    criadoEm: string;
}

type FiltroPeriodo = 'hoje' | 'semana' | 'mes';

interface AgendamentosListProps {
    filtroInicial?: FiltroPeriodo;
    showHeader?: boolean;
    showResumo?: boolean;
}

export default function AgendamentosList({
    filtroInicial = 'hoje',
    showHeader = true,
    showResumo = true
}: AgendamentosListProps) {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filtro, setFiltro] = useState<FiltroPeriodo>(filtroInicial);
    const [estatisticas, setEstatisticas] = useState({
        total: 0,
        confirmados: 0,
        pendentes: 0,
        realizados: 0,
        cancelados: 0,
        faturamento: 0,
    });

    const hoje = new Date().toISOString().split('T')[0];

    const carregarAgendamentos = async () => {
        setLoading(true);
        try {
            let dados: Agendamento[] = [];
            switch (filtro) {
                case 'hoje':
                    dados = await buscarAgendamentosPorData(hoje);
                    break;
                case 'semana':
                    const inicioSemana = new Date();
                    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
                    const fimSemana = new Date(inicioSemana);
                    fimSemana.setDate(inicioSemana.getDate() + 6);
                    dados = await buscarAgendamentosPorPeriodo(
                        inicioSemana.toISOString().split('T')[0],
                        fimSemana.toISOString().split('T')[0]
                    );
                    break;
                case 'mes':
                    const inicioMes = new Date();
                    inicioMes.setDate(1);
                    const fimMes = new Date();
                    fimMes.setMonth(fimMes.getMonth() + 1);
                    fimMes.setDate(0);
                    dados = await buscarAgendamentosPorPeriodo(
                        inicioMes.toISOString().split('T')[0],
                        fimMes.toISOString().split('T')[0]
                    );
                    break;
            }

            dados.sort((a, b) => {
                if (a.data !== b.data) return a.data.localeCompare(b.data);
                return a.horario.localeCompare(b.horario);
            });

            setAgendamentos(dados);

            const stats = await buscarEstatisticas(filtro);
            setEstatisticas(stats);

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        carregarAgendamentos();
    }, [filtro]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        carregarAgendamentos();
    }, [filtro]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmado': return '#4CAF50';
            case 'pendente': return '#FF9800';
            case 'realizado': return '#2196F3';
            case 'cancelado': return '#F44336';
            default: return '#999';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmado': return 'Confirmado';
            case 'pendente': return 'Pendente';
            case 'realizado': return 'Realizado';
            case 'cancelado': return 'Cancelado';
            default: return status;
        }
    };

    const atualizarStatus = async (id: string, novoStatus: string) => {
        Alert.alert(
            'Alterar Status',
            `Deseja alterar o status deste agendamento para ${getStatusText(novoStatus)}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            await atualizarStatusAgendamento(id, novoStatus as Agendamento['status']);
                            carregarAgendamentos();
                            Alert.alert('Sucesso', 'Status atualizado!');
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível atualizar o status');
                        }
                    }
                }
            ]
        );
    };

    const formatarDataBr = (data: string) => {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const agendamentosPorData: { [key: string]: Agendamento[] } = {};
    agendamentos.forEach(ag => {
        if (!agendamentosPorData[ag.data]) {
            agendamentosPorData[ag.data] = [];
        }
        agendamentosPorData[ag.data].push(ag);
    });

    if (loading && agendamentos.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Carregando agendamentos...</Text>
            </View>
        );
    }

    return (
        <View style={agendamentoStyles.container}>
            {showHeader && (
                <View style={styles.header}>
                    <Text style={agendamentoStyles.title}>Agendamentos</Text>

                    {showResumo && (
                        <View style={styles.resumoContainer}>
                            <View style={styles.resumoItem}>
                                <Text style={styles.resumoNumero}>{estatisticas.total}</Text>
                                <Text style={styles.resumoLabel}>Total</Text>
                            </View>
                            <View style={styles.resumoItem}>
                                <Text style={[styles.resumoNumero, { color: '#4CAF50' }]}>{estatisticas.confirmados}</Text>
                                <Text style={styles.resumoLabel}>Confirmados</Text>
                            </View>
                            <View style={styles.resumoItem}>
                                <Text style={[styles.resumoNumero, { color: '#FF9800' }]}>{estatisticas.pendentes}</Text>
                                <Text style={styles.resumoLabel}>Pendentes</Text>
                            </View>
                            <View style={styles.resumoItem}>
                                <Text style={[styles.resumoNumero, { color: '#007AFF' }]}>R${estatisticas.faturamento}</Text>
                                <Text style={styles.resumoLabel}>Faturamento</Text>
                            </View>
                        </View>
                    )}
                </View>
            )}

            {/* FILTROS */}
            <View style={styles.filtrosContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {(['hoje', 'semana', 'mes'] as FiltroPeriodo[]).map((opcao) => (
                        <TouchableOpacity
                            key={opcao}
                            style={[styles.filtroBotao, filtro === opcao && styles.filtroAtivo]}
                            onPress={() => setFiltro(opcao)}
                        >
                            <Text style={[styles.filtroTexto, filtro === opcao && styles.filtroTextoAtivo]}>
                                {opcao === 'hoje' ? 'Hoje' : opcao === 'semana' ? 'Semana' : 'Mês'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* LISTA */}
            {agendamentos.length === 0 && !loading ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="calendar-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.content}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {Object.keys(agendamentosPorData).sort().map((data) => (
                        <View key={data} style={styles.dataSection}>
                            <View style={styles.dataHeader}>
                                <Text style={styles.dataTexto}>{formatarDataBr(data)}</Text>
                                <View style={styles.dataBadge}>
                                    <Text style={styles.dataBadgeTexto}>{agendamentosPorData[data].length} agendamentos</Text>
                                </View>
                            </View>

                            {agendamentosPorData[data].map((agendamento) => (
                                <View key={agendamento.id} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.clienteNome}>{agendamento.cliente}</Text>
                                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agendamento.status) }]}>
                                            <Text style={styles.statusText}>{getStatusText(agendamento.status)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardContent}>
                                        <View style={styles.infoRow}>
                                            <Ionicons name="time" size={18} color="#666" />
                                            <Text style={styles.infoText}>{agendamento.horario}</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Ionicons name="cut" size={18} color="#666" />
                                            <Text style={styles.infoText}>{agendamento.servico}</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Ionicons name="person" size={18} color="#666" />
                                            <Text style={styles.infoText}>Barbeiro: {agendamento.barbeiro}</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Ionicons name="cash" size={18} color="#4CAF50" />
                                            <Text style={[styles.infoText, { color: '#4CAF50', fontWeight: 'bold' }]}>R$ {agendamento.valor},00</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardActions}>
                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.confirmarButton]}
                                            onPress={() => atualizarStatus(agendamento.id, 'confirmado')}
                                        >
                                            <Text style={styles.confirmarText}>Confirmar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.realizadoButton]}
                                            onPress={() => atualizarStatus(agendamento.id, 'realizado')}
                                        >
                                            <Text style={styles.realizadoText}>Realizado</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.cancelarButton]}
                                            onPress={() => atualizarStatus(agendamento.id, 'cancelado')}
                                        >
                                            <Text style={styles.cancelarText}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = {
    header: { backgroundColor: '#fff', padding: 15, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    resumoContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
    resumoItem: { alignItems: 'center' },
    resumoNumero: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    resumoLabel: { fontSize: 12, color: '#666', marginTop: 4 },
    filtrosContainer: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    filtroBotao: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginRight: 10, backgroundColor: '#f0f0f0' },
    filtroAtivo: { backgroundColor: '#007AFF' },
    filtroTexto: { fontSize: 14, color: '#666' },
    filtroTextoAtivo: { color: '#fff', fontWeight: 'bold' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, color: '#666' },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
    emptyText: { fontSize: 18, fontWeight: '500', color: '#333', marginTop: 20 },
    content: { flex: 1, padding: 15 },
    dataSection: { marginBottom: 20 },
    dataHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 5 },
    dataTexto: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    dataBadge: { backgroundColor: '#007AFF20', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    dataBadgeTexto: { fontSize: 12, color: '#007AFF', fontWeight: '500' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 10 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    clienteNome: { fontSize: 16, fontWeight: 'bold', color: '#000' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    statusText: { color: '#fff', fontSize: 12, fontWeight: '500' },
    cardContent: { gap: 8 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    infoText: { fontSize: 14, color: '#333' },
    cardActions: { flexDirection: 'row', gap: 10, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
    actionButton: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
    confirmarButton: { backgroundColor: '#4CAF50' },
    confirmarText: { color: '#fff', fontSize: 12, fontWeight: '500' },
    realizadoButton: { backgroundColor: '#2196F3' },
    realizadoText: { color: '#fff', fontSize: 12, fontWeight: '500' },
    cancelarButton: { backgroundColor: '#F44336' },
    cancelarText: { color: '#fff', fontSize: 12, fontWeight: '500' },
} as any;