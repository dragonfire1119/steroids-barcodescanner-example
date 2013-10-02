
steroids.view.navigationBar.show('Barcode Scanner');

// Create nav bar button
var navButton = new steroids.buttons.NavigationBarButton();
navButton.title = 'Scan';
navButton.onTap = scan;

// Assign button to nav bar
steroids.view.navigationBar.setButtons({
  right: [navButton]
});

/**
 * Prompts the user to scan a barcode. Called when the user
 * clicks the right navigation bar button.
 */
function scan() {
  var scanner = new BarcodeScanner();

  scanner.scan(
    function (result) {

      var label = document.getElementById('barcode');

      if (result.cancelled) {
        label.innerHTML = 'Cancelled';
      } else {
        label.innerHTML = '(' + result.format + ') ' + result.text;
      }

      /**
       * NOTE: If you want to open a modal after scanning has completed, you need
       * to set a timeout. I think this is since the scanner operates in its own 
       * type of modal and hasn't completely closed yet when this function has
       * been reached. 1000ms seems to work consistently.
       *
       * Example: 
       *
       * setTimeout(function() {
       *   steroids.modal.show({
       *     view: NEW_MODAL_VIEW
       *   }, {
       *     onSuccess: function() {
       *       // Send message to new modal
       *       window.postMessage({
       *         scanned: {
       *           format:   result.format,
       *           content:  result.text
       *         }
       *       },'newmodal.html');
       *     }
       *   });
       * }, 1000);
       */
    }
  );
}