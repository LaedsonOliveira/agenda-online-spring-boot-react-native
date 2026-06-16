import { View, Text, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { agendamentoStyles } from '@/styles/agendamentoStyles';
import { styles } from '@/styles/barbeiroStyle';
import ModalBarbeiro from '@/components/estabelecimento/modalBarbeiro';
import { fetchBarbeiros, fetchEstabelecimento, createBarbeiro, updateBarbeiro, deleteBarbeiro } from '@/utils/api';

interface Barbeiro {
  id: string;
  nome: string;
  email: string;
  especialidade: string;
  telefone: string;
  fotoUrl?: string;
  statusOperacional?: string;
  ativo: boolean;
  totalAvaliacoes: number;
  avaliacao: number;
  estabelecimentoId?: string;
}

export default function BarbeiroScreen() {
  const params = useLocalSearchParams();
  const estabelecimentoParamId = typeof params.id === 'string' && params.id.length > 0 ? params.id : typeof params.estabelecimentoId === 'string' && params.estabelecimentoId.length > 0 ? params.estabelecimentoId : undefined;
  const proprietarioParamId = typeof params.proprietarioId === 'string' && params.proprietarioId.length > 0 ? params.proprietarioId : undefined;
  const router = useRouter();
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [estabelecimentoId, setEstabelecimentoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [barbeiroEditando, setBarbeiroEditando] = useState<Barbeiro | null>(null);

  useEffect(() => {
    const carregarBarbeiros = async () => {
      try {
        setLoading(true);
        const estabelecimento = await fetchEstabelecimento(estabelecimentoParamId, proprietarioParamId);
        const estabelecimentoIdValue = estabelecimento.id?.toString() ?? null;
        setEstabelecimentoId(estabelecimentoIdValue);

        const data = await fetchBarbeiros(estabelecimentoIdValue ?? undefined);
        setBarbeiros(data.map((item: any) => ({
          ...item,
          id: String(item.id),
          email: item.email ?? '',
          especialidade: item.especialidade ?? '',
          telefone: item.telefone ?? '',
          fotoUrl: item.fotoUrl,
          statusOperacional: item.statusOperacional,
          ativo: item.statusOperacional !== 'OFFLINE',
          totalAvaliacoes: item.totalAvaliacoes ?? 0,
          avaliacao: item.avaliacao ?? 0,
          estabelecimentoId: item.estabelecimentoId ? String(item.estabelecimentoId) : estabelecimentoIdValue ?? undefined,
        })));
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar barbeiros.');
      } finally {
        setLoading(false);
      }
    };
    carregarBarbeiros();
  }, [estabelecimentoParamId, proprietarioParamId]);

  const abrirDetalhes = (barbeiro: Barbeiro) => {
    router.push(`/estabelecimento/barbeiro-detalhes?id=${barbeiro.id}` as any);
  };

  const abrirModalNovo = () => {
    setBarbeiroEditando(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (barbeiro: Barbeiro) => {
    setBarbeiroEditando(barbeiro);
    setModalVisible(true);
  };

  const salvarBarbeiro = async (barbeiro: Barbeiro) => {
    try {
      if (!estabelecimentoId) {
        throw new Error('Estabelecimento não encontrado');
      }

      if (barbeiroEditando) {
        const response = await updateBarbeiro(barbeiro.id, {
          nome: barbeiro.nome,
          email: barbeiro.email ?? '',
          especialidade: barbeiro.especialidade ?? '',
          fotoUrl: barbeiro.fotoUrl,
          ativo: barbeiro.ativo,
        });

        const updatedBarbeiro = {
          ...barbeiro,
          id: String(response.id),
          nome: response.nome,
          email: response.email,
          especialidade: response.especialidade,
          fotoUrl: response.fotoUrl,
          statusOperacional: response.statusOperacional,
          ativo: response.statusOperacional !== 'OFFLINE',
          estabelecimentoId: response.estabelecimentoId ? String(response.estabelecimentoId) : estabelecimentoId,
        };
        setBarbeiros(barbeiros.map(b => b.id === barbeiro.id ? updatedBarbeiro : b));
        Alert.alert('Sucesso', 'Barbeiro atualizado!');
      } else {
        const response = await createBarbeiro({
          nome: barbeiro.nome,
          email: barbeiro.email ?? '',
          especialidade: barbeiro.especialidade ?? '',
          fotoUrl: barbeiro.fotoUrl,
          estabelecimentoId: estabelecimentoId,
          ativo: barbeiro.ativo,
        });

        const newBarbeiro = {
          ...barbeiro,
          id: String(response.id),
          nome: response.nome,
          email: response.email,
          especialidade: response.especialidade,
          fotoUrl: response.fotoUrl,
          statusOperacional: response.statusOperacional,
          ativo: response.statusOperacional !== 'OFFLINE',
          estabelecimentoId: response.estabelecimentoId ? String(response.estabelecimentoId) : estabelecimentoId,
        };
        setBarbeiros([...barbeiros, newBarbeiro]);
        Alert.alert('Sucesso', 'Barbeiro adicionado!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o barbeiro.');
    } finally {
      setModalVisible(false);
      setBarbeiroEditando(null);
    }
  };

  const deletarBarbeiro = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este barbeiro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBarbeiro(id);
              setBarbeiros(barbeiros.filter(b => b.id !== id));
              Alert.alert('Sucesso', 'Barbeiro excluído!');
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Não foi possível excluir o barbeiro.');
            }
          }
        }
      ]
    );
  };


  if (loading) {
    return (
      <View style={agendamentoStyles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={agendamentoStyles.loadingText}>Carregando barbeiros...</Text>
      </View>
    );
  }

  return (
    <View style={agendamentoStyles.container}>
      <View style={styles.header}>
        <Text style={agendamentoStyles.title}>Barbeiros</Text>
        <TouchableOpacity style={styles.addButton} onPress={abrirModalNovo}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Novo Barbeiro</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {barbeiros.map((barbeiro) => (
          <TouchableOpacity
            key={barbeiro.id}
            onPress={() => abrirDetalhes(barbeiro)}
            activeOpacity={0.7}
          >
            <View style={styles.card}>
              <View style={styles.row}>
                <Image
                  source={{ uri: barbeiro.fotoUrl || 'https://via.placeholder.com/60' }}
                  style={styles.foto}
                />
                <View style={styles.nomeContainer}>
                  <Text style={styles.nome}>{barbeiro.nome}</Text>
                  {!barbeiro.ativo && (
                    <View style={styles.inativoBadge}>
                      <Text style={styles.inativoText}>Offline</Text>
                    </View>
                  )}
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => abrirModalEditar(barbeiro)}>
                    <Ionicons name="create-outline" size={22} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deletarBarbeiro(barbeiro.id)}>
                    <Ionicons name="trash-outline" size={22} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.rowInfo}>
                <Ionicons name="mail-outline" size={16} color="#666" />
                <Text style={styles.infoText}>{barbeiro.email || 'Sem e-mail'}</Text>
              </View>

              <View style={styles.rowInfo}>
                <Ionicons name="cut-outline" size={16} color="#007AFF" />
                <Text style={[styles.infoText, styles.especialidadeText]}>{barbeiro.especialidade || 'Especialidade não informada'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ModalBarbeiro
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setBarbeiroEditando(null);
        }}
        onSave={salvarBarbeiro}
        barbeiro={barbeiroEditando}
      />
    </View>
  );
}
