import { ValidationErrors } from "@angular/forms";
import {AbstractControl } from "@angular/forms";
import {Observable } from "rxjs";



export class AsycnEmailValidator{
    static isEmailAvailable(controls: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
        let val = controls.value as string;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (val === 'jhon@gmail.com') {
                    resolve({
                        emailExist : `Email Id alredy Exist...`
                    })
                } else {
                    resolve(null)
                }
            }, 2000);
        })
    }
}