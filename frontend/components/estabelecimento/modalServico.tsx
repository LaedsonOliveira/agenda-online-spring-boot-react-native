import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/modalServicosStyles';

interface Servico {
    id: string;
    nome: string;
    preco?: number;
    duracao?: number;
    ativo?: boolean;
}

interface ModalServicoProps {
    visible: boolean;
    onClose: () => void;
    onSave: (servico: Servico) => void;
    servico?: Servico | null;
}

export default function ModalServico({ visible, onClose, onSave, servico }: ModalServicoProps) {
    const [nomeServico, setNomeServico] = useState('');
    const [precoServico, setPrecoServico] = useState('');
    const [duracaoServico, setDuracaoServico] = useState('');
    const [servicoAtivo, setServicoAtivo] = useState(true);

    useEffect(() => {
        if (servico) {
            setNomeServico(servico.nome);
            setPrecoServico(servico.preco.toString());
            setDuracaoServico(servico.duracao.toString());
            setServicoAtivo(servico.ativo);
        } else {
            limparFormulario();
        }
    }, [servico, visible]);

    const limparFormulario = () => {
        setNomeServico('');
        setPrecoServico('');
        setDuracaoServico('');
        setServicoAtivo(true);
    };

    const handleSalvar = () => {
        if (!nomeServico.trim()) {
            Alert.alert('Atenção', 'Informe o nome do serviço');
            return;
        }
        if (!precoServico || parseFloat(precoServico) <= 0) {
            Alert.alert('Atenção', 'Informe um preço válido');
            return;
        }
        if (!duracaoServico || parseInt(duracaoServico) <= 0) {
            Alert.alert('Atenção', 'Informe uma duração válida');
            return;
        }

        const novoServico: Servico = {
            id: servico?.id || Date.now().toString(),
            nome: nomeServico,
            preco: parseFloat(precoServico),
            duracao: parseInt(duracaoServico),
            ativo: servicoAtivo,
        };

        onSave(novoServico);
        onClose();
        limparFormulario();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        {servico ? '✏️ Editar Serviço' : '➕ Novo Serviço'}
                    </Text>

                    <Text style={styles.inputLabel}>Nome do serviço</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Corte de Cabelo"
                        value={nomeServico}
                        onChangeText={setNomeServico}
                    />

                    <Text style={styles.inputLabel}>Preço (R$)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 30"
                        keyboardType="numeric"
                        value={precoServico}
                        onChangeText={setPrecoServico}
                    />

                    <Text style={styles.inputLabel}>Tempo estimado (minutos)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 30"
                        keyboardType="numeric"
                        value={duracaoServico}
                        onChangeText={setDuracaoServico}
                    />

                    <View style={styles.statusContainer}>
                        <Text style={styles.inputLabel}>Status</Text>
                        <View style={styles.statusButtons}>
                            <TouchableOpacity
                                style={[styles.statusButton, servicoAtivo && styles.statusButtonActive]}
                                onPress={() => setServicoAtivo(true)}
                            >
                                <Text style={[styles.statusButtonText, servicoAtivo && styles.statusButtonTextActive]}>
                                    Ativo
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusButton, !servicoAtivo && styles.statusButtonInactive]}
                                onPress={() => setServicoAtivo(false)}
                            >
                                <Text style={[styles.statusButtonText, !servicoAtivo && styles.statusButtonTextInactive]}>
                                    Inativo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}