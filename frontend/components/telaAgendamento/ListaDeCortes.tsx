import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { agendamentoStyles } from '@/styles/agendamentoStyles';

interface Corte {
    id: string;
    nome: string;
    preco: number;
}

interface ListaDeCortesProps {
    selectedServiceId: string;
    onSelectService: (serviceId: string) => void;
    cortes?: Corte[];
}

const ListaDeCortes: React.FC<ListaDeCortesProps> = ({ selectedServiceId, onSelectService, cortes = [] }) => {
    const renderCortes = () => {
        if (cortes.length === 0) {
            return <Text style={agendamentoStyles.emptyText}>Nenhum serviço disponível</Text>;
        }

        return cortes.map((corte) => (
            <TouchableOpacity
                key={corte.id}
                style={[
                    agendamentoStyles.cutOption,
                    selectedServiceId === corte.id && agendamentoStyles.selectedOption,
                ]}
                onPress={() => onSelectService(corte.id)}
            >
                <View style={agendamentoStyles.checkboxContainer}>
                    <View
                        style={[
                            agendamentoStyles.checkbox,
                            selectedServiceId === corte.id && agendamentoStyles.checkboxSelected,
                        ]}
                    >
                        {selectedServiceId === corte.id && (
                            <Text style={agendamentoStyles.checkmark}>✓</Text>
                        )}
                    </View>
                    <Text style={agendamentoStyles.cutName}>{corte.nome}</Text>
                </View>
                <Text style={agendamentoStyles.cutPrice}>R$ {corte.preco}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={agendamentoStyles.section}>
            <Text style={agendamentoStyles.label}>Serviços</Text>
            {renderCortes()}
        </View>
    );
};

export default ListaDeCortes;
