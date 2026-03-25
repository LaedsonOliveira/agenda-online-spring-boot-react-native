import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Painel de Controle</Text>
      <Text style={styles.subtitle}>Visão geral rápida da sua agenda administrativa.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Agendamentos de hoje</Text>
        <Text style={styles.cardValue}>14</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Serviços agendados</Text>
        <Text style={styles.cardValue}>6</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nova receita estimada</Text>
        <Text style={styles.cardValue}>R$ 5.200,00</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos atendimentos</Text>
        <Text style={styles.sectionItem}>09:00 - Ana Clara - Corte</Text>
        <Text style={styles.sectionItem}>10:30 - Heron Souza - Barba</Text>
        <Text style={styles.sectionItem}>13:00 - Carla M. - Manicure</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f5f7fb', flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 6, color: '#12243a' },
  subtitle: { fontSize: 15, marginBottom: 18, color: '#566674' },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 14,
    borderWidth: 1,
    borderColor: '#dae3ea',
    marginBottom: 12,
  },
  cardTitle: { color: '#5f758e', fontSize: 14 },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#1f567f', marginTop: 8 },
  section: {
    marginTop: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dae3ea',
    padding: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#192f45' },
  sectionItem: { fontSize: 15, paddingVertical: 2, color: '#3b4e60' },
});
