export const BACKEND_API_URL = 'http://10.0.0.170:8080/api';

export async function fetchEstabelecimentos() {
    const response = await fetch(`${BACKEND_API_URL}/estabelecimentos`);
    if (!response.ok) {
        throw new Error('Falha ao carregar estabelecimentos');
    }
    return response.json();
}

export async function fetchEstabelecimentoPerfil(estabelecimentoId: string) {
    const response = await fetch(`${BACKEND_API_URL}/estabelecimentos/${estabelecimentoId}`);
    if (!response.ok) {
        throw new Error('Falha ao carregar dados do estabelecimento');
    }
    return response.json();
}

export async function fetchEstabelecimento(estabelecimentoId?: string, proprietarioId?: string) {
    if (estabelecimentoId) {
        return fetchEstabelecimentoPerfil(estabelecimentoId);
    }

    if (proprietarioId) {
        const estabelecimentos = await fetchEstabelecimentos();
        const estabelecimento = estabelecimentos.find((item: any) =>
            String(item.proprietarioId) === String(proprietarioId)
        );

        if (!estabelecimento) {
            throw new Error('Nenhum estabelecimento encontrado para o proprietário');
        }

        return estabelecimento;
    }

    throw new Error('Estabelecimento ID não informado');
}

export async function updateEstabelecimentoPerfil(estabelecimentoId: string, body: {
    nome: string;
    endereco: string;
    telefone?: string;
    whatsapp?: string;
    email?: string;
    tipoNegocio: string;
    proprietarioId?: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/estabelecimentos/${estabelecimentoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao atualizar estabelecimento');
    }

    return response.json();
}

export async function fetchBarbeiros(estabelecimentoId?: string) {
    const query = estabelecimentoId ? `?estabelecimentoId=${estabelecimentoId}` : '';
    const response = await fetch(`${BACKEND_API_URL}/barbeiros${query}`);
    if (!response.ok) {
        throw new Error('Falha ao carregar barbeiros');
    }
    return response.json();
}

export async function createBarbeiro(body: {
    nome: string;
    email: string;
    senha?: string;
    especialidade: string;
    fotoUrl?: string;
    estabelecimentoId: string;
    ativo?: boolean;
}) {
    const response = await fetch(`${BACKEND_API_URL}/barbeiros`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao criar barbeiro');
    }

    return response.json();
}

export async function updateBarbeiro(id: string, body: {
    nome?: string;
    email?: string;
    senha?: string;
    especialidade?: string;
    fotoUrl?: string;
    estabelecimentoId?: string;
    ativo?: boolean;
}) {
    const response = await fetch(`${BACKEND_API_URL}/barbeiros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao atualizar barbeiro');
    }

    return response.json();
}

export async function deleteBarbeiro(id: string) {
    const response = await fetch(`${BACKEND_API_URL}/barbeiros/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao excluir barbeiro');
    }
}

export async function fetchServicos(estabelecimentoId?: string) {
    const query = estabelecimentoId ? `?estabelecimentoId=${estabelecimentoId}` : '';
    const response = await fetch(`${BACKEND_API_URL}/servicos${query}`);
    if (!response.ok) {
        throw new Error('Falha ao carregar serviços');
    }
    return response.json();
}

export async function createServico(body: {
    nome: string;
    descricao?: string;
    precoBase: number;
    duracaoMinutos: number;
    ativo?: boolean;
    estabelecimentoId?: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/servicos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao criar serviço');
    }

    return response.json();
}

export async function updateServico(id: string, body: {
    nome: string;
    descricao?: string;
    precoBase: number;
    duracaoMinutos: number;
    ativo?: boolean;
}) {
    const response = await fetch(`${BACKEND_API_URL}/servicos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao atualizar serviço');
    }

    return response.json();
}

export async function deleteServico(id: string) {
    const response = await fetch(`${BACKEND_API_URL}/servicos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao excluir serviço');
    }

    return null;
}

export async function fetchAgendamentos(params: { clienteId?: string; barbeiroId?: string } = {}) {
    const query = new URLSearchParams();
    if (params.clienteId) query.append('clienteId', params.clienteId);
    if (params.barbeiroId) query.append('barbeiroId', params.barbeiroId);
    const response = await fetch(`${BACKEND_API_URL}/agendamentos${query.toString() ? `?${query.toString()}` : ''}`);
    if (!response.ok) {
        throw new Error('Falha ao carregar agendamentos');
    }
    return response.json();
}

export async function createAgendamento(body: {
    data: string;
    horario: string;
    clienteId: string;
    barbeiroId: string;
    servicoId: string;
    estabelecimentoId: string;
    origem?: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/agendamentos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao criar agendamento');
    }

    return response.json();
}

export async function atualizarStatusAgendamento(id: string, status: string) {
    const response = await fetch(`${BACKEND_API_URL}/agendamentos/${id}/status?status=${encodeURIComponent(status)}`, {
        method: 'PUT',
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao atualizar status do agendamento');
    }

    return response.json();
}

export async function loginCliente(email: string, senha: string) {
    const response = await fetch(`${BACKEND_API_URL}/clientes/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            senha
        })
    });

    const responseBody = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(responseBody?.message || 'E-mail ou senha inválidos!');
    }

    return responseBody;
}

export async function loginProprietario(email: string, senha: string) {
    const response = await fetch(`${BACKEND_API_URL}/proprietarios/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            senha
        })
    });

    const responseBody = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(responseBody?.message || 'E-mail ou senha inválidos!');
    }

    return responseBody;
}

export async function createEstabelecimento(body: {
    nome: string;
    endereco: string;
    telefone?: string;
    whatsapp?: string;
    email?: string;
    tipoNegocio: string;
    proprietarioId?: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/estabelecimentos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || 'Falha ao criar estabelecimento.');
    }

    return response.json();
}

export async function registerCliente(body: {
    nome: string;
    email: string;
    senha: string;
    whatsapp: string;
    estabelecimentoId: string;
    dataNascimento?: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/clientes/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || 'Falha ao cadastrar. Verifique os dados e tente novamente.');
    }

    return response.json();
}

export async function registerProprietario(body: {
    nome: string;
    email: string;
    senha: string;
    whatsapp: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/proprietarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || 'Falha ao cadastrar proprietário. Verifique os dados e tente novamente.');
    }

    return response.json();
}

export async function fetchAgendamentosCliente(clienteId: string) {
    const response = await fetch(`${BACKEND_API_URL}/agendamentos?clienteId=${clienteId}`);
    if (!response.ok) {
        throw new Error('Falha ao carregar agendamentos');
    }
    return response.json();
}

export async function cancelarAgendamento(id: string) {
    const response = await fetch(`${BACKEND_API_URL}/agendamentos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao cancelar agendamento');
    }

    return response.json();
}

export async function fetchClientePerfil(clienteId: string) {
    const response = await fetch(`${BACKEND_API_URL}/clientes/${clienteId}`);
    if (!response.ok) {
        throw new Error('Falha ao carregar dados do cliente');
    }
    return response.json();
}

export async function updateClientePerfil(clienteId: string, body: {
    nome?: string;
    email?: string;
    whatsapp?: string;
    dataNascimento?: string;
}) {
    const response = await fetch(`${BACKEND_API_URL}/clientes/${clienteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Falha ao atualizar perfil');
    }

    return response.json();
}
