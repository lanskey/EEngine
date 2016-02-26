import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'
/**
   * @desc Placing light object into application
   * @class Light
 TODO: Poprawa komentarzy
 */
class CylinderRecipe extends ShapeRecipe{

  /**
   * @desc Creates cylinder with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size) {
    super(type, size)
  }

  small() {
    return [2, 2, 5, 32];
  }

  low() {
    return [2, 2, 5, 8];
  }

  craft(size) {
    let values = this[size]();

    let craftedGeometry = this.makes.apply(this, values);


    return craftedGeometry;

  }
}

export default CylinderRecipe;