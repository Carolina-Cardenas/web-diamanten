const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3000;  // Set port for server

// Replace with your downloaded credentials file path
const credentialsPath = '../credentials.json';

// Function to retrieve folder contents
async function getFolderContents(folderId) {
  const drive = google.drive({ version: 'v3' });
  const auth = new google.auth.JWT({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    keyFile: credentialsPath,
  });
  await auth.authorize();

  const files = await drive.files.list({
    pageSize: 100,  // Adjust page size if needed
    q: `'${folderId}' in parents and trashed=false`,
  });

  return files.data.files;
}

// Function to filter PDFs
function filterPDFs(files) {
  return files.filter(file => file.mimeType === 'application/pdf');
}

// Function to generate downloadable link (replace with your logic)
function generateDownloadLink(file) {
  // Implement logic to construct the downloadable link based on file information
  // This could involve constructing a public URL or using a temporary download token
  return `https://drive.google.com/file/d/${file.id}/view?usp=sharing`;  // Placeholder link
}

// Route to handle request for downloadable links
app.get('/download-links', async (req, res) => {
  const folderId = '1LDPUr0Trv3tEl9c6KHeSwjsudeAwWUyK';  // Replace with your folder ID
  
  try {
    const files = await getFolderContents(folderId);
    const pdfs = filterPDFs(files);
    const links = pdfs.map(generateDownloadLink);
    res.json(links);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving files');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));