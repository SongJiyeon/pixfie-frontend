import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/canvas';
import * as pixel from '../assets/faceCanvas';

export const handleCanvas = (canvas, faceType) => {
  if (canvas !== null) {

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext('2d');

    const imgObj = {
      name: 'face',
      colors: {
        face: '#F3B780',
        faceShadow: '#ee8862',
        teal:  'rgb(175, 218, 214)',
        black: 'rgb(0,0,0)'
      },
      layers: [
        ...pixel.face('face'),
        ...pixel.faceShadow('faceShadow'),
        ...pixel.eyebrows('black'),
        ...pixel.eyes('black'),
        ...pixel.eyeShadow('faceShadow'),
        ...pixel.nose('black'),
        ...pixel.mouth('black'),
        // ...pixel.hair('black'),
        // ...pixel.acc('black'),
        // ...pixel.clothes('black')
      ]
    };

    function draw(img, x, y) {
      for (var i = 0; i < img.layers.length; i++) {
        var data = img.layers[i];
        var loc  = {
              x: (x||0) + data.x,
              y: (y||0) + data.y
            };
        ctx.fillStyle = img.colors[data.color];
        ctx.fillRect(loc.x, loc.y, data.width, data.height);
      }
    };
    draw(imgObj);
  }
};
