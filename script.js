function runCode() {
  let html = document.getElementById("html").value;
  let css = "<style>" + document.getElementById("css").value + "</style>";
  let js = "<script>" + document.getElementById("js").value + "<\/script>";

  let output = document.getElementById("output").contentWindow.document;
  output.open();
  output.write(html + css + js);
  output.close();
}

function clearCode() {
  document.getElementById("html").value = "";
  document.getElementById("css").value = "";
  document.getElementById("js").value = "";
}

function saveCode() {
  localStorage.setItem("html", document.getElementById("html").value);
  localStorage.setItem("css", document.getElementById("css").value);
  localStorage.setItem("js", document.getElementById("js").value);
  alert("Code Saved!");
}

function downloadCode() {
  let html = document.getElementById("html").value;
  let css = "<style>" + document.getElementById("css").value + "</style>";
  let js = "<script>" + document.getElementById("js").value + "<\/script>";

  let blob = new Blob([html + css + js], { type: "text/html" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "code.html";
  a.click();

  URL.revokeObjectURL(url);
}

function shareCode() {
  let html = encodeURIComponent(document.getElementById("html").value);
  let css = encodeURIComponent(document.getElementById("css").value);
  let js = encodeURIComponent(document.getElementById("js").value);

  let url = `${window.location.origin}?html=${html}&css=${css}&js=${js}`;

  navigator.clipboard.writeText(url);
  alert("Link copied!");
}

window.onload = function () {
  let params = new URLSearchParams(window.location.search);

  if (params.get("html")) {
    document.getElementById("html").value = decodeURIComponent(params.get("html"));
    document.getElementById("css").value = decodeURIComponent(params.get("css"));
    document.getElementById("js").value = decodeURIComponent(params.get("js"));
    runCode();
  } else {
    document.getElementById("html").value = localStorage.getItem("html") || "";
    document.getElementById("css").value = localStorage.getItem("css") || "";
    document.getElementById("js").value = localStorage.getItem("js") || "";
  }
};