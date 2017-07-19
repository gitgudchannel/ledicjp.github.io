import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-particles-header',
  templateUrl: './particles-header.component.html',
  styleUrls: ['./particles-header.component.css']
})
export class ParticlesHeaderComponent implements AfterViewInit {
  smokeSystem: any;

  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this._canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private _canvasRef: ElementRef;

  private _cube: THREE.Mesh;
  private _line: THREE.Line;
  private _renderer: THREE.WebGLRenderer;
  private _scene: THREE.Scene;
  private _loader: THREE.FontLoader;

  private _SEPARATION = 100;
  private _AMOUNTX = 1;
  private _AMOUNTY = 1;
  private _MAX_POINTS = 500;

  private _container;
  private _stats;

  private _mouseX = 0;
  private _mouseY = 0;

  private _particles: any;
  private _particleSystem: THREE.ParticleSystem;
  private _clock = new THREE.Clock;
  private _raycaster: any;
  private _mouse = new THREE.Vector2();
  private _smoke: any;

  private event: MouseEvent;
  private clientX = 0;
  private clientY = 0;
  private mouse: THREE.Vector2;

  private loader = new THREE.TextureLoader();



  /* CUBE PROPERTIES */

  @Input()
  public material: any;

  @Input()
  public smokeMaterial: any;

  @Input()
  public geometry: any;

  @Input()
  public positions: any;

  @Input()
  public drawCount = 0;

  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public texture: any;

  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = 100;

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
    //this._cube.rotation.x += 0.1;
    //this._cube.rotation.y += 0.1;
  }



  /**
   * Create the particles
   */
  private createParticles() {

    this.mouse = new THREE.Vector2();
    this._particles = new THREE.Geometry;
    this._smoke = new THREE.Geometry;

    this._raycaster = new THREE.Raycaster;

    for (let p = 0; p < 500; p++) {
      let particle = new THREE.Vector3(THREE.Math.randFloatSpread(100), THREE.Math.randFloatSpread(100), THREE.Math.randFloatSpread(100));
      this._particles.vertices.push(particle);
    }

    for (var i = 0; i < 3; i++) {
      let smokeParticle = new THREE.Vector3(Math.random() * 32 - 16, Math.random() * 230, Math.random() * 32 - 16);
      this._smoke.vertices.push(smokeParticle);
    }

    let texture = new THREE.TextureLoader().load('/assets/textures/dot2.png');
    this.material = new THREE.PointsMaterial({ map: texture, transparent: true, size: 1, blending: THREE.AdditiveBlending, opacity: 0.7});

    let smokeTexture = new THREE.TextureLoader().load('/assets/textures/smoke.png');
    this.smokeMaterial = new THREE.PointsMaterial({ map: smokeTexture, opacity: 0.3, transparent: true, size: 250, blending: THREE.AdditiveBlending, color: 0x5F021F });

    this._particleSystem = new THREE.Points(this._particles, this.material);
    // this._clock = new THREE.Clock;

    this.smokeSystem = new THREE.Points(this._smoke, this.smokeMaterial);
    this.smokeSystem.position.y = -150;
    

    this._scene.add(this._particleSystem);
    this._scene.add(this.smokeSystem);


  }

  private createScene() {
    /* Camera */
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
    this.camera.position.z = this.cameraZ;

    /* Scene */
    this._scene = new THREE.Scene;

  }

  onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private animate() {

    let delta = this._clock.getDelta();
    this._particleSystem.rotation.y += delta * 0.1;
    this._particleSystem.rotation.x -= delta * 0.025;

    let particleCount = this._smoke.vertices.length;
    while (particleCount--) {
      let particle = this._smoke.vertices[particleCount];
      particle.y += delta * 50;

      if (particle.y >= 230) {
        particle.y = Math.random() * 16;
        particle.x = Math.random() * 32 - 16;
        particle.z = Math.random() * 32 - 16;
      }

    }
    this._smoke.__dirtyVertices = true;

    this.smokeSystem.rotation.y -= delta * 0.2;

    //this.material.map.needsUpdate = true;

    // update the picking ray with the camera and mouse position
    //this._raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    //let intersects = this._raycaster.intersectObjects(this._scene.children);

    //this._particleSystem.raycast(this._raycaster, intersects);

    //for (var i = 0; i < intersects.length; i++) {

    //  intersects[i].object.material.color.set(this.getRandomColor());

    //}

    // this.material.color.set( this.getRandomColor() ) 
  }

  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this._renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    this._renderer.setPixelRatio(devicePixelRatio);
    this._renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ParticlesHeaderComponent = this;
    (function render() {
      requestAnimationFrame(render);

      component.animate();

      component._renderer.render(component._scene, component.camera);
    }());
  }


  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /* EVENTS */

  /**
   * Update _scene after resizing. 
   */
  public onResize(event) {
    event.preventDefault();
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
    this.createScene()
    this.createParticles();
    this.startRenderingLoop();

  }

}
