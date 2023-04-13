import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class nombreobjeto extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);

        // Construcción del Mesh de las partes.


        // Añadir las partes al objeto con this.add(this.parte)


        // Las geometrías se crean centradas en el origen.
        // Crear las geometrías y ajustar sus posiciones dependiendo de dónde queramos que se vean.

    }

    // Métodos (por ejemplo createParte())

    createGUI(gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            sizeX : 1.0,

            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            reset : () => {
                this.guiControls.sizeX = 1.0;
            }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder(titleGui);
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').listen();

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

export { nombreobjeto };