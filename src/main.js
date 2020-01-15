window.addEventListener("load", function(evt) {
    let file_input = document.getElementById("file_input");
    let text_content = document.getElementById("text_content");
    let canvas = document.getElementById("the_canvas");
    let context = canvas.getContext("2d");

    let camX = document.getElementById("camX");
    let camY = document.getElementById("camY");
    let camZ = document.getElementById("camZ");

    // Cada que se carga un nuevo archivo:
    file_input.addEventListener("change", function(evt) {
        let files = evt.target.files;

        let reader = new FileReader();
        reader.onload = function(reader_evt) {
            let new_vertices = [];
            let lector = new CG.Lector(reader_evt.target.result);
            // Posición inicial de la cámara.
            let cam_pos = new CG.Vector3(0,0,20);
            // Centro y arriba de la escena.
            let center = new CG.Vector3(0,0,0);
            let up = new CG.Vector3(0,1,0);
            // Las matrices necesarias.
            let cam_matrix = CG.Matrix4.lookAt(cam_pos, center,up);
            let matrix = new CG.Matrix4(); 
            // El aspecto para la escena.
            let aspect = canvas.width/canvas.clientHeight;
            // Lo más cerca y lejos que veremos.
            let zNear = 1;
            let zFar = 2000;
            // Las matrices de proyección.
            let projectionMatrix = CG.Matrix4.perspective(45*Math.PI/180, aspect, zNear, zFar);
            let viewProjectionMatrix = CG.Matrix4.multiply(cam_matrix,projectionMatrix);

            /**
             * Función para transformar la imágen.
             */
            function imagenTransform(w, h, v) {
                let x = (v.x/v.w) *w/2 + w/2;
                let y = -(v.y/v.w) *h/2 + h/2;
                let z = (v.z/v.w);
                return new CG.Vector4(x,y,z,1);
            }

            /**
             * Función para transformar la imágen.
             */
            function draw() {
                matrix = CG.Matrix4.multiply(viewProjectionMatrix, matrix);
                context.clearRect(0, 0, canvas.width, canvas.height);
                // Dibujamos el archivo vertice por vertice (como uniendo los puntos).
                lector.caras.forEach((cara) => {
                    cara.forEach((vertex) => {
                        context.beginPath();
                        vertex.forEach((vector,index) => {
                            new_vertices[index] = matrix.multiplyVector(vector);
                            vector = imagenTransform(canvas.width, canvas.height, new_vertices[index]);
                            if (index === 0) {
                                context.moveTo(vector.x, vector.y);
                            }
                            else {
                                context.lineTo(vector.x, vector.y);
                            }
                        });
                        context.closePath();
                        context.stroke();
                        });
                });
            }

            draw();

            /**
             * @param {String} x - La coordenada 'x' que tendrá la cámara.
             * @param {String} y - La coordenada 'y' que tendrá la cámara.
             * @param {String} z - La coordenada 'z' que tendrá la cámara.
             * Dadas 3 coordenadas actualizamos la cámara para que se posicione en
             * estas coordenadas. Una vez actualizada, volvemos a dibujar.
             */
            function actualizaCamara(x, y, z){
                cam_pos.set(x, y, z);
                cam_matrix = CG.Matrix4.lookAt(cam_pos,center,up);
                viewProjectionMatrix = CG.Matrix4.multiply(cam_matrix,projectionMatrix);
                matrix.identity();
                draw();
            }

            // Los siguentes 3 listeners es para cada coordenada.

            camX.addEventListener('input', function(evt) {
                let new_x = parseFloat(camX.value);
                actualizaCamara(new_x, cam_pos.y, cam_pos.z);

            });

            camY.addEventListener('input', function(evt){
                let new_y = parseFloat(camY.value);
                actualizaCamara(cam_pos.x, new_y, cam_pos.z);

            });

            camZ.addEventListener('input', function(evt) {
                let new_z = parseFloat(camZ.value);
                actualizaCamara(cam_pos.x, cam_pos.y, new_z);
            });
        };

        if (files.length > 0) {
            reader.readAsText(files[0]);
        }
    });
});
