
import React from 'react';

export const AppLogo = ({ className }: { className?: string }) => (
  <img
    src="https://res.cloudinary.com/dwta1roq1/image/upload/w_200,q_auto,f_auto,e_background_removal/logo-analgesia/app"
    alt="Logo do aplicativo Analgesia e controle de dor veterinária, mostrando o perfil de um cão e um gato dentro de um círculo verde e azul com um coração"
    className={className}
    width="200"
    height="200"
  />
);

export const GuideIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.5,12.5 C9.5,11.5 10.5,11.5 10.5,12.5 C10,13.5 9,13.5 8.5,12.5 Z" fill="white" />
        <path d="M13.5,12.5 C14.5,11.5 15.5,11.5 15.5,12.5 C15,13.5 14,13.5 13.5,12.5 Z" fill="white" />
    </svg>
);


export const PawIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.5-7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    <path d="M12.01 18.2c-1.48 0-2.75-.81-3.45-2H15.5c-.7 1.19-1.97 2-3.49 2z" transform="translate(0, -2)" />
    <path d="M8.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" transform="translate(-1.5, 0)" />
    <path d="M15.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" transform="translate(1.5, 0)" />
    <path d="M12 8.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" transform="translate(0, -1)" />
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z m-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z m3.5-7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" opacity=".3"/>
    <path d="M12.01 18c-1.48 0-2.75-.81-3.45-2h6.89c-.7 1.19-1.97 2-3.44 2z"/>
    <circle cx="8.5" cy="11.2" r="2"/>
    <circle cx="15.5" cy="11.2" r="2"/>
    <circle cx="12" cy="6.2" r="2"/>
  </svg>
);

export const SpinnerIcon = ({ className }: { className?: string }) => (
    <svg className={`animate-spin h-5 w-5 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
