const Query = {
    chat(parent, args, ctx, info) {
        const log = {
            operacao: 'query',
            tipo: 'Ok',
            hora: new Date().toISOString()
        }
        ctx.pubSub.publish('log', {logs: log})
        ctx.db.logs.push(log)
        return ctx.db.chats
    },
    usuarios(parent, args, ctx, info) {
        const log = {
            operacao: 'query',
            tipo: 'Ok',
            hora: new Date().toISOString()
        }
        ctx.pubSub.publish('log', {logs: log})
        ctx.db.logs.push(log)
        return ctx.db.usuarios
    },
    mensagem(parent, args, ctx, info) {
        const log = {
            operacao: 'query',
            tipo: 'Ok',
            hora: new Date().toISOString()
        }
        ctx.pubSub.publish('log', {logs: log})
        ctx.db.logs.push(log)
        return ctx.db.mensagens
    },
    logs(parent, args, ctx, info) {
        const useradmin = ctx.db.usuarios.find((user) => user.senha === 'admin')
        if(args.inputUsuario.login === useradmin.login && args.inputUsuario.senha === 'admin'){
            return ctx.db.logs
        } else {
            throw new Error("Usuario não tem permissão")
        }
    }
}

export default Query