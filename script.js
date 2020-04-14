// MNIST 
// Mitterdorfer, 2020

// data from file p5.Table
let data;
// elements (formatted for classifier)
let els;
// our k-Nearest Neighbor classifier
let knn;
// test data and formatted test data
let testData;
let elsTest;

// width of screen
const factor = 20;
// drawing?
let drawing = false;
// points drawn
let points = [];

function preload() {
    // load train and test data from csv files
    data = loadTable('data/mnist_train_10000.csv');
    testData = loadTable('data/mnist_test_1000.csv');
}

function setup() {
    // format them for classifier
    els = DataProcessing.tableDataToEls(data, 784, 0, true);
    elsTest = DataProcessing.tableDataToEls(testData, 784, 0, true);

    // visualize first digit
    createCanvas(factor * 28, factor * 28);
    background(40);
    noStroke();
    /*
    for(let i = 0; i < els[0].x.length; i++) {
        let val = els[0].x[i];
        let xIndex = i % 28;
        let yIndex = floor(i / 28);
        fill(val);
        rect(xIndex * factor, yIndex * factor, factor, factor);
    }
    */

    // k-Nearest Neighbor Classifier
    knn = new KNN(els, 11);
    // calculate score
    // console.log(knn.score(elsTest));
}

function draw() {
    background(40);
    if(drawing) {
        // get index
        let xIndex = floor(mouseX / factor) + 1;
        let yIndex = floor(mouseY / factor);
        points.push([xIndex, yIndex]);
    }
    // draw the points
    for(let i of points) {
        let x = factor * i[0];
        let y = factor * i[1];
        fill(255);
        rect(x, y, factor, factor);
    }
}

function mousePressed() {
    drawing = !drawing;
}

function keyPressed() {
    if(key == 's') {
        // start
        // get the pixel array
        let arr = [];
        for(let i = 0; i < 784; i++) {
            arr.push(0);
        }
        for(let i of points) {
            let index = i[0] + i[1] * 28
            arr[index] = 255;
        }
        // predict 
        let prediction = knn.predict(arr);
        console.log(prediction);
    }
    if(key == 'c') {
        points = [];
        drawing = false;
    }
}