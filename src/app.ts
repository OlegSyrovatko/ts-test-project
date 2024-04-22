class Department {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
    
    describes(this: Department) {
        console.log("describes: " + this.name);
        
     }
}
 
const accaunting = new Department('Accaunting');

accaunting.describes();

const accauntingCopy = {name: "AccauntingCopy", describes: accaunting.describes };
accauntingCopy.describes();