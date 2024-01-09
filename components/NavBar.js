const imgStore = "http://localhost/med_hachami_wiki/public/store/";
const img = localStorage.getItem("image");
const id = localStorage.getItem("id");
const fullName = localStorage.getItem("fullName");
const token = localStorage.getItem('token');
const apiurl = "http://localhost/med_hachami_wiki/";

var path = window.location.pathname;
var currentUrl = path.substring(1);
var currentPage = currentUrl.replace(/\.html$/, '');

function generateNavbar() {
    return `
    <nav
    class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
    id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      
      <div  class="${currentPage === 'index' ? 'navbar-nav align-items-center' : 'hide'}">
        <div class="nav-item d-flex align-items-center">
          <i class="bx bx-search fs-4 lh-0"></i>
          <input
            id="search-nav"
            onkeyup="searchWiki(event)"
            type="text"
            class="form-control border-0 shadow-none ps-1 ps-sm-2"
            placeholder="Search..."
            aria-label="Search..." />
        </div>
      </div>
      <!-- /Search -->

      <ul class="navbar-nav flex-row align-items-center ms-auto">
        

        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a class="nav-link dropdown-toggle  hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" >
            <div class="avatar avatar-online">
              <img src="${imgStore}${img}" alt class="w-px-40 h-auto rounded-circle" />
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar avatar-online">
                      <img src="${imgStore}${img}" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <span class="fw-medium d-block">John Doe</span>
                    <small class="text-muted">Admin</small>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class="bx bx-user me-2"></i>
                <span class="align-middle">My Profile</span>
              </a>
            </li>
            
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li>
              <a class="dropdown-item" href="javascript:void(0);">
                <i class="bx bx-power-off me-2"></i>
                <span class="align-middle" onclick="logOut()" >Log Out</span>
              </a>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
    </div>
  </nav>
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = generateNavbar();
    }
});

function navigateTo(ticketId){
  window.location.href = "TicketDetails.html?ticketId="+ticketId;
}


async function getResponse() {
  const response = await fetch(`${apiurl}` + 'Main/allWikis' ,{
    method: 'GET',
    headers: {
        'Authorization': token, 
        'Content-Type': 'application/json'
    }
  
  });
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  
  return data;
}
async function fetchAndStoreWikiData() {
  try {
    const data = await getResponse();
    wikiData = data;
    displayWiki(wikiData);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayWiki(wikis) {
  const ticketContainer = document.getElementById("ticketContainer");
      ticketContainer.innerHTML = "";
      const ticketItem = wikis.map((wiki) => {
         
         
        
          return (
              `
              <div class="col-sm-9 col-md-4 col-lg-3 mb-4 " onclick="navigateTo('${wiki.id}')" >
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex  align-items-center">
                          <div class="avatar-online">
                              <img src="${imgStore}${wiki.creatorImg}" alt class="w-px-40 h-auto rounded-circle" />
                          </div>
                          
                          <h5 class="card-title mt-4 p-2">${wiki.creatorName}</h5>
                          
                          
                      </div>
                      <p class="card-text">
                      <span style="font-size: 20px;color: #000;">${wiki.title}</span><br/>
                      ${wiki.content}
                      </p>
                      <div class="d-flex ">
                          <span class="badge bg-label-dark ms-2">${wiki.category}</span>
                      </div>
                      
                    </div>
                  </div>
                  </div>
              
              `
          )   
      })
      ticketContainer.innerHTML= ticketItem
}

//My wiki
async function getWiResponse() {
  const response = await fetch(`${apiurl}` + 'Main/myWiki/'+`${id}` ,{
    method: 'GET',
    headers: {
        'Authorization': token, 
        'Content-Type': 'application/json'
    }
  
  });
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  
  return data;
}


async function fetchAndStoreMyWikiData() {
  try {
    const data = await getWiResponse();
    wikiData = data;
    displayMyWiki(wikiData);
    
  } catch (error) {
    console.error('Error:', error);
  }
}


function displayMyWiki(wikis){
  const ticketContainer = document.getElementById("ticketContainer");
        ticketContainer.innerHTML = "";
        const ticketItem = wikis.map((wiki) => {
           let tags = wiki.tags.split(',');
           
           
          
            return (
                `
                <div class="col-sm-12  col-lg-3 mb-4 w-full">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex  align-items-center">
                            <div class="avatar-online">
                                <img src="${imgStore}${wiki.creatorImg}" alt class="w-px-40 h-auto rounded-circle" />
                               
                            </div>
                            <div class="d-flex flex-wrap md:flex-col upd-del-Btn " >
                                <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#smallModal"
                                onclick="insertDataModal(${wiki.id}, '${wiki.title}','${wiki.content}');"
                                style="background-color: transparent;width: 20px;"
                                >
                                    <i class='bx bxs-dashboard' ></i>
                                </button>
                                <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#deletModal"
                                onclick="insertDataModal2(${wiki.id});"
                                style="background-color: transparent;width: 20px;"
                                >
                                <i class='bx bx-trash-alt' ></i>
                                </button>

                            </div>
                            
                            <h5 class="card-title mt-4 p-2" onclick="navigateTo('${wiki.id}')" style="cursor: pointer;" >${wiki.title}</h5>
                            
                            
                        </div>
                        <p class="card-text">
                        ${wiki.content}
                        </p>
                        <div class="d-flex ">
                            ${
                                tags.map((tag)=>{
                                    return`
                                    <span class="badge bg-label-dark btn btn-outline-dark ms-2">${tag}</span>
                                    `
                                }).join('')
                            }
                            
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="align-items-bottom">
                                
                            </div>
                            
                        </div>
                      </div>
                    </div>
                    
                    </div>
                
                `
            )   
        })
        if(wikis.length === 0) {
            let nodata = document.createElement("h2");
            nodata.textContent = "You have no wiki's";
            nodata.classList.add("text-dark"); 
            ticketContainer.appendChild(nodata);
            
            
        }else{
            ticketContainer.innerHTML= ticketItem;
        }
}

fetchAndStoreMyWikiData();