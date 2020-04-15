import { useLinking } from "@react-navigation/native";

const pixel = 5;

export const face = color => [
  [
    { color: color, x: 25 * pixel, y:  8 * pixel,  width: 9 * pixel, height: pixel },
    { color: color, x: 23 * pixel, y:  9 * pixel,  width: 13 * pixel, height: pixel },
    { color: color, x: 21 * pixel, y:  10 * pixel,  width: 17 * pixel, height: pixel },
    { color: color, x: 20 * pixel, y:  11 * pixel,  width: 19 * pixel, height: pixel },
    { color: color, x: 19 * pixel, y:  12 * pixel,  width: 21 * pixel, height: pixel },
    { color: color, x: 18 * pixel, y:  13 * pixel,  width: 22 * pixel, height: pixel },
    { color: color, x: 18 * pixel, y:  14 * pixel,  width: 23 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  15 * pixel,  width: 24 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  16 * pixel,  width: 24 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  16 * pixel,  width: 24 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  17 * pixel,  width: 25 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  18 * pixel,  width: 25 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  19 * pixel,  width: 25 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  20 * pixel,  width: 25 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  21 * pixel,  width: 25 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  22 * pixel,  width: 26 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  23 * pixel,  width: 27 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  24 * pixel,  width: 28 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  25 * pixel,  width: 28 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  26 * pixel,  width: 28 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  27 * pixel,  width: 27 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  28 * pixel,  width: 26 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  29 * pixel,  width: 24 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  30 * pixel,  width: 24 * pixel, height: pixel },
    { color: color, x: 17 * pixel, y:  31 * pixel,  width: 23 * pixel, height: pixel },
    { color: color, x: 18 * pixel, y:  32 * pixel,  width: 22 * pixel, height: pixel },
    { color: color, x: 19 * pixel, y:  33 * pixel,  width: 20 * pixel, height: pixel },
    { color: color, x: 19 * pixel, y:  34 * pixel,  width: 20 * pixel, height: pixel },
    { color: color, x: 20 * pixel, y:  35 * pixel,  width: 18 * pixel, height: pixel },
    { color: color, x: 21 * pixel, y:  36 * pixel,  width: 17 * pixel, height: pixel },
    { color: color, x: 22 * pixel, y:  37 * pixel,  width: 15 * pixel, height: pixel },
    { color: color, x: 24 * pixel, y:  38 * pixel,  width: 13 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  39 * pixel,  width: 12 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  40 * pixel,  width: 12 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  41 * pixel,  width: 12 * pixel, height: pixel },
    { color: color, x: 24 * pixel, y:  42 * pixel,  width: 14 * pixel, height: pixel },
    { color: color, x: 23 * pixel, y:  43 * pixel,  width: 15 * pixel, height: pixel },
    { color: color, x: 22 * pixel, y:  44 * pixel,  width: 14 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  45 * pixel,  width: 9 * pixel, height: pixel },
  ],

];

export const faceShadow = color => [
  [
    { color: color, x: 42 * pixel, y:  23 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 42 * pixel, y:  24 * pixel,  width: 2 * pixel, height: pixel },
    { color: color, x: 43 * pixel, y:  25 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 42 * pixel, y:  26 * pixel,  width: 2 * pixel, height: pixel },
    { color: color, x: 41 * pixel, y:  27 * pixel,  width: 2 * pixel, height: pixel },
    { color: color, x: 37 * pixel, y:  36 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 36 * pixel, y:  37 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 35 * pixel, y:  38 * pixel,  width: 2 * pixel, height: pixel },
    { color: color, x: 32 * pixel, y:  39 * pixel,  width: 4 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  40 * pixel,  width: 10 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  41 * pixel,  width: 9 * pixel, height: pixel },
    { color: color, x: 26 * pixel, y:  42 * pixel,  width: 7 * pixel, height: pixel },
    { color: color, x: 27 * pixel, y:  43 * pixel,  width: 5 * pixel, height: pixel },
    { color: color, x: 28 * pixel, y:  44 * pixel,  width: 3 * pixel, height: pixel },
  ]
];

export const eyebrows = color => [
  [
    { color: color, x: 20 * pixel, y:  20 * pixel,  width: 4 * pixel, height: pixel },
    { color: color, x: 24 * pixel, y:  21 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 31 * pixel, y:  20 * pixel,  width: 4 * pixel, height: pixel },
    { color: color, x: 30 * pixel, y:  21 * pixel,  width: 1 * pixel, height: pixel },
  ],
  [
    { color: color, x: 20 * pixel, y:  20 * pixel,  width: 4 * pixel, height: pixel },
    { color: color, x: 19 * pixel, y:  21 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 31 * pixel, y:  20 * pixel,  width: 4 * pixel, height: pixel },
    { color: color, x: 35 * pixel, y:  21 * pixel,  width: 1 * pixel, height: pixel },
  ]
];

export const eyes = color => [
  { color: color, x: 21 * pixel, y:  23 * pixel,  width: 2 * pixel, height: pixel },
  { color: color, x: 21 * pixel, y:  24 * pixel,  width: 2 * pixel, height: pixel },
  { color: color, x: 21 * pixel, y:  25 * pixel,  width: 2 * pixel, height: pixel },
  { color: color, x: 32 * pixel, y:  23 * pixel,  width: 2 * pixel, height: pixel },
  { color: color, x: 32 * pixel, y:  24 * pixel,  width: 2 * pixel, height: pixel },
  { color: color, x: 32 * pixel, y:  25 * pixel,  width: 2 * pixel, height: pixel },
];

export const eyeShadow = color => [
  [
    { color: color, x: 23 * pixel, y:  23 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 34 * pixel, y:  23 * pixel,  width: 1 * pixel, height: pixel },
  ],
  [
    { color: color, x: 23 * pixel, y:  25 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 34 * pixel, y:  25 * pixel,  width: 1 * pixel, height: pixel },
  ],
];

export const nose = color => [
  [
    { color: color, x: 26 * pixel, y:  26 * pixel,  width: 2 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  27 * pixel,  width: 2 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  28 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  29 * pixel,  width: 3 * pixel, height: pixel },
  ]
];

export const lip = color => [
  [
    { color: color, x: 24 * pixel, y:  32 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 30 * pixel, y:  32 * pixel,  width: 1 * pixel, height: pixel },
    { color: color, x: 25 * pixel, y:  33 * pixel,  width: 5 * pixel, height: pixel },
  ]
];
