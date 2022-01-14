import { Loader } from '@googlemaps/js-api-loader';

export class MapLoader {
  static load() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const loader = new Loader({
      apiKey: API_KEY
    });

    return loader;
  }
}
