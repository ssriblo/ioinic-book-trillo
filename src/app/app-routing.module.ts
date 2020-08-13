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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}