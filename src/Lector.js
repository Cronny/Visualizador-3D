var CG = (function(CG) {

    /**
     * Clase que lee y prepara archivos .obj para el visualizador.
     */
    class Lector {
        /**
         * @param {String} texto, el texto del archivo a leer.
         * Constructor de clase.
         * Analiza el texto de entrada, preparando los vertices, vertices de textura,
         * vertices normales y las caras.
         */
        constructor(texto){
            this.texto = texto;
            this.vertices = [];
            //this.verticest = [];
            //this.verticesn = [];
            this.caras = [];
            CG.Lector.analiza(this.vertices, this.caras, this.texto);
        }

        /**
         * @param {Array} vertices - Un conjunto en el que pondremos los vertices.
         * @param {Array} caras - Un conjunto en el que guardaremos las caras.
         * @param {String} texto - El texto a analizar.
         * Analiza el texto del lector. Al acabar este método los vertices, vertices
         * de textura, vertices normales y caras estarán listas.
         * (NOTA: Para recuperar los vertices de texura y normales hay que pasarselos como
         * argumentos a esta función.)
         */
        static analiza(vertices, caras, texto){
            let lineas = texto.split("\n"); //Arreglo con cada línea en una entrada.

            lineas.forEach(function(linea) {
                switch (linea.slice(0, 2)) {
                    /* Si quisieramos trabajar con texturas y vertices normales, usamos esto:
                      case "vt": // Encontramos un vértice de textura.
                      CG.Lector.convierteVector(linea, "vt", verticest);
                      break;
                      case "vn": // Encontramos un vértice normal.
                      CG.Lector.convierteVector(linea, "vn", verticesn);
                      break;
                    */
                case "v ": // Encontramos un vértice.
                    CG.Lector.convierteVector(linea, "v ", vertices);
                    break;
                case "f ": // Encontramos una cara.
                    let verts = [];
                    //let texts = [];
                    //let nrms = [];
                    let parametros = linea.substr(2).split(" ");
                    
                    parametros.forEach(function(p) {
                        let lverts = p.split("/");
                        verts.push(vertices[parseInt(lverts[0]) - 1]);
                        /* Casos para cuando tomemos en cuenta los vertices de textura y normales.
                        if(lverts[1] != "")
                            texts.push(verticest[parseInt(lverts[1]) - 1]);
                        if(lverts.length == 3)
                            nrms.push(verticesn[parseInt(lverts[2])]);
                        */
                    });
                    // ¿Una estructura mejor aquí?
                    let f = [verts];
                    caras.push(f);
                

                }
            });
        }

        /**
         * @param {String} linea - La línea de donde sacaremos los valores.
         * @param {String} prefijo - Prefijo con el que inicia la línea, nos indicará que tipo de vector será.
         * @param {Array} cjto - El conjunto en el que guardaremos los valores.
         * Función auxiliar que convierte valores flotantes separados por espacios
         * (x y z) en Vertex4 y los mete a el conjunto que pertenecen.
         * (NOTA: Ya toma los casos para los vertices normales y de textura; casos
         * que, para el proyecto 1 son inútiles pero, eventualmente, se ocuparán.)
         */
        static convierteVector(linea, prefijo, cjto){
            // Primero separamos los valores y los parseamos a flotantes.
            let valores = "";
            if(prefijo == "v ")  //Esta condición es para tomar correctamente los valores.
                valores = linea.substr(2).split(" ");
            else 
                valores = linea.substr(3).split(" ");
            valores = valores.map(function(s) {
                return parseFloat(s);
            });
            // Creamos el vertice y lo añadimos en su respectivo conjunto.
            switch (prefijo) {
            case "vt":
                cjto.push(new CG.Vector3(valores[0], valores[1], 1));
            default: //si no es un vertice de textura, es un vertice en R^3.
                cjto.push(new CG.Vector4(valores[0], valores[1], valores[2], 1));
            }
        }
    }
    CG.Lector = Lector;
    return CG;
})(CG || {});
