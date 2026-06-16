export const formatarData = (dia: string) => {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    if (!dia) return '';

    // If input is ISO date (YYYY-MM-DD)
    if (dia.includes('-')) {
        const d = new Date(dia + 'T00:00:00');
        if (isNaN(d.getTime())) return dia;
        const day = String(d.getDate()).padStart(2, '0');
        const month = meses[d.getMonth()];
        return `${day} de ${month}`;
    }

    // Otherwise assume it's a day number for current month
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    return `${dia} de ${meses[mesAtual]}`;
};
