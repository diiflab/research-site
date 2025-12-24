import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const LOGOS = [
  { src: '/img/logos/ms.png', alt: 'MS' },
  { src: '/img/logos/sejong.png', alt: 'Sejong' },
  { src: '/img/logos/unair.png', alt: 'UNAIR' },
  { src: '/img/logos/binus.png', alt: 'BINUS' },
  { src: '/img/logos/ugm.png', alt: 'UGM' },
  { src: '/img/logos/skku.png', alt: 'SKKU' },
  { src: '/img/logos/knu.png', alt: 'KNU' },
  { src: '/img/logos/undip.png', alt: 'UNDIP' },
  { src: '/img/logos/karabuk.png', alt: 'Karabuk' },
  { src: '/img/logos/tidar.png', alt: 'Tidar' },
  { src: '/img/logos/dongguk.jpg', alt: 'Dongguk' },
  { src: '/img/logos/hitec.jpg', alt: 'HITEC' },
  { src: '/img/logos/curtin.png', alt: 'Curtin' },
  { src: '/img/logos/gscwu.png', alt: 'GSCWU' },
  { src: '/img/logos/uinsuka.png', alt: 'UINSUKA' },
  { src: '/img/logos/isu.png', alt: 'ISU' },
  { src: '/img/logos/ubd.png', alt: 'UBD' },
];



export default function LogoSlider() {
  return (
    <div className={styles.wrapper}>
     <h1 className="text--center">Our Collaborators</h1>
      <div className={styles.logos}>
        {/* First set of logos */}
        <div className={styles.logosSlide}>
          {LOGOS.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
        
        {/* Duplicate set for the infinite loop effect */}
        <div className={styles.logosSlide}>
          {LOGOS.map((logo, index) => (
            <img key={`dup-${index}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
      <hr className="fade-divider"/>
    </div>
  );
}
