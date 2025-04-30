app.service('toastService', function() {
    this.success = function(message) {
      toastr.success(message, 'Success', { timeOut: 3000, positionClass: 'toast-top-right' });
    };
  
    this.error = function(message) {
      toastr.error(message, 'Error', { timeOut: 3000, positionClass: 'toast-top-right' });
    };
  
    this.info = function(message) {
      toastr.info(message, 'Info', { timeOut: 3000, positionClass: 'toast-top-right' });
    };
  
    this.warning = function(message) {
      toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-top-right' });
    };
  });
  
  