



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
