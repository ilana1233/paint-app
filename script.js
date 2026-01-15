const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let mode = "draw";
let drawing = false;
let color = "#00000";
let size = 5;
let lastX = 0;
let lastY = 0;

//שינוי צבע
document.getElementById("colorPicker").addEventListener("change", e => {
    color = e.target.value;
});
//שינוי גודל מכחול
document.getElementById("brushSize").addEventListener("change", e => {
    size = e.target.value;
});

//שמירת תמונה
document.getElementById("save").addEventListener("click",() => {
    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

//הוספת תמונה
document.getElementById("uploadImage").addEventListener("change",(e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
        img.onload = () => {
// //ניקוי קנבס
// ctx.clearReact(0,0,canvas.width,canvas.height);
//התאמה לגודל תמונה
ctx.drawImage(img,0,0,canvas.width,canvas.height);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});


document.getElementById("pen").addEventListener("click",() =>{
    mode = "draw";
    ctx.globalCompositeOperation = "source-over";
});

document.getElementById("eraser").addEventListener("click",() =>{
    mode = "erase";
    ctx.globalCompositeOperation = "destination-out";
});

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => 
    drawing = false);
canvas.addEventListener("mouseleve", () => 
    drawing = false);

canvas.addEventListener("mousemove", draw);

function draw(e) {
if(!drawing) return;


ctx.strokeStyle = color;
ctx.lineWidth = mode === "erase" ? size * 2 : size;
ctx.lineCap = "round";

ctx.beginPath();
ctx.moveTo(lastX, lastY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();

lastX = e.offsetX;
lastY = e.offsetY;
}

function getTouchPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    };
}
canvas.addEventListener("touchmove", (e) =>{
    e.preventDefault();
    if(!drawing) return;

    const pos = getTouchPos(e);
    drwaTouch(pos.x,pos.y);
});

canvas.addEventListener("touchend",()=>{
    drawing = false;
})

document.getElementById("clear").addEventListener("click",() => {
    ctx.clearReact(0,0, canvas.width, canvas.height);
});



