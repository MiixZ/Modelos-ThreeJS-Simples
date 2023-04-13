import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class avion extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    cono;
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);

        // Construcción del Mesh de las partes.
        this.createAvion();

        var spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3 (0,1,-1),
            new THREE.Vector3 (3,3,-3),
            new THREE.Vector3 (4,3,0),
            new THREE.Vector3 (4,3,1.5),
            new THREE.Vector3 (0,3,3),
        ]);
        // DIBUJAR EL SPLINE
        var geometryLine = new THREE.BufferGeometry();
        geometryLine.setFromPoints(spline.getPoints(100));
        var visibleSpline = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: 0xff0000, lineWidth: 2}))
        this.add(visibleSpline);


        var spline2 = new THREE.CatmullRomCurve3([
            new THREE.Vector3 (0,3,3),
            new THREE.Vector3 (-3,3,3),
            new THREE.Vector3 (-4,2,3),
            new THREE.Vector3 (-4,2,-2),
            new THREE.Vector3 (-3,3,-3),
            new THREE.Vector3 (0,1,-1),
        ]);
        // DIBUJAR EL SPLINE
        var geometryLine2 = new THREE.BufferGeometry();
        geometryLine2.setFromPoints(spline2.getPoints(100));
        var visibleSpline2 = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: 0xff0000, lineWidth: 2}))
        this.add(visibleSpline2);

       /* var origen = {x: 0, y: 10}        // Animación sin spline.
        var destino = {x: 20, y: 5}
        */

        // ANIMACIÓN 1
        var origen = {t: 0};
        var fin = {t: 1};
        var tiempo = 4000;

        var movimiento = new TWEEN.Tween(origen).to(fin, tiempo)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(() => { this.cono.position.x = 0; this.cono.position.y = 0; this.cono.position.z = 0});

        movimiento.onUpdate(() => {
            var posicion = spline.getPointAt(origen.t) ;
            this.cono.position.copy(posicion) ;
            var tangente = spline.getTangentAt(origen.t);
            posicion.add(tangente);
            this.cono.lookAt(posicion);
        })


        // ANIMACIÓN 2
        var origen2 = {t: 0};
        var fin2 = {t: 1};
        var tiempo2 = 8000;

        var movimiento2 = new TWEEN.Tween(origen2).to(fin2, tiempo2)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => { this.cono.position.x = 0; this.cono.position.y = 0; this.cono.position.z = 0});

        movimiento2.onUpdate(() => {
            var posicion2 = spline2.getPointAt(origen2.t) ;
            this.cono.position.copy(posicion2) ;
            var tangente = spline2.getTangentAt(origen2.t);
            posicion2.add(tangente);
            this.cono.lookAt(posicion2);
        })

        movimiento.chain(movimiento2);
        movimiento2.chain(movimiento);
        movimiento.start();

        // Añadir las partes al objeto con this.add(this.parte)


        // Las geometrías se crean centradas en el origen.
        // Crear las geometrías y ajustar sus posiciones dependiendo de dónde queramos que se vean.

    }

    // Métodos (por ejemplo createParte())

    createAvion() {
        var cono = new THREE.ConeGeometry(1, 2, 10, 10);

        this.cono = new THREE.Mesh(cono, new THREE.MeshPhysicalMaterial({color: 0x2AFF00}));
        this.cono.rotation.z = Math.PI / 2;
        this.add(this.cono);
    }

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
        TWEEN.update();
    }
}

export { avion };