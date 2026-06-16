import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { agendamentoStyles } from '@/styles/agendamentoStyles';

interface PickerDeDataProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    // optional array of ISO dates (YYYY-MM-DD). If omitted, component generates from today to end of month.
    days?: string[];
}

const weekdayShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const getDatesFromTodayToMonthEnd = (): string[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Last day of month
    const lastDay = new Date(year, month + 1, 0).getDate();
    const startDay = today.getDate();

    const dates: string[] = [];
    for (let d = startDay; d <= lastDay; d++) {
        const date = new Date(year, month, d);
        const iso = date.toISOString().slice(0, 10);
        dates.push(iso);
    }
    return dates;
};

const PickerDeData: React.FC<PickerDeDataProps> = ({ selectedDate, onDateChange, days }) => {
    const generatedDays = useMemo(() => {
        if (days && days.length > 0) {
            // If days are passed as simple day strings like '01', convert to ISO for current month
            const looksLikeIso = days[0] && days[0].includes('-');
            if (looksLikeIso) return days;

            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            return days.map(d => {
                const dayNum = Number(d);
                const date = new Date(year, month, dayNum);
                return date.toISOString().slice(0, 10);
            });
        }
        return getDatesFromTodayToMonthEnd();
    }, [days]);

    return (
        <View style={agendamentoStyles.section}>
            <Text style={agendamentoStyles.label}>Escolha de data</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={agendamentoStyles.datesContainer}>
                    {generatedDays.map((isoDate) => {
                        const date = new Date(isoDate + 'T00:00:00');
                        const dayNumber = String(date.getDate()).padStart(2, '0');
                        const weekday = weekdayShort[date.getDay()];
                        const isSelected = selectedDate === isoDate;

                        return (
                            <TouchableOpacity
                                key={isoDate}
                                style={[
                                    agendamentoStyles.dateButton,
                                    isSelected && agendamentoStyles.selectedButton,
                                ]}
                                onPress={() => onDateChange(isoDate)}
                            >
                                <Text style={[
                                    agendamentoStyles.dateText,
                                    isSelected && agendamentoStyles.selectedText,
                                ]}>{dayNumber}</Text>
                                <Text style={{ color: '#9ca3af', fontSize: 12 }}>{weekday}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default PickerDeData;
