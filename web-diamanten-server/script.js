const button = document.getElementById('get-links-button');
const downloadList = document.getElementById('download-links-list');

button.addEventListener('click', async () => {
  try {
    const response = await fetch('/download-links');  // Replace with your server endpoint
    const data = await response.json();
    
    if (data.length > 0) {
      data.forEach(link => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = 'Download PDF';
        listItem.appendChild(linkElement);
        downloadList.appendChild(listItem);
      });
    } else {
      alert('No PDFs found!');
    }
  } catch (error) {
    console.error(error);
    alert('Error retrieving links');
  }
});