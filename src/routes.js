const Apify = require('apify');

// const { utils: { log } } = Apify;

// at this point, the main page is already loaded in $
exports.handleStart = async ({ $ }) => {
  const requestQueue = await Apify.openRequestQueue();
  // start page, add all categories links to requestQueue
  
  const links = $('ul.main-menu-nav li.has-sub-nav > a');
  const menu = [];
    for (link in links) {
      if (links[link].attribs.href) {
        menu.push('https://www.kasa.cz' + links[link].attribs.href);
        await requestQueue.addRequest({
          url: 'https://www.kasa.cz' + links[link].attribs.href,
          userData: { label: 'LIST' },
      });
      console.log(links[link])
      }
    }  
  return menu
};

exports.handleList = async ({ $ }) => {
  // const requestQueue = await Apify.openRequestQueue();
  let cat = $('.tit')  
  let list = [];
  for (c of cat.get()) 
    { if ($(c).text()) 
      { 
        list.push( $(c).text().trim() ) 
      } 
    }
  // how do I save this not to delete it in every run? dám sum někam jinam, na zacatek? A jak ho pak nasdilim sem?
  let sum = 0
  for (l in list) { 
    sum += Number(list[l].replace(/\D/g, ''))
    }
};
