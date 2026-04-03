.PHONY: local-up local-down local-reset

local-up:
	docker compose up -d --build

local-down:
	docker compose down

local-reset:
	docker compose down -v --remove-orphans
