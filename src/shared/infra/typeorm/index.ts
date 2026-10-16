import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { types } from 'pg';

// Colunas "date" (OID 1082) chegam como texto "YYYY-MM-DD". O padrão do driver é criar um Date
// à meia-noite UTC, que o front exibe como o dia anterior no horário de Brasília.
types.setTypeParser(1082, (value: string) => value);

export default async (host?: string): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, host ? { host } : {})
  );
};
