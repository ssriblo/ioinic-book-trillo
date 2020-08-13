import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/introduction']);

// Automatically log in users
const redirectLoggedInToApp = () => redirectLoggedInTo(['/app']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
  {
    path: 'introduction',
    ...canActivate(redirectLoggedInToApp),
    loadChildren: () =>
      import('./pages/introduction/introduction.module').then(
        (m) => m.IntroductionPageModule
      ),
  },
  {
    path: 'app',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'board-add',
    loadChildren: () => import('./pages/board-add/board-add.module').then( m => m.BoardAddPageModule)
  },
  {
    path: 'board-color-select',
    loadChildren: () => import('./pages/board-color-select/board-color-select.module').then( m => m.BoardColorSelectPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}