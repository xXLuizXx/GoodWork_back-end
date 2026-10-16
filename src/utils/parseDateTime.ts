import { AppError } from "../shared/errors/AppError";

// Exige data/hora com fuso (ex.: "2026-05-15T12:30:00.000Z" ou "...-03:00").
// Sem fuso, o instante é ambíguo: o servidor não tem como saber de qual fuso o usuário enviou.
export function parseDateTime(value: string): Date {
    const hasOffset = /(Z|[+-]\d{2}:?\d{2})$/i.test(value ?? "");
    const date = new Date(value);

    if (!hasOffset || Number.isNaN(date.getTime())) {
        throw new AppError("Data inválida: envie no formato ISO 8601 com fuso horário.");
    }

    return date;
}
