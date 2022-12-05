const usuarios = [
    {
        id: '0',
        login: 'admin',
        senha: 'admin'
    }
]

const mensagens = []

const chats = [
    {
        categoria: "GERAL",
        inscritos: 0,
        mensagem: [],
        usuarios: []
    },
    {
        categoria: "CINEMA",
        inscritos: 0,
        mensagem: [],
        usuarios: []
    },
    {
        categoria: "ESPORTES",
        inscritos: 0,
        mensagem: [],
        usuarios: []
    }
]

const logs = []

export default {usuarios, mensagens, chats, logs}