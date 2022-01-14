class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler);
    addressForm.addEventListener('submit', this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Geolocation is not supported by your browser, Please use modern browser.'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(coordinates);
      },
      (error) => {
        alert(
          'Could not locate you unfortunately, Please Enter an address manually.'
        );
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
