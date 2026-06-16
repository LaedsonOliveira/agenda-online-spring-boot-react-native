import { Redirect } from "expo-router";

export default function Index() {
    const isLogged = false;
    const userType = "client";

    if (!isLogged) {
        return <Redirect href="/auth/login" />;
    }

    if (userType === "client") {
        return <Redirect href="/(cliente)/agendamento" />;
    }

    return <Redirect href="/estabelecimento/dashboard" />;
}