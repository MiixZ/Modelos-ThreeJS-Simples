import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class ObjetoCSG extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);

        // Construcción del Mesh de las partes.


        // Añadir las partes al objeto con this.add(this.parte)
        this.add(this.createCSG());

        // Las geometrías se crean centradas en el origen.
        // Crear las geometrías y ajustar sus posiciones dependiendo de dónde queramos que se vean.

    }

    // Métodos (por ejemplo createParte())

    createCSG() {
        var csg = new CSG.CSG();

        var baseDonut = this.createBaseDonut();
        baseDonut.rotation.set(Math.PI/2, 0, 0);

        var agujeroGeom = new THREE.CylinderGeometry(2.5, 2.5, 20, 10, 10, false);
        agujeroGeom.translate(2.5, 0, 7.5);
        var agujeroDonut = new THREE.Mesh(agujeroGeom, new THREE.MeshBasicMaterial({color: 0x000000}));

        csg.subtract([baseDonut, agujeroDonut]);

        return csg.toMesh();
    }

    createBaseDonut() {
        const shape = new THREE.Shape();
        shape.moveTo(0.1, 0.1);                        // Moverlo al x, y
        shape.lineTo(5, 0);                        // Marcar una línea al x, y
        shape.quadraticCurveTo(10, 0,  10, 5);     // Curva sobre el p primero hasta el p segundo.
        shape.lineTo(10, 10);
        shape.quadraticCurveTo(10, 15,  5, 15);
        shape.lineTo(0, 15);
        shape.quadraticCurveTo(-5, 15,  -5, 10);
        shape.lineTo(-5, 5);
        shape.quadraticCurveTo(-5, 0,  0.1, 0.1);
        // Ahora crearemos la ruta que va a tomar la base (haciendo una curva suave).
        const options = {
            depth: 3,                   // Cantidad de extrusión.
            bevelEnabled: true,         // Añadido de bisel.
            steps: 3,                   // Segmentos de la parte extruída.
            curveSegments: 4,
            bevelThickness: 4,
            bevelSize: 2,
            bevelSegments: 2,
            //extrudePath: extrudePath    // Por defecto el eje z.
        };

        const extrudeGeometry = new THREE.ExtrudeGeometry(shape, options)
        return new THREE.Mesh(extrudeGeometry, new THREE.MeshBasicMaterial({color: 0xaa23aa}));
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

export { ObjetoCSG };