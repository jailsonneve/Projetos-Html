git:
	git config --global user.name "jailsonneve"
	git config --global user.email "daiarthur053@gmail.com"

# Caminhos dos projetos
ROOT_DIR := .
PROJETOS := Projetos/Basico Projetos/Intermediario Projetos/Avancado

# Porta inicial para os servidores
PORT := 8000

# Comando padrão: abrir tudo
tudo:
	@$(MAKE) raiz
	@$(MAKE) projetos

# Servir a raiz do site
raiz:
	@echo "Iniciando servidor da página principal em http://localhost:$(PORT)"
	@python3 -m http.server $(PORT) --directory $(ROOT_DIR) &

# Abrir todos os projetos
projetos:
	@i=1; \
	for dir in $(PROJETOS); do \
		port=$$(($(PORT)+i)); \
		echo "Iniciando servidor em http://localhost:$$port para $$dir"; \
		python3 -m http.server $$port --directory $$dir & \
		i=$$((i+1)); \
	done

# Comandos individuais para cada projeto
basico:
	@python3 -m http.server 8010 --directory Projetos/Basico

intermediario:
	@python3 -m http.server 8011 --directory Projetos/Intermediario

avancado:
	@python3 -m http.server 8012 --directory Projetos/Avancado

# Limpar processos antigos (manual)
stop:
	@echo "Finalizando Servidor...."
	pkill -f http.server
clean:
	@echo "Limpando tela...."
	@clear