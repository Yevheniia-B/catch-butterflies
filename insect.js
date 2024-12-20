export class Insect {
    constructor(type, scoreImpact, speed, fieldId) {
        this.type = type; // butterfly or bee
        this.scoreImpact = scoreImpact; 
        this.speed = speed; 
        this.fieldId = fieldId; 
        this.element = $('<div class="insect"></div>');
    }

    // create insect..
    create() {
        const field = $(`#${this.fieldId}`); 
        this.element.addClass(this.type); 

        // add insect to cell
        field.append(this.element);

        // check if appear
        console.log(`Метелик з типом: ${this.type}, на полі: ${this.fieldId}`);

        return this;
    }

    
    onClick(callback) {
        this.element.on('click', () => {
            callback(this.scoreImpact); 
            this.element.remove();
        });
    }

    
    autoRemove() {
        setTimeout(() => {
            this.element.remove();
        }, this.speed);
    }
}

export class Butterfly extends Insect {
    constructor(level, fieldId) {
        let type, scoreImpact, speed;
        
       
        if (level === 1) {
            type = 'butterfly-type1';
            scoreImpact = 1; 
            speed = 2000;
        } else if (level === 2) {
            type = Math.random() < 0.5 ? 'butterfly-type1' : 'butterfly-type2';
            scoreImpact = type === 'butterfly-type1' ? 1 : 2; 
            speed = 1800;
        } else {
            type = _.sample(['butterfly-type1', 'butterfly-type2', 'butterfly-type3']);
            if (type === 'butterfly-type1') {
                scoreImpact = 1;
            } else if (type === 'butterfly-type2') {
                scoreImpact = 2;
            } else {
                scoreImpact = 3; 
            }
            speed = 1500;
        }
        
        super(type, scoreImpact, speed, fieldId);
    }
}


export class Bee extends Insect {
    constructor(fieldId) {
        super('bee', -2, 2000, fieldId); 
    }
}
