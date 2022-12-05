import { v4 as uuidv4 } from 'uuid'

const Mutation = {
    criarUsuario(parent, args, ctx, info) {
        const usuario = {
            id: uuidv4(),
            login: args.inputUsuario.login,
            senha: args.inputUsuario.senha,
            mensagem: [],
            inscricao: []
        }
        if (ctx.db.usuarios.find((usuario) => usuario.login === args.inputUsuario.login)) {
            const log = {
              operacao: 'mutation',
              tipo: 'Error',
              hora: new Date().toISOString()
            }
            ctx.pubSub.publish('log', {logs: log})
            ctx.db.logs.push(log)
            return new Error("Usuario inexistente");
          } else {
            const log = {
              operacao: 'mutation',
              tipo: 'Ok',
              hora: new Date().toISOString()
            }
            ctx.pubSub.publish('log', {logs: log})
            ctx.db.logs.push(log)
            ctx.db.usuarios.push(usuario);
            return usuario;
        }
    },
    postarMensagem(parent, args, ctx, info) {
        if (!ctx.db.usuarios.find((usuario) => usuario.login === args.inputMensagem.login)) {
            const log = {
              operacao: 'mutation',
              tipo: 'Error',
              hora: new Date().toISOString()
            }
            ctx.pubSub.publish('log', {logs: log})
            ctx.db.logs.push(log)
            return new Error("Usuario inexistente");
          }
          if (!ctx.db.chats.find((chat) => chat.categoria === args.inputMensagem.categoria)) {
            const log = {
              operacao: 'mutation',
              tipo: 'Error',
              hora: new Date().toISOString()
            }
            ctx.pubSub.publish('log', {logs: log})
            ctx.db.logs.push(log)
            return new Error("Chat room does not exist");
          }
          if (args.inputMensagem.mensagem.length > 500) {
            const log = {
              operacao: 'mutation',
              tipo: 'Error',
              hora: new Date().toISOString()
            }
            ctx.pubSub.publish('log', {logs: log})
            ctx.db.logs.push(log)
            return new Error("Message is too long");
          }
          const mensagem = {
            id: uuidv4(),
            mensagem: args.inputMensagem.mensagem,
            timeStamp: new Date().toISOString(),
            usuario: args.inputMensagem.login
          }
          const log = {
            operacao: 'mutation',
            tipo: 'Ok',
            hora: new Date().toISOString()
          }
          ctx.db.logs.push(log)
          ctx.db.mensagens.push(mensagem)
          ctx.db.chats.find((chat) => chat.categoria === args.inputMensagem.categoria).mensagem.push(mensagem);
          ctx.pubSub.publish(args.inputMensagem.categoria, {inscreverChat: mensagem});
          return mensagem
    }
}
export default Mutation