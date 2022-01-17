import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import {
  getCoordsFromAddress,
  getAddressFromCoords
} from './Utilities/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    this.shareLinkInputElement = document.getElementById('share-link');
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.shareLinkInputElement.select();
      return;
    }

    navigator.clipboard
      .writeText(this.shareLinkInputElement.value)
      .then(() => {
        alert('Copied into clipboard!');
      })
      .catch((error) => {
        console.error(error);
        this.shareLinkInputElement.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    this.shareBtn.disabled = false;
    this.shareLinkInputElement.value = `${
      location.origin
    }/share-place?address=${encodeURI(address)}&lat=${encodeURI(
      coordinates.lat
    )}&lng=${encodeURI(coordinates.lng)}`;
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
      async (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const address = await getAddressFromCoords(coordinates);

        modal.hide();

        this.selectPlace(coordinates, address);
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
      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  }
}

new PlaceFinder();
