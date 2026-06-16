import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { agendamentoStyles } from '@/styles/agendamentoStyles';

interface Barbeiro {
    id: string;
    nome: string;
}

interface ListaDeBarbeirosProps {
    selectedBarberId: string;
    onBarberChange: (barberId: string) => void;
    barbeiros?: Barbeiro[];
}

const ListaDeBarbeiros: React.FC<ListaDeBarbeirosProps> = ({ selectedBarberId, onBarberChange, barbeiros = [] }) => {
    return (
        <View style={agendamentoStyles.section}>
            <Text style={agendamentoStyles.label}>Barbeiro</Text>
            <View style={agendamentoStyles.barbersContainer}>
                {barbeiros.length === 0 ? (
                    <Text style={agendamentoStyles.emptyText}>Nenhum barbeiro disponível</Text>
                ) : (
                    barbeiros.map((barber) => {
                        return (
                            <TouchableOpacity
                                key={barber.id}
                                style={[
                                    agendamentoStyles.barberButton,
                                    selectedBarberId === barber.id && agendamentoStyles.selectedButton
                                ]}
                                onPress={() => onBarberChange(barber.id)}
                            >
                                <Text
                                    style={[
                                        agendamentoStyles.barberText,
                                        selectedBarberId === barber.id && agendamentoStyles.selectedText
                                    ]}
                                >
                                    {barber.nome}
                                </Text>
                            </TouchableOpacity>
                        );
                    })
                )}
            </View>
        </View>
    );
};

export default ListaDeBarbeiros;
