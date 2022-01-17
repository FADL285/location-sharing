import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress } from './Utilities/Location';

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

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    console.log(!!address.trim().length);
    if (!address || !address.trim().length) {
      alert('Please Enter Invalid address.');
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location, Please wait.'
    );
    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  }
}

new PlaceFinder();
