async function pegarAnaliseDeCreditoDoArquivo() {
    // Lógica para pegar a análise de crédito do arquivo
    const analiseDeCredito = await fetch('/analise-de-credito')
        .then((result) => {
            return result.json();
        })
        .catch(err => console.log(err));
        
    console.log("Dados recebidos", analiseDeCredito);
    const listaItens = document.getElementById('credit-list');

    analiseDeCredito.forEach(credito => {
        const item = document.createElement('li');
        item.textContent = `Nome: ${credito.name}, Idade: ${credito.age}`;
        listaItens.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', pegarAnaliseDeCreditoDoArquivo);