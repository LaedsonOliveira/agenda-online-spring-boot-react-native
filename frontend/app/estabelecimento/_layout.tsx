import { Tabs, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EstabelecimentoLayout() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const proprietarioId = typeof params.proprietarioId === 'string' && params.proprietarioId.length > 0 ? params.proprietarioId : undefined;
    const estabelecimentoId = typeof params.estabelecimentoId === 'string' && params.estabelecimentoId.length > 0 ? params.estabelecimentoId : undefined;
    const queryParts = [];

    if (proprietarioId) queryParts.push(`proprietarioId=${proprietarioId}`);
    if (estabelecimentoId) queryParts.push(`estabelecimentoId=${estabelecimentoId}`);

    const proprietarioQuery = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
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
                        onPress={() => router.replace('/auth/login')}
                        style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center', gap: 5 }}
                    >
                        <Ionicons name="exit-outline" size={20} color="#ff0000" />
                        <Text style={{ color: '#ff0000', fontSize: 14 }}>Sair</Text>
                    </TouchableOpacity>
                ),
            }}
        >
            {/* TELAS PRINCIPAIS NAS TABS */}
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Início',
                    href: `/estabelecimento/dashboard${proprietarioQuery}`,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />


            <Tabs.Screen
                name="servicos"
                options={{
                    title: 'Serviços',
                    href: `/estabelecimento/servicos${proprietarioQuery}`,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cut-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="barbeiro"
                options={{
                    title: 'Barbeiros',
                    href: `/estabelecimento/barbeiro${proprietarioQuery}`,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="horarios"
                options={{
                    title: 'Horários',
                    href: `/estabelecimento/horarios${proprietarioQuery}`,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time-outline" size={size} color={color} />
                    ),
                }}
            />

            {/* TELAS SECUNDÁRIAS ESCONDIDAS */}
            <Tabs.Screen name="agendamentos" options={{ href: null }} />
            <Tabs.Screen name="financeiro" options={{ href: null }} />
            <Tabs.Screen name="avaliar-servico" options={{ href: null }} />
            <Tabs.Screen
                name="barbeiro-detalhes"
                options={{
                    href: null,
                    title: 'Detalhes do Barbeiro',
                    tabBarItemStyle: { display: 'none' }

                }}
            />
        </Tabs>
    );
}