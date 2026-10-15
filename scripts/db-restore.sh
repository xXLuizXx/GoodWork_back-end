#!/usr/bin/env bash
set -euo pipefail

CONTAINER="database"
DB_USER="guest"
DB_NAME="database"
BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/backups"

FILE="${1:-}"
if [ -z "$FILE" ]; then
  FILE="$(ls -t "$BACKUP_DIR"/backup_*.sql 2>/dev/null | head -n 1)"
  if [ -z "$FILE" ]; then
    echo "Nenhum backup encontrado em $BACKUP_DIR. Informe o caminho do arquivo: db-restore.sh <arquivo.sql>" >&2
    exit 1
  fi
  echo "Nenhum arquivo informado, usando o mais recente: $FILE"
fi

if [ ! -f "$FILE" ]; then
  echo "Arquivo não encontrado: $FILE" >&2
  exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
  echo "Container '${CONTAINER}' não está rodando. Suba com 'docker-compose up -d' antes de restaurar." >&2
  exit 1
fi

docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" < "$FILE"

echo "Restore concluído a partir de: $FILE"
