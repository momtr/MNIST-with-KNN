class DataProcessing {

    constructor(data) {
        this.data = data;
    }

    static tableDataToEls(data, x_endIndex, y_index, switch_xy) {
        let els = [];
        for(let i = 1; i < data.rows.length; i++) {
            let row = DataProcessing.parseVec(data.rows[i].arr);
            if(switch_xy) {
                els.push({
                    x: row.slice(y_index + 1, x_endIndex + 1),
                    y: row[y_index]
                });
            } else {
                els.push({
                    x: row.slice(0, x_endIndex + 1),
                    y: row[y_index]
                });
            }
        }
        return els;
    }

    static trainTestSplit(els, train=0.75) {
        let trainEl = [];
        let testEl = [];
        for(let i of els) {
            if(Math.random() < train) 
                trainEl.push(i);
            else
                testEl.push(i);
        }
        return { train: trainEl, test: testEl };
    }

    static parseVec(vec) {
        let newVec = [];
        for(let i of vec) {
            let el = parseFloat(i);
            newVec.push(el);
        }
        return newVec;
    }

    static scale(vec, scalarVec) {
        if(vec.length != scalarVec.length)
            throw new Error("Vec and scalarVec must have the same length!");
        let newVec = [];
        for(let i = 0; i < vec.length; i++) {
            newVec.push(vec[i] * scalarVec[i]);
        }
        return newVec;
    }

}

class Normalizer {

    constructor(data) {
        this.min = Infinity;
        this.max = -Infinity;
        for(let i of data) {
            let vec = i.x;
            for(let j of vec) {
                if(j < this.min)
                    this.min = j;
                else if(j > this.max)
                    this.max = j;
            }
        }
    }

    normalize(vec) {
        let newVec = [];
        for(let i of vec) {
            newVec.push((i - this.min) / (this.max - this.min));
        }
        return newVec;
    }

}