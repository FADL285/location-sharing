import { MapLoader } from '../Utilities/MapLoader';

export class Map {
  constructor(coords) {
    this.loader = MapLoader.load();
    this.render(coords);
  }

  render(coordinates) {
    this.loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 16
      });

      new google.maps.Marker({
        position: coordinates,
        map
      });
    });
  }
}
