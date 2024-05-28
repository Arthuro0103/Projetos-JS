// Variaveis
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");

let brushSize = 20;
let isPainting = false;
let activeTool = "brush";

// Cor
inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
});

// Clique
canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true;
    const x = clientX - canvas.offsetLeft;
    const y = clientY - canvas.offsetTop;

    if (activeTool === "brush") {
        draw(x, y);
    }
    if (activeTool === "rubber") {
        erase(x, y);
    }
    if (activeTool === "filler") {
        floodFill(x, y, ctx.fillStyle);
    }
});

// Segurar clique
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isPainting) {
        const x = clientX - canvas.offsetLeft;
        const y = clientY - canvas.offsetTop;

        if (activeTool === "brush") {
            draw(x, y);
        }
        if (activeTool === "rubber") {
            erase(x, y);
        }
        if (activeTool === "filler") {
            floodFill(x, y, ctx.fillStyle);
        }
    }
});

canvas.addEventListener("mouseup", () => {
    isPainting = false;
});

// Desenhar
const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
};

// Apagar
const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
};

// Preencher 
function floodFill(startX, startY, fillColor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getColorAtPixel(data, startX, startY);
    const fillR = parseInt(fillColor.slice(1, 3), 16);
    const fillG = parseInt(fillColor.slice(3, 5), 16);
    const fillB = parseInt(fillColor.slice(5, 7), 16);

    if (!colorsMatch(targetColor, [fillR, fillG, fillB, 255])) {
        floodFillStack(data, startX, startY, [fillR, fillG, fillB, 255], targetColor);
        ctx.putImageData(imageData, 0, 0);
    }
}

function floodFillStack(data, x, y, fillColor, targetColor) {
    const width = canvas.width;
    const height = canvas.height;
    const stack = [[x, y]];

    while (stack.length) {
        const [curX, curY] = stack.pop();
        const pixelPos = (curY * width + curX) * 4;

        if (!colorsMatch(getColorAtPixel(data, curX, curY), targetColor)) {
            continue;
        }

        data[pixelPos] = fillColor[0];
        data[pixelPos + 1] = fillColor[1];
        data[pixelPos + 2] = fillColor[2];
        data[pixelPos + 3] = fillColor[3];

        if (curX + 1 < width) stack.push([curX + 1, curY]);
        if (curX - 1 >= 0) stack.push([curX - 1, curY]);
        if (curY + 1 < height) stack.push([curX, curY + 1]);
        if (curY - 1 >= 0) stack.push([curX, curY - 1]);
    }
}

function getColorAtPixel(data, x, y) {
    const width = canvas.width;
    const pixelPos = (y * width + x) * 4;
    return [data[pixelPos], data[pixelPos + 1], data[pixelPos + 2], data[pixelPos + 3]];
}

function colorsMatch(color1, color2) {
    return color1[0] === color2[0] &&
           color1[1] === color2[1] &&
           color1[2] === color2[2] &&
           color1[3] === color2[3];
}

// Selecionar ferramenta
const selectTool = ({ target }) => {
    const selectedTool = target.closest("button");
    const action = selectedTool.getAttribute("data-action");

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"));
        selectedTool.classList.add("active");
        activeTool = action;
    }
};

// Selecionar tamanho
const selectSize = ({ target }) => {
    const selectedTool = target.closest("button");
    const size = selectedTool.getAttribute("data-size");

    sizeButtons.forEach((tool) => tool.classList.remove("active"));
    selectedTool.classList.add("active");
    brushSize = size;
};

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool);
});

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize);
});

// Limpar
buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "#ffffff";
});