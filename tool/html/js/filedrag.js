function Init() {
	var filedrag = document.getElementById('filedrag');
	filedrag.addEventListener("dragover", FileDragHover, false);
	filedrag.addEventListener("dragleave", FileDragHover, false);
	filedrag.addEventListener("drop", FileSelectHandler, false);
}
function FileSelectHandler(e) {
	handleImageSelectUpload(e);
}
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}
if (window.File && window.FileList && window.FileReader) {
	Init();
}