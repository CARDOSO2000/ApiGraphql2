const Subscription = {
    inscreverChat: {
        subscribe(parent, args, ctx, info) {
            const pessoa = ctx.db.usuarios.find((usuario) => usuario.login === args.inscreverChat.login)
            if (!pessoa) {
                const log = {
                    operacao: 'subscription',
                    tipo: 'Error',
                    hora: new Date().toISOString()
                  }
                ctx.db.logs.push(log)
                return new Error("Usuario inexistente");
            } else {
                const log = {
                    operacao: 'subscription',
                    tipo: 'Ok',
                    hora: new Date().toISOString()
                  }
                ctx.pubSub.publish('log', {logs: log})
                ctx.db.logs.push(log)
                return ctx.pubSub.asyncIterator(args.inscreverChat.categoria)
            }
        }
    },
    logs: {
        subscribe(parent, args, ctx, info) {
            const useradmin = ctx.db.usuarios.find((user) => user.senha === 'admin')
            if(args.inputUsuario.login === useradmin.login && args.inputUsuario.senha === 'admin'){
                return ctx.pubSub.asyncIterator('log')
            } else {
                throw new Error("Usuario não tem permissão")
            }
        }
    }
}

export default Subscription