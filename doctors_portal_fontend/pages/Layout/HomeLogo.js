import React from 'react';

export default function HomeLogo({ doctorLogoPath }) {
  return (
    <div className="HomeLogo">
      <header>
        <div className="avatar indicator py-3">
          <div className="w-20 h-20 rounded-lg">
            <img src={doctorLogoPath} width={70} height={70} alt="Doctor's Portal" style={{ borderRadius: '50%' }} />
          </div>
        </div>
      </header>
    </div>
  );
}
