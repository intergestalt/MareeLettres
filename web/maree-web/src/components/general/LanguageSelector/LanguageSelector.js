import React from 'react';
import i18n from '../../../i18n/i18n';

class LanguageSelector extends React.Component {
  changeLanguage(lng) {
    i18n.changeLanguage(lng);
  }
  render() {
    return (
      <div>
         <button onClick={() => this.changeLanguage('fr')}>fr</button>
         <button onClick={() => this.changeLanguage('en')}>en</button>
      </div>
    );
  }
}

export default LanguageSelector;
