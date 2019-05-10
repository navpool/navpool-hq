import {isMobile} from 'react-device-detect';

export function modalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: isMobile ? '90%' : '400px',
    transform: `translate(-${top}%, -${left}%)`,
  };
}