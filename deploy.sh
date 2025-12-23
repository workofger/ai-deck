#!/bin/bash

# ===========================================
# Deploy Script - SFTP to PartRunner Products
# AI Deck Presentation
# ===========================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🚀 PartRunner AI Deck - Deploy Script${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Cargar variables de entorno
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | grep -v '^$' | xargs)
else
    echo -e "${YELLOW}⚠️  .env.local not found, using defaults${NC}"
fi

# Configuración SFTP
PEM_PATH="${SFTP_PEM_PATH:-./assets/partrunner-products.pem}"
HOST="${SFTP_HOST:-sftp-products.partrunner.com}"
USER="${SFTP_USER:-productsroot}"
REMOTE_PATH="${SFTP_REMOTE_PATH:-/products.partrunner.com/ia-deck}"

# Validar PEM
if [ ! -f "$PEM_PATH" ]; then
    echo -e "${RED}❌ PEM file not found: $PEM_PATH${NC}"
    echo -e "${YELLOW}   Create ./assets/ folder and add partrunner-products.pem${NC}"
    exit 1
fi

# Fix permisos del .pem
chmod 400 "$PEM_PATH" 2>/dev/null || true

# Limpiar build anterior
echo -e "\n${YELLOW}🧹 Cleaning previous build...${NC}"
rm -rf out .next

# Build
echo -e "\n${YELLOW}📦 Building production bundle...${NC}"
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}❌ Build failed - 'out' directory not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build completed${NC}"

# Mostrar contenido del build
echo -e "\n${YELLOW}📁 Build contents:${NC}"
ls -la out/

# Deploy via SFTP
echo -e "\n${YELLOW}📤 Deploying to ${HOST}${REMOTE_PATH}...${NC}"

# Crear script SFTP batch
cat > /tmp/sftp_batch.txt << SFTP_EOF
-mkdir ${REMOTE_PATH}
cd ${REMOTE_PATH}
lcd out
put -r .
bye
SFTP_EOF

# Ejecutar SFTP
sftp -i "$PEM_PATH" -o StrictHostKeyChecking=no -b /tmp/sftp_batch.txt "$USER@$HOST"

# Limpiar
rm -f /tmp/sftp_batch.txt

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}  ✅ Deploy successful!${NC}"
    echo -e "${GREEN}  🌐 https://products.partrunner.com/ia-deck/${NC}"
    echo -e "${GREEN}  🎯 Deck: https://products.partrunner.com/ia-deck/deck/${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
else
    echo -e "${RED}❌ Deploy failed${NC}"
    exit 1
fi

