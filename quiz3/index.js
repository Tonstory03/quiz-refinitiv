const axios = require('axios'); 
const { parse } = require('himalaya');

const TITLE = {
  FUNDNAME: 'Fund Name',
  NAV: 'Nav',
  OFFER: 'Offer',
  BID: 'Bid',
  CHANGE: 'Change'
};

const callServiceNAV = async (config) => {
  const url = 'https://codequiz.azurewebsites.net/';
  return axios.get(url, config);
}

const getTable = html => {
  return html
  .find(({tagName}) => tagName === 'html')
  .children
  .find(({tagName}) => tagName === 'body')
  .children
  .find(({tagName}) => tagName === 'table');
}

const getMapIdxTitle  = table => {
  return table.children[0].children
    .reduce((acc, curr, idx) => {
    const [{ content }] = curr.children;
    acc[content.trim()] = idx;
    return acc;
  }, {});
}

const findByFundname = (table, targetName, idxFundName) => { 
  return table.children
    .slice(1)
    .map(({children}) => children.filter( tr => tr.children))  
    .find(([ children ]) => children.children[idxFundName].content.trim() === targetName.trim());
}

const getInputFundName = () => {
  if(!(typeof process.argv[2] === 'string')) throw new Error('Please input a fundname !!!'); 
  return process.argv[2];
}

const main = async () => {
  try{
    const targetFundname = getInputFundName();
    const resp = await callServiceNAV({ headers: { Cookie: "hasCookie=true;" } }); 
    const html = parse(resp.data);
    const table = getTable(html); 
    const idxMapTitle =  getMapIdxTitle(table); 
    const [ idxFundName, idxNAV ] = [ idxMapTitle[TITLE.FUNDNAME], idxMapTitle[TITLE.NAV] ];
    const row = findByFundname(table, targetFundname, idxFundName);
    if(!row) throw new Error(`Not be able to find a "${targetFundname}" fundname`);
    const resultNAV = row[idxNAV].children[0].content;
    console.log(resultNAV)
    //console.log(`${targetFundname} NAV value is ${resultNAV}`) 
  }catch(err) { 
    console.log(err.message);
  }
}

main(); 