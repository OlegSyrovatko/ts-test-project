class Department {
    // private id: string;
    // private name: string;

    private emploees: string[] = [];

    constructor(private id: string, private name: string) {
        // this.id = id;
        // this.name = name;
    }
    
    describes(this: Department) {
        console.log("describes: " + this.id + " " + this.name);
    }
    addEmployee(emploee: string) {
        this.emploees.push(emploee);
    }
    showEmployees (){
        console.log(this.emploees.length);
        console.log(this.emploees);
   }
}
 
const accaunting = new Department('d1', 'Accaunting');

accaunting.describes();

// const accauntingCopy = {name: "AccauntingCopy", describes: accaunting.describes };
// accauntingCopy.describes();

accaunting.addEmployee("Oleh");
accaunting.addEmployee("Max");
// accaunting.emploees[2] = "Anna";
accaunting.showEmployees();
