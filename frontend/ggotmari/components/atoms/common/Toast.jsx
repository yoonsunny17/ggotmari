import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  width: 250,
  position: "top-right",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});
