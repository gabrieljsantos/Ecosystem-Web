// Seleciona o elemento canvas do documento HTML usando o ID
const canvas = document.getElementById('particleCanvas');
// Obtém o contexto de renderização 2D do canvas
const ctx = canvas.getContext('2d');
// Define a largura do canvas como a largura da janela
canvas.width = window.innerWidth;
// Define a altura do canvas como a altura da janela
canvas.height = window.innerHeight;

// Vetor para armazenar todos os seres (partículas)
let beings = [];

// Classe para representar um ser (partícula)
class Being {
    // Construtor que inicializa as propriedades do ser
    constructor(x, y, dx, dy, life, radiation_received, lifetime, hunger, dna_properties) {
        this.x = x; // Posição horizontal
        this.y = y; // Posição vertical
        this.dx = dx; // Velocidade horizontal
        this.dy = dy; // Velocidade vertical

        // Estado de vida
        this.status_life = { 
            life: life,
            radiation_received: radiation_received,
            lifetime: lifetime,
            hunger: hunger,
            // Adicione outras propriedades de status de vida conforme necessário
        };

        // DNA contendo as propriedades genéticas
        this.DNA = { 
            ...dna_properties // Inclui todas as propriedades passadas como DNA
        };

        // Propriedades visuais diretamente acessíveis
        this.radius = this.DNA.radius;
        this.color = this.DNA.color;
    }

    // Método para desenhar o ser no canvas
    draw() {
        ctx.beginPath(); // Inicia um novo caminho para desenhar
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Desenha um arco/círculo
        ctx.fillStyle = this.color; // Define a cor de preenchimento
        ctx.fill(); // Preenche o círculo com a cor definida
        ctx.closePath(); // Fecha o caminho
    }

    // Método para atualizar a posição e verificar colisões
    update() {
        this.x += this.dx; // Atualiza a posição horizontal com a velocidade
        this.y += this.dy; // Atualiza a posição vertical com a velocidade
        
        // Verifica colisões com as bordas horizontais do canvas
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx; // Inverte a direção horizontal
        }
        // Verifica colisões com as bordas verticais do canvas
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy; // Inverte a direção vertical
        }

        // Exemplo de manipulação do estado de vida
        this.status_life.hunger += 0.01; // Aumenta a fome ao longo do tempo

        this.draw(); // Desenha o ser com a nova posição
    }

    // Método para aplicar a lógica de vida (exemplo)
    applyLifeLogic() {
        if (this.status_life.life <= 0) {
            // Lógica quando a vida chega a 0 (exemplo: remover o ser)
            beings = beings.filter(being => being !== this);
        }
        // Outras lógicas de vida podem ser adicionadas aqui
    }
}

// Função para definir tipos de seres
function Types(value) {
    switch(value) {
        case "A":
            return { radius: 5, color: 'white', food: 1, property2_DNA: 'value2' };
        case "B":
            return { radius: 4, color: 'black', food: 2, property2_DNA: 'value2' };
        case "C":
            return { radius: 7, color: 'red', food: 3, property2_DNA: 'value4' };
        case "D":
            return { radius: 5, color: 'grey', food: 1, property2_DNA: 'value2' };
        default:
            return { radius: 5, color: 'white', food: 1, property2_DNA: 'value2' };
    }
}

// Função para gerar partículas (seres)
function generateBeings(n) {
    for(let i = 0; i < n; i++) {
        let type;
        if (i < 25) {
            type = "A";
        } else if (i < 50) {
            type = "B";
        } else if (i < 75) {
            type = "C";
        } else {
            type = "D";
        }
        const dna_properties = Types(type);

        const x = Math.random() * (canvas.width - 2 * dna_properties.radius) + dna_properties.radius; // Posição horizontal inicial aleatória
        const y = Math.random() * (canvas.height - 2 * dna_properties.radius) + dna_properties.radius; // Posição vertical inicial aleatória
        const dx = Math.random() * 2 - 1; // Velocidade horizontal aleatória
        const dy = Math.random() * 2 - 1; // Velocidade vertical aleatória
        const life = 100; // Vida inicial
        const radiation_received = 0; // Radiação recebida inicial
        const lifetime = 0; // Tempo de vida inicial
        const hunger = 0; // Fome inicial

        // Adiciona um novo ser ao vetor
        beings.push(new Being(x, y, dx, dy, life, radiation_received, lifetime, hunger, dna_properties));
    }
}

// Função de animação que será chamada repetidamente
function animate() {
    requestAnimationFrame(animate); // Chama a função de animação no próximo quadro disponível
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas antes de desenhar novamente
    
    // Loop para desenhar todos os seres
    beings.forEach(being => being.draw());
    
    // Loop para atualizar a posição de todos os seres e aplicar lógica de vida
    beings.forEach(being => {
        being.update();
        being.applyLifeLogic(); // Aplica lógica de vida ao ser
    });
}

// Gera um número específico de partículas (seres)
generateBeings(100);

// Inicia a animação
animate();
