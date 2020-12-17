const Apify = require('apify');

// const { utils: { log } } = Apify;

// at this point, the main page is already loaded in $
exports.handleStart = async ({ $ }) => {
  const requestQueue = await Apify.openRequestQueue();
  // start page, add all categories links to requestQueue
  const links = $('ul.main-menu-nav li.has-sub-nav > a');
  const menu = [];
  for (link in links) {
      if (links[link].attribs && links[link].attribs.href) {
        menu.push(links[link].attribs.href);
        await requestQueue.addRequest({
          url: 'https://www.kasa.cz' + links[link].attribs.href,
          userData: { label: 'LIST' },
      });
      console.log(`Saving ${links[link].attribs.href} to request queue.`)
      }
    }  
  console.log(`Saved all links (${menu.length}) to request queue.`)
};

//v {} si posilam informace, ktere chci mit, tedy tady navic state, ve kterem je pocet produktu, a request, ze ktereho taham url a mohu tahat i label
exports.handleList = async ({ $, state, request }) => {
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
    // console.log(`Adding ${list[l].replace(/\D/g, '')} items from category ${list[l]}`)
    }
  //kdyz to mam cele vypocitane, pridam to k tomu, co uz mam spocitane z jinych stranek
  state.productCount += sum;
  console.log(`Products on this page: ${sum}, ${request.url}, products altogether so far ${state.productCount}`)
};
