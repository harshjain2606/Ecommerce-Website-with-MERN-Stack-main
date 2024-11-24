const app = require('./app')
const path = require('path')
const connectDatabase = require('./config/database')


connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log( `Server is running in port ${process.env.PORT} and in environment ${process.env.NODE_ENV}` )
})

process.on('unhandlesRejection',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled rejection')
    Server.close(()=>{
        process.exit(1)
    })
})

process.on('unhandlesException',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled exception')
    Server.close(()=>{
        process.exit(1)
    })
})