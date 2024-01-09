



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







function insertDataModal(wikiId, title , desc){
    const ticketName =document.getElementById("title");
    ticketName.innerHTML = title;

    const name =document.getElementById("name");
    name.value = title;
    
    const content = document.getElementById("content");
    content.value = desc;
    
    let saveBtn = document.getElementById("saveBtn");
    
    saveBtn.addEventListener('click' ,(event)=>{
        event.preventDefault();
        let smallModal = document.getElementById("smallModal");
        let fade = document.querySelector(".modal-backdrop");
        fade.style.display = "none";
        smallModal.style.display = 'none';
        
        updateWiki(name.value ,content.value , wikiId);
    });
    
}

function insertDataModal2(wikiId){
    let saveBtn = document.getElementById("deleteSaveBtn");
   
    saveBtn.addEventListener('click' ,(event)=>{
        event.preventDefault();
        let smallModal = document.getElementById("deletModal");
        let fade = document.querySelector(".modal-backdrop ");
        fade.style.display = "none";
        smallModal.style.display = 'none';

        deleteWiki(wikiId);
        
    });
}

function updateWiki(name , content , wikiId){
    let data={
        wikiId: wikiId,
        title:name,
        content:content
    }
    fetch(`${apiurl}` + 'Main/editWiki/' +`${wikiId}`,{
        method: 'PUT',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response =>{
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
    })
    .then(data => {
    console.log(data);
        if(data.message){

        let alert = document.getElementById("alert1");
        alert.textContent = "Updated successfully" ;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 4000);
        fetchAndStoreMyWikiData();
        }

        
        
        
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });
}

function deleteWiki(wikiId){
    console.log(wikiId);
    fetch(`${apiurl}` + 'Main/deleteWiki/'+`${wikiId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    })
    .then(response =>{
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
    })
    .then(data => {
    console.log(data);
        if(data.message){
        
        let alert = document.getElementById("alert2");
        alert.textContent = "Deleted successfully" ;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 4000);
        
        fetchAndStoreMyWikiData();
        }

        
        
    })
    .catch(error => {
        console.log("Error fetching status options:"+ error);
        
    });
}

