import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../../collectors/helpers';
//TODO: Poprawa komentarzy
/**
   * @desc Placing light object into application
   * @class Light
 */
class MaterialRecipe {

  /**
   * @desc Default type of the shape
   * @param {string} type - Type of selected shape
   * @param {string} properties - Type of selected size
   */
  constructor(type='Basic', properties={color: '0xff0000'}) {
    this.type = helpers.toTitleCase(type);
    this.properties = properties;
  }

  craft() {


    let material = new THREE['Mesh' + this.type + 'Material'](this.properties);
    //return new THREE[['Mesh' + this.type + 'Material']](properties);

    return material;

  }

}

export default MaterialRecipe;


