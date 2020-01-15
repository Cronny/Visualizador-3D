var CG = (function(CG) {

    /**
     * Clase para representar matrices de 4x4.
     */
    class Matrix4 {

        /* Constructor de clase. */
        constructor(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21,
                    a22, a23, a30, a31, a32, a33){
            if(!arguments.length){
                //Si no nos pasan argumentos creamos la matriz identidad
                this.a00 = 1;
                this.a01 = 0;
                this.a02 = 0;
                this.a03 = 0;

                this.a10 = 0;
                this.a11 = 1;
                this.a12 = 0;
                this.a13 = 0;

                this.a20 = 0;
                this.a21 = 0;
                this.a22 = 1;
                this.a23 = 0;

                this.a30 = 0;
                this.a31 = 0;
                this.a32 = 0;
                this.a33 = 1;

            } else {
                //En otro caso rellenamos con los parámetros dados.
                this.a00 = a00;
                this.a01 = a01;
                this.a02 = a02;
                this.a03 = a03;
                
                this.a10 = a10;
                this.a11 = a11;
                this.a12 = a12;
                this.a13 = a13;
                
                this.a20 = a20;
                this.a21 = a21;
                this.a22 = a22;
                this.a23 = a23;

                this.a30 = a30;
                this.a31 = a31;
                this.a32 = a32;
                this.a33 = a33;
            }
        }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Matrix4}
         * Función que devuelve la suma de dos matrices.
         */
        static add(m1, m2){
            let a00 = m1.a00 + m2.a00;
            let a01 = m1.a01 + m2.a01;
            let a02 = m1.a02 + m2.a02;
            let a03 = m1.a03 + m2.a03;

            let a10 = m1.a10 + m2.a10;
            let a11 = m1.a11 + m2.a11;
            let a12 = m1.a12 + m2.a12;
            let a13 = m1.a13 + m2.a13;

            let a20 = m1.a20 + m2.a20;
            let a21 = m1.a21 + m2.a21;
            let a22 = m1.a22 + m2.a22;
            let a23 = m1.a23 + m2.a23;

            let a30 = m1.a30 + m2.a30;
            let a31 = m1.a31 + m2.a31;
            let a32 = m1.a32 + m2.a32;
            let a33 = m1.a33 + m2.a33;

            return new Matrix4(a00, a01, a02, a03, a10, a11, a12, a13,
                               a20, a21, a22, a23, a30, a31, a32, a33);
        }

        /**
         * @return {Matrix4}
         * Función que devuelve la matriz de cofactores de la matriz que la mande a llamar.
         */
        adjoint(){
            let a00 = (this.a11 * this.a22 * this.a33) + (this.a12 * this.a23 * this.a31) +
                (this.a13 * this.a21 * this.a32) - (this.a13 * this.a22 * this.a31) -
                (this.a12 * this.a21 * this.a33) - (this.a11 * this.a23 * this.a32);
            let a01 = -(this.a01 * this.a22 * this.a33) - (this.a02 * this.a23 * this.a31) -
                (this.a03 * this.a21 * this.a32) + (this.a03 * this.a22 * this.a31) +
                (this.a02 * this.a21 * this.a33) + (this.a01 * this.a23 * this.a32);
            let a02 = (this.a01 * this.a12 * this.a33) + (this.a02 * this.a13 * this.a31) +
                (this.a03 * this.a11 * this.a32) - (this.a03 * this.a12 * this.a31) -
                (this.a02 * this.a11 * this.a33) - (this.a01 * this.a13 * this.a32);
            let a03 = -(this.a01 * this.a12 * this.a23) - (this.a02 * this.a13 * this.a21) -
                (this.a03 * this.a11 * this.a22) + (this.a03 * this.a12 * this.a21) +
                (this.a02 * this.a11 * this.a23) + (this.a01 * this.a13 * this.a22);

            let a10 = -(this.a10 * this.a22 * this.a33) - (this.a12 * this.a23 * this.a30) -
                (this.a13 * this.a20 * this.a32) + (this.a13 * this.a22 * this.a30) +
                (this.a12 * this.a20 * this.a33) + (this.a10 * this.a23 * this.a32);
            let a11 = (this.a00 * this.a22 * this.a33) + (this.a02 * this.a23 * this.a30) +
                (this.a03 * this.a20 * this.a32) - (this.a03 * this.a22 * this.a30) -
                (this.a02 * this.a20 * this.a33) - (this.a00 * this.a23 * this.a32);
            let a12 = -(this.a00 * this.a12 * this.a33) - (this.a02 * this.a13 * this.a30) -
                (this.a03 * this.a10 * this.a32) + (this.a03 * this.a12 * this.a30) +
                (this.a02 * this.a10 * this.a33) + (this.a00 * this.a13 * this.a32);
            let a13 = (this.a00 * this.a12 * this.a23) + (this.a02 * this.a13 * this.a20) +
                (this.a03 * this.a10 * this.a22) - (this.a03 * this.a12 * this.a20) -
                (this.a02 * this.a10 * this.a23) - (this.a00 * this.a13 * this.a22);

            let a20 = (this.a10 * this.a21 * this.a33) + (this.a11 * this.a23 * this.a30) +
                (this.a13 * this.a20 * this.a31) - (this.a13 * this.a21 * this.a30) -
                (this.a11 * this.a20 * this.a33) - (this.a10 * this.a23 * this.a31);
            let a21 = -(this.a00 * this.a21 * this.a33) - (this.a01 * this.a23 * this.a30) -
                (this.a03 * this.a20 * this.a31) + (this.a03 * this.a21 * this.a30) +
                (this.a01 * this.a20 * this.a33) + (this.a00 * this.a23 * this.a31);
            let a22 = (this.a00 * this.a11 * this.a33) + (this.a01 * this.a13 * this.a30) +
                (this.a03 * this.a10 * this.a31) - (this.a03 * this.a11 * this.a30) -
                (this.a01 * this.a10 * this.a33) - (this.a00 * this.a13 * this.a31);
            let a23 = -(this.a00 * this.a11 * this.a23) - (this.a01 * this.a13 * this.a20) -
                (this.a03 * this.a10 * this.a21) + (this.a03 * this.a11 * this.a20) +
                (this.a01 * this.a10 * this.a23) + (this.a00 * this.a13 * this.a21);

            let a30 = -(this.a10 * this.a21 * this.a32) - (this.a11 * this.a22 * this.a30) -
                (this.a12 * this.a20 * this.a31) + (this.a12 * this.a21 * this.a30) +
                (this.a11 * this.a20 * this.a32) + (this.a10 * this.a22 * this.a31);
            let a31 = (this.a00 * this.a21 * this.a32) + (this.a01 * this.a22 * this.a30) +
                (this.a02 * this.a20 * this.a31) - (this.a02 * this.a21 * this.a30) -
                (this.a01 * this.a20 * this.a32) - (this.a00 * this.a22 * this.a31);
            let a32 = -(this.a00 * this.a11 * this.a32) - (this.a01 * this.a12 * this.a30) -
                (this.a02 * this.a10 * this.a31) + (this.a02 * this.a11 * this.a30) +
                (this.a01 * this.a10 * this.a32) + (this.a00 * this.a12 * this.a31);
            let a33 = (this.a00 * this.a11 * this.a22) + (this.a01 * this.a12 * this.a20) +
                (this.a02 * this.a10 * this.a21) - (this.a02 * this.a11 * this.a20) -
                (this.a01 * this.a10 * this.a22) - (this.a00 * this.a12 * this.a21);

            return new Matrix4(a00, a01, a02, a03, a10, a11, a12, a13,
                               a20, a21, a22, a23, a30, a31, a32, a33);
        }

        /**
         * @return {Matrix4}

         * * Función que clona la matriz que la manda a llamar.
         */
        clone(){
            let a00 = this.a00;
            let a01 = this.a01;
            let a02 = this.a02;
            let a03 = this.a03;

            let a10 = this.a10;
            let a11 = this.a11;
            let a12 = this.a12;
            let a13 = this.a13;

            let a20 = this.a20;
            let a21 = this.a21;
            let a22 = this.a22;
            let a23 = this.a23;

            let a30 = this.a30;
            let a31 = this.a31;
            let a32 = this.a32;
            let a33 = this.a33;

            return new Matrix4(a00, a01, a02, a03, a10, a11, a12, a13,
                               a20, a21, a22, a23, a30, a31, a32, a33);
        }

        /**
         * @return {Number}
         * Función que calcula el determinante de la matriz usando la regla de Laplace.
         */
        determinant(){
            // Matriz auxiliar que nos ayudará en el cálculo. La inicializamos como A_{0,0}
            let maux = new CG.Matrix3(this.a11, this.a12, this.a13, this.a21,
                                      this.a22, this.a23, this.a31, this.a32, this.a33);
            //Cada uno de las siguientes variables representa una iteración en la suma
            let p1 = this.a00 * Math.pow(-1, 0 + 0) * maux.determinant();
            // A_{0, 1}
            maux.set(this.a10, this.a12, this.a13, this.a20, this.a22, this.a23,
                     this.a30, this.a32, this.a33);
            let p2 = this.a01 * Math.pow(-1, 0 + 1) * maux.determinant();
            // A_{0, 2} 
            maux.set(this.a10, this.a11, this.a13, this.a20, this.a21, this.a23,
                     this.a30, this.a31, this.a33);
            let p3 = this.a02 * Math.pow(-1, 0 + 2) * maux.determinant();
            // A_{0, 3}
            maux.set(this.a10, this.a11, this.a12, this.a20, this.a21, this.a22,
                     this.a30, this.a31, this.a32);
            let p4 = this.a03 * Math.pow(-1, 0 + 3) * maux.determinant();

            return p1 + p2 + p3 + p4;
        }

        /* Función auxiliar para la igualdad de matrices */
        static auxEquals(m1, m2, eps){
            /*La matriz mres tendrá en cada uno de sus componentes el resultado
              de restar cada los componentes de ambas matrices.*/
            let mres = CG.Matrix4.add(m1, CG.Matrix4.multiplyScalar(m2, -1));
            /*Las variables nos dirán si los componentes son iguales según la epsilon dada
              (Si alguna variable es falsa, entonces no son iguales). */
            let c1  = Math.abs(mres.a00) <= eps;
            let c2  = Math.abs(mres.a01) <= eps;
            let c3  = Math.abs(mres.a02) <= eps;
            let c4  = Math.abs(mres.a03) <= eps;

            let c5  = Math.abs(mres.a10) <= eps;
            let c6  = Math.abs(mres.a11) <= eps;
            let c7  = Math.abs(mres.a12) <= eps;
            let c8  = Math.abs(mres.a13) <= eps;

            let c9  = Math.abs(mres.a20) <= eps;
            let c10 = Math.abs(mres.a21) <= eps;
            let c11 = Math.abs(mres.a22) <= eps;
            let c12 = Math.abs(mres.a23) <= eps;

            let c13 = Math.abs(mres.a30) <= eps;
            let c14 = Math.abs(mres.a31) <= eps;
            let c15 = Math.abs(mres.a32) <= eps;
            let c16 = Math.abs(mres.a33) <= eps;

            return c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8 &&
                c9 && c10 && c11 && c12 && c13 && c14 && c15 && c16;
        }
        
        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Boolean}
         * Nos dice si dos matrices son iguales bajo una epsilon de 0.000001.
         */
        static equals(m1, m2){
            return CG.Matrix4.auxEquals(m1, m2, 0.000001);
        }

        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Boolean}
         */
        static exactEquals(m1, m2){
            return CG.Matrix4.auxEquals(m1, m2, 0);
        }

        /**
         * Transforma a la función que la mande a llamar en la matriz identidad.
         */
        identity(){
            this.a00 = 1;
            this.a01 = 0;
            this.a02 = 0;
            this.a03 = 0;

            this.a10 = 0;
            this.a11 = 1;
            this.a12 = 0;
            this.a13 = 0;

            this.a20 = 0;
            this.a21 = 0;
            this.a22 = 1;
            this.a23 = 0;

            this.a30 = 0;
            this.a31 = 0;
            this.a32 = 0;
            this.a33 = 1;
        }

        /**
         * @return {Matrix4}
         * Devuelve la matriz inversa de la matriz que la mando a llamar.
         */
        invert(){
            let det = this.determinant();
            return CG.Matrix4.multiplyScalar(this.adjoint(), 1/det);
        }
        
        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Matrix4}
         * Devuelve la matriz resultado de multiplicar las matrices que le den como parámetros.
         */
        static multiply(m1, m2){
            let a00 = (m1.a00 * m2.a00) + (m1.a01 * m2.a10)
                + (m1.a02 * m2.a20) + (m1.a03 * m2.a30);
            let a01 = (m1.a00 * m2.a01) + (m1.a01 * m2.a11)
                + (m1.a02 * m2.a21) + (m1.a03 * m2.a31);
            let a02 = (m1.a00 * m2.a02) + (m1.a01 * m2.a12)
                + (m1.a02 * m2.a22) + (m1.a03 * m2.a32);
            let a03 = (m1.a00 * m2.a03) + (m1.a01 * m2.a13)
                + (m1.a02 * m2.a23) + (m1.a03 * m2.a33);

            let a10 = (m1.a10 * m2.a00) + (m1.a11 * m2.a10)
                + (m1.a12 * m2.a20) + (m1.a13 * m2.a30);
            let a11 = (m1.a10 * m2.a01) + (m1.a11 * m2.a11)
                + (m1.a12 * m2.a21) + (m1.a13 * m2.a31);
            let a12 = (m1.a10 * m2.a02) + (m1.a11 * m2.a12)
                + (m1.a12 * m2.a22) + (m1.a13 * m2.a32);
            let a13 = (m1.a10 * m2.a03) + (m1.a11 * m2.a13)
                + (m1.a12 * m2.a23) + (m1.a13 * m2.a33);
            
            let a20 = (m1.a20 * m2.a00) + (m1.a21 * m2.a10)
                + (m1.a22 * m2.a20) + (m1.a23 * m2.a30);
            let a21 = (m1.a20 * m2.a01) + (m1.a21 * m2.a11)
                + (m1.a22 * m2.a21) + (m1.a23 * m2.a31);
            let a22 = (m1.a20 * m2.a02) + (m1.a21 * m2.a12)
                + (m1.a22 * m2.a22) + (m1.a23 * m2.a32);
            let a23 = (m1.a20 * m2.a03) + (m1.a21 * m2.a13)
                + (m1.a22 * m2.a23) + (m1.a23 * m2.a33);

            let a30 = (m1.a30 * m2.a00) + (m1.a31 * m2.a10)
                + (m1.a32 * m2.a20) + (m1.a33 * m2.a30);
            let a31 = (m1.a30 * m2.a01) + (m1.a31 * m2.a11)
                + (m1.a32 * m2.a21) + (m1.a33 * m2.a31);
            let a32 = (m1.a30 * m2.a02) + (m1.a31 * m2.a12)
                + (m1.a32 * m2.a22) + (m1.a33 * m2.a32);
            let a33 = (m1.a30 * m2.a03) + (m1.a31 * m2.a13)
                + (m1.a32 * m2.a23) + (m1.a33 * m2.a33);
            
            return new Matrix4(a00, a01, a02, a03, a10, a11, a12, a13,
                               a20, a21, a22, a23, a30, a31, a32, a33);
        }


        /**
         * @param {Matrix4} m1
         * @param {Number} c
         * @return {Matrix4}
         * Devuelve la matriz resultante de multiplicar cada componente por una constante.
         */
        static multiplyScalar(m1, c){
            let a00 = m1.a00 * c;
            let a01 = m1.a01 * c;
            let a02 = m1.a02 * c;
            let a03 = m1.a03 * c;

            let a10 = m1.a10 * c;
            let a11 = m1.a11 * c;
            let a12 = m1.a12 * c;
            let a13 = m1.a13 * c;

            let a20 = m1.a20 * c;
            let a21 = m1.a21 * c;
            let a22 = m1.a22 * c;
            let a23 = m1.a23 * c;

            let a30 = m1.a30 * c;
            let a31 = m1.a31 * c;
            let a32 = m1.a32 * c;
            let a33 = m1.a33 * c;

            return new Matrix4(a00, a01, a02, a03, a10, a11, a12, a13,
                               a20, a21, a22, a23, a30, a31, a32, a33);
        }
        
        /**
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a03
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a13
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         * @param {Number} a23
         * @param {Number} a30
         * @param {Number} a31
         * @param {Number} a32
         * @param {Number} a33
         * Cambia los valores de la matriz por los que le pasen como parámetros.
         */
        set(a00, a01, a02, a03, a10, a11, a12, a13,
            a20, a21, a22, a23, a30, a31, a32, a33){
            this.a00 = a00;
            this.a01 = a01;
            this.a02 = a02;
            this.a03 = a03;
            
            this.a10 = a10;
            this.a11 = a11;
            this.a12 = a12;
            this.a13 = a13;
            
            this.a20 = a20;
            this.a21 = a21;
            this.a22 = a22;
            this.a23 = a23;

            this.a30 = a30;
            this.a31 = a31;
            this.a32 = a32;
            this.a33 = a33;
        }
        
        /**
         * @param {Matrix4} m1
         * @param {Matrix4} m2
         * @return {Matrix4}
         * Devuelve la matriz resultado de restas las matrices dadas.
         */
        static subtract(m1, m2){
            //Multiplicamos la matriz 2 por -1 y reciclamos un método :p
            return  CG.Matrix4.add(m1, CG.Matrix4.multiplyScalar(m2, -1));
        }

        /**
         * @return {Matrix4}
         * Regresamos la matriz transpuesta de la matriz que la mande a llamar.
         */
        transpose(){
            let a00 = this.a00;
            let a01 = this.a10;
            let a02 = this.a20;
            let a03 = this.a30;
            
            let a10 = this.a01;
            let a11 = this.a11;
            let a12 = this.a21;
            let a13 = this.a31;
            
            let a20 = this.a02;
            let a21 = this.a12;
            let a22 = this.a22;
            let a23 = this.a32;

            let a30 = this.a03;
            let a31 = this.a13;
            let a32 = this.a23;
            let a33 = this.a33;

            return new Matrix4(a00, a01, a02, a03, a10, a11, a12, a13,
                               a20, a21, a22, a23, a30, a31, a32, a33);
        }
        
        /**
         * @param {Number} left * @param {Number} right
         * @param {Number} bottom
         * @param {Number} top
         * @param {Number} near
         * @param {Number} far
         * @return {Matrix4}
         * Regresa la matriz que representa la pirámide truncada (view frustrum)
         * determinada por los planos dados por los parámetros
         */
        static frustum(left, right, bottom, top, near, far){
            return new Matrix4(2 * near / (right - left), 0, 0, 0,
                               0, 2 * near / (top - bottom), 0, 0,
                               (right + left) / (right - left), (top + bottom) / (top - bottom), //...
                               - (far + near) / (far - near), -1,
                               0, 0,  -2 * near * far / (far - near), 0);
        }
        /**
         * @param {Vector3} eye
         * @param {Vector3} center
         * @param {Vector3} up
         * @return {Matrix4}
         * Devuelve la matriz de vista a partir de la posición del ojo,
         * el centro de interés y el vector hacia arriba.
         */
        static lookAt(eye,center,up){
            let temp = new CG.Vector3(center.x * -1, center.y * -1, center.z * -1);
            let Z = CG.Vector3.add(eye,temp); //Resta de vectores.
            Z = Z.normalize();
            let X = CG.Vector3.cross(up,Z);
            let Y = CG.Vector3.cross(Z,X);
            X = X.normalize();
            Y = Y.normalize();
            let m1 = CG.Vector3.dot(X,eye);
            let m2 = CG.Vector3.dot(Y,eye);
            let m3 = CG.Vector3.dot(Z,eye);
            let RUD = new Matrix4(X.x,Y.x,Z.x, 0,
                                  X.y,Y.y,Z.y, 0, 
                                  X.z,Y.z,Z.z, 0, 
                                  -m1,-m2,-m3, 1);
            return RUD;
        }
        
        /**
         * @param {Vector4} v
         * @return {Vector4}
         * Devuelve la multiplicación del vector por la matriz que mande a llamar
         * la función. 
         */
        multiplyVector(v){
            let x = v.x * this.a00 + v.y * this.a10 + v.z * this.a20 + v.w * this.a30;
            let y = v.x * this.a01 + v.y * this.a11 + v.z * this.a21 + v.w * this.a31;
            let z = v.x * this.a02 + v.y * this.a12 + v.z * this.a22 + v.w * this.a32;
            let w = v.x * this.a03 + v.y * this.a13 + v.z * this.a23 + v.w * this.a33;

            return new CG.Vector4(x, y, z, w);
       }

        /**
         * @param {Number} left
         * @param {Number} right
         * @param {Number} bottom
         * @param {Number} top
         * @param {Number} near
         * @param {Number} fa
         * @return {Matrix4}
         * Devuelve la matriz que corresponde a la proyección ortogonal determinada
         * por los planos dados por los parámetros.
         */
        static ortho(left, right, bottom, top, near, far){
            return new Matrix4(2/(right - left), 0, 0, 0,
                               0, 2/(top - bottom), 0, 0,
                               0, 0, -2/(far - near), 0,
                               -(right + left)/(right - left), -(top + bottom)/(top - bottom),//...
                               -(far + near)/(far - near), 1);
        }
        
        /**
         * @param {Number} fovy
         * @param {Number} aspect
         * @param {Number} near
         * @param {Number} far
         * @return {Matrix4}
         * Regresa la matriz correspondiente a la proyección en perspectiva. El parámetro
         * fovy es el campo de visión vertical, aspect la relación de aspecto, near y far
         * la distancia del plano mas cercano y lejano, respectivamente.
         */
        static perspective(fovy, aspect, near, far){
            let ftan = 1/ Math.tan(fovy/2);

            let prof  = far - near;
            let q     = (far + near) / prof;
            let qn    = (2 * far * near) / prof;
            let w     = ftan / aspect;
            let h     = ftan;

            return new Matrix4(w, 0, 0, 0,
                               0, h, 0, 0,
                               0, 0, q, -1,
                               0, 0, qn, 0);
        }
        
        /**
         * @param {Number} rad
         * @return {Matrix4}
         * Devuelve la matriz de rotación en 3D sobre el eje X con el ángulo del parámetro.
         */
        static rotateX(rad){
            return new Matrix4(1, 0, 0, 0,
                               0, Math.cos(rad), -Math.sin(rad), 0,
                               0, Math.sin(rad), Math.cos(rad), 0,
                               0, 0, 0, 1);
        }

        /**
         * @param {Number} rad
         * @return {Matrix4}
         * Devuelve la matriz de rotación en 3D sobre el eje Y con el ángulo del parámetro.
         */
        static rotateY(rad){
            return new Matrix4(Math.cos(rad), 0, Math.sin(rad), 0,
                               0, 1, 0, 0,
                               -Math.sin(rad), 0, Math.cos(rad), 0,
                               0, 0, 0, 1);
        }

        /**
         * @param {Number} rad
         * @return {Matrix4}
         * Devuelve la matriz de rotación en 3D sobre el eje Z con el ángulo del parámetro.
         */
        static rotateZ(rad){
            return new Matrix4(Math.cos(rad), -Math.sin(rad), 0, 0,
                               Math.sin(rad), Math.cos(rad), 0, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        }

        /**
         * @param {Vector3} v
         * @return {Matrix4}
         * Regresa la matriz de escalamiento en 3D con los factores de escala determinados
         * por los componentes del vector v.
         */
        static scale(v){
            return new Matrix4(v.x, 0, 0, 0,
                               0, v.y, 0, 0,
                               0, 0, v.z, 0,
                               0, 0, 0, 1);
        }

        /**
         * @param {Vector3} v
         * @return {Matrix4}
         * Regresa la matriz de traslación en 3D con los factores de traslación determinados
         * por los componentes del vector v.
         */
        static translate(v){
            return new MAtrix4(1, 0, 0, 0,
                               0, 1, 0, 0,
                               0, 0, 1, 0,
                               v.x, v.y, v.z, 1);
        }
    }
    CG.Matrix4 = Matrix4;
    return CG;
})(CG || {});
