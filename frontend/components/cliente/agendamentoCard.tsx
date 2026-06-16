import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { meusAgendamentosStyles } from '@/styles/meusAgendamentoStyles';

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

interface AgendamentoCardProps {
    agendamento: Agendamento;
    onCancelar?: (agendamento: Agendamento) => void;
    onReagendar?: (agendamento: Agendamento) => void;
    formatarDataBr: (data: string) => string;
    getStatusIcon: (status: string) => string;
    getStatusColor: (status: string) => string;
    getStatusText: (status: string) => string;
    isCancelando?: boolean;
}

export function AgendamentoCard({
    agendamento,
    onCancelar,
    onReagendar,
    formatarDataBr,
    getStatusIcon,
    getStatusColor,
    getStatusText,
    isCancelando = false
}: AgendamentoCardProps) {
    const isFuturo = agendamento.status !== 'concluido' && agendamento.status !== 'cancelado';
    const isHoje = agendamento.data === new Date().toISOString().split('T')[0];
    const statusLower = agendamento.status.toLowerCase();

    return (
        <View style={meusAgendamentosStyles.card}>
            {/* CABEÇALHO DO CARD */}
            <View style={meusAgendamentosStyles.cardHeader}>
                <View style={meusAgendamentosStyles.dateContainer}>
                    <Text style={meusAgendamentosStyles.date}>{formatarDataBr(agendamento.data)}</Text>
                    <Text style={meusAgendamentosStyles.time}>{agendamento.horario}</Text>
                    {isHoje && statusLower === 'confirmado' && (
                        <View style={meusAgendamentosStyles.todayBadge}>
                            <Text style={meusAgendamentosStyles.todayText}>HOJE</Text>
                        </View>
                    )}
                </View>
                <View style={[meusAgendamentosStyles.statusBadge, { backgroundColor: getStatusColor(statusLower) }]}>
                    <Ionicons name={getStatusIcon(statusLower)} size={14} color="#fff" />
                    <Text style={meusAgendamentosStyles.statusText}>{getStatusText(statusLower)}</Text>
                </View>
            </View>

            {/* CONTEÚDO DO CARD */}
            <View style={meusAgendamentosStyles.cardContent}>
                <View style={meusAgendamentosStyles.infoRow}>
                    <Ionicons name="cut" size={20} color="#666" />
                    <Text style={meusAgendamentosStyles.services}>
                        {agendamento.servicos?.join(' • ') || agendamento.servicoNome || 'Serviço não informado'}
                    </Text>
                </View>

                <View style={meusAgendamentosStyles.infoRow}>
                    <Ionicons name="person" size={20} color="#666" />
                    <Text style={meusAgendamentosStyles.barber}>{agendamento.barbeiroNome || agendamento.barbeiro || 'Barbeiro não informado'}</Text>
                </View>

                <View style={meusAgendamentosStyles.totalRow}>
                    <Text style={meusAgendamentosStyles.totalLabel}>Total:</Text>
                    <Text style={meusAgendamentosStyles.totalValue}>
                        R$ {typeof agendamento.total === 'number' ? agendamento.total.toFixed(2) : agendamento.valor || '0,00'}
                    </Text>
                </View>

                {agendamento.observacao && (
                    <View style={meusAgendamentosStyles.observacaoContainer}>
                        <Ionicons name="chatbubble-outline" size={16} color="#666" />
                        <Text style={meusAgendamentosStyles.observacao}>{agendamento.observacao}</Text>
                    </View>
                )}
            </View>

            {/* BOTÕES*/}
            <View style={meusAgendamentosStyles.cardActions}>
                {isFuturo && statusLower === 'confirmado' && (
                    <>
                        {/* Botao Reagendar */}
                        <TouchableOpacity
                            style={[meusAgendamentosStyles.actionButton, meusAgendamentosStyles.reagendarButton]}
                            onPress={() => onReagendar?.(agendamento)}
                        >
                            <Ionicons name="refresh" size={18} color="#007AFF" />
                            <Text style={meusAgendamentosStyles.reagendarText}>Reagendar</Text>
                        </TouchableOpacity>

                        {/* Botao Cancelar */}
                        <TouchableOpacity
                            style={[meusAgendamentosStyles.actionButton, meusAgendamentosStyles.cancelarButton]}
                            onPress={() => onCancelar?.(agendamento)}
                            disabled={isCancelando}
                        >
                            {isCancelando ?
                                (<ActivityIndicator size="small" color="#F44336" />) :
                                (
                                    <>
                                        <Ionicons name="close-circle" size={18} color="#F44336" />
                                        <Text style={meusAgendamentosStyles.cancelarText}>Cancelar</Text>
                                    </>
                                )
                            }
                        </TouchableOpacity>

                    </>
                )}

            </View>
        </View>
    );
}
