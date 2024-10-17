import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

const roles = {
  professor: [
    '/exercise/professor', 
    '/exercise/manager', 
    '/solution', 
    '/solution/details', 
    '/exercise/config-files'
  ],
  student: [
    '/exercise/student', 
    '/exercise/finished',
    '/exercise/details',
    '/exercise/finished/details/'
  ]
};

export const byRoleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const role = localStorage.getItem('role') as 'professor' | 'student';
  const haveAccess = roles[role].includes(state.url);

  if (!haveAccess && role === 'student') {
    router.navigate(['/exercise/student']);
  } else if (!haveAccess && role === 'professor') {
    router.navigate(['/exercise/professor']);
  }

  return haveAccess
};
