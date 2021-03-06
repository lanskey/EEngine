import THREE from 'three'; // 3D library

/**
   * @desc Placing scene object into application
   * @function scene()
 */
class Scene {
  constructor() {}

  /**
   * @desc Creating Three.js scene
   * @function create()
   * @return new Three.js scene
   */
  create() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x5081B5, 1000, 50000 );
    return scene;
  }

  /**
   * @desc Adds Meshes/Objects to Scene
   * @function add()
   * @param {array} arrayOfElementsToAdd - List of object which are going to be added to scene
   * @param {string} type - Type of element (mesh, phyx)
   */
  add(arrayOfElementsToAdd=[], type='mesh') {
    let lowerCaseType = type.toLowerCase();
    for (var i = 0, len = arrayOfElementsToAdd.length; i < len; i++) {
      lowerCaseType === 'mesh' ? scene.add(arrayOfElementsToAdd[i][lowerCaseType]) : scene.add(arrayOfElementsToAdd[i]);
    }
  }

}

let scene = new Scene();
export default scene;
