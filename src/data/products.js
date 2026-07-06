import floorplan1br from '../assets/floorplan_1br.png';
import floorplan2br from '../assets/floorplan_2br.png';
import floorplanPenthouse from '../assets/floorplan_penthouse.png';
import floorplanDuplex from '../assets/floorplan_duplex.png';

export const products = [
  {
    id: 'cozy-studio',
    image: floorplan1br,
    virtual360Url: 'https://kuula.co/share/collection/7KdBq?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '28 m²',
    areaGross: '32 m²'
  },
  {
    id: 'loft-suite',
    image: floorplan2br,
    virtual360Url: 'https://kuula.co/share/collection/7PL7K?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '35 m²',
    areaGross: '40 m²'
  },
  {
    id: 'executive-1br',
    image: floorplanDuplex,
    virtual360Url: 'https://kuula.co/share/collection/7YtK9?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '48 m²',
    areaGross: '52 m²'
  },
  {
    id: 'penthouse-studio',
    image: floorplanPenthouse,
    virtual360Url: 'https://kuula.co/share/collection/7PryB?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '85 m²',
    areaGross: '95 m²'
  }
];
