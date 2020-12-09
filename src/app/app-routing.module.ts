import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'mash',
    loadChildren: () => import('./mash/mash.module').then( m => m.MashPageModule)
  },
  {
    path: 'score-details',
    loadChildren: () => import('./score-details/score-details.module').then( m => m.ScoreDetailsPageModule)
  },
  {
    path: 'score-details/:id',
    loadChildren: () => import('./score-details/score-details.module').then( m => m.ScoreDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
