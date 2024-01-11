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

function navigateTo(wikiId){
  window.location.href = "WikiDetails.html?wikiId="+wikiId;
}

