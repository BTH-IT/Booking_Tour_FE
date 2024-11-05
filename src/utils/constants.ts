import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const countryList = [
  { label: 'Select your country', value: '' },
  ...[
    { label: 'Afghanistan', value: 'af' },
    { label: 'Sudan', value: 'sd' },
    { label: 'Burundi', value: 'bi' },
    { label: 'Mexico', value: 'mx' },
    { label: 'Cuba', value: 'cu' },
    { label: 'Serbia', value: 'rs' },
    { label: 'Monaco', value: 'mc' },
    { label: 'Bhutan', value: 'bt' },
    { label: 'Guyana', value: 'gy' },
    { label: 'South Georgia', value: 'gs' },
    { label: 'Bosnia and Herzegovina', value: 'ba' },
    { label: 'Brunei', value: 'bn' },
    { label: 'Pakistan', value: 'pk' },
    { label: 'Kenya', value: 'ke' },
    { label: 'Puerto Rico', value: 'pr' },
    { label: 'Somalia', value: 'so' },
    { label: 'Svalbard and Jan Mayen', value: 'sj' },
    { label: 'Sierra Leone', value: 'sl' },
    { label: 'French Polynesia', value: 'pf' },
    { label: 'Azerbaijan', value: 'az' },
    { label: 'Cook Islands', value: 'ck' },
    { label: 'Peru', value: 'pe' },
    { label: 'Bouvet Island', value: 'bv' },
    { label: 'Northern Mariana Islands', value: 'mp' },
    { label: 'Angola', value: 'ao' },
    { label: 'Republic of the Congo', value: 'cg' },
    { label: 'South Sudan', value: 'ss' },
    { label: 'Saint Martin', value: 'mf' },
    { label: 'Turkey', value: 'tr' },
    { label: 'Anguilla', value: 'ai' },
    { label: 'Saint Kitts and Nevis', value: 'kn' },
    { label: 'Aruba', value: 'aw' },
    { label: 'Turks and Caicos Islands', value: 'tc' },
    { label: 'Taiwan', value: 'tw' },
    { label: 'Sweden', value: 'se' },
    { label: 'Liberia', value: 'lr' },
    { label: 'Venezuela', value: 've' },
    { label: 'United States Virgin Islands', value: 'vi' },
    { label: 'Bermuda', value: 'bm' },
    { label: 'Albania', value: 'al' },
    { label: 'Hong Kong', value: 'hk' },
    { label: 'Luxembourg', value: 'lu' },
    { label: 'Eritrea', value: 'er' },
    { label: 'Colombia', value: 'co' },
    { label: 'Caribbean Netherlands', value: 'bq' },
    { label: 'Mongolia', value: 'mn' },
    { label: 'Yemen', value: 'ye' },
    { label: 'Lebanon', value: 'lb' },
    { label: 'Antigua and Barbuda', value: 'ag' },
    { label: 'Vietnam', value: 'vn' },
    { label: 'Palau', value: 'pw' },
    { label: 'Jersey', value: 'je' },
    { label: 'Trinidad and Tobago', value: 'tt' },
    { label: 'Israel', value: 'il' },
    { label: 'Bulgaria', value: 'bg' },
    { label: 'Portugal', value: 'pt' },
    { label: 'Gibraltar', value: 'gi' },
    { label: 'San Marino', value: 'sm' },
    { label: 'Singapore', value: 'sg' },
    { label: 'Sint Maarten', value: 'sx' },
    { label: 'Saudi Arabia', value: 'sa' },
    { label: 'Ghana', value: 'gh' },
    { label: 'Moldova', value: 'md' },
    { label: 'Chad', value: 'td' },
    { label: 'Antarctica', value: 'aq' },
    { label: 'United Kingdom', value: 'gb' },
    { label: 'Papua New Guinea', value: 'pg' },
    { label: 'French Southern and Antarctic Lands', value: 'tf' },
    { label: 'United States Minor Outlying Islands', value: 'um' },
    { label: 'Belize', value: 'bz' },
    { label: 'Comoros', value: 'km' },
    { label: 'Burkina Faso', value: 'bf' },
    { label: 'Faroe Islands', value: 'fo' },
    { label: 'Guinea', value: 'gn' },
    { label: 'India', value: 'in' },
    { label: 'Curaçao', value: 'cw' },
    { label: 'Togo', value: 'tg' },
    { label: 'Tunisia', value: 'tn' },
    { label: 'Saint Barthélemy', value: 'bl' },
    { label: 'Indonesia', value: 'id' },
    { label: 'Micronesia', value: 'fm' },
    { label: 'Austria', value: 'at' },
    { label: 'Tajikistan', value: 'tj' },
    { label: 'DR Congo', value: 'cd' },
    { label: 'Mayotte', value: 'yt' },
    { label: 'Réunion', value: 're' },
    { label: 'Romania', value: 'ro' },
    { label: 'Qatar', value: 'qa' },
    { label: 'Lithuania', value: 'lt' },
    { label: 'China', value: 'cn' },
    { label: 'New Zealand', value: 'nz' },
    { label: 'Norfolk Island', value: 'nf' },
    { label: 'Mauritania', value: 'mr' },
    { label: 'Uzbekistan', value: 'uz' },
    { label: 'Finland', value: 'fi' },
    { label: 'Cameroon', value: 'cm' },
    { label: 'Heard Island and McDonald Islands', value: 'hm' },
    { label: 'Dominica', value: 'dm' },
    { label: 'Iceland', value: 'is' },
    { label: 'Oman', value: 'om' },
    { label: 'North Macedonia', value: 'mk' },
    { label: 'Liechtenstein', value: 'li' },
    { label: 'Spain', value: 'es' },
    { label: 'Greece', value: 'gr' },
    { label: 'Paraguay', value: 'py' },
    { label: 'Bahrain', value: 'bh' },
    { label: 'Niue', value: 'nu' },
    { label: 'Senegal', value: 'sn' },
    { label: 'Montserrat', value: 'ms' },
    { label: 'Latvia', value: 'lv' },
    { label: 'Tokelau', value: 'tk' },
    { label: 'Japan', value: 'jp' },
    { label: 'Central African Republic', value: 'cf' },
    { label: 'Gabon', value: 'ga' },
    { label: 'Iraq', value: 'iq' },
    { label: 'Isle of Man', value: 'im' },
    { label: 'Myanmar', value: 'mm' },
    { label: 'Montenegro', value: 'me' },
    { label: 'Nauru', value: 'nr' },
    { label: 'Vanuatu', value: 'vu' },
    { label: 'France', value: 'fr' },
    { label: 'Zimbabwe', value: 'zw' },
    { label: 'Philippines', value: 'ph' },
    { label: 'Slovakia', value: 'sk' },
    { label: 'Australia', value: 'au' },
    { label: 'Ivory Coast', value: 'ci' },
    { label: 'British Indian Ocean Territory', value: 'io' },
    { label: 'Eswatini', value: 'sz' },
    { label: 'Rwanda', value: 'rw' },
    { label: 'Benin', value: 'bj' },
    { label: 'British Virgin Islands', value: 'vg' },
    { label: 'Uganda', value: 'ug' },
    { label: 'Ireland', value: 'ie' },
    { label: 'Iran', value: 'ir' },
    { label: 'Slovenia', value: 'si' },
    { label: 'Mali', value: 'ml' },
    { label: 'Switzerland', value: 'ch' },
    { label: 'American Samoa', value: 'as' },
    { label: 'Uruguay', value: 'uy' },
    { label: 'Guam', value: 'gu' },
    { label: 'Suriname', value: 'sr' },
    { label: 'Ukraine', value: 'ua' },
    { label: 'Czechia', value: 'cz' },
    { label: 'Honduras', value: 'hn' },
    { label: 'Samoa', value: 'ws' },
    { label: 'Laos', value: 'la' },
    { label: 'Cape Verde', value: 'cv' },
    { label: 'Ethiopia', value: 'et' },
    { label: 'Bangladesh', value: 'bd' },
    { label: 'Saint Helena, Ascension and Tristan da Cunha', value: 'sh' },
    { label: 'Belarus', value: 'by' },
    { label: 'Croatia', value: 'hr' },
    { label: 'Kuwait', value: 'kw' },
    { label: 'French Guiana', value: 'gf' },
    { label: 'Morocco', value: 'ma' },
    { label: 'Russia', value: 'ru' },
    { label: 'Estonia', value: 'ee' },
    { label: 'Sri Lanka', value: 'lk' },
    { label: 'New Caledonia', value: 'nc' },
    { label: 'Poland', value: 'pl' },
    { label: 'Madagascar', value: 'mg' },
    { label: 'Costa Rica', value: 'cr' },
    { label: 'El Salvador', value: 'sv' },
    { label: 'Macau', value: 'mo' },
    { label: 'Andorra', value: 'ad' },
    { label: 'Italy', value: 'it' },
    { label: 'Namibia', value: 'na' },
    { label: 'Seychelles', value: 'sc' },
    { label: 'Panama', value: 'pa' },
    { label: 'Haiti', value: 'ht' },
    { label: 'Argentina', value: 'ar' },
    { label: 'Niger', value: 'ne' },
    { label: 'Malawi', value: 'mw' },
    { label: 'Pitcairn Islands', value: 'pn' },
    { label: 'Germany', value: 'de' },
    { label: 'Kiribati', value: 'ki' },
    { label: 'Syria', value: 'sy' },
    { label: 'Marshall Islands', value: 'mh' },
    { label: 'Hungary', value: 'hu' },
    { label: 'Cayman Islands', value: 'ky' },
    { label: 'Denmark', value: 'dk' },
    { label: 'Saint Lucia', value: 'lc' },
    { label: 'Bolivia', value: 'bo' },
    { label: 'Djibouti', value: 'dj' },
    { label: 'South Africa', value: 'za' },
    { label: 'Nigeria', value: 'ng' },
    { label: 'São Tomé and Príncipe', value: 'st' },
    { label: 'Nicaragua', value: 'ni' },
    { label: 'Guadeloupe', value: 'gp' },
    { label: 'Saint Pierre and Miquelon', value: 'pm' },
    { label: 'Ecuador', value: 'ec' },
    { label: 'Greenland', value: 'gl' },
    { label: 'Grenada', value: 'gd' },
    { label: 'Bahamas', value: 'bs' },
    { label: 'Chile', value: 'cl' },
    { label: 'Malaysia', value: 'my' },
    { label: 'Tuvalu', value: 'tv' },
    { label: 'Christmas Island', value: 'cx' },
    { label: 'Solomon Islands', value: 'sb' },
    { label: 'Tanzania', value: 'tz' },
    { label: 'North Korea', value: 'kp' },
    { label: 'Guinea-Bissau', value: 'gw' },
    { label: 'Kosovo', value: 'xk' },
    { label: 'Vatican City', value: 'va' },
    { label: 'Norway', value: 'no' },
    { label: 'Palestine', value: 'ps' },
    { label: 'Cocos (Keeling) Islands', value: 'cc' },
    { label: 'Jamaica', value: 'jm' },
    { label: 'Egypt', value: 'eg' },
    { label: 'Cambodia', value: 'kh' },
    { label: 'Mauritius', value: 'mu' },
    { label: 'Gambia', value: 'gm' },
    { label: 'Equatorial Guinea', value: 'gq' },
    { label: 'Lesotho', value: 'ls' },
    { label: 'Martinique', value: 'mq' },
    { label: 'United States', value: 'us' },
    { label: 'Western Sahara', value: 'eh' },
    { label: 'United Arab Emirates', value: 'ae' },
    { label: 'Mozambique', value: 'mz' },
    { label: 'Algeria', value: 'dz' },
    { label: 'Zambia', value: 'zm' },
    { label: 'Guatemala', value: 'gt' },
    { label: 'South Korea', value: 'kr' },
    { label: 'Kyrgyzstan', value: 'kg' },
    { label: 'Timor-Leste', value: 'tl' },
    { label: 'Åland Islands', value: 'ax' },
    { label: 'Jordan', value: 'jo' },
    { label: 'Malta', value: 'mt' },
    { label: 'Cyprus', value: 'cy' },
    { label: 'Falkland Islands', value: 'fk' },
    { label: 'Kazakhstan', value: 'kz' },
    { label: 'Botswana', value: 'bw' },
    { label: 'Saint Vincent and the Grenadines', value: 'vc' },
    { label: 'Barbados', value: 'bb' },
    { label: 'Tonga', value: 'to' },
    { label: 'Thailand', value: 'th' },
    { label: 'Belgium', value: 'be' },
    { label: 'Canada', value: 'ca' },
    { label: 'Georgia', value: 'ge' },
    { label: 'Wallis and Futuna', value: 'wf' },
    { label: 'Fiji', value: 'fj' },
    { label: 'Netherlands', value: 'nl' },
    { label: 'Armenia', value: 'am' },
    { label: 'Dominican Republic', value: 'do' },
    { label: 'Guernsey', value: 'gg' },
    { label: 'Turkmenistan', value: 'tm' },
    { label: 'Nepal', value: 'np' },
    { label: 'Maldives', value: 'mv' },
    { label: 'Libya', value: 'ly' },
    { label: 'Brazil', value: 'br' },
  ].sort((a: any, b: any) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  }),
];

export const theme = {
  colorPrimary: '#5c98f2',
};

export const BE_URL = 'http://localhost:5000';

export const KEY_LOCALSTORAGE = {
  ACCESS_TOKEN: 'access_token',
  CURRENT_ACCOUNT: 'current_account',
  CURRENT_USER: 'current_user',
  REFRESH_TOKEN: 'refresh_token',
};

export const CLEAR_LOCALSTORAGE = () => {
  localStorage.removeItem(KEY_LOCALSTORAGE.ACCESS_TOKEN);
  localStorage.removeItem(KEY_LOCALSTORAGE.REFRESH_TOKEN);
  localStorage.removeItem(KEY_LOCALSTORAGE.CURRENT_USER);
  localStorage.removeItem(KEY_LOCALSTORAGE.CURRENT_ACCOUNT);
};

export const SET_LOCALSTORAGE = (data: any) => {
  localStorage.setItem(KEY_LOCALSTORAGE.ACCESS_TOKEN, data.accessToken);
  localStorage.setItem(
    KEY_LOCALSTORAGE.CURRENT_USER,
    JSON.stringify(data.user)
  );
  localStorage.setItem(
    KEY_LOCALSTORAGE.CURRENT_ACCOUNT,
    JSON.stringify(data.account)
  );
  localStorage.setItem(KEY_LOCALSTORAGE.REFRESH_TOKEN, data.refreshToken);
};

export function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const dayList = [];
  while (date.getMonth() === month) {
    dayList.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dayList;
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function totalDates(start: Date, end: Date) {
  return Math.ceil(
    (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24),
  );
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Use regex to format the phone number in the desired format
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
}

export function average(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function logError(error: any) {
  console.error(error);
  if (error instanceof AxiosError) {
    console.log(error);
    toast.error(error.response?.data.message || error.message);
  }
}

export const faqList = [
  {
    title: 'Can I get the refund?',
    content:
      'We have you covered! We will email you as items in your order ship, or if there are updates on the status of your order. Can’t find the email?Click here to check the status of your order.',
  },
  {
    title: 'Can I change the travel date?',
    content:
      'We have you covered! We will email you as items in your order ship, or if there are updates on the status of your order. Can’t find the email?Click here to check the status of your order.',
  },
  {
    title: 'My discount code is not working, what do I do?',
    content:
      'We have you covered! We will email you as items in your order ship, or if there are updates on the status of your order. Can’t find the email?Click here to check the status of your order.',
  },
  {
    title: 'Do I need to apply visa?',
    content:
      'We have you covered! We will email you as items in your order ship, or if there are updates on the status of your order. Can’t find the email?Click here to check the status of your order.',
  },
  {
    title: 'Do you have insurance covered?',
    content:
      'We have you covered! We will email you as items in your order ship, or if there are updates on the status of your order. Can’t find the email?Click here to check the status of your order.',
  },
];
