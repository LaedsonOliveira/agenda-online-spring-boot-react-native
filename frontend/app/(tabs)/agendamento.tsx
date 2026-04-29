import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AgendamentoScreen() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
    const [selectedBarber, setSelectedBarber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [agendando, setAgendando] = useState(false);

    // Dados de exemplo
    const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    const times = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    const cortes = [
        { id: '1', nome: 'Cabelo', preco: 30 },
        { id: '2', nome: 'Barba', preco: 25 },
        { id: '3', nome: 'Cabelo e Barba', preco: 50 },
    ];

    const barbeiros = [
        { id: '1', nome: 'João Silva' },
        { id: '2', nome: 'Marcos Santos' },
        { id: '3', nome: 'Carlos Oliveira' },
    ];

    // FUNÇÃO PARA FORMATAR DATA - MOVIDA PARA FORA
    const formatarData = (dia: string) => {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth();
        return `${dia} de ${meses[mesAtual]}`;
    };

    const toggleCut = (cutName: string) => {
        if (selectedCuts.includes(cutName)) {
            setSelectedCuts(selectedCuts.filter(item => item !== cutName));
        } else {
            setSelectedCuts([...selectedCuts, cutName]);
        }
    };

    const calcularTotal = () => {
        let total = 0;
        selectedCuts.forEach(cut => {
            const corte = cortes.find(c => c.nome === cut);
            if (corte) total += corte.preco;
        });
        return total;
    };

    // Função que abre o popup
    const handleAgendar = () => {
        if (!selectedDate || !selectedTime || selectedCuts.length === 0 || !selectedBarber) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        // Abrir o popup de confirmação
        setModalVisible(true);
    };

    // Função que finaliza o agendamento
    const confirmarAgendamento = async () => {
        setAgendando(true);
        setModalVisible(false);

        const total = calcularTotal();

        try {
            console.log('✅ AGENDAMENTO CONFIRMADO!');
            console.log('Dados:', {
                data: selectedDate,
                horario: selectedTime,
                servicos: selectedCuts,
                barbeiro: selectedBarber,
                total: `R$ ${total},00`
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            Alert.alert(
                '✅ Agendamento Confirmado!',
                `Seu horário foi reservado com sucesso!\n\n📅 Data: ${formatarData(selectedDate)}\n⏰ Horário: ${selectedTime}\n💈 Barbeiro: ${selectedBarber}\n💰 Total: R$ ${total},00`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Limpar os campos
                            setSelectedDate('');
                            setSelectedTime('');
                            setSelectedCuts([]);
                            setSelectedBarber('');
                        }
                    }
                ]
            );

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível realizar o agendamento.');
        } finally {
            setAgendando(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Agendar Horário</Text>

            {/* Título fixo da barbearia */}
            <View style={styles.section}>
                <Text style={styles.barberiaNome}>Barbearia JoãoMello</Text>
            </View>

            {/* Escolha de Data */}
            <View style={styles.section}>
                <Text style={styles.label}>Escolha de data</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.datesContainer}>
                        {days.map((day) => (
                            <TouchableOpacity
                                key={day}
                                style={[
                                    styles.dateButton,
                                    selectedDate === day && styles.selectedButton
                                ]}
                                onPress={() => setSelectedDate(day)}
                            >
                                <Text style={[
                                    styles.dateText,
                                    selectedDate === day && styles.selectedText
                                ]}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Horários */}
            <View style={styles.section}>
                <Text style={styles.label}>Horários</Text>
                <View style={styles.timesGrid}>
                    {times.map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[
                                styles.timeButton,
                                selectedTime === time && styles.selectedButton
                            ]}
                            onPress={() => setSelectedTime(time)}
                        >
                            <Text style={[
                                styles.timeText,
                                selectedTime === time && styles.selectedText
                            ]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Cortes */}
            <View style={styles.section}>
                <Text style={styles.label}>Cortes</Text>
                {cortes.map((corte) => (
                    <TouchableOpacity
                        key={corte.id}
                        style={styles.cutOption}
                        onPress={() => toggleCut(corte.nome)}
                    >
                        <View style={styles.checkboxContainer}>
                            <View style={[
                                styles.checkbox,
                                selectedCuts.includes(corte.nome) && styles.checkboxSelected
                            ]}>
                                {selectedCuts.includes(corte.nome) && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </View>
                            <Text style={styles.cutName}>{corte.nome}</Text>
                        </View>
                        <Text style={styles.cutPrice}>R$ {corte.preco}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Barbeiro */}
            <View style={styles.section}>
                <Text style={styles.label}>Barbeiro</Text>
                <View style={styles.barbersContainer}>
                    {barbeiros.map((barber) => (
                        <TouchableOpacity
                            key={barber.id}
                            style={[
                                styles.barberButton,
                                selectedBarber === barber.nome && styles.selectedButton
                            ]}
                            onPress={() => setSelectedBarber(barber.nome)}
                        >
                            <Text style={[
                                styles.barberText,
                                selectedBarber === barber.nome && styles.selectedText
                            ]}>{barber.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* TOTAL */}
            <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalValue}>R$ {calcularTotal()}</Text>
            </View>

            {/* Botão AGENDAR */}
            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
                <Text style={styles.buttonText}>AGENDAR</Text>
            </TouchableOpacity>

            {/* MODAL POPUP DE CONFIRMAÇÃO */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>📋 Confirmar Agendamento</Text>

                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Você confirma os dados do agendamento?</Text>

                            <View style={styles.modalResumo}>
                                <Text style={styles.modalResumoText}>📅 Data: {formatarData(selectedDate)}</Text>
                                <Text style={styles.modalResumoText}>⏰ Horário: {selectedTime}</Text>
                                <Text style={styles.modalResumoText}>✂️ Serviços: {selectedCuts.join(', ')}</Text>
                                <Text style={styles.modalResumoText}>💈 Barbeiro: {selectedBarber}</Text>
                                <Text style={styles.modalTotalText}>💰 Total: R$ {calcularTotal()},00</Text>
                            </View>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalConfirmButton}
                                onPress={confirmarAgendamento}
                                disabled={agendando}
                            >
                                <Text style={styles.modalConfirmText}>
                                    {agendando ? 'Processando...' : 'Confirmar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    datesContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    dateButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    timesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    timeButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        minWidth: 80,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
    selectedButton: {
        backgroundColor: '#007AFF',
    },
    selectedText: {
        color: '#fff',
    },
    cutOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#007AFF',
    },
    checkmark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cutName: {
        fontSize: 16,
        color: '#333',
    },
    cutPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    barbersContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    barberButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    barberText: {
        fontSize: 14,
        color: '#666',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    barberiaNome: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    // Estilos do Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '85%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    modalContent: {
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        color: '#666',
    },
    modalResumo: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    modalResumoText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    modalTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCancelText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalConfirmButton: {
        flex: 1,
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalConfirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});