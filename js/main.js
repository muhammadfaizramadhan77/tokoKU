/* tokoKU — form Hubungi Kami */
(function () {
  // GANTI dengan alamat email toko Anda
  var TOKO_EMAIL = "halo@tokoku.example";

  var form = document.getElementById("contact-form");
  if (!form) return;
  var body = document.getElementById("pesan");
  var note = document.getElementById("form-note");

  form.querySelectorAll(".toolbar [data-cmd]").forEach(function (btn) {
    btn.addEventListener("mousedown", function (e) { e.preventDefault(); });
    btn.addEventListener("click", function () {
      var cmd = btn.dataset.cmd;
      body.focus();
      if (cmd === "link") {
        var url = prompt("Masukkan URL tautan:", "https://");
        if (url) document.execCommand("createLink", false, url);
      } else if (cmd === "image") {
        var src = prompt("Masukkan URL gambar:", "https://");
        if (src) document.execCommand("insertImage", false, src);
      } else if (cmd === "code") {
        var sel = window.getSelection().toString();
        document.execCommand("insertHTML", false, "<code>" + (sel || "kode") + "</code>");
      } else {
        document.execCommand(cmd, false, null);
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = form.email.value.trim();
    var subjek = form.subjek.value.trim();
    var pesan = body.innerText.trim();
    if (!/^\S+@\S+\.\S+$/.test(email) || !subjek || !pesan) {
      note.style.color = "#c0392b";
      note.textContent = "Mohon lengkapi email, subjek, dan pesan dengan benar.";
      return;
    }
    var isi = pesan + "\n\n— " + email;
    window.location.href = "mailto:" + TOKO_EMAIL +
      "?subject=" + encodeURIComponent(subjek) +
      "&body=" + encodeURIComponent(isi);
    note.style.color = "";
    note.textContent = "Membuka aplikasi email Anda…";
  });
})();
