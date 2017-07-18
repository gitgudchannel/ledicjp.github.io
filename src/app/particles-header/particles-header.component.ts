import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-particles-header',
  templateUrl: './particles-header.component.html',
  styleUrls: ['./particles-header.component.css']
})
export class ParticlesHeaderComponent implements OnInit, AfterViewInit {

  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;

  private get canvas() : HTMLCanvasElement {
    return this._canvasRef.nativeElement;
  }
  
  @ViewChild('canvas')
  private _canvasRef: ElementRef;

  private _cube: THREE.Mesh;

  private _renderer: THREE.WebGLRenderer;

  private _scene: THREE.Scene;

  /* CUBE PROPERTIES */
  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public size: number = 200;

  @Input()
  public texture: string = '/assets/textures/crate.gif';

  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 400;

  @Input()
  public fieldOfView: number = 70;

  @Input('nearClipping')
  public nearClippingPane: number = 1;

  @Input('farClipping')
  public farClippingPane: number = 1000;


  /* CONSTRUCTOR */
  constructor() { }

  /* STAGING, ANIMATION, AND RENDERING */

  /**
   * Animate the _cube
   */
  private animateCube() {
    this._cube.rotation.x += this.rotationSpeedX;
    this._cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the cube
   */
  private createCube() {
    let texture = new THREE.TextureLoader().load(this.texture);
    let material = new THREE.MeshBasicMaterial({ map: texture });
    
    let geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
    this._cube = new THREE.Mesh(geometry, material);

    // Add cube to _scene
    this._scene.add(this._cube);
  }

  /**
   * Create the scene
   */
  private createScene() {
    /* Scene */
    this._scene = new THREE.Scene();

    /* Camera */
    let aspectRatio = this.getAspectRatio();
    console.log(this.canvas.clientWidth);
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this._renderer.setPixelRatio(devicePixelRatio);
    this._renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ParticlesHeaderComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component._renderer.render(component._scene, component.camera);
    }());
  }



  /* EVENTS */

  /**
   * Update _scene after resizing. 
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this._renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the _scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the _scene until now.
   */
  ngAfterViewInit() {
    this.createScene();
    this.createCube();
    this.startRenderingLoop();
  }


  ngOnInit() {
  }

}
