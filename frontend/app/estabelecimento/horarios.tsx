import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/horarioStyles';

interface DiaSemana {
    id: string;
    nome: string;
    ativo: boolean;
    abertura: string;
    fechamento: string;
}

export default function HorariosScreen() {
    const [dias, setDias] = useState<DiaSemana[]>([
        { id: '1', nome: 'Segunda-feira', ativo: true, abertura: '09:00', fechamento: '18:00' },
        { id: '2', nome: 'Terça-feira', ativo: true, abertura: '09:00', fechamento: '18:00' },
        { id: '3', nome: 'Quarta-feira', ativo: true, abertura: '09:00', fechamento: '18:00' },
        { id: '4', nome: 'Quinta-feira', ativo: true, abertura: '09:00', fechamento: '18:00' },
        { id: '5', nome: 'Sexta-feira', ativo: true, abertura: '09:00', fechamento: '18:00' },
        { id: '6', nome: 'Sábado', ativo: true, abertura: '09:00', fechamento: '13:00' },
        { id: '7', nome: 'Domingo', ativo: false, abertura: '00:00', fechamento: '00:00' },
    ]);

    const toggleDia = (id: string) => {
        setDias(dias.map(dia => 
            dia.id === id ? { ...dia, ativo: !dia.ativo } : dia
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Horários de Funcionamento</Text>
            </View>

            <ScrollView style={styles.content}>
                {dias.map((dia) => (
                    <View key={dia.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.diaNome}>{dia.nome}</Text>
                            <Switch
                                value={dia.ativo}
                                onValueChange={() => toggleDia(dia.id)}
                                trackColor={{ false: '#767577', true: '#007AFF' }}
                            />
                        </View>
                        {dia.ativo && (
                            <View style={styles.horariosContainer}>
                                <TouchableOpacity style={styles.horarioButton}>
                                    <Text style={styles.horarioLabel}>Abertura</Text>
                                    <Text style={styles.horarioValue}>{dia.abertura}</Text>
                                    <Ionicons name="chevron-down" size={16} color="#666" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.horarioButton}>
                                    <Text style={styles.horarioLabel}>Fechamento</Text>
                                    <Text style={styles.horarioValue}>{dia.fechamento}</Text>
                                    <Ionicons name="chevron-down" size={16} color="#666" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
        </View>
    );
}