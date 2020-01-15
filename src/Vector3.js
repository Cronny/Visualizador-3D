var CG = (function(CG) {

    /**
     * Clase para representar vectores en R3.
     */
    class Vector3 {
        
        /* Constructor de clase. */
        constructor(x,y,z){
            if(!arguments.length){
                //Si no nos pasan nada devuelve el vector vacío
                this.x = 0;
                this.y = 0;
                this.z = 0;
            } else {
                this.x = x;
                this.y = y;
                this.z = z;
            }
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Vector3}
         * Método que regresa el vector suma de dos vectores u y v. 
         */
        static add(u, v){
            let x = u.x + v.x;
            let y = u.y + v.y;
            let z = u.z + v.z;
            return new Vector3(x, y, z);
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Método que devuelve el ángulo, en radianes, que hay entre sus argumentos.
         */
        static angle(u, v){
            let pcruz = CG.Vector3.dot(u,v);
            let pmods = u.length() * v.length();
            return Math.acos(pcruz / pmods);
        }

        /**
         * @return {Vector3}
         * Regresa una copia del vector desde el que se mandó a llamar el método.
         */
        clone(){
            let x = this.x;
            let y = this.y;
            let z = this.z;
            return new Vector3(x, y, z);
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Vector3}
         * Devuelve el producto cruz de u y v. 
         */
        static cross(u, v){
            let x = (u.y * v.z) - (u.z * v.y);
            let y = -((u.x * v.z) - (u.z * v.x));
            let z = (u.x * v.y) - (u.y * v.x);
            return new Vector3(x, y, z);}

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Devuelve la distancia euclidiana que hay entre los argumentos.
         */
        static distance(u, v){
            //Cada una de estas variables representará la resta al cuadrado
            //del componente que lleve su nombre (pa' que se vea mejor).
            let x = Math.pow(v.x - u.x, 2);
            let y = Math.pow(v.y - u.y, 2);
            let z = Math.pow(v.z - u.z, 2);
            return Math.sqrt(x + y + z);
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Devuelve el producto punto de los parámetros.
         */
        static dot(u, v){
            return (u.x * v.x) + (u.y * v.y) + (u.z * v.z);
        }

        /* Función auxiliar para comparar si dos vectores son iguales dada una epsilon. */
        static equalsAux(u, v, eps){
            let a = Math.abs(u.x - v.x);
            let b = Math.abs(u.y - v.y);
            let c = Math.abs(u.z - v.z);
            if (a <= eps && b <= eps && c <= eps)
                return true;
            return false;
        }
        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Boolean}
         * Devuelve verdadero si los vectores son aproximadamente iguales.
         */
        static equals(u, v){
            return CG.Vector3.equalsAux(u, v, 0.000001);
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Boolean}
         * Regresa verdadero solo si los vectores son exactamente iguales.
         */
        static exactEquals(u, v){
            return CG.Vector3.equalsAux(u, v, 0);
        }

        /**
         * @return {Number}
         * Devuelve el tamaño del vector.
         */
        length(){
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        }

        /**
         * @return {Vector3}
         * Devuelve el vector resultante de normalizar el vector que llama a la función.
         */
        normalize(){
            let tamaño = this.length();
            return new Vector3(this.x/tamaño, this.y/tamaño, this.z/tamaño);
        }

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * Cambia los valores del vector que llamó la función por los de los parámetros.
         */
        set(x, y, z){
            this.x = x;
            this.y = y;
            this.z = z;
        }

        /**
         * @param {Vector3} u
         * @param {Vector3} v
         * @return {Number}
         * Devuelve la distancia euclidiana entre u y v al cuadrado.
         */
        static squaredDistance(u, v){
            return Math.pow(CG.Vector3.distance(u, v), 2);
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
        }
    }
    CG.Vector3 = Vector3;
    return CG;
})(CG || {});
