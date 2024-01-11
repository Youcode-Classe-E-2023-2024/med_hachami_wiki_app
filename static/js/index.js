



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