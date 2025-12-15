import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { KeycloakUser, UserRole, CreateUserRequest } from '../../core/models/user.model';
import { MermaidDiagramComponent } from '../../core/components/mermaid-diagram.component';
import { FlowExplanationComponent } from '../../core/components/flow-explanation.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, MermaidDiagramComponent, FlowExplanationComponent],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  adminFlowDiagram = `
sequenceDiagram
    actor Admin
    participant Angular
    participant Admin API

    Admin->>Angular: Acessa /admin
    Angular->>Angular: adminGuard verifica role
    Angular->>Admin API: GET /users
    Admin API->>Angular: Lista usuarios

    Admin->>Angular: Seleciona usuario
    Angular->>Admin API: GET /role-mappings
    Admin API->>Angular: Roles do usuario

    Admin->>Angular: Adiciona role
    Angular->>Admin API: POST /role-mappings
    Admin API->>Admin API: Valida token
    Admin API->>Angular: Role atribuida
    Angular->>Admin: Sucesso
  `;

  users: KeycloakUser[] = [];
  availableRoles: UserRole[] = [];
  selectedUser: KeycloakUser | null = null;
  userRoles: UserRole[] = [];
  loading = false;
  error: string | null = null;

  showCreateUserForm = false;
  createUserForm: FormGroup;
  submittingUser = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      sendVerificationEmail: [true]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadAvailableRoles();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar usuarios: ' + err.message;
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  loadAvailableRoles(): void {
    this.userService.getAvailableRoles().subscribe({
      next: (roles) => {
        this.availableRoles = roles;
      },
      error: (err) => {
        console.error('Error loading roles:', err);
      }
    });
  }

  selectUser(user: KeycloakUser): void {
    this.selectedUser = user;
    this.loadUserRoles(user.id);
  }

  loadUserRoles(userId: string): void {
    this.userService.getUserRoles(userId).subscribe({
      next: (roles) => {
        this.userRoles = roles;
      },
      error: (err) => {
        console.error('Error loading user roles:', err);
      }
    });
  }

  hasRole(roleName: string): boolean {
    return this.userRoles.some(r => r.name === roleName);
  }

  toggleRole(role: UserRole): void {
    if (!this.selectedUser) return;

    if (this.hasRole(role.name)) {
      this.removeRole(role);
    } else {
      this.addRole(role);
    }
  }

  addRole(role: UserRole): void {
    if (!this.selectedUser) return;

    this.userService.assignRolesToUser(this.selectedUser.id, [role]).subscribe({
      next: () => {
        this.userRoles.push(role);
        alert(`Role ${role.name} adicionada com sucesso`);
      },
      error: (err) => {
        alert('Erro ao adicionar role: ' + err.message);
        console.error('Error adding role:', err);
      }
    });
  }

  removeRole(role: UserRole): void {
    if (!this.selectedUser) return;

    this.userService.removeRolesFromUser(this.selectedUser.id, [role]).subscribe({
      next: () => {
        this.userRoles = this.userRoles.filter(r => r.name !== role.name);
        alert(`Role ${role.name} removida com sucesso`);
      },
      error: (err) => {
        alert('Erro ao remover role: ' + err.message);
        console.error('Error removing role:', err);
      }
    });
  }

  toggleCreateUserForm(): void {
    this.showCreateUserForm = !this.showCreateUserForm;
    if (!this.showCreateUserForm) {
      this.createUserForm.reset({ sendVerificationEmail: true });
    }
  }

  createUser(): void {
    if (this.createUserForm.invalid) {
      this.markFormGroupTouched(this.createUserForm);
      return;
    }

    this.submittingUser = true;
    const formValue = this.createUserForm.value;

    const newUser: CreateUserRequest = {
      username: formValue.username,
      email: formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      enabled: true,
      emailVerified: false,
      credentials: [{
        type: 'password',
        value: formValue.password,
        temporary: true
      }],
      attributes: {
        profileCompleted: ['false']
      }
    };

    this.userService.createUserWithEmail(newUser).subscribe({
      next: () => {
        if (formValue.sendVerificationEmail) {
          this.userService.getUsers().subscribe({
            next: (users) => {
              const createdUser = users.find(u => u.username === newUser.username);
              if (createdUser) {
                this.userService.executeActionsEmail(createdUser.id, ['VERIFY_EMAIL']).subscribe({
                  next: () => {
                    this.handleCreateUserSuccess('Usuário criado! Email de verificação enviado.');
                  },
                  error: () => {
                    this.handleCreateUserSuccess('Usuário criado, mas falhou ao enviar email de verificação.');
                  }
                });
              } else {
                this.handleCreateUserSuccess('Usuário criado com sucesso!');
              }
            },
            error: () => {
              this.handleCreateUserSuccess('Usuário criado, mas não foi possível enviar email.');
            }
          });
        } else {
          this.handleCreateUserSuccess('Usuário criado com sucesso!');
        }
      },
      error: (err) => {
        this.submittingUser = false;
        this.error = 'Erro ao criar usuário: ' + (err.error?.errorMessage || err.message);
        console.error('Error creating user:', err);
      }
    });
  }

  private handleCreateUserSuccess(message: string): void {
    alert(message);
    this.submittingUser = false;
    this.showCreateUserForm = false;
    this.createUserForm.reset({ sendVerificationEmail: true });
    this.loadUsers();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.createUserForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) return 'Campo obrigatório';
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return null;
  }
}
