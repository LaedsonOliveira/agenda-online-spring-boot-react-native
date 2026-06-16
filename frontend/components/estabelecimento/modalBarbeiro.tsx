import { View, Text, TextInput, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { modalBarbeiroStyles } from '@/styles/modalBarbeiroStyle';

interface Barbeiro {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    especialidade: string;
    foto?: string;
    avaliacao: number;
    totalAvaliacoes: number;
    ativo: boolean;
}

interface ModalBarbeiroProps {
    visible: boolean;
    onClose: () => void;
    onSave: (barbeiro: Barbeiro) => void;
    barbeiro?: Barbeiro | null;
}

export default function ModalBarbeiro({ visible, onClose, onSave, barbeiro }: ModalBarbeiroProps) {
    const [nomeBarbeiro, setNomeBarbeiro] = useState('');
    const [telefoneBarbeiro, setTelefoneBarbeiro] = useState('');
    const [emailBarbeiro, setEmailBarbeiro] = useState('');
    const [especialidadeBarbeiro, setEspecialidadeBarbeiro] = useState('');
    const [fotoBarbeiro, setFotoBarbeiro] = useState<string | null>(null);
    const [barbeiroAtivo, setBarbeiroAtivo] = useState(true);

    useEffect(() => {
        if (barbeiro) {
            setNomeBarbeiro(barbeiro.nome);
            setTelefoneBarbeiro(barbeiro.telefone);
            setEmailBarbeiro(barbeiro.email);
            setEspecialidadeBarbeiro(barbeiro.especialidade);
            setFotoBarbeiro(barbeiro.foto || null);
            setBarbeiroAtivo(barbeiro.ativo);
        } else {
            limparFormulario();
        }
    }, [barbeiro, visible]);

    const limparFormulario = () => {
        setNomeBarbeiro('');
        setTelefoneBarbeiro('');
        setEmailBarbeiro('');
        setEspecialidadeBarbeiro('');
        setFotoBarbeiro(null);
        setBarbeiroAtivo(true);
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar foto');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFotoBarbeiro(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à sua câmera para tirar foto');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFotoBarbeiro(result.assets[0].uri);
        }
    };

    const removerFoto = () => {
        Alert.alert(
            'Remover foto',
            'Tem certeza que deseja remover esta foto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Remover', style: 'destructive' as const, onPress: () => setFotoBarbeiro(null) }
            ]
        );
    };

    const showImageOptions = () => {
        Alert.alert(
            'Foto do Barbeiro',
            'Escolha uma opção',
            [
                { text: 'Tirar foto', onPress: takePhoto },
                { text: 'Escolher da galeria', onPress: pickImage },
                ...(fotoBarbeiro ? [{ text: 'Remover foto', style: 'destructive' as const, onPress: removerFoto }] : []),
                { text: 'Cancelar', style: 'cancel' as const },
            ]
        );
    };

    const handleSalvar = () => {
        if (!nomeBarbeiro.trim()) {
            Alert.alert('Atenção', 'Informe o nome do barbeiro');
            return;
        }
        if (!telefoneBarbeiro.trim()) {
            Alert.alert('Atenção', 'Informe o telefone do barbeiro');
            return;
        }
        if (!emailBarbeiro.trim()) {
            Alert.alert('Atenção', 'Informe o e-mail do barbeiro');
            return;
        }
        if (!especialidadeBarbeiro.trim()) {
            Alert.alert('Atenção', 'Informe a especialidade do barbeiro');
            return;
        }

        const novoBarbeiro: Barbeiro = {
            id: barbeiro?.id || Date.now().toString(),
            nome: nomeBarbeiro,
            telefone: telefoneBarbeiro,
            email: emailBarbeiro,
            especialidade: especialidadeBarbeiro,
            foto: fotoBarbeiro || undefined,
            avaliacao: barbeiro?.avaliacao || 0,
            totalAvaliacoes: barbeiro?.totalAvaliacoes || 0,
            ativo: barbeiroAtivo,
        };

        onSave(novoBarbeiro);
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
            <View style={modalBarbeiroStyles.modalOverlay}>
                <View style={modalBarbeiroStyles.modalContainer}>
                    <Text style={modalBarbeiroStyles.modalTitle}>
                        {barbeiro ? '✏️ Editar Barbeiro' : '➕ Novo Barbeiro'}
                    </Text>
                    {/* CABEÇALHO DO MODAL COM BOTÃO VOLTAR */}
                    <View style={modalBarbeiroStyles.modalHeader}>
                        <TouchableOpacity onPress={onClose} style={modalBarbeiroStyles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={modalBarbeiroStyles.modalTitle}>
                            {barbeiro ? 'Editar Barbeiro' : 'Novo Barbeiro'}
                        </Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* SELEÇÃO DE FOTO */}
                    <TouchableOpacity onPress={showImageOptions} style={modalBarbeiroStyles.fotoContainer}>
                        {fotoBarbeiro ? (
                            <Image source={{ uri: fotoBarbeiro }} style={modalBarbeiroStyles.foto} />
                        ) : (
                            <View style={modalBarbeiroStyles.fotoPlaceholder}>
                                <Ionicons name="camera" size={40} color="#999" />
                                <Text style={modalBarbeiroStyles.fotoText}>Adicionar foto</Text>
                            </View>
                        )}
                        <View style={modalBarbeiroStyles.fotoBadge}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <Text style={modalBarbeiroStyles.inputLabel}>Nome do barbeiro</Text>
                    <TextInput
                        style={modalBarbeiroStyles.input}
                        placeholder="Ex: João Silva"
                        value={nomeBarbeiro}
                        onChangeText={setNomeBarbeiro}
                    />

                    <Text style={modalBarbeiroStyles.inputLabel}>Telefone</Text>
                    <TextInput
                        style={modalBarbeiroStyles.input}
                        placeholder="Ex: (11) 99999-9999"
                        keyboardType="phone-pad"
                        value={telefoneBarbeiro}
                        onChangeText={setTelefoneBarbeiro}
                    />

                    <Text style={modalBarbeiroStyles.inputLabel}>E-mail</Text>
                    <TextInput
                        style={modalBarbeiroStyles.input}
                        placeholder="Ex: joao@barbearia.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={emailBarbeiro}
                        onChangeText={setEmailBarbeiro}
                    />

                    <Text style={modalBarbeiroStyles.inputLabel}>Especialidade</Text>
                    <TextInput
                        style={modalBarbeiroStyles.input}
                        placeholder="Ex: Cabelo, Barba, Cabelo e Barba"
                        value={especialidadeBarbeiro}
                        onChangeText={setEspecialidadeBarbeiro}
                    />

                    <View style={modalBarbeiroStyles.statusContainer}>
                        <Text style={modalBarbeiroStyles.inputLabel}>Status</Text>
                        <View style={modalBarbeiroStyles.statusButtons}>
                            <TouchableOpacity
                                style={[modalBarbeiroStyles.statusButton, barbeiroAtivo && modalBarbeiroStyles.statusButtonActive]}
                                onPress={() => setBarbeiroAtivo(true)}
                            >
                                <Text style={[modalBarbeiroStyles.statusButtonText, barbeiroAtivo && modalBarbeiroStyles.statusButtonTextActive]}>
                                    Ativo
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[modalBarbeiroStyles.statusButton, !barbeiroAtivo && modalBarbeiroStyles.statusButtonInactive]}
                                onPress={() => setBarbeiroAtivo(false)}
                            >
                                <Text style={[modalBarbeiroStyles.statusButtonText, !barbeiroAtivo && modalBarbeiroStyles.statusButtonTextInactive]}>
                                    Inativo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={modalBarbeiroStyles.modalButtons}>
                        <TouchableOpacity style={modalBarbeiroStyles.cancelButton} onPress={onClose}>
                            <Text style={modalBarbeiroStyles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalBarbeiroStyles.saveButton} onPress={handleSalvar}>
                            <Text style={modalBarbeiroStyles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}