import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Geolocation is not supported by your browser, Please use modern browser.'
      );
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location, Please wait.'
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        modal.hide();

        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.selectPlace(coordinates);
      },
      (error) => {
        modal.hide();

        alert(
          'Could not locate you unfortunately, Please Enter an address manually.'
        );
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
