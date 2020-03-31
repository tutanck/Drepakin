import AT from '../static/assets/flags/AT.png';
import BE from '../static/assets/flags/BE.png';
import CA from '../static/assets/flags/CA.png';
import CH from '../static/assets/flags/CH.png';
import CY from '../static/assets/flags/CY.png';
import DE from '../static/assets/flags/DE.png';
import DK from '../static/assets/flags/DK.png';
import EE from '../static/assets/flags/EE.png';
import ES from '../static/assets/flags/ES.png';
import FI from '../static/assets/flags/FI.png';
import FR from '../static/assets/flags/FR.png';
import HU from '../static/assets/flags/HU.png';
import IE from '../static/assets/flags/IE.png';
import IT from '../static/assets/flags/IT.png';
import JP from '../static/assets/flags/JP.png';
import LV from '../static/assets/flags/LV.png';
import MA from '../static/assets/flags/MA.png';
import NL from '../static/assets/flags/NL.png';
import NO from '../static/assets/flags/NO.png';
import PL from '../static/assets/flags/PL.png';
import PT from '../static/assets/flags/PT.png';
import RO from '../static/assets/flags/RO.png';
import SE from '../static/assets/flags/SE.png';
import SK from '../static/assets/flags/SK.png';
import TR from '../static/assets/flags/TR.png';

const getFlag = countryCode => {
  switch (countryCode) {
    case 'AT':
      return AT;
    case 'BE':
      return BE;
    case 'CA':
      return CA;
    case 'CH':
      return CH;
    case 'CY':
      return CY;
    case 'DE':
      return DE;
    case 'DK':
      return DK;
    case 'EE':
      return EE;
    case 'ES':
      return ES;
    case 'FI':
      return FI;
    case 'FR':
      return FR;
    case 'HU':
      return HU;
    case 'IE':
      return IE;
    case 'IT':
      return IT;
    case 'JP':
      return JP;
    case 'LV':
      return LV;
    case 'MA':
      return MA;
    case 'NL':
      return NL;
    case 'NO':
      return NO;
    case 'PL':
      return PL;
    case 'PT':
      return PT;
    case 'RO':
      return RO;
    case 'SE':
      return SE;
    case 'SK':
      return SK;
    case 'TR':
      return TR;

    default:
      return undefined;
  }
};

export { getFlag };
