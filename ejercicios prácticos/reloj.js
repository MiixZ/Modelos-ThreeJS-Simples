import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class reloj extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    aguja;
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);
        this.clock = new THREE.Clock();

        // Construcción del Mesh de las partes.


        // Añadir las partes al objeto con this.add(this.parte)
        this.createHoras();
        this.createAguja();

        // Las geometrías se crean centradas en el origen.
        // Crear las geometrías y ajustar sus posiciones dependiendo de dónde queramos que se vean.

    }

    // Métodos (por ejemplo createParte())

    createHoras() {
        var materialHora = new THREE.MeshStandardMaterial({color: 0x02ffff});

        for(this.i = 0; this.i < 12; this.i++) {
            var hora = new THREE.SphereGeometry(0.5, 20, 20);
            hora.translate(10, 0, 0);
            hora.rotateY(Math.PI/6 * this.i);

            var horaMesh = new THREE.Mesh(hora, materialHora);
            this.add(horaMesh);
        }
    }

    createAguja() {
        var materialAguja = new THREE.MeshStandardMaterial({color: 0xff222e})
        var aguja = new THREE.SphereGeometry(0.5, 20, 20);
        aguja.translate(0, 0, 8);

        var agujaMesh = new THREE.Mesh(aguja, materialAguja);
        this.aguja = agujaMesh;

        this.add(agujaMesh);
    }

    createGUI(gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            velocidad : 0,

            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            reset : () => {
                this.guiControls.velocidad = 0;
            }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder(titleGui);
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'velocidad', -12, 12, 0.5).name('Velocidad : ').listen();

        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado.
        // Segundo, la rotación en Z.
        // Después, la rotación en Y.
        // Luego, la rotación en X.
        // Y por último la traslación.
        this.aguja.rotateY(this.clock.getDelta() * this.guiControls.velocidad * -Math.PI / 6);
    }
}

export { reloj };