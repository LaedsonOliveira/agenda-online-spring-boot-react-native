import { StyleSheet } from 'react-native';

export const perfilStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold' },
    form: { padding: 20 },
    field: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
    input: { backgroundColor: '#fff', borderWidth: 1, borderRadius: 8, padding: 12 },
});