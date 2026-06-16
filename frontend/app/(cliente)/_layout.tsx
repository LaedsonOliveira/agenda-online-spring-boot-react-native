import { Tabs, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ClienteLayout() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const clienteId = Array.isArray(params.clienteId) ? params.clienteId[0] : params.clienteId ?? '';
    const estabelecimentoId = Array.isArray(params.estabelecimentoId) ? params.estabelecimentoId[0] : params.estabelecimentoId ?? '';
    const clienteQuery = clienteId
        ? `?clienteId=${clienteId}${estabelecimentoId ? `&estabelecimentoId=${estabelecimentoId}` : ''}`
        : '';

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#007AFF',
                tabBarStyle: {
                    paddingBottom: insets.bottom + 5,
                    height: 60 + insets.bottom,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                    marginBottom: 3,
                },
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => router.replace("/auth/login")}
                        style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center', gap: 5 }}
                    >
                        <Ionicons name="exit-outline" size={20} color="#ff0000" />
                        <Text style={{ color: '#ff0000', fontSize: 14 }}>Sair</Text>
                    </TouchableOpacity>
                ),
            }}
        >
            {/* `planos` tab removed as requested */}
            <Tabs.Screen
                name="agendamento"
                options={{
                    title: 'Agendar',
                    href: `/(cliente)/agendamento${clienteQuery}`,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="meus-agendamento"
                options={{
                    title: 'Meus Agendamentos',
                    href: `/(cliente)/meus-agendamento${clienteQuery}`,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />

        </Tabs>
    );
}