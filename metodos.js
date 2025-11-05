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