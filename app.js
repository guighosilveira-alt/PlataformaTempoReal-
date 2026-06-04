// TODO: Substitua as configurações abaixo pelas credenciais do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAiCNzPp0XfrJtBoax-1B6O9yljYHN2NHI",
    authDomain: "plataformatemporeal.firebaseapp.com",
    databaseURL: "https://plataformatemporeal-default-rtdb.firebaseio.com/",
    projectId: "plataformatemporeal",
    storageBucket: "plataformatemporeal.appspot.com",
    messagingSenderId: "1014332115482",
    appId: "1:1014332115482:web:f7072f322d403c56c49fa3"
};


// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referências dos elementos da tela
const infoExibida = document.getElementById('info-exibida');
const novoDadoInput = document.getElementById('novo-dado');
const btnEnviar = document.getElementById('btn-enviar');

// 1. ESCUTAR ATUALIZAÇÕES EM TEMPO REAL
// Sempre que o valor mudar no banco, essa função roda sozinha em todos os celulares
database.ref('informacao_compartilhada').on('value', (snapshot) => {
    const data = snapshot.val();
    infoExibida.innerText = data ? data : "Nenhuma informação inserida ainda.";
});

// 2. ENVIAR NOVA INFORMAÇÃO
btnEnviar.addEventListener('click', () => {
    const texto = novoDadoInput.value.trim();
    
    if (texto !== "") {
        // Salva no banco de dados (isso vai disparar o evento 'on' acima para todo mundo)
        database.ref('informacao_compartilhada').set(texto)
        .then(() => {
            novoDadoInput.value = ""; // Limpa o campo
        })
        .catch((error) => {
            alert("Erro ao salvar: " + error.message);
        });
    }
});
