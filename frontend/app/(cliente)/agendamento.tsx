import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { agendamentoStyles } from '@/styles/agendamentoStyles';
import { formatarData } from '@/utils/formatarData';
import {
    PickerDeData,
    PickerDeHorario,
    ListaDeCortes,
    ListaDeBarbeiros,
    CalcularTotal,
    ModalConfirmacao,
} from '@/components/telaAgendamento';
import { fetchBarbeiros, fetchServicos, createAgendamento, fetchClientePerfil } from '@/utils/api';

interface Service {
    id: string;
    nome: string;
    descricao?: string;
    precoBase: number;
    duracaoMinutos?: number;
}

interface Barber {
    id: string;
    nome: string;
}

export default function AgendamentoScreen() {
    const params = useLocalSearchParams();
    const clienteId = typeof params.clienteId === 'string' ? params.clienteId : '';
    const estabelecimentoId = typeof params.estabelecimentoId === 'string' ? params.estabelecimentoId : '';

    const todayIso = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(todayIso);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedBarberId, setSelectedBarberId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [agendando, setAgendando] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [barbeiros, setBarbeiros] = useState<Barber[]>([]);
    const [loading, setLoading] = useState(true);

    const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    // Atualiza a tela
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                let estabelecimentoIdToUse = estabelecimentoId;

                if (!estabelecimentoIdToUse && clienteId) {
                    const cliente = await fetchClientePerfil(clienteId);
                    estabelecimentoIdToUse = cliente.estabelecimentoId?.toString() ?? '';
                }

                if (!estabelecimentoIdToUse) {
                    throw new Error('Estabelecimento não encontrado.');
                }

                const [serviceData, barberData] = await Promise.all([
                    fetchServicos(estabelecimentoIdToUse),
                    fetchBarbeiros(estabelecimentoIdToUse),
                ]);

                const normalizedServices: Service[] = serviceData.map((item: any) => ({
                    id: String(item.id),
                    nome: item.nome ?? 'Serviço sem nome',
                    descricao: item.descricao ?? '',
                    precoBase: Number(item.precoBase ?? 0),
                    duracaoMinutos: Number(item.duracaoMinutos ?? 0),
                }));

                const normalizedBarbers: Barber[] = barberData.map((item: any) => ({
                    id: String(item.id),
                    nome: item.nome ?? 'Barbeiro sem nome',
                }));

                setServices(normalizedServices);
                setBarbeiros(normalizedBarbers);
                setSelectedServiceId((current) => current || normalizedServices[0]?.id || '');
                setSelectedBarberId((current) => current || normalizedBarbers[0]?.id || '');
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar serviços ou barbeiros.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [clienteId, estabelecimentoId]);

    const total = services.find(service => service.id === selectedServiceId)?.precoBase ?? 0;

    // Analisa se todos os campos estao preenchidos 
    const handleAgendar = () => {
        if (!selectedDate || !selectedTime || !selectedServiceId || !selectedBarberId) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
            return;
        }

        setModalVisible(true);
    };


    // Agenddamento Confirmação

    const confirmarAgendamento = async () => {
        if (!clienteId || !estabelecimentoId) {
            Alert.alert('Erro', 'Cliente ou estabelecimento não foi definido. Faça login novamente.');
            return;
        }

        setAgendando(true);
        setModalVisible(false);

        try {
            await createAgendamento({
                data: selectedDate,
                horario: selectedTime,
                clienteId,
                barbeiroId: selectedBarberId,
                servicoId: selectedServiceId,
                estabelecimentoId,
                origem: 'APLICATIVO',
            });

            Alert.alert(
                'Agendamento Confirmado!',
                `Seu horário foi reservado com sucesso!\n\n Data: ${formatarData(selectedDate)}\n Horário: ${selectedTime}\n Barbeiro: ${barbeiros.find(b => b.id === selectedBarberId)?.nome || '—'}\n Total: R$ ${total},00`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setSelectedDate(todayIso);
                            setSelectedTime('');
                            setSelectedServiceId(services[0]?.id ?? '');
                            setSelectedBarberId(barbeiros[0]?.id ?? '');
                        },
                    },
                ]
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível realizar o agendamento.');
        } finally {
            setAgendando(false);
        }
    };

    if (loading) {
        return (
            <View style={agendamentoStyles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={agendamentoStyles.loadingText}>Carregando informações...</Text>
            </View>
        );
    }



    return (

        <ScrollView style={agendamentoStyles.container}>
            <Text style={agendamentoStyles.title}>Agendar Horário</Text>

            <View style={agendamentoStyles.section}>
                <Text style={agendamentoStyles.barberiaNome}>Agendamento online</Text>
            </View>

            {/* Data */}
            <PickerDeData selectedDate={selectedDate} onDateChange={setSelectedDate} />

            {/* Horario */}
            <PickerDeHorario selectedTime={selectedTime} onTimeChange={setSelectedTime} times={times} />

            {/* Cortes */}
            <ListaDeCortes
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
                cortes={services.map(service => ({
                    id: service.id,
                    nome: service.nome,
                    preco: service.precoBase,
                }))}
            />

            {/* Barbeiros */}
            <ListaDeBarbeiros
                selectedBarberId={selectedBarberId}
                onBarberChange={setSelectedBarberId}
                barbeiros={barbeiros}
            />

            {/* Total */}
            <CalcularTotal selectedServiceId={selectedServiceId} cortes={services.map(service => ({
                id: service.id,
                nome: service.nome,
                preco: service.precoBase,
            }))} />

            {/* Botao de Agendar */}
            <TouchableOpacity style={agendamentoStyles.button} onPress={handleAgendar}>
                <Text style={agendamentoStyles.buttonText}>AGENDAR</Text>
            </TouchableOpacity>

            {/* POP UP de Confirmacao */}
            <ModalConfirmacao
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onConfirm={confirmarAgendamento}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedCuts={[services.find(service => service.id === selectedServiceId)?.nome || '']}
                selectedBarber={barbeiros.find(b => b.id === selectedBarberId)?.nome || ''}
                total={total}
                agendando={agendando}
            />

        </ScrollView>
    );
}
