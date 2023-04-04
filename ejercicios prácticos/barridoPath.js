import * as THREE from '../libs/three.module.js'

class barridoPath extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);

        // Añadir las partes al objeto con this.add(this.parte)
        this.add(this.createExtrude());

        // Las geometrías se crean centradas en el origen.
        // Crear las geometrías y ajustar sus posiciones dependiendo de dónde queramos que se vean.

    }

    // Métodos (por ejemplo createParte())

    createExtrude() {
        // Construcción del Mesh de las partes.
        // La base debe ser un shape.
        const shape = this.createShape();

        // Ahora crearemos la ruta que va a tomar la base (haciendo una curva suave).
        const pathPoints = [
            new THREE.Vector3(15, 30, -30),
            new THREE.Vector3(30, 15, -15),
            new THREE.Vector3(45, 30, 0),
            new THREE.Vector3(30, 45, 15),
            new THREE.Vector3(15, 60, 30)
        ]

        const extrudePath = new THREE.CatmullRomCurve3(pathPoints);
        const options = {
            depth: 8,                   // Cantidad de extrusión.
            bevelEnabled: false,         // Añadido de bisel.
            steps: 3,                   // Segmentos de la parte extruída.
            curveSegments: 4,
            extrudePath: extrudePath    // Por defecto el eje z.
        };

        const extrudeGeometry = new THREE.ExtrudeGeometry(shape, options)
        return new THREE.Mesh(extrudeGeometry, new THREE.MeshDepthMaterial({color: 0x008000}));
    }

    createShape() {
        // Construcción del Mesh de las partes.
        // La base debe ser un shape.
        const shape = new THREE.Shape();
        shape.moveTo(5, 5);                        // Moverlo al x, y
        shape.lineTo(10, 5);                        // Marcar una línea al x, y
        shape.quadraticCurveTo(15, 5,  15, 10);     // Curva sobre el p primero hasta el p segundo.
        shape.lineTo(15, 15);
        shape.quadraticCurveTo(15, 20,  10, 20);
        shape.lineTo(5, 20);
        shape.quadraticCurveTo(0, 20,  0, 15);
        shape.lineTo(0, 10);
        shape.quadraticCurveTo(0, 5,  5, 5);

        return shape;
    }

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

export { barridoPath };