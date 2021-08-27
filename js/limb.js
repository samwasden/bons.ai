class Tree {
    constructor(width, type, density, color) {
        width = this.width;
        type = this.type;
        density = this.density;
        color = this.color;
        
    }

    // recursive function that creates a tree as a group of limbs.

    createLimb(width, color, y_move=0, x_move=0, z_move=0, rotate_z=0, rotate_x=0, trunk=true) {

        // create limb geometry and assigns attributes to the limb.

        const limbGeometry = new THREE.CylinderGeometry((width*.9), width, width*4, density);
        const limbMaterial = new THREE.MeshLambertMaterial( {color: color} );
        const limb = new THREE.Mesh( limbGeometry, limbMaterial );
        limb.castShadow = true;

        // rotate z axis and find midpoint position change

        limb.rotation.z = rotate_z
        let x_change = (width*2)*(Math.sin(rotate_z)*-1)

        // rotate x axis and find midpoint position change

        limb.rotation.x = rotate_x
        let y_altered = (width*2)*Math.cos(rotate_z)
        let z_change = y_altered*(Math.sin(rotate_x))

        // find y axis difference and new height position change

        let y_change = y_altered*Math.cos(rotate_x)

        // move coordinates into position to set limb midpoint

        y_move += y_change
        x_move += x_change
        z_move += z_change

        // position limb into the correct place

        limb.position.y = y_move
        limb.position.x = x_move
        limb.position.z = z_move

        // move coordinates into position to prepare for next limb

        y_move += y_change
        x_move += x_change
        z_move += z_change
        

    }
}