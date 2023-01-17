// ==UserScript==
// @name         bgp.tools kagl Upgrades
// @namespace    https://kagl.me/
// @version      1.0.2-alpha1
// @grant        none
// @updateURL    a
// @downloadURL  a
// @match        https://bgp.tools/as/*
// @include      https://bgp.tools/as/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bgp.tools
// ==/UserScript==

(function() {
    'use strict';
		console.log("Script Load")
    const CAdata = {
        'AB': {
            name: 'Alberta',
            isProvince: true
        },
        'BC': {
            name: 'British Columbia',
            isProvince: true
        },
        'MB': {
            name: 'Manitoba',
            isProvince: true
        },
        'NB': {
            name: 'New Brunswick',
            isProvince: true
        },
        'NL': {
            name: 'Newfoundland and Labrador',
            isProvince: true
        },
        'ON': {
            name: 'Ontario',
            isProvince: true
        },
        'PE': {
            name: 'Prince Edward Island',
            isProvince: true
        },
        'SK': {
            name: 'Saskatchewan',
            isProvince: true
        },
        'QC': {
            name: 'Quebec',
            isProvince: true
        },
        'NU': {
            name: 'Nunavut',
            isProvince: false
        },
        'NT': {
            name: 'Northwest Territories',
            isProvince: false
        },
        'YK': {
            name: 'Yukon',
            isProvince: false
        }
    }

    // Scrape page
		console.log(window.location.hostname)
        const whois = document.getElementById("whois-page").innerText;
        if (!whois.includes("Country:        CA")) return;
				const netinfo = Array.from(document.querySelectorAll('div.network-header'))[0];
        const provinceOrTerritory = whois.substring(
          whois.indexOf("StateProv:      ") + 16,
          whois.indexOf("StateProv:      ") + 18);

        const url = `https://kagl.me/${(() => {
          const code = provinceOrTerritory.toLowerCase();
          switch (code) {
            case 'sk':
              return 'xs';
            case 'nt':
              return 'nwt';
            default:
              return code;
          }
        })()}.gif`
        const { name, isProvince } = CAdata[provinceOrTerritory];
        // Change page
  			const networkNumber = Array.from(document.querySelectorAll('p#network-number'))[0];
  			console.log(networkNumber);
				networkNumber.style.marginBottom = "0px";
        const regionText = isProvince ? 'Province ' : 'Territory ';
  			const regionStrong = document.createElement('strong');
  			regionStrong.textContent = name;
  			console.log(regionText)
  			const region = document.createElement('p');
        region.style.marginBottom = "0px";
  			region.style.marginTop = "0px"
  			region.textContent = regionText;
  			region.appendChild(regionStrong);
  			netinfo.appendChild(region);
})();
