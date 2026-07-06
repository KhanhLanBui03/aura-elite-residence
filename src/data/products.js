import floorplan1br from '../assets/floorplan_1br.png';
import floorplan2br from '../assets/floorplan_2br.png';
import floorplanPenthouse from '../assets/floorplan_penthouse.png';
import floorplanDuplex from '../assets/floorplan_duplex.png';

export const products = [
  {
    id: '1-bedroom',
    image: floorplan1br,
    virtual360Url: 'https://kuula.co/share/collection/7KdBq?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '58.4 m²',
    areaGross: '63.2 m²'
  },
  {
    id: '2-bedroom',
    image: floorplan2br,
    virtual360Url: 'https://kuula.co/share/collection/7PL7K?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '88.2 m²',
    areaGross: '96.5 m²'
  },
  {
    id: 'penthouse',
    image: floorplanPenthouse,
    virtual360Url: 'https://kuula.co/share/collection/7PryB?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '285.5 m²',
    areaGross: '310.2 m²'
  },
  {
    id: 'duplex',
    image: floorplanDuplex,
    virtual360Url: 'https://kuula.co/share/collection/7YtK9?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    areaNet: '145.8 m²',
    areaGross: '158.4 m²'
  }
];
