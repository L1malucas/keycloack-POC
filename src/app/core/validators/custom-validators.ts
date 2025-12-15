import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  /**
   * Valida CPF brasileiro
   * @param control - FormControl contendo o CPF
   * @returns ValidationErrors se inválido, null se válido
   */
  static cpf(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const cpf = control.value.replace(/\D/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
      return { cpf: true };
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) {
      return { cpf: true };
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) {
      return { cpf: true };
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) {
      return { cpf: true };
    }

    return null;
  }

  /**
   * Valida telefone brasileiro
   * Aceita formatos: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
   * @param control - FormControl contendo o telefone
   * @returns ValidationErrors se inválido, null se válido
   */
  static phone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const phone = control.value.replace(/\D/g, '');

    // Aceita: (XX) XXXXX-XXXX (11 dígitos) ou (XX) XXXX-XXXX (10 dígitos)
    if (phone.length !== 10 && phone.length !== 11) {
      return { phone: true };
    }

    // Verifica se o DDD é válido (11 a 99)
    const ddd = parseInt(phone.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return { phone: true };
    }

    return null;
  }

  /**
   * Valida CEP brasileiro
   * Aceita formato: XXXXX-XXX ou XXXXXXXX
   * @param control - FormControl contendo o CEP
   * @returns ValidationErrors se inválido, null se válido
   */
  static cep(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const cep = control.value.replace(/\D/g, '');

    // Deve ter exatamente 8 dígitos
    if (cep.length !== 8) {
      return { cep: true };
    }

    // Verifica se não são todos zeros
    if (cep === '00000000') {
      return { cep: true };
    }

    return null;
  }
}
