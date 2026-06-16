import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { agendamentoStyles } from '@/styles/agendamentoStyles';

interface PickerDeHorarioProps {
    selectedTime: string;
    onTimeChange: (time: string) => void;
    times?: string[];
}

const defaultTimes = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const PickerDeHorario: React.FC<PickerDeHorarioProps> = ({ selectedTime, onTimeChange, times = defaultTimes }) => {
    return (
        <View style={agendamentoStyles.section}>
            <Text style={agendamentoStyles.label}>Horários</Text>
            <View style={agendamentoStyles.timesGrid}>
                {times.map((time) => (
                    <TouchableOpacity
                        key={time}
                        style={[
                            agendamentoStyles.timeButton,
                            selectedTime === time && agendamentoStyles.selectedButton
                        ]}
                        onPress={() => onTimeChange(time)}
                    >
                        <Text style={[
                            agendamentoStyles.timeText,
                            selectedTime === time && agendamentoStyles.selectedText
                        ]}>{time}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default PickerDeHorario;
