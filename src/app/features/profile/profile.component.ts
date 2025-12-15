import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../core/services/account.service';
import { UserProfile } from '../../core/models/user.model';
import { CustomValidators } from '../../core/validators/custom-validators';
import { MermaidDiagramComponent } from '../../core/components/mermaid-diagram.component';
import { FlowExplanationComponent } from '../../core/components/flow-explanation.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MermaidDiagramComponent, FlowExplanationComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  refreshTokenDiagram = `
sequenceDiagram
    participant Angular
    participant Keycloak

    Note over Angular: Timer 60s
    Angular->>Angular: Token expira em 70s?
    Angular->>Keycloak: POST /token (refresh_token)
    Keycloak->>Keycloak: Valida refresh_token
    Keycloak->>Angular: Novo access_token
    Angular->>Angular: Atualiza em memoria

    Note over Angular: Se falhar
    Angular->>Angular: logout()
  `;

  userProfile: UserProfile | null = null;
  token: string | undefined;
  refreshToken: string | undefined;

  editMode = false;
  profileForm: FormGroup;
  submitting = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    this.authService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
      this.loadProfileToForm();
    });
    this.token = this.authService.getToken();
    this.refreshToken = this.authService.getRefreshToken();
  }

  loadProfileToForm(): void {
    if (!this.userProfile) return;

    const attrs = this.userProfile.attributes || {};
    this.profileForm.patchValue({
      firstName: this.userProfile.given_name || '',
      lastName: this.userProfile.family_name || '',
      email: this.userProfile.email || '',
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

  enableEditMode(): void {
    this.editMode = true;
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.editMode = false;
    this.loadProfileToForm();
    this.errorMessage = '';
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const formValue = this.profileForm.value;
    const updatedProfile = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      attributes: {
        phone: [formValue.phone],
        cpf: [formValue.cpf],
        birthDate: [formValue.birthDate],
        profileCompleted: ['true']
      } as Record<string, string[]>
    };

    // Adiciona campos opcionais se preenchidos
    if (formValue.street) updatedProfile.attributes['street'] = [formValue.street];
    if (formValue.number) updatedProfile.attributes['number'] = [formValue.number];
    if (formValue.city) updatedProfile.attributes['city'] = [formValue.city];
    if (formValue.state) updatedProfile.attributes['state'] = [formValue.state];
    if (formValue.zipCode) updatedProfile.attributes['zipCode'] = [formValue.zipCode];

    this.accountService.updateProfile(updatedProfile).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso!');
        // Força reload do token para pegar os novos dados
        this.authService.updateToken(0).then(() => {
          this.editMode = false;
          this.submitting = false;
        });
      },
      error: (error) => {
        console.error('Erro ao atualizar perfil:', error);
        this.errorMessage = 'Erro ao salvar perfil. Tente novamente.';
        this.submitting = false;
      }
    });
  }

  async refreshTokenManual(): Promise<void> {
    const refreshed = await this.authService.updateToken(0);
    if (refreshed) {
      this.token = this.authService.getToken();
      this.refreshToken = this.authService.getRefreshToken();
      alert('Token atualizado com sucesso');
    } else {
      alert('Falha ao atualizar token');
    }
  }

  formatAttributeValue(value: unknown): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.profileForm.get(fieldName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['cpf']) return 'CPF inválido';
      if (control.errors['phone']) return 'Telefone inválido (formato: (XX) XXXXX-XXXX)';
      if (control.errors['cep']) return 'CEP inválido (formato: XXXXX-XXX)';
    }
    return '';
  }
}
