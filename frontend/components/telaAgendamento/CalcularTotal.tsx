import React from 'react';
import { View, Text } from 'react-native';
import { agendamentoStyles } from '@/styles/agendamentoStyles';

interface Corte {
    id: string;
    nome: string;
    preco: number;
}

interface CalcularTotalProps {
    selectedServiceId: string;
    cortes?: Corte[];
}

const defaultCortes: Corte[] = [
    { id: '1', nome: 'Cabelo', preco: 30 },
    { id: '2', nome: 'Barba', preco: 25 },
    { id: '3', nome: 'Cabelo e Barba', preco: 50 },
];

const CalcularTotal: React.FC<CalcularTotalProps> = ({ selectedServiceId, cortes = defaultCortes }) => {
    const calcularTotal = () => {
        const corte = cortes.find(c => c.id === selectedServiceId);
        return corte ? corte.preco : 0;
    };

    return (
        <View style={agendamentoStyles.totalSection}>
            <Text style={agendamentoStyles.totalLabel}>TOTAL</Text>
            <Text style={agendamentoStyles.totalValue}>R$ {calcularTotal()}</Text>
        </View>
    );
};

export default CalcularTotal;
