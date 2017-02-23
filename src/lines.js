/* globals THREE */

// Setup
// ---

// renderer
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('main').appendChild(renderer.domElement)

// scene, plane
var scene = new THREE.Scene()
var imageData
var imageReady = false
var planeTexture = THREE.ImageUtils.loadTexture('text.png', new THREE.UVMapping(), function (e) {
  imageData = window.getImageData(planeTexture.image)
  imageReady = true
})
var planeMaterial = new THREE.MeshBasicMaterial({ map: planeTexture })
var planeGeometry = new THREE.PlaneGeometry(1024, 768)
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.z = -1

// camera
// var camera = new THREE.PerspectiveCamera(45, 1024 / 768, 0.1, 100000)
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
camera.position.set(100, -500, 1200)
camera.lookAt(plane.position)

// add to the scene!
scene.add(camera)

;(function drawLoop () {
  window.requestAnimationFrame(drawLoop)
  draw()
  update()
})()

// Update
// ---

var increaseZ = true
// var increaseY = true

function update () {
  // loop camera position
  if (camera.position.z >= 2000) increaseZ = false
  if (camera.position.z <= 20) increaseZ = true

  if (camera.position.z <= 2000 && increaseZ) {
    camera.position.z = camera.position.z + 5
  }

  if (camera.position.z >= 0 && !increaseZ) {
    camera.position.z = camera.position.z - 5
  }

  // // yaw
  // console.log('yaw', camera.position.y)
  // if (camera.position.y <= -950) increaseY = true
  // if (camera.position.y >= -100) increaseY = false

  // if (camera.position.y >= -950 && increaseY) {
  //   camera.position.y = camera.position.y + 5
  // }

  // if (camera.position.y <= -100 && !increaseY) {
  //   camera.position.y = camera.position.y - 5
  // }
}

// Draw
// ---

var lineMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 2
})

function draw () {
  if (imageReady) {
    imageReady = false

    // 1 line for every 10 pixels of image height
    for (var y = 0; y <= imageData.height; y = y + 2) {
      var lineGeometry = new THREE.Geometry()
      lineGeometry.vertices = []

      // 1 vertice for every 2 pixels of width
      for (var x = 0; x <= imageData.width; x = x + 2) {
        var colour = window.getPixel(imageData, x, y)
        lineGeometry.vertices.push(new THREE.Vector3(x - (imageData.width / 2), y - (imageData.height / 2), colour.r / 2))
      }

      var line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }
  }

  // render
  renderer.render(scene, camera)
}

// Helpers
// ---

window.getImageData = function (image) {
  var canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  var context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, image.width, image.height)
}

window.getPixel = function (imagedata, x, y) {
  var position = (x + imagedata.width * y) * 4
  var data = imagedata.data
  return {
    r: data[position],
    g: data[position + 1],
    b: data[position + 2],
    a: data[position + 3]
  }
}
