



function diffTime(dateString) {
    const dateObject = new Date(dateString);
    const currentTime = new Date();

    const timeDifference = currentTime - dateObject; 
    const timeInMinutes = timeDifference / (1000 * 60);

    if (timeInMinutes < 60) {
        return `${Math.floor(timeInMinutes)} minute${Math.floor(timeInMinutes) !== 1 ? 's' : ''}`;
    } else {
        const hours = Math.floor(timeInMinutes / 60);
        const remainingMinutes = Math.floor(timeInMinutes % 60);
        const hoursText = hours > 1 ? 'hours' : 'hour';
        const minutesText = remainingMinutes > 0
            ? `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
            : '';

        return `${hours} ${hoursText}${minutesText ? ` and ${minutesText}` : ''}`;
    }
}





let wikiData;
const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': token, 
        'Content-Type': 'application/json'
    }
  }

function searchWiki(event){
    event.preventDefault();
    const wikiNameToSearch = event.target.value.trim().toLowerCase();
    console.log(wikiNameToSearch);
    const foundWiki = wikiData.filter(wiki => wiki.title.toLowerCase().includes(wikiNameToSearch));
    displayWiki(foundWiki);
}

fetchAndStoreWikiData();
//fetch categories and injected
async function getCategories() {

    const response = await fetch(`${apiurl}` + 'Main/allCategories' ,{
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
async function fetchCategories() {
    let displayByCategory = document.getElementById("displayByCategory");

    try {
      const data = await getCategories();
      const categories  = data;
      
      const categoryItem = categories.map((category)=>{
        return(
            `
            <option value="${category.id}" >${category.name}</option>
            `
        )
    })
    displayByCategory.innerHTML += categoryItem
    
    } catch (error) {
      console.error('Error:', error);
    }
  }
//fetch tags and injected
  async function getTags() {

    const response = await fetch(`${apiurl}` + 'Main/allTags' ,{
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
async function fetchTags() {
    let displayByTag = document.getElementById("displayByTag");

    try {
      const data = await getTags();
      const tags  = data;
      
      const tagItem = tags.map((tag)=>{
        return(
            `
            <option value="${tag.id}" >${tag.name}</option>
            `
        )
    })
    displayByTag.innerHTML += tagItem
    
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  fetchCategories();
  fetchTags();

  function displayWiki(wikis) {
    const ticketContainer = document.getElementById("ticketContainer");
    
        ticketContainer.innerHTML = "";

        if(wikis.length === 0) {
            ticketContainer.innerHTML = `
            <div class="" id="nowiki">
                <h1>No Wiki's Found</h1>
            </div>
            `
        }else{
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
  
  
  
  
 
 async function filter(){
    let displayOption1 = document.getElementById("displayByCategory");
    let category = displayOption1.value;
  
    let displayOption2 = document.getElementById("displayByTag");
    let tag = displayOption2.value;
  
    
    
      const response = await fetch(`${apiurl}` + 'Main/filter/'+category + '/' + tag ,{
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
      wikiData = data;
      displayWiki(wikiData);
    
    
  
  }
  
  
