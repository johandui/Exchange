function arrayToTable(tableData) {
  var table = $("<table></table>");
  $(tableData).each(function(i, rowData) {
    var row = $("<tr></tr>");
    $(rowData).each(function(j, cellData) {
      row.append($("<td>" + cellData + "</td>"));
    });
    table.append(row);
  });
  return table;
}

const url = "upload/index.php";

const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();

  const files = document.querySelector("[type=file]").files;
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    formData.append("files[]", file);
  }
  fetch(url, {
    method: "POST",
    body: formData
  }).then(response => {
    if (response.status == 200) {
     window.location.reload(true);
    }
  });
});
let dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}
dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files[0]
  document.querySelector("[type=file]").files=dt.files;
  handleFile(files)
}
function handleFile(f) {
  var r = new FileReader();
  r.onload = function(e) {
    var contents = e.target.result;
    document.getElementById("result").innerHTML =
      "Файл амжилттай нээгдлээ <br />" + "name: " + f.name;

    var lines = contents.split("\n"),
      output = [];
    for (var i = 0; i < lines.length; i++) {
      output.push(
        "<tr><td>" + lines[i].split(",").join("</td><td>") + "</td></tr>"
      );
    }
    output = "<table>" + output.join("") + "</table>";
    document.getElementById("result").innerHTML += output;
  };
  r.readAsText(f);
}

function readSingleFile(evt) {
  var f = evt.target.files[0];
  if (f) {
    handleFile(f)
  } else {
    alert("Failed to load file");
  }
}
document.getElementById("fileinput").addEventListener("change", readSingleFile);
