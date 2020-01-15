var CG = (function(CG) {

    /**
     * Clase para representar vectores en R4.
     */
    class Vector4 {

        /* Constructor de clase. */
        constructor(x, y, z, w){
            if(!arguments.length){
                //Si no nos pasan nada devuelve el vector vacío
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 0;
            } else {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
        }

        /**
         * Regresa una cadena que representa al vector.
         */
        toString(){
            return "[" + this.x.toString() + ", " + this.y.toString() + ", " + this.z.toString() + ", " + this.w.toString() + "]";
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Vector4}
         * Método que regresa el vector suma de dos vectores u y v. 
         */
        static add(u, v){
            let x = u.x + v.x;
            let y = u.y + v.y;
            let z = u.z + v.z;
            let w = u.w + v.w;
            return new Vector4(x, y, z, w);
        }

        /**
         * @return {Vector4}
         * Regresa una copia del vector desde el que se mandó a llamar el método.
         */
        clone(){
            let x = this.x;
            let y = this.y;
            let z = this.z;
            let w = this.w;
            return new Vector4(x, y, z, w);
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Number}
         * Devuelve la distancia euclidiana que hay entre los argumentos.
         */
        static distance(u, v){
            //Cada una de estas variables representará la resta al cuadrado
            //del componente que lleve su nombre (pa' que se vea mejor).
            let x = Math.pow(v.x - u.x, 2);
            let y = Math.pow(v.y - u.y, 2);
            let z = Math.pow(v.z - u.z, 2);
            let w = Math.pow(v.w - u.w, 2);
            return Math.sqrt(x + y + z + w);
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Number}
         * Devuelve el producto punto de los parámetros.
         */
        static dot(u, v){
            return (u.x * v.x) + (u.y * v.y) + (u.z * v.z) + (u.w * v.w);
        }

        /* Función auxiliar para comparar si dos vectores son iguales dada una epsilon. */
        static equalsAux(u, v, eps){
            let a = Math.abs(u.x - v.x);
            let b = Math.abs(u.y - v.y);
            let c = Math.abs(u.z - v.z);
            let d = Math.abs(u.w - v.w);
            if (a <= eps && b <= eps && c <= eps && d <= eps)
                return true;
            return false;
        }
        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Boolean}
         * Devuelve verdadero si los vectores son aproximadamente iguales.
         */
        static equals(u, v){
            return CG.Vector4.equalsAux(u, v, 0.000001);
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Boolean}
         * Regresa verdadero solo si los vectores son exactamente iguales.
         */
        static exactEquals(u, v){
            return CG.Vector4.equalsAux(u, v, 0);
        }

        /**
         * @return {Number}
         * Devuelve el tamaño del vector.
         */
        length(){
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)
                             + Math.pow(this.z, 2) + Math.pow(this.w, 2));
        }

        /**
         * @return {Vector4}
         * Devuelve el vector resultante de normalizar el vector que llama a la función.
         */
        normalize(){
            let tamaño = this.length();
            return new Vector4(this.x/tamaño, this.y/tamaño, this.z/tamaño, this.w/tamaño);
        }

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * @param {Number} w
         * Cambia los valores del vector que llamó la función por los de los parámetros.
         */
        set(x, y, z, w){
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        /**
         * @param {Vector4} u
         * @param {Vector4} v
         * @return {Number}
         * Devuelve la distancia euclidiana entre u y v al cuadrado.
         */
        static squaredDistance(u, v){
            return Math.pow(CG.Vector4.distance(u, v), 2);
        }

        /**
         * @return {Number}
         * Devuelve el tamaño del vector al cuadrado.
         */
        squaredLength(){
            return Math.pow(this.length(), 2);
        }

        /**
         * Asigna cero a todas las componentes del vector.
         */
        zero(){
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
        }
    }
    CG.Vector4 = Vector4;
    return CG;
})(CG || {});
