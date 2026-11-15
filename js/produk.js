/* tokoKU — halaman produk: bar sticky + pilihan warna */
(function () {
  var root = document.documentElement;
  var bar = document.getElementById("sbar");
  var header = document.querySelector(".site-header");
  var price = document.getElementById("pricebox");
  if (!bar || !header || !price) return;

  // Tinggi bagian produk = tinggi layar dikurangi tinggi header
  function setHeaderHeight() { root.style.setProperty("--hh", header.offsetHeight + "px"); }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  // Bar nama muncul setelah header terangkat habis
  new IntersectionObserver(function (e) {
    bar.classList.toggle("on", !e[0].isIntersecting);
    bar.setAttribute("aria-hidden", e[0].isIntersecting);
  }).observe(header);

  // Harga kecil muncul setelah blok harga besar lewat di atas layar
  new IntersectionObserver(function (e) {
    bar.classList.toggle("mini-on", !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
  }).observe(price);

  // Pilihan warna
  var label = document.getElementById("warna");
  var swatches = document.querySelectorAll(".pdp-sw button");
  swatches.forEach(function (b) {
    b.addEventListener("click", function () {
      swatches.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      label.textContent = "Warna - " + b.dataset.n;
    });
  });
})();
