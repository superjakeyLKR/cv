//if they are on a mobile device, tell them to use a computer
if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
    alert("NOTE: This website is not optimised for mobile devices.\nPlease use a computer to use this website fully.");
}
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const planetMaterials = [
    new THREE.MeshBasicMaterial( {color: 0xffff00} ),
    new THREE.MeshBasicMaterial( {
        color: 0xffff00,
        wireframe: true
    } ),
    //make it metalic gold
    new THREE.MeshPhysicalMaterial( {
        color: 0xffd700,
        metalness: 1,
        roughness: 0.5,
        clearcoat: 1
    }),
    new THREE.MeshBasicMaterial( {color: 0x0000ff} ),
    new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load("earth.jpg")
    })
];


//make 5 planets
var planets = [];
for (var i = 0; i < 5; i++) {
    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var material = planetMaterials[i];
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = i*20;
    scene.add( sphere );
    planets.push(sphere);
}

//make the sun
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//make a light for the metalic planet
var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( 20, 0, 0 );
scene.add( light );

//make the camera face the first planet and have a text panel next to it
camera.position.z = 5;
camera.lookAt(planets[0].position);
var loader = new THREE.FontLoader();

var generateText = function(text, x, y, size=0.2, z=0) {
    loader.load( "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function ( font ) {
        var geometry = new THREE.TextGeometry( text, {
            font: font,
            size: size,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        scene.add( mesh );
    });
}

generateText("Hello. I am Jake, a programer.\nThis is my website showing you\n how good I am at it.", -2, 2);
generateText("Feel free to look around.\nUse the green arrows to move around.\nUse the scroll wheel to zoom.\nUse the left and right mouse buttons\nto pan the camera.\nPress 'C' to recentre yourself \nif you get too far away.", -2, -1.5);

generateText("There might be a few secrets too!", -20, 0, 0.1);

generateText("About Me", 19.5, 1.2);
generateText("I have always had an affinity for computer programming.\nFrom as young as 8, I would play around with the Unity game engine\nand make little games for me and my family to enjoy.\nI have used and worked on many different engines, such as\nUnity, Roblox Studio, GameMaker and Godot.\nI have become good at Python, Lua, Javascript, HTML and C# as a result.\nThis whole website has been made from scratch by me via Three.js.", 16, -1.5);

generateText("Projects", 39.5, 1.2);
generateText("I have made many projects over the years.\nTo go to my github account page, press 'G'.\nI have made: Reali-Tree, a mod of an incremental game. (R)\nProject D_SYNC, a website puzzle game. (D)\nWorlds of Obbying, a Roblox parkour game. (O)\nEgg Incremental, a website incremental game. (E)\nPy-Nopoly, a Monoply redition in Python (P)\n2 'Clicker' games, one in Python and one made in Godot\nand a game that uses Warning Boxes to do a quiz made in VBScript. (W)\nThey are all pinned on my account, minus the last one.", 36, -1.25, 0.15);

generateText("Self Analysis", 59.5, 1.2);
generateText("I know that this may look a bit scuffed,\nbecause this is my first time using three.js.\nIt took me a while to get the movement system working\nand there were many glitches I had to fix\nbut I'm pleased with the final outcome.\nI was originally going to make the planets orbit around the first red one,\nbut it made me a bit sick because of all of the rotation,\nso I made them static.", 56, -1.5);

generateText("Work Experience: 23-27th October 2023", 77.75, 1.2);
generateText("You can contact me via my email: 19sykesj@nhgs.calderdale.sch.uk\nPlease CC benjakesophie@gmail.com. Press 'P' to copy to clipboard.", 76, -1.5);


generateText("Pretty funny huh? How did you even get here?", 10000, 10000, 2, 10000);
//make a skybox with skybox.png
var geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("skybox.png"), side: THREE.BackSide } );
var skybox = new THREE.Mesh( geometry, material );
scene.add( skybox );

var geometry = new THREE.ConeGeometry( 0.5, 1, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x16632b} );
var cone = new THREE.Mesh( geometry, material );
cone.position.x = -5;
cone.position.y = 0;
cone.rotation.z = Math.PI/2;
scene.add( cone );
var cone2 = new THREE.Mesh( geometry, material );
cone2.position.x = 5;
cone2.position.y = 0;
cone2.rotation.z = -Math.PI/2;
scene.add( cone2 );

//make the arrows clickable
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects;
var planet = 0;
var coneX = [-5, 5]
function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function onMouseClick( event ) {
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects( scene.children );
    if (intersects.length > 0) {
        if (intersects[0].object.position.x == coneX[0]) {
            if (planet > 0) {
                planet--;
                //move the arrows to the next planet
                cone.position.x -= 20;
                cone2.position.x -= 20;
                coneX[0] -= 20;
                coneX[1] -= 20;
                camera.position.x = planets[planet].position.x;
                camera.rotation.x = 0;
                camera.rotation.y = 0;
                camera.rotation.z = 0;
            }
        } else if (intersects[0].object.position.x == coneX[1]) {
            if (planet < 4) {
                planet++;
                //move the arrows to the next planet
                cone.position.x += 20;
                cone2.position.x += 20;
                coneX[0] += 20;
                coneX[1] += 20;
                camera.position.x = planets[planet].position.x;
                camera.rotation.x = 0;
                camera.rotation.y = 0;
                camera.rotation.z = 0;
            }
        }
    }
}
//recenter when c is pressed
var konami = [];
window.addEventListener( 'keydown', function ( event ) {
    if (event.key == "c") {
        camera.position.x = planets[planet].position.x;
        camera.position.y = planets[planet].position.y;
        camera.position.z = 5;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    }
    //konami code
    konami.push(event.key);
    if (konami[0] == "ArrowUp" && konami[1] == "ArrowUp" && konami[2] == "ArrowDown" && konami[3] == "ArrowDown" && konami[4] == "ArrowLeft" && konami[5] == "ArrowRight" && konami[6] == "ArrowLeft" && konami[7] == "ArrowRight" && konami[8] == "b" && konami[9] == "a") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); //the ai did this
        generateText("I'm sorry, the AI did it.", planets[planet].position.x - 1.25, planets[planet].position.y + 3);
    }
    if (event.key == "g" && planet == 2) {
        window.open("https://github.com/superjakeyLKR");
    }
    if (event.key == "r" && planet == 2) {
        window.open("https://superjakeylkr.github.io/Reali-Tree/")
    }
    if (event.key == "d" && planet == 2) {
        window.open("https://superjakeylkr.github.io/D_SYNC/")
    }
    if (event.key == "o" && planet == 2) {
        window.open("https://www.roblox.com/games/8545697034/Worlds-of-Obbying")
    }
    if (event.key == "e" && planet == 2) {
        window.open("https://github.com/superjakeyLKR/Egg-Incremental")
    }
    if (event.key == "p" && planet == 2) {
        window.open("https://github.com/superjakeyLKR/PyNopoly")
    }
    if (event.key == "w" && planet == 2) {
        window.open("https://github.com/superjakeyLKR/WarningBoxGame")
    }
    if (event.key == "p" && planet == 4) {
        navigator.clipboard.writeText("19sykesj@nhgs.calderdale.sch.uk, benjakesophie@gmail.com");
    }
    console.log(konami);
}, false );

window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onMouseClick, false );

//add orbit controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    camera.lookAt(planets[planet].position);
    renderer.render( scene, camera );
};
animate();
