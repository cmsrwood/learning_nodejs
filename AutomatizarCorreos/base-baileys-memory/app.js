const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')



const si = addKeyword ('si').addAnswer('Gracias por contestar')
const no = addKeyword('no').addAnswer('REvisa tu informacion de nuevo')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo' , 'ola','oda'])
    .addAnswer(['Bienvenido al chat bot'])
    .addAnswer('Escriba su cuadrilla: ',{capture : true}, (response,{fallback} ) => {
        console.log ('Cuadrilla: ', response.body)
    })
    .addAnswer ('Escriba su nombre: ',{capture : true}, (response,{fallback} ) => {
        console.log ('Nombre: ', response.body)
    })
    .addAnswer ( ['*Nombre:*',nombre, '*Cuadrilla:*', cuadrilla,'¿Esta informacion es correcta?'
    ], [si, no] )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,si,no])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
