# Crear el proyecto
```
npm create vite@latest
npm install react-router-dom @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

----------------------------------------------------------------
@mui/material

* Es la librería principal de componentes de Material UI.
* Contiene todos los componentes visuales listos para usar, como:
* Button, AppBar, TextField, Card, Typography, Grid, Container, etc.

----------------------------------------------------------------
@emotion/react

* Es el motor de estilos que usa MUI internamente.
* MUI necesita una librería para aplicar CSS-in-JS, es decir, estilos definidos dentro del código JavaScript/TypeScript en lugar de archivos .css

----------------------------------------------------------------
@emotion/styled

* Permite crear componentes personalizados con estilo propio.

----------------------------------------------------------------
@mui/icons-material

* Contiene los íconos oficiales de Material Design

----------------------------------------------------------------

----------------------------------------------------------------
# Generar el DEPLOY

```
npm run build
```
https://nginx.org/en/docs/windows.html

* Copiar la carpeta `/dist` a  `nginx/dist`
* Ejecutar: nginx
* nginx -s stop