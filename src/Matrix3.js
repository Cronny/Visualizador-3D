var CG = (function(CG) {

    /**
     * Clase para representar matrices de 3x3.
     */
    class Matrix3 {

        /* Constructor de clase. */
        constructor(a00, a01, a02, a10, a11, a12, a20, a21, a22){
            if(!arguments.length){
                //Si no nos pasan argumentos creamos la matriz identidad
                this.a00 = 1;
                this.a01 = 0;
                this.a02 = 0;

                this.a10 = 0;
                this.a11 = 1;
                this.a12 = 0;
                
                this.a20 = 0;
                this.a21 = 0;
                this.a22 = 1;
            } else {
                //En otro caso rellenamos con los parámetros dados.
                this.a00 = a00;
                this.a01 = a01;
                this.a02 = a02;
                
                this.a10 = a10;
                this.a11 = a11;
                this.a12 = a12;
                
                this.a20 = a20;
                this.a21 = a21;
                this.a22 = a22;
            }
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         * Función que devuelve la suma de dos matrices.
         */
        static add(m1, m2){
            let a00 = m1.a00 + m2.a00;
            let a01 = m1.a01 + m2.a01;
            let a02 = m1.a02 + m2.a02;

            let a10 = m1.a10 + m2.a10;
            let a11 = m1.a11 + m2.a11;
            let a12 = m1.a12 + m2.a12;

            let a20 = m1.a20 + m2.a20;
            let a21 = m1.a21 + m2.a21;
            let a22 = m1.a22 + m2.a22;

            return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
        }

        /**
         * @return {Matrix3}
         * Función que devuelve la matriz adjunta de la matriz que la mande a llamar.
         */
        adjoint(){
            let a00 = (this.a11 * this.a22) - (this.a12 * this.a21);
            let a01 = (this.a12 * this.a20) - (this.a10 * this.a22);
            let a02 = (this.a10 * this.a21) - (this.a11 * this.a20);

            let a10 = (this.a21 * this.a02) - (this.a22 * this.a01);
            let a11 = (this.a22 * this.a00) - (this.a20 * this.a02);
            let a12 = (this.a20 * this.a01) - (this.a21 * this.a00);

            let a20 = (this.a01 * this.a12) - (this.a02 * this.a11);
            let a21 = (this.a02 * this.a10) - (this.a00 * this.a12);
            let a22 = (this.a00 * this.a11) - (this.a01 * this.a10);
            //Hasta ahora hemos calculado la de cofactores.
            let cofac = new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
            //La adjunta es la transpuesta de la de cofactores :)
            return cofac.transpose();
        }

        /**
         * @return {Matrix3}
         * Función que clona la matriz que la manda a llamar.
         */
        clone(){
            let a00 = this.a00;
            let a01 = this.a01;
            let a02 = this.a02;

            let a10 = this.a10;
            let a11 = this.a11;
            let a12 = this.a12;

            let a20 = this.a20;
            let a21 = this.a21;
            let a22 = this.a22;

            return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
        }

        /**
         * @return {Number}
         * Función que calcula el determinante de la matriz.
         */
        determinant(){
            // Cada una de las variables representan un producto de la suma total.
            let p1 = this.a00 * this.a11 * this.a22;
            let p2 = this.a01 * this.a12 * this.a20;
            let p3 = this.a02 * this.a10 * this.a21;
            let p4 = this.a02 * this.a11 * this.a20;
            let p5 = this.a00 * this.a12 * this.a21;
            let p6 = this.a01 * this.a10 * this.a22;

            return p1 + p2 + p3 - p4 - p5 - p6;          
        }

        /* Función auxiliar para la igualdad de matrices */
        static auxEquals(m1, m2, eps){
            /*La matriz mres tendrá en cada uno de sus componentes el resultado
              de restar cada los componentes de ambas matrices.*/
            let mres = CG.Matrix3.add(m1, CG.Matrix3.multiplyScalar(m2, -1));
            /*Las variables nos dirán si los componentes son iguales según la epsilon dada
              (Si alguna variable es falsa, entonces no son iguales). */
            let c1 = Math.abs(mres.a00) <= eps;
            let c2 = Math.abs(mres.a01) <= eps;
            let c3 = Math.abs(mres.a02) <= eps;
            let c4 = Math.abs(mres.a10) <= eps;
            let c5 = Math.abs(mres.a11) <= eps;
            let c6 = Math.abs(mres.a12) <= eps;
            let c7 = Math.abs(mres.a20) <= eps;
            let c8 = Math.abs(mres.a21) <= eps;
            let c9 = Math.abs(mres.a22) <= eps;

            return c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8 && c9;
        }
        
        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Boolean}
         * Nos dice si dos matrices son iguales bajo una epsilon de 0.000001.
         */
        static equals(m1, m2){
            return CG.Matrix3.auxEquals(m1, m2, 0.000001);
        }

        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Boolean}
         */
        static exactEquals(m1, m2){
            return CG.Matrix3.auxEquals(m1, m2, 0);
        }

        /**
         * Transforma a la función que la mande a llamar en la matriz identidad.
         */
        identity(){
            this.a00 = 1;
            this.a01 = 0;
            this.a02 = 0;
            
            this.a10 = 0;
            this.a11 = 1;
            this.a12 = 0;
            
            this.a20 = 0;
            this.a21 = 0;
            this.a22 = 1;
        }

        /**
         * @return {Matrix3}
         * Devuelve la matriz inversa de la matriz que la mando a llamar.
         */
        invert(){
            let det = this.determinant();
            return CG.Matrix3.multiplyScalar(this.adjoint(), 1/det);
        }
        
        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         * Devuelve la matriz resultado de multiplicar las matrices que le den como parámetros.
         */
        static multiply(m1, m2){
            let a00 = (m1.a00 * m2.a00) + (m1.a01 * m2.a10) + (m1.a02 * m2.a20);
            let a01 = (m1.a00 * m2.a01) + (m1.a01 * m2.a11) + (m1.a02 * m2.a21);
            let a02 = (m1.a00 * m2.a02) + (m1.a01 * m2.a12) + (m1.a02 * m2.a22);

            let a10 = (m1.a10 * m2.a00) + (m1.a11 * m2.a10) + (m1.a12 * m2.a20);
            let a11 = (m1.a10 * m2.a01) + (m1.a11 * m2.a11) + (m1.a12 * m2.a21);
            let a12 = (m1.a10 * m2.a02) + (m1.a11 * m2.a12) + (m1.a12 * m2.a22);
            
            let a20 = (m1.a20 * m2.a00) + (m1.a21 * m2.a10) + (m1.a22 * m2.a20);
            let a21 = (m1.a20 * m2.a01) + (m1.a21 * m2.a11) + (m1.a22 * m2.a21);
            let a22 = (m1.a20 * m2.a02) + (m1.a21 * m2.a12) + (m1.a22 * m2.a22);

            return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
        }


        /**
         * @param {Matrix3} m1
         * @param {Number} c
         * @return {Matrix3}
         * Devuelve la matriz resultante de multiplicar cada componente por una constante.
         */
        static multiplyScalar(m1, c){
            let a00 = m1.a00 * c;
            let a01 = m1.a01 * c;
            let a02 = m1.a02 * c;

            let a10 = m1.a10 * c;
            let a11 = m1.a11 * c;
            let a12 = m1.a12 * c;

            let a20 = m1.a20 * c;
            let a21 = m1.a21 * c;
            let a22 = m1.a22 * c;

            return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
        }
        
        /**
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         * Cambia los valores de la matriz por los que le pasen como parámetros.
         */
        set(a00, a01, a02, a10, a11, a12, a20, a21, a22){
            this.a00 = a00;
            this.a01 = a01;
            this.a02 = a02;
            
            this.a10 = a10;
            this.a11 = a11;
            this.a12 = a12;
            
            this.a20 = a20;
            this.a21 = a21;
            this.a22 = a22;
        }
        
        /**
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         * Devuelve la matriz resultado de restas las matrices dadas.
         */
        static subtract(m1, m2){
            //Multiplicamos la matriz 2 por -1 y reciclamos un método :p
            return  CG.Matrix3.add(m1, CG.Matrix3.multiplyScalar(m2, -1));
        }

        /**
         * @return {Matrix3}
         * Regresamos la matriz transpuesta de la matriz que la mande a llamar.
         */
        transpose(){
            let a00 = this.a00;
            let a01 = this.a10;
            let a02 = this.a20;
            
            let a10 = this.a01;
            let a11 = this.a11;
            let a12 = this.a21;
            
            let a20 = this.a02;
            let a21 = this.a12;
            let a22 = this.a22;

            return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
        }

        /**
         * @param {Vector3} v
         * @return {Vector3}
         * Devuelve el vector resultante de multiplicar el vector v por la matriz
         * que lo mande a llamar.
         */
        multiplyVector(v){
            let x = (v.x * this.a00) + (v.y * this.a10) + (v.z * this.a20);
            let y = (v.x * this.a01) + (v.y * this.a11) + (v.z * this.a21);
            let z = (v.x * this.a02) + (v.y * this.a12) + (v.z * this.a22);

            return new CG.Vector3(x, y, z);
        }

        /**
         * @param {Number} rad
         * @return {Matrix3}
         * Devuelve la matriz de rotación 2D con el ángulo rad que nos pasen como parámetro.
         */
        static rotate(rad){
            return new CG.Matrix3(Math.cos(rad), Math.sin(rad), 0,
                                  -Math.sin(rad), Math.cos(rad), 0,
                                  0, 0, 1);
        }

        /**
         * @param {Number} sx
         * @param {Number} sy
         * @return {Matrix3}
         * Devuelve la matriz de escalamiento 2D con los factores de escala sx y sy para
         * x y y respectivamente.
         */
        static scale(sx, sy){
            return new CG.Matrix3(sx, 0, 0,
                                  0, sy, 0,
                                  0, 0, 1);
        }

        /**
         * @param {Number} tx
         * @param {Number} ty
         * @return {Matrix3}
         * Devuelve la matriz de traslación en 2D con tx y ty como el desplazamiento en
         * x y y respectivamente. 
         */
        static translate(tx, ty){
            return new CG.Matrix3(1, 0, 0,
                                 0, 1, 0,
                                 tx, ty, 1);
        }
    }
    CG.Matrix3 = Matrix3;
    return CG;
})(CG || {});
