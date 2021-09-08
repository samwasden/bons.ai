const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xc0c5cc );
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        camera.position.z = 50;
        camera.position.y = 25;
        camera.position.x = 0;

        camera.rotation.x = .2;

        //  lighting for scene

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio( window.devicePixelRatio );


        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild( renderer.domElement );

        const ambientLight = new THREE.AmbientLight( 0xE8E8E8, 0.4 ); // soft white light
        scene.add( ambientLight );

        const light = new THREE.DirectionalLight( 0xE8E8E8, 1 );

        light.position.set(30, 100, 20)
        light.castShadow = true;

        light.shadow.mapSize.width = 4000; // default
        light.shadow.mapSize.height = 4000; // default
        light.shadow.camera.near = 0.5; // default
        light.shadow.camera.far = 120; // default
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;

        scene.add( light );

        // recursive function creates limbs and joints at random


        function limb(base, shade = 0xc0b497, ymove = base*2, xmove = 0, zmove = 0, rotatez = 0, rotatex = 0, trunk = true) {

            setTimeout(() => {



            const geometry = new THREE.CylinderGeometry((base*.9)/4, base/4, base*4, 4);
            const material = new THREE.MeshLambertMaterial( {color: shade} );
            const branch = new THREE.Mesh( geometry, material );
            branch.castShadow = true;
            branch.receiveShadow = true;


            // roatate and change horizontal position

            branch.rotation.z = rotatez
            let partialHor = (base*2)*(Math.sin(rotatez)*-1)
            let horAxis = partialHor

            // rotate and change zed position

            branch.rotation.x = rotatex
            let placeholder = (base*2)*Math.cos(rotatez)
            let partialZed = placeholder*(Math.sin(rotatex))
            let zedAxis = partialZed

            // change vertical position base on rotations

            let partialVert = (base*2)*Math.cos(rotatez)
            let secondVert = partialVert*Math.cos(rotatex)
            let vertAxis = secondVert

            // add new positions to existing positions

            ymove += vertAxis
            xmove += horAxis
            zmove += zedAxis

            // adjust position of current branch

            branch.position.y = ymove
            branch.position.x = xmove
            branch.position.z = zmove

            // move horizontal axis further to make up to correctly place position for next branch.
            
            ymove += vertAxis
            xmove += horAxis
            zmove += zedAxis
            
            // add branch to tree

            treeGroup.add( branch )

            // check to see if should generate new limb

            if (Math.random() < .9 && base > .2) {

                newz = rotatez
                newx = rotatex

                newz += (Math.random() - .5)
                newx += (Math.random() - .5)

                limb(base*.5, shade, ymove, xmove, zmove, newz*1.2, newx*1.2, false)

                if (Math.random() < .5) {

                    newz2 = rotatez
                    newx2 = rotatex

                    newz2 += (Math.random() - .5)
                    newx2 += (Math.random() - .5)

                    limb(base*.5, shade, ymove, xmove, zmove, newz2*1.2, newx2*1.2, false)

                    if (Math.random() < .2) {

                        newz3 = rotatez
                        newx3 = rotatex

                        newz3 += (Math.random() - .5)
                        newx3 += (Math.random() - .5)

                        limb(base*.5, shade, ymove, xmove, zmove, newz3*2, newx3*2, false)
                    }
                }
            }

            // check to see if branch is large enogh to continue

            if (base > .2) {

                if (!trunk) {
                    rotatez += (Math.random() - .5)*2
                    rotatex += (Math.random() - .5)*2
                } else {
                    rotatez += (Math.random() - .5)/8
                    rotatex += (Math.random() - .5)/8
                }

                limb(base*.9, shade, ymove, xmove, zmove, rotatez, rotatex, trunk)
            } 

        }, 100);

        }
        

        //  create a new instance of my tree

        let groundGeometry = new THREE.BoxGeometry(1000, 100, 10)
        let groundMaterial = new THREE.MeshLambertMaterial( {color: 0x3c3f33} );
        const ground = new THREE.Mesh( groundGeometry, groundMaterial );
        ground.rotation.x = -1.5708
        ground.receiveShadow = true;

        scene.add( ground )

        // const leafShape = new THREE.Shape();


        // const leafGeometry = new THREE.ShapeGeometry( leafShape );
        // const leafMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff});
        // const leaf = new THREE.Mesh( leafGeometry, leafMaterial );




        let treeGroup = new THREE.Group()
        let tree = limb(2)

        treeGroup.castShadow = true;
        treeGroup.receiveShadow = true;

        console.log(treeGroup)

        scene.add(treeGroup)

        //  Animate Scene

        const animate = function () {
            requestAnimationFrame( animate );
            
            treeGroup.rotation.y += 0.005

            renderer.render( scene, camera );
        };

        animate();