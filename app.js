
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/list.html'));
});

app.get('/analise-de-credito', (req, res) => {
    const analiseDeCredito = pegarAnaliseDeCreditoDoArquivo();
    res.json(analiseDeCredito);
});

app.post('/analise-de-credito', (req, res) => {
    const analiseDeCredito = req.body;

    const analiseDeCreditoDoArquivo = pegarAnaliseDeCreditoDoArquivo();
    analiseDeCreditoDoArquivo.push(analiseDeCredito);

    fs.writeFileSync('analise-de-credito.json', JSON.stringify(analiseDeCreditoDoArquivo, null, 2));
    res.redirect('/test123');
});


function pegarAnaliseDeCreditoDoArquivo() {
    // Lógica para pegar a análise de crédito do arquivo
    return JSON.parse(fs.readFileSync('analise-de-credito.json', 'utf-8'));
}

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
