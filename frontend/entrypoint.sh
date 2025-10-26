#!/bin/sh

# Crear config.js dinámico para React
cat <<EOF > /usr/share/nginx/html/config.js
window._env_ = {
  REACT_APP_API_URL: "${REACT_APP_API_URL}"
};
EOF

exec "$@"
