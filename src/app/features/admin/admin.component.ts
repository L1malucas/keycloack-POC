import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { KeycloakUser, UserRole } from '../../core/models/user.model';
import { MermaidDiagramComponent } from '../../core/components/mermaid-diagram.component';
import { FlowExplanationComponent } from '../../core/components/flow-explanation.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MermaidDiagramComponent, FlowExplanationComponent],
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

  constructor(private userService: UserService) {}

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
}
