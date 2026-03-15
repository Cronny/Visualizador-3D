window.addEventListener("load", function(evt) {
    let file_input = document.getElementById("file_input");
    let canvas = document.getElementById("the_canvas");
    let context = canvas.getContext("2d");
    let toggleObjBtn = document.getElementById("toggle_obj_btn");
    let objTextPanel = document.getElementById("obj_text_panel");

    let camX = document.getElementById("camX");
    let camY = document.getElementById("camY");
    let camZ = document.getElementById("camZ");
    let ultimoTextoObj = "";

    function actualizaPanelObj() {
        if (ultimoTextoObj.length > 0) {
            objTextPanel.textContent = ultimoTextoObj;
        } else {
            objTextPanel.textContent = "Aun no se ha cargado ningun archivo .obj.";
        }
    }

    toggleObjBtn.addEventListener("click", function() {
        if (objTextPanel.hidden) {
            actualizaPanelObj();
            objTextPanel.hidden = false;
            toggleObjBtn.textContent = "Ocultar contenido .obj";
        } else {
            objTextPanel.hidden = true;
            toggleObjBtn.textContent = "Mostrar contenido .obj";
        }
    });

    function cargarTexto(texto) {
        ultimoTextoObj = texto;
        let new_vertices = [];
        let lector = new CG.Lector(texto);
        // Posición inicial de la cámara.
        let cam_pos = new CG.Vector3(0,0,20);
        // Centro y arriba de la escena.
        let center = new CG.Vector3(0,0,0);
        let up = new CG.Vector3(0,1,0);
        // Las matrices necesarias.
        let cam_matrix = CG.Matrix4.lookAt(cam_pos, center, up);
        let matrix = new CG.Matrix4();
        // El aspecto para la escena.
        let aspect = canvas.width/canvas.clientHeight;
        // Lo más cerca y lejos que veremos.
        let zNear = 1;
        let zFar = 2000;
        // Las matrices de proyección.
        let projectionMatrix = CG.Matrix4.perspective(45*Math.PI/180, aspect, zNear, zFar);
        let viewProjectionMatrix = CG.Matrix4.multiply(cam_matrix, projectionMatrix);

        function imagenTransform(w, h, v) {
            let x = (v.x/v.w) *w/2 + w/2;
            let y = -(v.y/v.w) *h/2 + h/2;
            let z = (v.z/v.w);
            return new CG.Vector4(x,y,z,1);
        }

        function draw() {
            matrix = CG.Matrix4.multiply(viewProjectionMatrix, matrix);
            context.clearRect(0, 0, canvas.width, canvas.height);
            lector.caras.forEach((cara) => {
                cara.forEach((vertex) => {
                    context.beginPath();
                    vertex.forEach((vector,index) => {
                        if (vector === undefined) return;
                        new_vertices[index] = matrix.multiplyVector(vector);
                        vector = imagenTransform(canvas.width, canvas.height, new_vertices[index]);
                        if (index === 0) {
                            context.moveTo(vector.x, vector.y);
                        } else {
                            context.lineTo(vector.x, vector.y);
                        }
                    });
                    context.closePath();
                    context.stroke();
                });
            });
        }

        draw();

        function actualizaCamara(x, y, z){
            cam_pos.set(x, y, z);
            cam_matrix = CG.Matrix4.lookAt(cam_pos, center, up);
            viewProjectionMatrix = CG.Matrix4.multiply(cam_matrix, projectionMatrix);
            matrix.identity();
            draw();
        }

        // Usamos oninput para reemplazar el listener anterior al cargar un nuevo modelo.
        camX.oninput = function() {
            actualizaCamara(parseFloat(camX.value), cam_pos.y, cam_pos.z);
        };
        camY.oninput = function() {
            actualizaCamara(cam_pos.x, parseFloat(camY.value), cam_pos.z);
        };
        camZ.oninput = function() {
            actualizaCamara(cam_pos.x, cam_pos.y, parseFloat(camZ.value));
        };
    }

    // Carga desde el selector de archivos.
    file_input.addEventListener("change", function(evt) {
        let files = evt.target.files;
        let reader = new FileReader();
        reader.onload = function(reader_evt) {
            cargarTexto(reader_evt.target.result);
        };
        if (files.length > 0) {
            reader.readAsText(files[0]);
        }
    });

    // Carga desde los botones de ejemplo.
    document.querySelectorAll(".ejemplo-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            fetch(btn.dataset.src)
                .then(function(r) { return r.text(); })
                .then(function(texto) { cargarTexto(texto); });
        });
    });
});
