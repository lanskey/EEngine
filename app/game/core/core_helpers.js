/*
 *
 * Ten plik zawiera funkcje ktore sa aktywnie wykorzystywane w naszym pliku core
 *
 * */
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
   * @desc Placing scene object into application
   * @function scene()
 */
function scene() {
  return scene = new THREE.Scene();
}

/**
   * @desc Placing camera into scene
   * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */

function camera(position = {x: 0, y: 0, z: 0}, fov = 35) {
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);

  //Setting camera position
  camera.position.set(position.x, position.y, position.z);

  return camera;
}


function light() {
  light = new THREE.DirectionalLight(0xffeedd);

  return light;
}


/**
   * @desc Returning a shape of geometry which will be used in mesh create function
   * @function geometry
 * @param {string} type - type of currently selected geometry
 * @param {string} pickedSize - the message to be displayed
   * @return object - newly created object
 */
function geometry(type, pickedSize) {
//TODO: znalezienie sposobu na dostarczanie odpowiednich geometrii
//TODO: Dodanie najlepiej w osobnym pliku nowych predefiniowanych proporcji dla roznego rodzaju ksztaltow.
//TODO: Ustawic GETTER/SETTER dla klas


  var shapes = {
    "cylinder": function(){
      return new Cylinder(type,pickedSize);
    },
    "box": function(){
      return new Box(type,pickedSize);
    }
  };

  //Class which represents types of all geometries
  class Type{
    /**
     * Create a Sizes.
     * @param {string} type - type value.
     */
    constructor(type, size) {
      type = toTitleCase(type);
      this.type = type;
      this.size = size;
    }

    small(){
      return [5, 5, 5, 8];
    }

    low(){
      return [5, 5, 5, 8];
    }

    ////Box default arguments
    //craft(width, height, depth, widthSegments, heightSegments, depthSegments) {
    //  return new THREE[this.type + 'Geometry'](width, height, depth, widthSegments, heightSegments, depthSegments);
    //}
  }

  /**
   * Class representing a dot.
   * @extends Type
   */

  //Prototype of cylinders
  class Cylinder extends Type {
    /**
     * Create a dot.
     */
    constructor(type, size) {
      super(type, size)
    }

    small(){
      return [2, 2, 5, 32];
    }

    low() {
      return [2, 2, 5, 8];
    }

    craft(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength){
      return new THREE[this.type + 'Geometry'](radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength);

    }
  }

  class Box extends Type {
    /**
     * Create a dot.
     */
    constructor(type, size) {
      super(type, size)
    }

    small(){
      return [1, 1, 1, 8, 8, 8];
    }

    low() {
      return [1, 1, 1, 1, 1, 1];
    }

    craft(width, height, depth, widthSegments, heightSegments, depthSegments){
      return new THREE[this.type + 'Geometry'](width, height, depth, widthSegments, heightSegments, depthSegments);

    }
  }


  var allSizes =  shapes[type](type, pickedSize);


  //var object = allSizes.craft([5, 5, 5, 8]);



  //var allSizes = {
  //  cylinder: {
  //    small: function () {
  //      return [5, 5, 5, 32];
  //    },
  //    low: function () {
  //      return [5, 5, 5, 8];
  //    },
  //    craft: function (radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength) {
  //      return new THREE[type + 'Geometry'](radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
  //    }
  //  },
  //  box: {
  //    small: function () {
  //      return [2, 2, 2, 1, 1, 1];
  //    },
  //    low: function () {
  //      return [1, 1, 1, 1, 1, 1];
  //    },
  //    craft: function (width, height, depth, widthSegments, heightSegments, depthSegments) {
  //      return new THREE[type + 'Geometry'](width, height, depth, widthSegments, heightSegments, depthSegments)
  //    }
  //  }
  //};

  //If requested type 'size' match any of sizes (name of a function)
  if (allSizes[pickedSize].name === pickedSize) {
    var selected = allSizes[pickedSize]();
  }

  //Making sure that type is spelled capital uppercase (three.js uses Capitalized letters as geometries, cause they are constructors)





  //Cloning special craft method, and adding size arguments for newly created geometry
  let craftedGeometry = allSizes.craft.apply(allSizes, selected);

  console.log(craftedGeometry);

  //Returning a geometry
  return craftedGeometry;
}

function material() {
  material = new THREE.MeshDepthMaterial({
    wireframe: true
  });

  return material;
}

function mesh(cylinder) {
  mesh = new THREE.Mesh(cylinder, material);
  mesh.construct = {
    shape: function () {
      this.shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
      return this.shape;
    },
    mass: 1,
    init: function (name) {
      name = new CANNON.Body({
        mass: 1
      });

      name.shape = this.shape();

      name.angularVelocity.set(0, 0, 0);

      name.angularDamping = 0.5;

      return name;
    }

  };

  return mesh;
}

function addObjects(arrayOfElementsToAdd) {
  for (var i = 0, len = arrayOfElementsToAdd.length; i < len; i++) {
    scene.add(arrayOfElementsToAdd[i]);
  }
}

function render() {
  render = new THREE.WebGLRenderer();
  render.setSize(window.innerWidth, window.innerHeight);
  render.shadowMap.enabled = true;
  render.setClearColor(0x5081B5);
  document.body.appendChild(render.domElement);
  return render;
}

function interaction(button, fn) {
  //Interaction with square button
  button.addEventListener('click', () => {
    fn();
  });

  return button;
}

//var light = {
//  direct: function (color = '', strength = 1) {
//    var returnedLight = {
//      light: this.light,
//      position: function (x, y, z) {
//        console.log(this);
//        this.light.position.set(x, y, z).normalize();
//
//      }
//    };
//
//    returnedLight.light = new THREE.DirectionalLight(0xffffff, strength);
//
//    return returnedLight;
//  },
//  point: function () {
//    throw 'light.point - not implemented yet';
//  },
//  spot: function () {
//    throw 'light.spot - not implemented yet';
//  },
//  maker: function () {
//
//  }
//
//
//};

export {
/**
 * Get the red, green, and blue values of a color.
 * @function
 * @param {string} color - A color, in hexidecimal format.
 * @returns {Array.} An array of the red, green, and blue values,
 * each ranging from 0 to 255.
 */
  light as light,
  scene as scene,
  camera as camera,
  geometry as geometry,
  material as material,
  mesh as mesh,
  addObjects as add,
  render as render,
  interaction as interaction
};
