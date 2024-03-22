toastr.options = {
  closeButton: false,
  progressBar: true,
  preventDuplicates: true,
  timeOut: 3000,
  positionClass: "toast-bottom-right",
};

function confirmMessage(message, btnText) {
  return Swal.fire({
    title: "Confirmation",
    text: `Are you sure you want to ${message} task?`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#673de6",
    cancelButtonColor: "#d33",
    confirmButtonText: btnText,
    allowOutsideClick: false,
  });
}

function showSuccessMessage(message) {
  return toastr.success(message, "Success");
}

function showInfoMessage(message) {
  return toastr.info(message, "Info");
}
