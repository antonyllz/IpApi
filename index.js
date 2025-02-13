const ipJson = [];
const getIP = document.querySelector('#getIP');
const inputIP = document.querySelector('#inputIP');
const ipTable = document.querySelector('#ipTable');

getIP.addEventListener('click', addIp);
document
  .querySelector('#inputIP')
  .addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
    if (key == 13) {
      addIp();
    }
  });

function addIp() {
  ipAddress = inputIP.value;

  if (!ipAddress) {
    alertInfo = document.querySelector('#alert-info');
    alertInfo.innerHTML = `<div class="alert alert-primary" role="alert"><strong>Atenção!</strong> IP Inválido!</div>`;
  } else {
    if (ipJson.length == 0) {
      show = document.querySelector('.tabela').style.display = 'inherit';
      ipTable.innerHTML = `<thead><tr><th>IP</th><th>Organização</th><th>País</th><th>Cidade</th><th>Apagar</th></tr></thead><tbody></tbody>`;
    }

    flag = false;
    for (let i = 0; i < ipJson.length; i++) {
      if (ipJson[i].ip == ipAddress) {
        flag = true;
        break;
      }
    }

    if (!flag) {
      ipTableBody = document.querySelector('tbody');
      let url = `https://ipinfo.io/${ipAddress}/json?token=ea38c5437881ca`;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (values) {
          ip = values.ip;
          try {
            city = values.city;
          } catch (e) {
            city = '-';
          }
          try {
            country = values.country;
          } catch (e) {
            country = '-';
          }
          try {
            org = values.org;
          } catch (e) {
            org = '-';
          }
          if (city == 'undefined' || !city) {
            city = '-';
          }
          if (country == 'undefined' || !country) {
            country = '-';
          }
          let addJson = {
            ip: ip,
            city: city,
            country: country,
            org: org,
            close: `<i class="fa fa-times ${ipJson.length}" style="font-size: 22px;"></i>`,
          };
          ipJson.push(addJson);
          render();
        });
    }
  }
}

function render() {
  textTable = '';
  for (let i = 0; i < ipJson.length; i++) {
    textTable =
      `<tr><td>${ipJson[i].ip}</td><td>${ipJson[i].org}</td><td>${ipJson[i].country}</td><td>${ipJson[i].city}</td><td><a href="#">${ipJson[i].close}</a></td></tr>` +
      textTable;
  }
  
  ipTableBody.innerHTML = textTable;
  let cells = document.querySelectorAll('i');
  for (let c = 0; c < cells.length; c++) {
    cells[c].addEventListener('click', function (opa) {
      let index = 0;
      for (let i = 0; i < ipJson.length; i++) {
        str = outerHTML(opa.target);
        console.log(str);
        console.log(ipJson[i].close);
        if (ipJson[i].close == str) {
          index = i;
          break;
        }
      }
      ipJson.splice(index, 1);
      render();
    });
  }
}

function outerHTML(node) {
  return node.outerHTML || new XMLSerializer().serializeToString(node);
}