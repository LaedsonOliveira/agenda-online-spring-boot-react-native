import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { dashboardStyles } from '@/styles/dashboardStyle';
import { fetchAgendamentos } from '@/utils/api';

interface Agendamento {
    id: string;
    data: string;
    horario: string;
    status: string;
    valor: number | string;
    clienteId?: string;
    barbeiroId?: string;
    servicoId?: string;
}

function parseNumber(value: number | string | undefined) {
    if (value == null) return 0;
    return typeof value === 'number' ? value : Number(value);
}

function getWeekRange() {
    const today = new Date();
    const first = new Date(today);
    first.setDate(today.getDate() - today.getDay());
    const last = new Date(first);
    last.setDate(first.getDate() + 6);
    return [first.toISOString().split('T')[0], last.toISOString().split('T')[0]];
}

function getMonthRange() {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [first.toISOString().split('T')[0], last.toISOString().split('T')[0]];
}

export default function DashboardScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        agendamentosHoje: 0,
        agendamentosSemana: 0,
        faturamentoMes: 0,
        clientes: 0,
    });
    const [proximos, setProximos] = useState<Agendamento[]>([]);

    useEffect(() => {
        const carregarDashboard = async () => {
            setLoading(true);
            try {
                const agendamentos = await fetchAgendamentos();
                const hoje = new Date().toISOString().split('T')[0];
                const [inicioSemana, fimSemana] = getWeekRange();
                const [inicioMes, fimMes] = getMonthRange();

                const proximosAgendamentos = agendamentos
                    .filter((ag: Agendamento) => ag.data >= hoje)
                    .sort((a: Agendamento, b: Agendamento) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario))
                    .slice(0, 3);

                const agendamentosHoje = agendamentos.filter((ag: Agendamento) => ag.data === hoje).length;
                const agendamentosSemana = agendamentos.filter(
                    (ag: Agendamento) => ag.data >= inicioSemana && ag.data <= fimSemana,
                ).length;
                const faturamentoMes = agendamentos
                    .filter((ag: Agendamento) => ag.data >= inicioMes && ag.data <= fimMes)
                    .reduce((sum: number, ag: Agendamento) => sum + parseNumber(ag.valor), 0);
                const clientes = new Set(agendamentos.map((ag: Agendamento) => ag.clienteId ?? ag.barbeiroId ?? ag.id)).size;

                setStats({
                    agendamentosHoje,
                    agendamentosSemana,
                    faturamentoMes,
                    clientes,
                });
                setProximos(proximosAgendamentos);
            } catch (error) {
                console.error('Erro ao carregar dashboard:', error);
                Alert.alert('Erro', 'Não foi possível carregar dados do dashboard.');
            } finally {
                setLoading(false);
            }
        };
        carregarDashboard();
    }, []);

    const irParaAgendamentos = () => router.push('/estabelecimento/agendamentos');

    if (loading) {
        return (
            <View style={dashboardStyles.container}>
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 60 }} />
                <Text style={dashboardStyles.subtitle}>Carregando dashboard...</Text>
            </View>
        );
    }

    const cards = [
        { id: 1, title: 'Agendamentos Hoje', value: stats.agendamentosHoje.toString(), icon: 'calendar', color: '#007AFF' },
        { id: 2, title: 'Agendamentos Semana', value: stats.agendamentosSemana.toString(), icon: 'calendar-outline', color: '#4CAF50' },
        { id: 3, title: 'Total Clientes', value: stats.clientes.toString(), icon: 'people', color: '#FF9800' },
        { id: 4, title: 'Faturamento Mês', value: `R$ ${stats.faturamentoMes}`, icon: 'cash', color: '#9C27B0' },
    ];

    return (
        <ScrollView style={dashboardStyles.container}>
            <View style={dashboardStyles.header}>
                <Text style={dashboardStyles.title}>Dashboard</Text>
                <Text style={dashboardStyles.subtitle}>Bem-vindo de volta!</Text>
            </View>

            <View style={dashboardStyles.statsGrid}>
                {cards.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        style={dashboardStyles.statCard}
                        onPress={() => {
                            if (card.id === 1 || card.id === 2) irParaAgendamentos();
                        }}
                    >
                        <View style={[dashboardStyles.statIcon, { backgroundColor: card.color + '20' }]}>
                            <Ionicons name={card.icon as any} size={24} color={card.color} />
                        </View>
                        <Text style={dashboardStyles.statValue}>{card.value}</Text>
                        <Text style={dashboardStyles.statTitle}>{card.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={dashboardStyles.section}>
                <View style={dashboardStyles.sectionHeader}>
                    <Text style={dashboardStyles.sectionTitle}>Próximos Agendamentos</Text>
                    <TouchableOpacity onPress={irParaAgendamentos}>
                        <Text style={dashboardStyles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                {proximos.length === 0 ? (
                    <Text style={dashboardStyles.sectionTitle}>Nenhum agendamento futuro encontrado.</Text>
                ) : (
                    proximos.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={dashboardStyles.appointmentCard}
                            onPress={irParaAgendamentos}
                        >
                            <View style={dashboardStyles.appointmentInfo}>
                                <Text style={dashboardStyles.clienteName}>#{item.id}</Text>
                                <Text style={dashboardStyles.appointmentDetails}>
                                    {item.servicoId ? `Serviço ${item.servicoId}` : 'Serviço'} • {item.barbeiroId ? `Barbeiro ${item.barbeiroId}` : 'Barbeiro'}
                                </Text>
                            </View>
                            <View style={dashboardStyles.appointmentTime}>
                                <Ionicons name="time" size={16} color="#666" />
                                <Text style={dashboardStyles.timeText}>{item.data} {item.horario}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>

            <View style={dashboardStyles.quickActions}>
                <TouchableOpacity style={dashboardStyles.actionButton} onPress={irParaAgendamentos}>
                    <Ionicons name="add-circle" size={24} color="#fff" />
                    <Text style={dashboardStyles.actionText}>Ver agendamentos</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
