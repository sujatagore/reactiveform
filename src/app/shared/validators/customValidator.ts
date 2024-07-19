import { AbstractControl, ValidationErrors } from "@angular/forms";



export class NoSpaceValidator{
    static NoSpace(control : AbstractControl) : ValidationErrors | null {
        let val = control.value as string;

        if (!val) {
            return null
        }

        if (val.includes(" ")) {
            return {
                NoSpaceBar : 'No Space is Allowed'
            }
        } else {
            return null
        }
    }
}

export class EmpIDValidators{
    static isEmpID(control : AbstractControl) : ValidationErrors | null {
        let valEMPID = control.value as string;

        if (valEMPID) {1
            let regexp = /^[A-Za-z]\d{3}$/;
            let isValid = regexp.test(valEMPID);
            if (isValid) {
                return null
            } else {
                return{
                    inValidEmpId : 'Emp id should starts with 1 alphabet and ends with 3 number'
                }
            }
        }else{
            return null
        }


    }
}