const btnPlay = document.getElementById("btnplay")
btnPlay.addEventListener("click", ()=>{
    btnPlay.style.display ="none"
    document.getElementById("main").style.display = "flex"
    setTimeout(iniciarJogo.iniciar,2000)
    
})

const btnReset = document.getElementById("fon3")
btnReset.addEventListener("click", ()=>{
    location.reload()
    
})

var btndisplaycomb = document.getElementsByClassName("displaycombinacao")
var leds = document.getElementsByClassName("ponto")
iniciarJogo = {
    combinacao: [],
    sequencia: [],
    nivel: 1,
    maxnivel:5,
    
    gerarCombinacao(nivel) {
        iniciarJogo.combinacao = []
        for (let i = 0; i < nivel; i++) {
            iniciarJogo.combinacao.push(Math.floor(Math.random()*9))      
        }
        
    },

    adicionarPointer() {
        var displaysjogador = document.getElementsByClassName("displayJogador")
        for (const i of displaysjogador) {
            i.style.cursor = "pointer"
           
        }
    },
    
    removerPointer() {
        var displaysjogador = document.getElementsByClassName("displayJogador")
        for (const i of displaysjogador) {
            i.style.cursor = "not-allowed"
        }
    },

    mostrarItem(indice){
        btndisplaycomb[indice].style.backgroundColor = "green"
        setTimeout(()=>{
            btndisplaycomb[indice].style.backgroundColor = "#c1c2cE"
        },300)
    },

    mostrarSequencia(nivel) {

        iniciarJogo.gerarCombinacao(nivel) 
        
        
        for (let i = 0; i < iniciarJogo.combinacao.length; i++) {
            
            setTimeout(()=>{
                iniciarJogo.mostrarItem(iniciarJogo.combinacao[i])
            },400 * (i+1))
            
        }
        iniciarJogo.adicionarPointer()
    },

    foncombination(position){
        let fon = iniciarJogo.combinacao.slice(0,position)
        return (fon.toString() == iniciarJogo.sequencia.toString())
    },

    play(indice){
        
        iniciarJogo.sequencia.push(indice)
        if(iniciarJogo.foncombination(iniciarJogo.sequencia.length)){
            
            if(iniciarJogo.maxnivel == iniciarJogo.sequencia.length){
                leds[iniciarJogo.nivel-1].style.backgroundColor="green"
                setTimeout(() => {
                    alert("Parabens voce zerou")
                }, 200)
                
                setTimeout(() => {
                    for (const i of leds) {
                        i.style.backgroundColor="#c1c2cE"
                    }
                    iniciarJogo.nivel=1
                    iniciarJogo.sequencia = []
                    iniciarJogo.mostrarSequencia(iniciarJogo.nivel)
                    
                }, 2000)
                return
            }

            if(iniciarJogo.sequencia.length == iniciarJogo.combinacao.length){
                leds[iniciarJogo.nivel-1].style.backgroundColor="green"
                iniciarJogo.nivel++
                console.log("nivel concluido");
                iniciarJogo.sequencia = []
                document.getElementById("main").style.backgroundColor ="green"
                setTimeout(()=>{
                    document.getElementById("main").style.backgroundColor ="#363638"
                },100)
                setTimeout(()=>{
                    iniciarJogo.mostrarSequencia(iniciarJogo.nivel)
                },2000)
                
                return
            }
        }
        else{
            console.log("errou");
            
            document.getElementById("main").style.backgroundColor ="red"
            setTimeout(()=>{
                    document.getElementById("main").style.backgroundColor ="#363638"
                },200)
            for (const i of leds) {
                i.style.backgroundColor="#c1c2cE"
            }
            setTimeout(()=>{
                alert("Errou ... resetando")
            },200)
            
            setTimeout(() => {
                
                iniciarJogo.nivel=1
                iniciarJogo.sequencia = []
                iniciarJogo.mostrarSequencia(iniciarJogo.nivel)
            }, 3000)
            return
            
        }
    },

    carregarJogo(){
        
        var displays = document.getElementsByClassName("displayJogador")
        for (const dsp of displays) {
            dsp.addEventListener("click", ()=>{
                console.log(dsp.dataset.memory)
                iniciarJogo.play(dsp.dataset.memory)
            })
        }
    },

    iniciar(){
        
        for (const i of leds) {
            i.style.backgroundColor="#c1c2cE"
        }
        iniciarJogo.carregarJogo()
        iniciarJogo.nivel = 1
        iniciarJogo.sequencia= []
        iniciarJogo.mostrarSequencia(iniciarJogo.nivel)
    }
}











    

