// a. csvAObjetos - Convertir CSV a array de objetos
function csvAObjetos(datosCSV, sepReg = '\n', sepCampos = ';') {
    const lineas = datosCSV
        .split(sepReg)
        .map(linea => linea.trim())
        .filter(linea => linea.length > 0);
    
    if (lineas.length === 0) return [];
    
    const cabecera = lineas[0].split(sepCampos);
    const datosLineas = lineas.slice(1);
    
    return datosLineas
        .map(linea => linea.split(sepCampos))
        .filter(campos => campos.length === cabecera.length)
        .map(campos => {
            const objeto = {};
            cabecera.forEach((nombreCampo, indice) => {
                objeto[nombreCampo] = campos[indice] || '';
            });
            return objeto;
        });
}

// b. filtrarPorPropiedad - Filtrar objetos por propiedad
function filtrarPorPropiedad(objetos, propiedad, valor) {
    return objetos.filter(objeto => objeto[propiedad] === valor);
}

// c. realizarTablaObjetos - Generar HTML de tabla desde objetos
function realizarTablaObjetos(objetos, caption = '') {
    if (objetos.length === 0) return '<p>No hay datos para mostrar</p>';
    
    const propiedades = Object.keys(objetos[0]);
    let html = `<table>\n`;
    
    if (caption) {
        html += `  <caption>${caption}</caption>\n`;
    }
    
    // Cabecera
    html += `  <thead>\n    <tr>\n`;
    propiedades.forEach(propiedad => {
        html += `      <th>${propiedad}</th>\n`;
    });
    html += `    </tr>\n  </thead>\n`;
    
    // Cuerpo
    html += `  <tbody>\n`;
    objetos.forEach(objeto => {
        html += `    <tr>\n`;
        propiedades.forEach(propiedad => {
            html += `      <td>${objeto[propiedad] || ''}</td>\n`;
        });
        html += `    </tr>\n`;
    });
    html += `  </tbody>\n</table>`;
    
    return html;
}

// d. ordenarPorPropiedad - Ordenar objetos por propiedad
function ordenarPorPropiedad(objetos, propiedad) {
    return [...objetos].sort((a, b) => {
        const valorA = a[propiedad] || '';
        const valorB = b[propiedad] || '';
        
        // Intentar convertir a número para latitud
        const numA = parseFloat(valorA.replace(',', '.'));
        const numB = parseFloat(valorB.replace(',', '.'));
        
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }
        
        return valorA.localeCompare(valorB);
    });
}

// PROCESAMIENTO PRINCIPAL - VERSIÓN 2
const objetosCompletos = csvAObjetos(datos);
const objetosEspana = filtrarPorPropiedad(objetosCompletos, 'country', 'Spain');
const objetosOrdenados = ordenarPorPropiedad(objetosEspana, 'lat');

// Mostrar resultados
document.write('<h1>Versión 2 - Array de Objetos</h1>');
document.write(realizarTablaObjetos(objetosOrdenados, 'Ciudades de España ordenadas por latitud'));