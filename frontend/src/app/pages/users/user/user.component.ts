import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IUser } from '../../../interfaces';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  imgSrc = 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg';
  user$?: Observable<{ user: IUser | null, loading: boolean, error?: any }>;
  isChange = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => {
        const numericId = Number(id);
        if (isNaN(numericId)) {
          this.router.navigate(['/users']);
          return of(null);
        }
        this.user$ = this.usersService.getOneUser(numericId).pipe(
          catchError(error => {
            console.error('Error loading user:', error);
            this.router.navigate(['/users']);
            return of({ user: null, loading: false, error });
          })
        );
        return this.user$;
      })
    ).subscribe(() => this.cdr.markForCheck());
  }


  change(): void {
    this.isChange = !this.isChange;
    this.cdr.markForCheck();
  }

  delete(id: number): void {
    if (confirm('Удалить пользователя?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }

  onSubmit(user: IUser): void {
    const { name, email, id } = user;
    this.usersService.updateUser(id, name, email).subscribe({
      next: (updatedUser) => {
        if (updatedUser) {
          this.change();
        }
      },
      error: (err) => console.error('Error updating user:', err)
    });
  }
}
