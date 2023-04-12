import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class ObjetoObj extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    constructor(gui, titleGui) {
        super();

        // crea una instancia del objeto OBJLoader
        const loader = new THREE.OBJLoader();

        // carga el archivo .obj
        loader.load(
            'modelo.obj',
            function(object) {
                // el objeto se ha cargado correctamente

                // añade el objeto a la escena
                this.add(object);
            },
            function(xhr) {
                // se está cargando el archivo
                console.log((xhr.loaded / xhr.total * 100) + '% cargado');
            },
            function(error) {
                // se produjo un error al cargar el archivo
                console.error('Error al cargar el modelo', error);
            }
        );
    }

    // Métodos (por ejemplo createParte())

    createGUI(gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            sizeX : 1.0,
            sizeY : 1.0,
            sizeZ : 1.0,

            rotX : 0.0,
            rotY : 0.0,
            rotZ : 0.0,

            posX : 0.0,
            posY : 0.0,
            posZ : 0.0,

            c2sizeX : 1.0,
            c2sizeY : 1.0,
            c2sizeZ : 1.0,

            c2rotX : 0.0,
            c2rotY : 0.0,
            c2rotZ : 0.0,

            c2posX : 0.0,
            c2posY : 0.0,
            c2posZ : 0.0,
            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            reset : () => {
                this.guiControls.sizeX = 1.0;
                this.guiControls.sizeY = 1.0;
                this.guiControls.sizeZ = 1.0;

                this.guiControls.rotX = 0.0;
                this.guiControls.rotY = 0.0;
                this.guiControls.rotZ = 0.0;

                this.guiControls.posX = 0.0;
                this.guiControls.posY = 0.0;
                this.guiControls.posZ = 0.0;

                this.guiControls.c2sizeX = 1.0;
                this.guiControls.c2sizeY = 1.0;
                this.guiControls.c2sizeZ = 1.0;

                this.guiControls.c2rotX = 0.0;
                this.guiControls.c2rotY = 0.0;
                this.guiControls.c2rotZ = 0.0;

                this.guiControls.c2posX = 0.0;
                this.guiControls.c2posY = 0.0;
                this.guiControls.c2posZ = 0.0;
            }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder(titleGui);
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').listen();
        folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name('Tamaño Y : ').listen();
        folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name('Tamaño Z : ').listen();

        folder.add(this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name('Rotación X : ').listen();
        folder.add(this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name('Rotación Y : ').listen();
        folder.add(this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name('Rotación Z : ').listen();

        folder.add(this.guiControls, 'posX', -20.0, 20.0, 0.1).name('Posición X : ').listen();
        folder.add(this.guiControls, 'posY', 0.0, 10.0, 0.1).name('Posición Y : ').listen();
        folder.add(this.guiControls, 'posZ', -20.0, 20.0, 0.1).name('Posición Z : ').listen();

        // -------------------------CILINDRO 2-------------------------------------
        var cilindro2folder = folder.addFolder("Cilindro 2");
        cilindro2folder.add(this.guiControls, 'c2sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').listen();
        cilindro2folder.add(this.guiControls, 'c2sizeY', 0.1, 5.0, 0.1).name('Tamaño Y : ').listen();
        cilindro2folder.add(this.guiControls, 'c2sizeZ', 0.1, 5.0, 0.1).name('Tamaño Z : ').listen();

        cilindro2folder.add(this.guiControls, 'c2rotX', 0.0, Math.PI/2, 0.1).name('Rotación X : ').listen();
        cilindro2folder.add(this.guiControls, 'c2rotY', 0.0, Math.PI/2, 0.1).name('Rotación Y : ').listen();
        cilindro2folder.add(this.guiControls, 'c2rotZ', 0.0, Math.PI/2, 0.1).name('Rotación Z : ').listen();

        cilindro2folder.add(this.guiControls, 'c2posX', -20.0, 20.0, 0.1).name('Posición X : ').listen();
        cilindro2folder.add(this.guiControls, 'c2posY', 0.0, 10.0, 0.1).name('Posición Y : ').listen();
        cilindro2folder.add(this.guiControls, 'c2posZ', -20.0, 20.0, 0.1).name('Posición Z : ').listen();

        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación

    }
}

export { ObjetoObj };