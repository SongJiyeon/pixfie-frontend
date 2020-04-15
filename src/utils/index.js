import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/canvas';
import * as pixel from '../assets/faceCanvas';

export const generateFaceType = landmarks => {
  const faceType = {
    faceColor: '#FFDBAC',
    faceShadowColor: '#ee8862',
    eyebrowColor: '#000',
    eyeColor: '#000',
    lipColor: '#ee8862'
  };

  if (landmarks.facial_points.jaw[2][0] - landmarks.facial_points.jaw[5][0] > 0.05) {
    faceType.face = 0;
  } else {
    faceType.face = 0;
  }

  if (landmarks.facial_points.right_eyebrow[0][1] < landmarks.facial_points.right_eyebrow[4][1]) {
    faceType.eyebrows = 0;
  } else if (landmarks.facial_points.right_eyebrow[0][1] > landmarks.facial_points.right_eyebrow[4][1]) {
    faceType.eyebrows = 1;
  }

  if (landmarks.facial_points.right_eye[0][1] < landmarks.facial_points.right_eye[3][1]) {
    faceType.eyes = 0;
  } else if (landmarks.facial_points.right_eye[0][1] > landmarks.facial_points.right_eye[3][1]) {
    faceType.eyes = 1;
  }

  if (landmarks.facial_points.nose[8][0] - landmarks.facial_points.nose[4][0] > 0.08) {
    faceType.nose = 0;
  } else {
    faceType.nose = 0;
  }

  if (landmarks.facial_points.lip[0][0] - landmarks.facial_points.lip[6][0] > 0.1) {
    faceType.lip = 0;
  } else {
    faceType.lip = 0;
  }

  return faceType;
};

export const handleCanvas = (canvas, faceType) => {
  if (canvas !== null) {

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext('2d');

    const imgObj = {
      name: 'face',
      colors: {
        face: faceType.faceColor,
        faceShadow: faceType.faceShadowColor,
        eyes: faceType.eyeColor,
        eyebrows: faceType.eyebrowColor,
        lip: faceType.lipColor
      },
      layers: [
        ...pixel.face('face')[faceType.face],
        ...pixel.faceShadow('faceShadow')[faceType.face],
        ...pixel.eyebrows('eyebrows')[faceType.eyebrows],
        ...pixel.eyes('eyes'),
        ...pixel.eyeShadow('faceShadow')[faceType.eyes],
        ...pixel.nose('faceShadow')[faceType.nose],
        ...pixel.lip('lip')[faceType.lip],
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

export const carouselHandler = (direction, optionTheme, option) => {
  if (direction === 'left') {
    return !option ? optionTheme.options.length - 1 : option - 1;
  } else {
    return option === optionTheme.options.length - 1 ? 0 : option + 1;
  }
};
