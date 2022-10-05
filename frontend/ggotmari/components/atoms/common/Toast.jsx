import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  width: 320,
  position: "top-right",
  showConfirmButton: false,
  // timer: 1000,
  timerProgressBar: true,
});
