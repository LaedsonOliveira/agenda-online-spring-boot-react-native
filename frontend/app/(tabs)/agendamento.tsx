import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AgendamentoScreen() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
    const [selectedBarber, setSelectedBarber] = useState('');

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

    const handleAgendar = () => {
        if (!selectedDate || !selectedTime || selectedCuts.length === 0 || !selectedBarber) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        console.log('Agendamento:', {
            estabelecimento: 'Barbearia JoãoMello',
            data: selectedDate,
            hora: selectedTime,
            servicos: selectedCuts,
            barbeiro: selectedBarber,
            total: calcularTotal()
        });

        alert('Agendamento realizado com sucesso!');
        // router.push('/confirmacao'); // Navegar para tela de confirmação
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
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
});