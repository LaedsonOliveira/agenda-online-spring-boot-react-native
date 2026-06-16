import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { agendamentoStyles } from '@/styles/agendamentoStyles';
import { formatarData } from '@/utils/formatarData';

interface ModalConfirmacaoProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    // Dados de agendamento
    selectedDate?: string;
    selectedTime?: string;
    selectedCuts?: string[];
    selectedBarber?: string;
    total?: number;
    agendando?: boolean;
    // Tipo do modal
    tipo?: 'agendamento' | 'avaliacao';
    // Dados para avaliação
    nota?: number;
    setNota?: (nota: number) => void;
    comentario?: string;
    setComentario?: (comentario: string) => void;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
    visible,
    onCancel,
    onConfirm,
    selectedDate,
    selectedTime,
    selectedCuts,
    selectedBarber,
    total,
    agendando = false,
    tipo = 'agendamento',
    nota = 0,
    setNota,
    comentario = '',
    setComentario,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={agendamentoStyles.modalOverlay}>
                <View style={agendamentoStyles.modalContainer}>
                    {/* TÍTULO DINÂMICO */}
                    <Text style={agendamentoStyles.modalTitle}>
                        {tipo === 'agendamento' ? 'Confirmar agendamento' : 'Avaliar serviço'}
                    </Text>

                    <View style={agendamentoStyles.modalContent}>
                        {tipo === 'agendamento' ? (
                            // ============================================
                            // CONTEÚDO DO AGENDAMENTO
                            // ============================================
                            <>
                                <Text style={agendamentoStyles.modalText}>
                                    Confirme os dados abaixo antes de finalizar.
                                </Text>
                                <View style={agendamentoStyles.modalResumo}>
                                    <Text style={agendamentoStyles.modalResumoText}>
                                        Data: {formatarData(selectedDate || '')}
                                    </Text>
                                    <Text style={agendamentoStyles.modalResumoText}>
                                        Horário: {selectedTime}
                                    </Text>
                                    <Text style={agendamentoStyles.modalResumoText}>
                                        Serviços: {selectedCuts?.join(', ')}
                                    </Text>
                                    <Text style={agendamentoStyles.modalResumoText}>
                                        Barbeiro: {selectedBarber}
                                    </Text>
                                    <Text style={agendamentoStyles.modalTotalText}>
                                        Total: R$ {total},00
                                    </Text>
                                </View>
                            </>
                        ) : (
                            // ============================================
                            // CONTEÚDO DA AVALIAÇÃO
                            // ============================================
                            <>
                                <Text style={agendamentoStyles.modalText}>
                                    Avalie o serviço de {selectedBarber}
                                </Text>
                                <View style={styles.starsContainer}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() => setNota && setNota(star)}
                                            style={styles.starButton}
                                        >
                                            <Ionicons
                                                name={star <= nota ? 'star' : 'star-outline'}
                                                size={36}
                                                color={star <= nota ? '#FFB800' : '#6b7280'}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <Text style={styles.comentarioLabel}>
                                    Comentário (opcional)
                                </Text>
                                <TextInput
                                    style={styles.comentarioInput}
                                    placeholder="Conte-nos sobre sua experiência..."
                                    placeholderTextColor="#718096"
                                    multiline
                                    numberOfLines={3}
                                    value={comentario}
                                    onChangeText={(text) => setComentario && setComentario(text)}
                                />
                            </>
                        )}
                    </View>

                    <View style={agendamentoStyles.modalButtons}>
                        <TouchableOpacity
                            style={agendamentoStyles.modalCancelButton}
                            onPress={onCancel}
                        >
                            <Text style={agendamentoStyles.modalCancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={agendamentoStyles.modalConfirmButton}
                            onPress={onConfirm}
                            disabled={agendando}
                        >
                            <Text style={agendamentoStyles.modalConfirmText}>
                                {agendando
                                    ? 'Processando...'
                                    : (tipo === 'agendamento' ? 'Confirmar' : 'Enviar Avaliação')
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// ESTILOS ESPECÍFICOS PARA AVALIAÇÃO
const styles = {
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 18,
    },
    starButton: {
        padding: 6,
        marginHorizontal: 6,
    },
    comentarioLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#cbd5e1',
        marginBottom: 8,
        marginTop: 10,
    },
    comentarioInput: {
        borderWidth: 1,
        borderColor: '#152025',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        textAlignVertical: 'top',
        minHeight: 80,
        backgroundColor: '#071018',
        color: '#e2e8f0',
    },
} as any;

export default ModalConfirmacao;