import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface AvaliarServicoProps {
    agendamentoId?: string;
    onClose?: () => void;
    onSuccess?: () => void;
}

export default function AvaliarServico({ agendamentoId: propAgendamentoId, onClose, onSuccess }: AvaliarServicoProps) {
    const router = useRouter();
    const params = useLocalSearchParams();
    const agendamentoId = propAgendamentoId || params.agendamentoId;
    
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleEnviarAvaliacao = async () => {
        if (nota === 0) {
            Alert.alert('Atenção', 'Selecione uma nota para avaliar o serviço');
            return;
        }

        setEnviando(true);
        try {
            // TODO: Conectar com API
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Avaliação enviada:', { agendamentoId, nota, comentario });

            Alert.alert(
                'Obrigado!',
                'Sua avaliação foi enviada com sucesso!',
                [{ text: 'OK', onPress: () => {
                    if (onClose) onClose();
                    if (onSuccess) onSuccess();
                    router.back();
                }}]
            );
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível enviar sua avaliação');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Avaliar Serviço</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Como foi sua experiência?</Text>

                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => setNota(star)}
                            style={styles.starButton}
                        >
                            <Ionicons
                                name={star <= nota ? "star" : "star-outline"}
                                size={40}
                                color={star <= nota ? "#FFB800" : "#ccc"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Deixe um comentário (opcional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Conte-nos sobre sua experiência..."
                    multiline
                    numberOfLines={4}
                    value={comentario}
                    onChangeText={setComentario}
                />

                <TouchableOpacity
                    style={[styles.button, enviando && styles.buttonDisabled]}
                    onPress={handleEnviarAvaliacao}
                    disabled={enviando}
                >
                    <Text style={styles.buttonText}>
                        {enviando ? 'Enviando...' : 'Enviar Avaliação'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = {
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    backButton: { marginRight: 15 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#000' },
    content: { padding: 20 },
    label: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 10 },
    starsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
    starButton: { padding: 5 },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 15, fontSize: 16, textAlignVertical: 'top', minHeight: 100, marginBottom: 30, borderWidth: 1, borderColor: '#e0e0e0' },
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonDisabled: { backgroundColor: '#999' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
} as any;