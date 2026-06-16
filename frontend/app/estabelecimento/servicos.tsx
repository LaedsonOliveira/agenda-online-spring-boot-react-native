import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { agendamentoStyles } from '@/styles/agendamentoStyles';
import ModalServico from '@/components/estabelecimento/modalServico';
import { fetchEstabelecimento, fetchServicos, createServico, updateServico, deleteServico } from '@/utils/api';

interface Servico {
    id: string;
    nome: string;
    descricao?: string;
    preco?: number;
    duracao?: number;
    ativo?: boolean;
    estabelecimentoId?: string;
}

export default function ServicosScreen() {
    const params = useLocalSearchParams();
    const estabelecimentoParamId = typeof params.id === 'string' && params.id.length > 0 ? params.id : typeof params.estabelecimentoId === 'string' && params.estabelecimentoId.length > 0 ? params.estabelecimentoId : undefined;
    const proprietarioParamId = typeof params.proprietarioId === 'string' && params.proprietarioId.length > 0 ? params.proprietarioId : undefined;
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [estabelecimentoId, setEstabelecimentoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

    useEffect(() => {
        const carregarServicos = async () => {
            try {
                setLoading(true);
                const estabelecimento = await fetchEstabelecimento(estabelecimentoParamId, proprietarioParamId);
                const estabelecimentoIdValue = estabelecimento.id?.toString() ?? null;
                setEstabelecimentoId(estabelecimentoIdValue);

                const data = await fetchServicos(estabelecimentoIdValue ?? undefined);
                setServicos(data.map((item: any) => ({
                    ...item,
                    id: String(item.id),
                    nome: item.nome,
                    descricao: item.descricao,
                    preco: Number(item.precoBase ?? 0),
                    duracao: Number(item.duracaoMinutos ?? 0),
                    ativo: item.ativo ?? true,
                    estabelecimentoId: item.estabelecimentoId ? String(item.estabelecimentoId) : undefined,
                })));
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar serviços.');
            } finally {
                setLoading(false);
            }
        };
        carregarServicos();
    }, [estabelecimentoParamId, proprietarioParamId]);

    const abrirModalNovo = () => {
        setServicoEditando(null);
        setModalVisible(true);
    };

    const abrirModalEditar = (servico: Servico) => {
        setServicoEditando(servico);
        setModalVisible(true);
    };

    const salvarServico = async (servico: Servico) => {
        try {
            if (servicoEditando) {
                const response = await updateServico(servico.id, {
                    nome: servico.nome,
                    descricao: servico.descricao ?? '',
                    precoBase: servico.preco ?? 0,
                    duracaoMinutos: servico.duracao ?? 0,
                    ativo: servico.ativo,
                });

                const updatedServico = {
                    id: String(response.id),
                    nome: response.nome,
                    descricao: response.descricao,
                    preco: Number(response.precoBase ?? 0),
                    duracao: Number(response.duracaoMinutos ?? 0),
                    ativo: response.ativo ?? true,
                    estabelecimentoId: response.estabelecimentoId ? String(response.estabelecimentoId) : undefined,
                };
                setServicos(servicos.map(s => s.id === servico.id ? updatedServico : s));
                Alert.alert('Sucesso', 'Serviço atualizado!');
            } else {
                if (!estabelecimentoId) {
                    throw new Error('Estabelecimento não encontrado');
                }

                const response = await createServico({
                    nome: servico.nome,
                    descricao: servico.descricao ?? '',
                    precoBase: servico.preco ?? 0,
                    duracaoMinutos: servico.duracao ?? 0,
                    ativo: servico.ativo,
                    estabelecimentoId: estabelecimentoId,
                });

                const newServico = {
                    id: String(response.id),
                    nome: response.nome,
                    descricao: response.descricao,
                    preco: Number(response.precoBase ?? 0),
                    duracao: Number(response.duracaoMinutos ?? 0),
                    ativo: response.ativo ?? true,
                    estabelecimentoId: response.estabelecimentoId ? String(response.estabelecimentoId) : estabelecimentoId ?? undefined,
                };
                setServicos([...servicos, newServico]);
                Alert.alert('Sucesso', 'Serviço adicionado!');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível salvar o serviço.');
        } finally {
            setModalVisible(false);
            setServicoEditando(null);
        }
    };

    const deletarServico = (id: string) => {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir este serviço?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteServico(id);
                            setServicos(servicos.filter(s => s.id !== id));
                            Alert.alert('Sucesso', 'Serviço excluído!');
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Erro', 'Não foi possível excluir o serviço.');
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
                <Text style={agendamentoStyles.loadingText}>Carregando serviços...</Text>
            </View>
        );
    }

    return (
        <View style={agendamentoStyles.container}>
            <View style={agendamentoStyles.servicosHeader}>
                <Text style={agendamentoStyles.title}>Serviços</Text>
                <TouchableOpacity style={agendamentoStyles.addButton} onPress={abrirModalNovo}>
                    <Ionicons name="add" size={24} color="#fff" />
                    <Text style={agendamentoStyles.addButtonText}>Novo Serviço</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={agendamentoStyles.servicosContent}>
                {servicos.map((servico) => (
                    <View key={servico.id} style={agendamentoStyles.servicoCard}>
                        <View style={agendamentoStyles.servicoCardContent}>
                            <View>
                                <Text style={agendamentoStyles.servicoNome}>{servico.nome}</Text>
                                <Text style={agendamentoStyles.servicoDetalhes}>
                                    R$ {servico.preco ?? 0} • {servico.duracao ?? 0} min
                                </Text>
                                {!servico.ativo && (
                                    <Text style={agendamentoStyles.servicoInativoText}>Inativo</Text>
                                )}
                            </View>
                            <View style={agendamentoStyles.servicoActions}>
                                <TouchableOpacity onPress={() => abrirModalEditar(servico)}>
                                    <Ionicons name="create-outline" size={22} color="#007AFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletarServico(servico.id)}>
                                    <Ionicons name="trash-outline" size={22} color="#F44336" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <ModalServico
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setServicoEditando(null);
                }}
                onSave={salvarServico}
                servico={servicoEditando}
            />
        </View>
    );
}
