const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

const config = {
    strokeStyle: 'rgba(91,255,0,0.8)',
    fillStyle: 'rgba(15,122,0,0.8)',
    radius: 200,
};

function drawAxis() {
    ctx.beginPath();
    // X and Y Axis
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    drawArrows();
    drawCenterPoint();
}

/**
 * Drawing arrows for X and Y axis
 */
function drawArrows() {
    ctx.beginPath();
    // X axis arrow
    ctx.moveTo(canvas.width - 10, canvas.height / 2 - 5);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width - 10, canvas.height / 2 + 5);
    // Y axis arrow
    ctx.moveTo(canvas.width / 2 - 5, 10);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2 + 5, 10);
    ctx.stroke();
}

function drawCenterPoint() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, 2 * Math.PI);
    ctx.fill();
}
function getKeyPoints(R) {
    const scale = config.radius / R;

    return [
        {x: 0, y: R * scale},           // P1: (0, R) - начальная точка
        {x: R * scale, y: 0},           // P2: (R, 0) - треугольник
        {x: 0, y: 0},                    // P3: (0, 0) - центр
        {x: 0, y: -R * scale},           // P4: (0, -R) - прямоугольник
        {x: -(R / 2) * scale, y: -R * scale}, // P5: (-R/2, -R) - прямоугольник
        {x: -(R / 2) * scale, y: 0}     // P6: (-R/2, 0) - начало дуги
    ];
}

function drawBoundary(R = config.radius) {
    const keyPoints = getKeyPoints(R);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = config.radius / R;
    
    // Начинаем с P1: (0, R)
    ctx.moveTo(centerX + keyPoints[0].x, centerY - keyPoints[0].y);
    
    // Рисуем прямые линии через все точки до P6
    for (let i = 1; i < keyPoints.length; i++) {
        ctx.lineTo(centerX + keyPoints[i].x, centerY - keyPoints[i].y);
    }
    
    // Рисуем дугу от P6 (-R/2, 0) до (0, R/2)
    drawArc(R);
    
    // Закрывающая линия от (0, R/2) обратно к P1 (0, R)
    ctx.lineTo(centerX, centerY - (R / 2) * scale); // (0, R/2)
    ctx.lineTo(centerX + keyPoints[0].x, centerY - keyPoints[0].y); // (0, R) - обратно к началу
}


function drawArc(R) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = config.radius / R;
    
    ctx.arc(centerX, centerY, (R / 2) * scale, Math.PI, 3 * Math.PI / 2, false);
}


function drawPlot(R = config.radius) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = config.fillStyle;
    ctx.strokeStyle = config.strokeStyle;

    ctx.beginPath();
    drawAxis();
    drawBoundary(R);
    ctx.fill();
    ctx.stroke();

    drawLabels();
    drawPoints();
}

const labels = [
    // zero
    {x: 0, y: 0, text: '0'},

    // negative
    {x: -config.radius / 2, y: 0, text: '-R/2', formula: '-(R)/2'},
    {x: -config.radius, y: 0, text: '-R', formula: '-(R)'},
    {x: 0, y: -config.radius, text: '-R', formula: '-(R)'},
    {x: 0, y: -config.radius / 2, text: '-R/2', formula: '-(R)/2'},

    // positive
    {x: config.radius / 2, y: 0, text: 'R/2', formula: 'R/2'},
    {x: 0, y: config.radius / 2, text: 'R/2', formula: 'R/2'},
    {x: config.radius, y: 0, text: 'R', formula: 'R'},
    {x: 0, y: config.radius, text: 'R', formula: 'R'}
];


function refreshLabels(R) {
    labels.forEach(label => {
        if (!label.formula) return;
        const computedValue = evaluateFormula(label.formula, R);
        label.text = computedValue !== null ? computedValue.toString() : label.formula;
    });
}

function refresh(R) {
    refreshLabels(R);
    refreshPoints(R);
    drawPlot(R);
}


function evaluateFormula(formula, R) {
    try {
        let sanitizedFormula = formula.replace('R', R.toString());
        return eval(sanitizedFormula);
    } catch (error) {
        console.error(`Failed to evaluate formula "${formula}":`, error);
        return null;
    }
}


function drawLabels() {
    ctx.font = '18px serif';
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = 'white';

    labels.forEach(label => {
        ctx.fillText(label.text, canvas.width / 2 + label.x + 5, canvas.height / 2 - label.y - 5);
    });

    ctx.fillStyle = oldStyle;
}

const points = [];

function drawPoints() {
    points.forEach(point => drawPoint(point));
}

function drawPoint(point) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function insertPoint(x, y, r) {
    const point = {
        x: canvas.width / 2 + x * config.radius / r,
        y: canvas.height / 2 - y * config.radius / r,
        realX: x,
        realY: y,
    };

    points.push(point);
    drawPoint(point);
}

function refreshPoints(newR) {
    points.forEach(point => {
        point.x = canvas.width / 2 + point.realX * config.radius / newR;
        point.y = canvas.height / 2 - point.realY * config.radius / newR;
    });
}