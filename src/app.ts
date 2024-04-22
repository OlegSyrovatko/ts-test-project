class Department {
    name: string;
    private emploees: string[] = [];
    constructor(n: string) {
        this.name = n;
    }
    
    describes(this: Department) {
        console.log("describes: " + this.name);
    }
    addEmployee(emploee: string) {
        this.emploees.push(emploee);
    }
    showEmployees (){
        console.log(this.emploees.length);
        console.log(this.emploees);
   }
}
 
const accaunting = new Department('Accaunting');

// accaunting.describes();

// const accauntingCopy = {name: "AccauntingCopy", describes: accaunting.describes };
// accauntingCopy.describes();

accaunting.addEmployee("Oleh");
accaunting.addEmployee("Max");
// accaunting.emploees[2] = "Anna";
accaunting.showEmployees();
