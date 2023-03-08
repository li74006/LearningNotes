export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "./public/textures/environmentMaps/0/px.jpg",
      "./public/textures/environmentMaps/0/py.jpg",
      "./public/textures/environmentMaps/0/pz.jpg",
      "./public/textures/environmentMaps/0/nx.jpg",
      "./public/textures/environmentMaps/0/ny.jpg",
      "./public/textures/environmentMaps/0/nz.jpg",
    ],
  },

  {
    name: "grassColorTexture",
    type: "texture",
    path: "./public/textures/dirt/color.jpg",
  },

  {
    name: "grassNormalTexture",
    type: "texture",
    path: "./public/textures/dirt/normal.jpg",
  },

  {
    name: "foxModel",
    type: "gltfModel",
    path: "./public/models/fox/glTF/Fox.gltf",
  },
];
