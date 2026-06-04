// MANTENHA AS SUAS CONFIGURAÇÕES REAIS DO FIREBASE AQUI ABAIXO:
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

// Seleção dos elementos visuais
const zonaMensagens = document.getElementById('zona-mensagens');
const nomeUsuarioInput = document.getElementById('nome-usuario');
const textoMensagemInput = document.getElementById('texto-mensagem');
const btnEnviar = document.getElementById('btn-enviar');

// 1. ESCUTAR AS NOVAS MENSAGENS NO BANCO
// 'child_added' roda uma vez para cada mensagem antiga e roda de novo sempre que chegar uma nova
database.ref('sala_mensagens').on('child_added', (snapshot) => {
    const dadosMensagem = snapshot.val();
    
    // Criar a estrutura do balão de mensagem dinamicamente
    const balao = document.createElement('div');
    balao.classList.add('msg-bula');
    
    balao.innerHTML = `
        <span class="msg-meta">${dadosMensagem.autor}</span>
        <p class="msg-texto">${dadosMensagem.texto}</p>
        <span class="msg-hora">${dadosMensagem.hora}</span>
    `;
    
    // Adiciona o balão na tela do chat
    zonaMensagens.appendChild(balao);
    
    // Joga a rolagem da tela sempre para o final para ver a última mensagem
    zonaMensagens.scrollTop = zonaMensagens.scrollHeight;
});

// 2. ENVIAR A MENSAGEM PARA A NUVEM
function enviarMensagem() {
    let autor = nomeUsuarioInput.value.trim();
    const texto = textoMensagemInput.value.trim();
    
    if (autor === "") { autor = "Anônimo"; }
    
    if (texto !== "") {
        // Pegar a hora atual do celular formatada (ex: 22:45)
        const agora = new Date();
        const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // O .push() cria uma lista sequencial sem apagar nada!
        database.ref('sala_mensagens').push({
            autor: autor,
            texto: texto,
            hora: horaFormatada
        });
        
        // Limpa apenas o campo de texto da mensagem
        textoMensagemInput.value = "";
    }
}

// Enviar clicando no botão
btnEnviar.addEventListener('click', enviarMensagem);

// Enviar apertando o "Enter" do teclado do celular
textoMensagemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { enviarMensagem(); }
});
