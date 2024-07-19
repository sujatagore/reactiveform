import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/const/validationPattern';
import { EmpIDValidators, NoSpaceValidator } from './shared/validators/customValidator';
import { countryArr } from './shared/const/data';
import { AsycnEmailValidator } from './shared/validators/asycnEmailValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveform';

  public signUpForm !: FormGroup;

  genderArr : Array<string> = ['female', 'male', 'others'];

  CountriesArr : Array<string> = countryArr; 

  showPassword : boolean = false;

  showPasswordConfirm : boolean = false;

  constructor(){}

  ngOnInit(): void {
    this.createSignUp()

      this.isAddressSame()

      this.patchAddress()

      this.patchConfirmPassword()

      this.signUpForm.get('confirmPassword')
        ?.valueChanges.subscribe(res => {
          if (this.sc['password'].value !== res) {
            this.signUpForm.get('confirmPassword')?.setErrors({invalid: true})
          }else{
            this.signUpForm.get('confirmPassword')?.setErrors(null)
          }
        })
  }

  createSignUp(){
    this.signUpForm = new FormGroup ({
      // userName : new FormControl(null, [Validators.required, NoSpaceValidator.NoSpace]) for custom validator
      userName : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10),
          Validators.pattern(CustomRegex.username), NoSpaceValidator.NoSpace
        ]),

      mobile: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")]),

      email : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], [AsycnEmailValidator.isEmailAvailable]),
      //  email : new FormControl('', [Validators.required, Validators.pattern(CustomRegex.email), Validators.email])

      empID : new FormControl(null, [Validators.required, EmpIDValidators.isEmpID]),

      gender: new FormControl(null, [Validators.required]),

      skills : new FormArray([new FormControl(null,[Validators.required])]),

      currentaddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        zipCode: new FormControl(null, [Validators.required, Validators.minLength(6), 
            Validators.maxLength(6),Validators.pattern("^[0-9]*$")])
      }),

      permanentaddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        zipCode: new FormControl(null, [Validators.required, Validators.minLength(6), 
            Validators.maxLength(6),Validators.pattern("^[0-9]*$")])
      }),

      isAddress : new FormControl({value: false, disabled: true}),

      password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password),
        Validators.minLength(8), Validators.maxLength(8)]),

      confirmPassword : new FormControl({value: null, disabled: true})

    })
  }

  onSignUp(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)
      // console.log(this.signUpForm.controls)
      // console.log(this.signUpForm)
      // console.log({...this.signUpForm.value, permanentaddress : {...this.signUpForm.get('permanentaddress')?.value}})
      console.log(this.signUpForm.getRawValue())
      this.signUpForm.reset()
    }

    // if (this.signUpForm.valid || this.sc['password'].value !== this.sc['confirmPassword'].value) {
    //   console.log(this.signUpForm.value)
    //   // console.log(this.signUpForm.controls)
    //   // console.log(this.signUpForm)
    //   // console.log({...this.signUpForm.value, permanentaddress : {...this.signUpForm.get('permanentaddress')?.value}})
    //   console.log(this.signUpForm.getRawValue())
    // }
  }

  get sc(){
    return this.signUpForm.controls
  }

  get sc2(){
    let formGrp = this.signUpForm.get('currentaddress') as FormGroup
    return formGrp.controls
  }

  get getUserName(){
    return this.signUpForm.get('username') as FormControl
  }

  get getEmail(){
    return this.signUpForm.get('email') as FormControl
  }

  get getEmpID(){
    return this.signUpForm.get('empID') as FormControl
  }

  get skillsArr(){
    return this.signUpForm.get('skills') as FormArray
  }

  addskill(){
    let getSkillControl = new FormControl(null, [Validators.required]);
    this.skillsArr.push(getSkillControl)

    // if (this.skillsArr.length < 5) {
    //   let getSkillControl = new FormControl(null, [Validators.required]); u can apply condition here also
    //   this.skillsArr.push(getSkillControl)
    // }
  }

  onRemove(i : number){
    this.skillsArr.removeAt(i)
  }

  isAddressSame(){
    this.signUpForm.get('currentaddress')
      ?.valueChanges
      .subscribe(res => {
          if (this.signUpForm.get('currentaddress')?.valid) {
              this.sc['isAddress'].enable()
          }else{
            this.sc['isAddress'].disable()
            this.sc['isAddress'].patchValue(false)
          }
      })
  }

  patchAddress(){
    this.sc['isAddress']
        .valueChanges
        .subscribe(res =>{
          if (res) {
            this.sc['permanentaddress'].patchValue(this.sc['currentaddress'].value)
            this.sc['permanentaddress'].disable()
          } else {
            this.sc['permanentaddress'].reset()
            this.sc['permanentaddress'].enable()
          }
        })
  }

  patchConfirmPassword(){
    this.signUpForm.get('password')
      ?.valueChanges
      .subscribe(res => {
          if (this.signUpForm.get('password')?.valid) {
              this.signUpForm.get('confirmPassword')?.enable()
          }else{
            this.signUpForm.get('confirmPassword')?.disable()
          }
      })
  }

  // toggleShowPassword() {
  //   this.showPassword =!this.showPassword;
  // }
}
