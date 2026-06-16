import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from '@/styles/barbeiro-detalhesStyles';
import { fetchBarbeiros, fetchAgendamentos } from '@/utils/api';

interface BarbeiroDTO {
  id: string;
  nome: string;
  email?: string;
  especialidade?: string;
  fotoUrl?: string;
  statusOperacional?: string;
}

interface AgendamentoDTO {
  id: string;
  data: string;
  horario: string;
  status: string;
  clienteId?: string;
  servicoId?: string;
}

interface Avaliacao {
  id: string;
  cliente: string;
  nota: number;
  comentario: string;
  data: string;
  servico: string;
}

const comentarios = [
  'Corte impecável!',
  'Atendimento excelente e rápido.',
  'Ficou do jeito que eu queria.',
  'Profissional muito simpático.',
  'Recomendo para todos os clientes.',
];

export default function BarbeiroDetalhesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [barbeiro, setBarbeiro] = useState<BarbeiroDTO | null>(null);
  const [agendamentos, setAgendamentos] = useState<AgendamentoDTO[]>([]);
  // const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [aba, setAba] = useState<'dados' | 'agendamentos' | 'avaliacoes'>('dados');

  useEffect(() => {
    const carregarDados = async () => {
      if (!id || typeof id !== 'string') {
        Alert.alert('Erro', 'Barbeiro inválido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const barbeiros = await fetchBarbeiros();
        const barbeiroEncontrado = barbeiros.find((item: any) => String(item.id) === id);
        if (barbeiroEncontrado) {
          setBarbeiro({
            id: String(barbeiroEncontrado.id),
            nome: barbeiroEncontrado.nome,
            email: barbeiroEncontrado.email,
            especialidade: barbeiroEncontrado.especialidade,
            fotoUrl: barbeiroEncontrado.fotoUrl,
            statusOperacional: barbeiroEncontrado.statusOperacional,
          });
        }

        const agendamentosData = await fetchAgendamentos({ barbeiroId: id });
        const agendamentosMap = agendamentosData.map((item: any) => ({
          id: String(item.id),
          data: item.data,
          horario: item.horario,
          status: item.status,
          clienteId: item.clienteId ? String(item.clienteId) : undefined,
          servicoId: item.servicoId ? String(item.servicoId) : undefined,
        }));
        setAgendamentos(agendamentosMap);

        const realizadas = agendamentosMap.filter((item) => [
          'concluido', 'realizado', 'CONFIRMADO', 'CONFIRMADO',
        ].includes(String(item.status).toLowerCase()));
        const avaliacoesGeradas = realizadas.slice(0, 4).map((item, index) => ({
          id: `${index}`,
          cliente: item.clienteId ? `Cliente ${item.clienteId}` : 'Cliente',
          nota: 4 + (index % 2),
          comentario: comentarios[index % comentarios.length],
          data: item.data,
          servico: item.servicoId ? `Serviço ${item.servicoId}` : 'Serviço',
        }));
        // setAvaliacoes(avaliacoesGeradas);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do barbeiro');
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, [id]);

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const getStatusColor = (status?: string) => {
    if (!status) return '#999';
    switch (status.toUpperCase()) {
      case 'DISPONIVEL': return '#4CAF50';
      case 'CORTANDO': return '#FF9800';
      case 'PAUSADO': return '#FFC107';
      case 'OFFLINE': return '#F44336';
      default: return '#999';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  if (!barbeiro) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Barbeiro não encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonError}>
          <Text style={styles.backButtonErrorText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: barbeiro.fotoUrl || 'https://via.placeholder.com/100' }}
          style={styles.foto}
        />
        <Text style={styles.nome}>{barbeiro.nome}</Text>

        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(barbeiro.statusOperacional) }]}>
            <Text style={styles.statusText}>{barbeiro.statusOperacional ?? 'Desconhecido'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, aba === 'dados' && styles.tabActive]} onPress={() => setAba('dados')}>
          <Text style={[styles.tabLabel, aba === 'dados' && styles.tabLabelActive]}>Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, aba === 'agendamentos' && styles.tabActive]} onPress={() => setAba('agendamentos')}>
          <Text style={[styles.tabLabel, aba === 'agendamentos' && styles.tabLabelActive]}>Agendamentos</Text>
        </TouchableOpacity>
      </View>

      {aba === 'dados' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{barbeiro.email ?? 'Não informado'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Especialidade</Text>
            <Text style={styles.value}>{barbeiro.especialidade ?? 'Não informada'}</Text>
          </View>
        </View>
      )}

      {aba === 'agendamentos' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agendamentos</Text>
          {agendamentos.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum agendamento encontrado para este barbeiro.</Text>
          ) : (
            agendamentos.map((ag) => (
              <View key={ag.id} style={styles.agendamentoCard}>
                <Text style={styles.agendamentoTitle}>{formatarData(ag.data)} - {ag.horario}</Text>
                <Text style={styles.agendamentoText}>Status: {ag.status}</Text>
                <Text style={styles.agendamentoText}>Cliente: {ag.clienteId ?? '—'}</Text>
                <Text style={styles.agendamentoText}>Serviço: {ag.servicoId ?? '—'}</Text>
              </View>
            ))
          )}
        </View>
      )}

    </ScrollView>
  );
}
