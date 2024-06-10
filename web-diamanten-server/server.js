const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const publicDirectory = path.join(__dirname, 'arsredovisning');

app.use(express.static(publicDirectory));

// Endpoint para obtener la lista de PDFs
app.get('/pdf-list', (req, res) => {
    const getFilesRecursively = (dir, fileList = []) => {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                getFilesRecursively(filePath, fileList);
            } else if (file.endsWith('.pdf')) {
                fileList.push(filePath.replace(publicDirectory, ''));
            }
        });

        return fileList;
    };

    const pdfList = getFilesRecursively(publicDirectory);
    res.json(pdfList);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
