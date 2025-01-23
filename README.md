# Instrucciones para Ejecutar el Código

Este proyecto automatiza el llenado de un formulario web utilizando Puppeteer y permite cargar datos desde un archivo Excel. A continuación, se describen los pasos necesarios para ejecutar el código, el formato esperado del archivo Excel y recomendaciones para la organización del proyecto.

## Requisitos Previos

1. **Node.js y npm**: Asegúrate de tener instalados Node.js y npm en tu máquina.
2. **Dependencias**: Instala las dependencias necesarias ejecutando:
   ```bash
   npm install
   ```
3. **Ejecutar el codigo**:
   ```bash
   npm start
   ```
## Formato del Archivo Excel

El archivo Excel **`datos_prueba.xlsx`** debe contener los siguientes encabezados en la primera fila:

| name         | phone         | email                 | address               | sliderValue | origin  | typeOfInstallation | inclination | material | filepath           |
|--------------|---------------|-----------------------|-----------------------|-------------|---------|---------------------|-------------|----------|--------------------|
| Juan Pérez   | +56912345678  | juan.perez@gmail.com  | Calle Falsa 123       | 500000      | Google  | Techo              | Plano       | Zinc     | images/file1.png   |
| María López  | +56987654321  | maria.lopez@gmail.com | Avenida Siempreviva  | 600000      | Google  | Techo              | Plano       | Zinc     | images/file2.png   |

- **`origin`**, **`typeOfInstallation`**, **`inclination`** y **`material`** deben tener valores válidos para el formulario (en caso contrario, simplemente se mantendrán con el valor predeterminado).  
- **`address`** debe ser una dirección existente en el mapa (de lo contrario, la página mostrará un error y no se completará el proceso).  
- **`filepath`** debe ser la ruta relativa de la imagen asociada a las boletas.

## Organización del Proyecto

Se recomienda organizar los archivos de la siguiente manera:

```
proyecto/
├── index.js          # Código principal
├── datos_prueba.xlsx # Archivo Excel con los datos
├── images/           # Carpeta con imágenes de boletas
│   ├── file1.png
│   ├── file2.png
│   └── ...
└── package.json      # Configuración del proyecto
```

