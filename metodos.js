function csvAMatriz(datos, sepReg = '\n', sepCampos = ';') {
    const lineas = datos
        .split(sepReg)
        .map(linea => linea.trim())
        .filter(linea => linea.length > 0);
    
    // Si no hay líneas, retornar array vacío
    if (lineas.length === 0) return [];
    
    // Determinar número de campos esperado (primera línea válida)
    const numCamposEsperado = lineas[0].split(sepCampos).length;
    
    //Convertir y filtrar
    return lineas
        .map(linea => linea.split(sepCampos))
        .filter(campos => campos.length === numCamposEsperado);
}
// b. extrnerCabecera - Extraer primera fila (cabecera)
function extrnerCabecera(matriz) {
    return matriz.length > 0 ? matriz[0] : [];
}

// c. filtrarPorNumCampo - Filtrar por campo numérico
function filtrarPorNumCampo(matrix, numCampo, valor) {
    return matrix.filter((fila, index) => {
        // Saltar la cabecera si está incluida
        if (index === 0 && fila.includes('country')) return false;
        return fila[numCampo] === valor;
    });
}

// d. realizarTabla - Generar HTML de tabla
function realizarTabla(cabecera, matriz, caption = '') {
    if (matriz.length === 0) return '<p>No hay datos para mostrar</p>';

    let html = `<table>\n`;
    
    if (caption) {
        html += `  <caption>${caption}</caption>\n`;
    }
    
    // Cabecera
    html += `  <thead>\n    <tr>\n`;
    cabecera.forEach(columna => {
        html += `      <th>${columna}</th>\n`;
    });
    html += `    </tr>\n  </thead>\n`;
    
    // Cuerpo
    html += `  <tbody>\n`;
    matriz.forEach(fila => {
        html += `    <tr>\n`;
        fila.forEach(campo => {
            html += `      <td>${campo || ''}</td>\n`;
        });
        html += `    </tr>\n`;
    });
    html += `  </tbody>\n</table>`;
    
    return html;
}

// e. ordenarPorCampo - Ordenar matriz por campo
function ordenarPorCampo(matrix, campo) {
    return [...matrix].sort((a, b) => {
        const valorA = a[campo] || '';
        const valorB = b[campo] || '';
        return valorA.localeCompare(valorB);
    });
}

// PROCESAMIENTO PRINCIPAL - VERSIÓN 1
const matrizCompleta = csvAMatriz(datos);
const cabecera = extrnerCabecera(matrizCompleta);
const datosSinCabecera = matrizCompleta.slice(1);

// Encontrar índice del campo 'country' para filtrar España
const indicePais = cabecera.indexOf('country');
const datosEspana = filtrarPorNumCampo(datosSinCabecera, indicePais, 'Spain');

// Encontrar índice del campo 'city' para ordenar
const indiceCiudad = cabecera.indexOf('city');
const datosOrdenados = ordenarPorCampo(datosEspana, indiceCiudad);

// Mostrar resultados
document.write('<h1>Versión 1 - Array de Arrays</h1>');
document.write(realizarTabla(cabecera, datosOrdenados, 'Ciudades de España ordenadas por ciudad'));