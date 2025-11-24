#Inicio

Clona o copia este repositorio. Necesitarás tener node y npm instalados globalmente en tu máquina.

#Instalación:

npm i playwright o npx playwright install 
npm install @playwright/test --save-dev

#Para ejecutar la suite de pruebas:

npx playwright test   

#Ejeucar un solo archivo 

npx playwright test tests/nombre.spec.ts

#Ejecutar test por titulo

npx playwright test -g "titulo"

#Para ver el reporte:

open playwright-report/index.html

