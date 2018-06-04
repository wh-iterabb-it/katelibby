import entities from 'entities';

function sanitize(data) {
  let clean;

  if (!data) {
    data = '';
  }

  if (Array.isArray(data) && data.length === 1) {
    clean = data[0]; // eslint-disable-line
  } else {
    clean = data;
  }

  // Change empty objects into strings
  if (Object.keys(clean).length === 0 && JSON.stringify(clean) === JSON.stringify({})) {
    clean = '';
  }

  clean = entities.decodeHTML(clean);

  // change html br to rn
  clean = clean.replace(/<\/?(br *\/?)>/gi, '\r\n');

  let lines = clean.split('\r\n');

  lines.forEach((l) => {
    if (l) {
      l = l.trim();
    }
  });

  // remove empty lines, or null
  lines = lines.filter((value) => {
    return !(value === '' || value === null);
  });

  clean = lines.join('\n');

  return clean;
}

  /**
   * detectHostName
   * @param {string} url - a url parsed from a message to get a host name from
   * @return {string} a hostname
   */
function detectHostName(url) {
  let hostname;
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

/**
 * detectHostName
 * @param {string} url - a url parsed from a message to get a host name from
 * @return {string} a domain
 */
function extractRootDomain(url) {
  let domain = detectHostName(url);
  let splitArr = domain.split('.');
  let arrLen = splitArr.length;

  // extracting the root domain here
  // if there is a subdomain 
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      // this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain;
    }
  }

  return domain;
}

export default {sanitize, detectHostName, extractRootDomain}
