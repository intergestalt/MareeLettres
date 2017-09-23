import React from 'react';
import i18n from '../../../i18n/i18n';
import './style.css';

class LanguageSelector extends React.Component {
  changeLanguage(lng) {
    i18n.changeLanguage(lng);
  }
  render() {
    return (
      <div className="laguage-selector">
         <span className={i18n.language == 'fr' ? "active" : ""} onClick={() => this.changeLanguage('fr')}>fr</span>
         &nbsp;{'/'}&nbsp;
         <span className={i18n.language == 'en' ? "active" : ""} onClick={() => this.changeLanguage('en')}>en</span>
      </div>
    );
  }
}

export default LanguageSelector;
