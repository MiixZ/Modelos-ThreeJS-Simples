import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class pendulo1 extends THREE.Object3D {
    colorVerde = new THREE.MeshPhysicalMaterial({color: 0x2AFF00});
    colorRojo = new THREE.MeshPhysicalMaterial({color: 0xFF0000});
    colorAzul = new THREE.MeshPhysicalMaterial({color: 0x004DFF});
    colorGris = new THREE.MeshPhysicalMaterial({color: 0x696969});

    // Declarar variables aquí (diferenciar el objeto en partes).
    // Péndulo 1
    pendulo1;
    parteSuperior;
    parteCentral;
    parteInferior;
    Cilindro;

    // Péndulo 2
    pendulo2;
    cubo;
    Cilindro2;
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);

        // Construcción del Mesh de las partes.

        // Añadir las partes al objeto con this.add(this.parte)
        this.pendulo1 = new THREE.Object3D();
        this.createPendulo1();

        this.pendulo2 = new THREE.Object3D();
        this.createPendulo2();

        // Las geometrías se crean centradas en el origen.
        // Crear las geometrías y ajustar sus posiciones dependiendo de dónde queramos que se vean.
    }

    // Métodos (por ejemplo createParte())

    createPendulo1() {
        var cubo1 = new THREE.BoxGeometry(3, 4, 2);
        var cubo2 = new THREE.BoxGeometry(3, 5.0, 2);
        var cubo3 = new THREE.BoxGeometry(3, 4, 2);

        this.parteSuperior = new THREE.Mesh(cubo1, this.colorVerde);
        this.parteCentral = new THREE.Mesh(cubo2, this.colorRojo);
        this.parteInferior = new THREE.Mesh(cubo3, this.colorVerde);

        this.parteCentral.position.y = -4.5;             // CENTRADAS EN EL ORIGEN
        this.parteInferior.position.y = -9;

        var eje1 = new THREE.CylinderGeometry(0.7, 0.7, 0.5);

        this.Cilindro = new THREE.Mesh(eje1, this.colorGris);

        this.Cilindro.position.z = -1;
        this.Cilindro.rotation.x = Math.PI / 2;

        this.pendulo1.add(this.parteSuperior);
        this.pendulo1.add(this.parteCentral);
        this.pendulo1.add(this.parteInferior);
        this.pendulo1.add(this.Cilindro);
        this.add(this.pendulo1);
    }

    createPendulo2() {
        var cubo1 = new THREE.BoxGeometry(2.5, 10, 1);

        this.cubo = new THREE.Mesh(cubo1, this.colorAzul);
        this.cubo.position.y = -3;
        this.cubo.position.z = -1.5;

        var eje2 = new THREE.CylinderGeometry(0.5, 0.5, 0.5);

        this.Cilindro2 = new THREE.Mesh(eje2, this.colorGris);

        this.Cilindro2.position.z = -2;
        this.Cilindro2.rotation.x = Math.PI / 2;

        this.pendulo2.add(this.cubo);
        this.pendulo2.add(this.Cilindro2);

        this.pendulo2.position.y = this.parteCentral.position.y * 0.1 - 2.5;
        this.add(this.pendulo2);
    }

    createGUI(gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja.
        this.guiControls = {
            longitud : 5,
            giro : 0.0,

            longitud2 : 10.0,
            posicionp : 10.0,
            giro2 : 0.0,
            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            reset : () => {
                this.guiControls.longitud = 5.0;
                this.guiControls.giro = 0.0;

                this.guiControls.longitud2 = 10.0;
                this.guiControls.posicionp = 10.0;
                this.guiControls.giro2 = 0.0;
            }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder('Péndulo1');
        // Estas líneas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice.

        // ------------------------- Péndulo 1-------------------------------------
        folder.add(this.guiControls, 'longitud', 5.0, 10.0, 1).name('Longitud : ').listen();
        folder.add(this.guiControls, 'giro', -0.8, 0.8, 0.1).name('Giro : ').listen();

        // ------------------------- Péndulo 2-------------------------------------
        var pendulo2folder = gui.addFolder("Péndulo2");
        pendulo2folder.add(this.guiControls, 'longitud2', 10, 20, 1).name('Longitud : ').listen();
        pendulo2folder.add(this.guiControls, 'posicionp', 10, 90, 1).name('Posición : ').listen();
        pendulo2folder.add(this.guiControls, 'giro2', -0.8, 0.8, 0.1).name('Giro : ').listen();

        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado.
        // Segundo, la rotación en Z.
        // Después, la rotación en Y.
        // Luego, la rotación en X.
        // Y por último la traslación.
        this.rotation.set(0, 0, this.guiControls.giro)

        this.pendulo2.rotation.set(0, 0, this.guiControls.giro2)
        this.pendulo2.position.y = (this.guiControls.posicionp / 100) * this.parteCentral.position.y - 2.5;

        if(this.guiControls.longitud / 5 > this.parteCentral.scale.y) {
            this.parteCentral.scale.y = this.guiControls.longitud / 5;
            this.parteCentral.position.y -= 0.5;
            this.parteInferior.position.y -= 1;
        }
        else if(this.guiControls.longitud / 5 < this.parteCentral.scale.y) {
            this.parteCentral.scale.y = this.guiControls.longitud / 5;
            this.parteCentral.position.y += 0.5;
            this.parteInferior.position.y += 1;
        }

        if(this.guiControls.longitud2 / 10 > this.cubo.scale.y) {
            this.cubo.scale.y = this.guiControls.longitud2 / 10;
            this.cubo.position.y -= 0.5;
        }
        else if (this.guiControls.longitud2 / 10 < this.cubo.scale.y) {
            this.cubo.scale.y = this.guiControls.longitud2 / 10;
            this.cubo.position.y += 0.5;
        }
    }
}

export { pendulo1 };