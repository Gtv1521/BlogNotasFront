import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { singInput } from "../../aplication/inputs/sing.input";

export function CreateFormSing(fb: FormBuilder): FormGroup<singInput> {
    return fb.group({
        name: ['', [Validators.required]], 
        mail: ['',[Validators.required]],
        password: ['',[Validators.required]],
        confirPass: ['',[Validators.required]],
    });
}



// /=>Entrada /=> input => entity => api /=> Response /=> dto => entity => ui 