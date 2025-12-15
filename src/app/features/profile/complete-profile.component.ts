import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { AuthService } from '../../core/services/auth.service';
import { CustomValidators } from '../../core/validators/custom-validators';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complete-profile.component.html'
})
export class CompleteProfileComponent implements OnInit {
  completeProfileForm: FormGroup;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {
    this.completeProfileForm = this.fb.group({
      phone: ['', [Validators.required, CustomValidators.phone]],
      cpf: ['', [Validators.required, CustomValidators.cpf]],
      birthDate: ['', Validators.required],
      street: [''],
      number: [''],
      city: [''],
      state: [''],
      zipCode: ['', CustomValidators.cep]
    });
  }

  ngOnInit(): void {
    // Verifica se o perfil já está completo
    if (this.accountService.isProfileComplete()) {
      this.router.navigate(['/']);
    }

    // Preenche campos se já existirem
    const userProfile = this.authService.getUserProfile();
    if (userProfile?.attributes) {
      const attrs = userProfile.attributes;
      this.completeProfileForm.patchValue({
        phone: attrs['phone']?.[0] || '',
        cpf: attrs['cpf']?.[0] || '',
        birthDate: attrs['birthDate']?.[0] || '',
        street: attrs['street']?.[0] || '',
        number: attrs['number']?.[0] || '',
        city: attrs['city']?.[0] || '',
        state: attrs['state']?.[0] || '',
        zipCode: attrs['zipCode']?.[0] || ''
      });
    }
  }

  completeProfile(): void {
    if (this.completeProfileForm.invalid) {
      this.markFormGroupTouched(this.completeProfileForm);
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const formValue = this.completeProfileForm.value;
    const attributes: Record<string, string[]> = {
      phone: [formValue.phone],
      cpf: [formValue.cpf],
      birthDate: [formValue.birthDate],
      profileCompleted: ['true']
    };

    // Adiciona campos opcionais apenas se preenchidos
    if (formValue.street) attributes['street'] = [formValue.street];
    if (formValue.number) attributes['number'] = [formValue.number];
    if (formValue.city) attributes['city'] = [formValue.city];
    if (formValue.state) attributes['state'] = [formValue.state];
    if (formValue.zipCode) attributes['zipCode'] = [formValue.zipCode];

    this.accountService.updateAttributes(attributes).subscribe({
      next: () => {
        alert('Perfil completado com sucesso! Redirecionando...');
        // Força reload do token para pegar os novos atributos
        this.authService.updateToken(0).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        console.error('Erro ao completar perfil:', error);
        this.errorMessage = 'Erro ao salvar perfil. Tente novamente.';
        this.submitting = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.completeProfileForm.get(fieldName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['cpf']) return 'CPF inválido';
      if (control.errors['phone']) return 'Telefone inválido (formato: (XX) XXXXX-XXXX)';
      if (control.errors['cep']) return 'CEP inválido (formato: XXXXX-XXX)';
    }
    return '';
  }
}
