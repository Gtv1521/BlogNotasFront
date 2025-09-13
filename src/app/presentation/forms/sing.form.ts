import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { logInput } from "../../aplication/inputs/log.input";

export function CreateFormLog(fb: FormBuilder): FormGroup<logInput> {
    return fb.group({
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.maxLength(8)]]
    });
}