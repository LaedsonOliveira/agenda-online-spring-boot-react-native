import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { agendamentoStyles } from '@/styles/agendamentoStyles';
import { fetchAgendamentos, atualizarStatusAgendamento } from '@/utils/api';

interface Agendamento {
  id: string;
  clienteId?: string;
  clienteNome?: string;
  barbeiroId?: string;
  barbeiroNome?: string;
  servicoId?: string;
  servicoNome?: string;
  data: string;
  horario: string;
  status: string;
  valor: number | string;
}

type FiltroPeriodo = 'hoje' | 'semana' | 'mes';

function formatarDataBr(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function parseNumber(value: number | string | undefined) {
  if (value == null) return 0;
  return typeof value === 'number' ? value : Number(value);
}

// useState de agendamentos

export default function AgendamentosScreen() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtro, setFiltro] = useState<FiltroPeriodo>('hoje');
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    confirmados: 0,
    pendentes: 0,
    realizados: 0,
    cancelados: 0,
    faturamento: 0,
  });

  const hoje = new Date().toISOString().split('T')[0];


  //Carrega agendamentos
  const carregarAgendamentos = async () => {
    setLoading(true);
    try {
      const todosAgendamentos = await fetchAgendamentos();
      const agendamentosFiltrados = todosAgendamentos.filter((ag: Agendamento) => {
        if (filtro === 'hoje') return ag.data === hoje;
        if (filtro === 'semana') {
          const dataAtual = new Date(hoje);
          const inicio = new Date(dataAtual);
          const diaAtual = inicio.getDay();
          const diferenca = inicio.getDate() - diaAtual + (diaAtual === 0 ? -6 : 1);
          inicio.setDate(diferenca);
          const fim = new Date(inicio);
          fim.setDate(inicio.getDate() + 6);
          const dataInicioStr = inicio.toISOString().split('T')[0];
          const dataFimStr = fim.toISOString().split('T')[0];
          return ag.data >= dataInicioStr && ag.data <= dataFimStr;
        }
        // Mês
        const inicio = new Date(hoje);
        inicio.setDate(1);
        const fim = new Date(inicio);
        fim.setMonth(inicio.getMonth() + 1);
        fim.setDate(0);
        return ag.data >= inicio.toISOString().split('T')[0] && ag.data <= fim.toISOString().split('T')[0];
      });

      agendamentosFiltrados.sort((a, b) => {
        if (a.data !== b.data) return a.data.localeCompare(b.data);
        return a.horario.localeCompare(b.horario);
      });

      setAgendamentos(agendamentosFiltrados);

      //filtro de agendamentos
      const total = agendamentosFiltrados.length;
      const confirmados = agendamentosFiltrados.filter(a => a.status.toLowerCase() === 'confirmado').length;
      const pendentes = agendamentosFiltrados.filter(a => a.status.toLowerCase() === 'pendente').length;
      const realizados = agendamentosFiltrados.filter(a => a.status.toLowerCase() === 'concluido' || a.status.toLowerCase() === 'realizado').length;
      const cancelados = agendamentosFiltrados.filter(a => a.status.toLowerCase() === 'cancelado').length;
      const faturamento = agendamentosFiltrados.reduce((sum, a) => sum + parseNumber(a.valor), 0);

      setEstatisticas({ total, confirmados, pendentes, realizados, cancelados, faturamento });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  // Efeito colateral, iniciar tela
  useEffect(() => {
    carregarAgendamentos();
  }, [filtro]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarAgendamentos();
  }, [filtro]);


  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado': return '#4CAF50';
      case 'pendente': return '#FF9800';
      case 'realizado':
      case 'concluido': return '#2196F3';
      case 'cancelado': return '#F44336';
      default: return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado': return 'Confirmado';
      case 'pendente': return 'Pendente';
      case 'realizado':
      case 'concluido': return 'Realizado';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };


  //atualizar status de agendamento
  const atualizarStatus = async (id: string, statusAtual: string) => {
    const opcoes = [
      { text: 'CONFIRMADO', value: 'CONFIRMADO' },
      { text: 'CONCLUIDO', value: 'CONCLUIDO' },
      { text: 'CANCELADO', value: 'CANCELADO' },
      { text: 'PENDENTE', value: 'PENDENTE' },
    ];

    Alert.alert(
      'Alterar Status',
      'Selecione o novo status:',
      [
        ...opcoes.map(op => ({
          text: getStatusText(op.value),
          onPress: async () => {
            if (op.value === statusAtual) {
              Alert.alert('Aviso', 'O status já é este');
              return;
            }
            try {
              await atualizarStatusAgendamento(id, op.value);
              carregarAgendamentos();
              Alert.alert('Sucesso', `Status alterado para ${getStatusText(op.value)}!`);
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Não foi possível atualizar o status');
            }
          }
        })),
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };


  //filtrar por data
  const agendamentosPorData: { [key: string]: Agendamento[] } = {};
  agendamentos.forEach(ag => {
    if (!agendamentosPorData[ag.data]) {
      agendamentosPorData[ag.data] = [];
    }
    agendamentosPorData[ag.data].push(ag);
  });

  if (loading && agendamentos.length === 0) {
    return (
      <View style={agendamentoStyles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={agendamentoStyles.loadingText}>Carregando agendamentos...</Text>
      </View>
    );
  }

  return (
    <View style={agendamentoStyles.container}>

      <View style={agendamentoStyles.header}>
        <Text style={agendamentoStyles.title}>Agendamentos</Text>

        <View style={agendamentoStyles.resumoContainer}>

          {/* Estatisticas */}
          <View style={agendamentoStyles.resumoItem}>
            <Text style={agendamentoStyles.resumoNumero}>{estatisticas.total}</Text>
            <Text style={agendamentoStyles.resumoLabel}>Total</Text>
          </View>
          <View style={agendamentoStyles.resumoItem}>
            <Text style={[agendamentoStyles.resumoNumero, { color: '#4CAF50' }]}>{estatisticas.confirmados}</Text>
            <Text style={agendamentoStyles.resumoLabel}>Confirmados</Text>
          </View>
          <View style={agendamentoStyles.resumoItem}>
            <Text style={[agendamentoStyles.resumoNumero, { color: '#FF9800' }]}>{estatisticas.pendentes}</Text>
            <Text style={agendamentoStyles.resumoLabel}>Pendentes</Text>
          </View>
          <View style={agendamentoStyles.resumoItem}>
            <Text style={[agendamentoStyles.resumoNumero, { color: '#007AFF' }]}>R${estatisticas.faturamento}</Text>
            <Text style={agendamentoStyles.resumoLabel}>Faturamento</Text>
          </View>

        </View>
      </View>

      <View style={agendamentoStyles.filtrosContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['hoje', 'semana', 'mes'] as FiltroPeriodo[]).map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[agendamentoStyles.filtroBotao, filtro === opcao && agendamentoStyles.filtroAtivo]}
              onPress={() => setFiltro(opcao)}
            >
              <Text style={[agendamentoStyles.filtroTexto, filtro === opcao && agendamentoStyles.filtroTextoAtivo]}>
                {opcao === 'hoje' ? 'Hoje' : opcao === 'semana' ? 'Semana' : 'Mês'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={agendamentoStyles.agendamentosList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {Object.entries(agendamentosPorData).length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 16, color: '#999', marginBottom: 10 }}>Nenhum agendamento encontrado</Text>
            <Text style={{ fontSize: 14, color: '#bbb' }}>para o período selecionado.</Text>
          </View>
        ) : (
          Object.entries(agendamentosPorData).map(([data, items]) => (
            <View key={data} style={agendamentoStyles.section}>
              <Text style={agendamentoStyles.sectionTitle}>{formatarDataBr(data)}</Text>
              {items.map((agendamento) => (
                <View key={agendamento.id} style={agendamentoStyles.card}>
                  <View style={agendamentoStyles.cardHeader}>
                    <Text style={agendamentoStyles.date}>{formatarDataBr(agendamento.data)}</Text>
                    <View style={[agendamentoStyles.statusBadge, { backgroundColor: getStatusColor(agendamento.status) }]}>
                      <Ionicons name="ellipse" size={10} color="#fff" />
                      <Text style={agendamentoStyles.statusText}>{getStatusText(agendamento.status)}</Text>
                    </View>
                  </View>
                  <View style={agendamentoStyles.cardContent}>
                    <Text style={agendamentoStyles.agendamentoText}>Cliente: {agendamento.clienteNome || agendamento.clienteId || '—'}</Text>
                    <Text style={agendamentoStyles.agendamentoText}>Barbeiro: {agendamento.barbeiroNome || agendamento.barbeiroId || '—'}</Text>
                    <Text style={agendamentoStyles.agendamentoText}>Serviço: {agendamento.servicoNome || agendamento.servicoId || '—'}</Text>
                    <Text style={agendamentoStyles.agendamentoText}>Horário: {agendamento.horario}</Text>
                    <Text style={agendamentoStyles.agendamentoText}>Valor: R$ {parseNumber(agendamento.valor).toFixed(2)}</Text>
                  </View>
                  <View style={agendamentoStyles.cardActions}>
                    <TouchableOpacity
                      style={agendamentoStyles.actionButton}
                      onPress={() => atualizarStatus(agendamento.id, agendamento.status.toUpperCase())}
                    >
                      <Text style={agendamentoStyles.actionText}>Alterar Status</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
