import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AgendamentoCard } from '@/components/cliente/agendamentoCard';
import { meusAgendamentosStyles } from '@/styles/meusAgendamentoStyles';
import { fetchAgendamentosCliente, cancelarAgendamento } from '@/utils/api';


// TIPO DE DADOS DO AGENDAMENTO
interface Agendamento {
    id: string;
    data: string;
    horario: string;
    servicos?: string[];
    servicoNome?: string;
    barbeiro?: string;
    barbeiroNome?: string;
    barbeiroId?: string;
    status: string;
    total?: number;
    valor?: number | string;
    observacao?: string;
}


// COMPONENTE PRINCIPAL
export default function MeusAgendamentosScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const clienteId = Array.isArray(params.clienteId) ? params.clienteId[0] : params.clienteId ?? '';

    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [agendamentoCancelando, setAgendamentoCancelando] = useState<string | null>(null);

    // Carregar AGENDAMENTOS 
    const carregarAgendamentos = async () => {
        try {
            if (!clienteId) {
                throw new Error('Cliente ID não encontrado');
            }

            const agendamentosData = await fetchAgendamentosCliente(clienteId as string);

            // Normalizar dados do backend
            const agendamentosFormatados = agendamentosData.map((ag: any) => ({
                id: ag.id,
                data: ag.data,
                horario: ag.horario,
                servicos: ag.servicoNome ? [ag.servicoNome] : [],
                servicoNome: ag.servicoNome || ag.servicoId,
                barbeiro: ag.barbeiroNome || '',
                barbeiroNome: ag.barbeiroNome,
                barbeiroId: ag.barbeiroId,
                status: ag.status?.toLowerCase() || 'pendente',
                total: ag.valor || ag.total || 0,
                valor: ag.valor || ag.total,
                observacao: ag.observacao
            }));

            setAgendamentos(agendamentosFormatados);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar seus agendamentos');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // CARREGAR QUANDO O CLIENTE ID ESTIVER DISPONÍVEL
    useEffect(() => {
        if (!clienteId) {
            setLoading(false);
            return;
        }
        carregarAgendamentos();
    }, [clienteId]);

    // Atualizar tela
    const onRefresh = useCallback(() => {
        if (!clienteId) {
            setRefreshing(false);
            return;
        }
        setRefreshing(true);
        carregarAgendamentos();
    }, [clienteId]);


    // FUNÇÕES DE STATUS
    const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'confirmado': return '#4CAF50';
            case 'pendente': return '#FF9800';
            case 'cancelado': return '#F44336';
            case 'concluido':
            case 'realizado': return '#9E9E9E';
            default: return '#999';
        }
    };

    const getStatusText = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'confirmado': return 'Confirmado';
            case 'pendente': return 'Pendente';
            case 'cancelado': return 'Cancelado';
            case 'concluido':
            case 'realizado': return 'Concluído';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'confirmado': return 'checkmark-circle';
            case 'pendente': return 'time';
            case 'cancelado': return 'close-circle';
            case 'concluido':
            case 'realizado': return 'checkmark-done-circle';
            default: return 'help-circle';
        }
    };

    const formatarDataBr = (data: string) => {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };


    // CANCELAR AGENDAMENTO
    const handleCancelarAgendamento = (agendamento: Agendamento) => {
        Alert.alert(
            'Cancelar Agendamento',
            `Tem certeza que deseja cancelar o agendamento do dia ${formatarDataBr(agendamento.data)} às ${agendamento.horario}?`,
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim, cancelar',
                    style: 'destructive',
                    onPress: () => confirmarCancelamento(agendamento.id)
                }
            ]
        );
    };

    const confirmarCancelamento = async (agendamentoId: string) => {
        setAgendamentoCancelando(agendamentoId);

        try {
            await cancelarAgendamento(agendamentoId);

            setAgendamentos(prevAgendamentos =>
                prevAgendamentos.map(agendamento =>
                    agendamento.id === agendamentoId
                        ? { ...agendamento, status: 'cancelado' }
                        : agendamento
                )
            );

            Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível cancelar o agendamento');
        } finally {
            setAgendamentoCancelando(null);
        }
    };


    // FUNÇÕES DE NAVEGAÇÃO
    const handleReagendar = (agendamento: Agendamento) => {
        router.push(`/(cliente)/agendamento?clienteId=${clienteId}`);
    };


    // TELA DE LOADING
    if (loading) {
        return (
            <View style={meusAgendamentosStyles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={meusAgendamentosStyles.loadingText}>Carregando agendamentos...</Text>
            </View>
        );
    }


    // PRINCIPAL
    return (
        <>
            <ScrollView
                style={meusAgendamentosStyles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* CABEÇALHO */}
                <View style={meusAgendamentosStyles.header}>
                    <Text style={meusAgendamentosStyles.title}>Meus Agendamentos</Text>
                    <TouchableOpacity style={meusAgendamentosStyles.filterButton}>
                        <Ionicons name="filter" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>

                {/* LISTA VAZIA */}
                {agendamentos.length === 0 ? (
                    <View style={meusAgendamentosStyles.emptyContainer}>
                        <Ionicons name="calendar-outline" size={80} color="#ccc" />
                        <Text style={meusAgendamentosStyles.emptyText}>Nenhum agendamento encontrado</Text>
                        <Text style={meusAgendamentosStyles.emptySubtext}>
                            Você ainda não tem agendamentos. Que tal agendar um horário?
                        </Text>
                        <TouchableOpacity
                            style={meusAgendamentosStyles.button}
                            onPress={() => router.push(`/(cliente)/agendamento?clienteId=${clienteId}`)}
                        >
                            <Text style={meusAgendamentosStyles.buttonText}>Agendar agora</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* SEÇÃO: PRÓXIMOS AGENDAMENTOS */}
                        {agendamentos.filter(a => a.status !== 'concluido' && a.status !== 'cancelado').length > 0 && (
                            <View style={meusAgendamentosStyles.section}>
                                <Text style={meusAgendamentosStyles.sectionTitle}>Próximos Agendamentos</Text>
                                {agendamentos
                                    .filter(a => a.status !== 'concluido' && a.status !== 'cancelado')
                                    .sort((a, b) => a.data.localeCompare(b.data))
                                    .map((agendamento) => (
                                        <AgendamentoCard
                                            key={agendamento.id}
                                            agendamento={agendamento}
                                            onCancelar={handleCancelarAgendamento}
                                            onReagendar={handleReagendar}
                                            formatarDataBr={formatarDataBr}
                                            getStatusIcon={getStatusIcon}
                                            getStatusColor={getStatusColor}
                                            getStatusText={getStatusText}
                                            isCancelando={agendamentoCancelando === agendamento.id}
                                        />
                                    ))}
                            </View>
                        )}

                        {/* SEÇÃO: HISTÓRICO */}
                        {agendamentos.filter(a => a.status === 'concluido' || a.status === 'cancelado').length > 0 && (
                            <View style={meusAgendamentosStyles.section}>
                                <Text style={meusAgendamentosStyles.sectionTitle}>Histórico</Text>
                                {agendamentos
                                    .filter(a => a.status === 'concluido' || a.status === 'cancelado')
                                    .sort((a, b) => b.data.localeCompare(a.data))
                                    .map((agendamento) => (
                                        <AgendamentoCard
                                            key={agendamento.id}
                                            agendamento={agendamento}
                                            formatarDataBr={formatarDataBr}
                                            getStatusIcon={getStatusIcon}
                                            getStatusColor={getStatusColor}
                                            getStatusText={getStatusText}
                                        />
                                    ))}
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

        </>
    );
}