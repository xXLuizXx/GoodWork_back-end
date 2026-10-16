import { AppError } from "../shared/errors/AppError";

// Datas sem horário (ex.: data de encerramento da vaga) trafegam como "YYYY-MM-DD".
// São um dia do calendário, não um instante; por isso não passam por new Date() nem por conversão de fuso.
export function parseDateOnly(value: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? "");
    const [, year, month, day] = match ?? [];
    const date = match ? new Date(Date.UTC(+year, +month - 1, +day)) : null;

    if (!date || date.getUTCMonth() !== +month - 1 || date.getUTCDate() !== +day) {
        throw new AppError("Data inválida: envie no formato AAAA-MM-DD.");
    }

    return value;
}

// O dia de hoje no horário de Brasília, em "YYYY-MM-DD" (o en-CA já formata nessa ordem)
export function todayInSaoPaulo(): string {
    return new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
}
