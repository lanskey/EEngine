/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
/**
  * @desc Placing camera into scene
  * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */
//TODO: Light comment
function light() {
  light = new THREE.DirectionalLight(0xffeedd);

  return light;
}