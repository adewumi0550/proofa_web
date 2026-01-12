package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/adewumi0550/proofa_web/backend-go/internal/api/handlers"
	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/ai"
	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/adewumi0550/proofa_web/backend-go/internal/service"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env if present
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on system environment variables")
	}

	ctx := context.Background()

	// 1. Load Judge Configuration (EU AI Law spec)
	judgeConfig, err := ai.LoadJudgeConfig("configs/judge_spec.json")
	if err != nil {
		log.Fatalf("Failed to load AI Judge configuration: %v", err)
	}

	// 2. Setup AI Provider (Gemini 3)
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Println("WARNING: GEMINI_API_KEY not set. Using mock provider for testing.")
		// Fallback to mock for local dev if key is missing
	}

	// geminiProvider, err := ai.NewGeminiProvider(ctx, apiKey, judgeConfig)
	_ = apiKey
	_ = err
	_ = ctx
	_ = judgeConfig

	// 3. Setup Orchestrator (Interface-driven)
	var activeJudge ai.Judge
	// FORCE MOCK FOR DEMO STABILITY (Bypassing Gemini 404/Auth issues)
	log.Println("Forcing Gemma Mock Provider for consistent Local Demo.")
	activeJudge = ai.NewGemmaProvider()

	/*
		if err == nil && geminiProvider != nil {
			activeJudge = geminiProvider
		} else {
			log.Printf("Falling back to Gemma mock provider: %v", err)
			activeJudge = ai.NewGemmaProvider()
		}
	*/
	orchestrator := ai.NewOrchestrator(activeJudge, 60*time.Second)

	// 4. Initialize Database & Services
	// Note: We use MockDB here for the demo. In production, use pgxpool.New().
	repo := repository.New(&repository.MockDB{})
	authService := service.NewAuthService(repo)
	registryService := service.NewRegistryService(repo)
	proofaEngine := service.NewProofaEngine(repo, orchestrator)

	// 5. Setup Handlers
	handler := handlers.NewAPIHandler(authService, registryService, proofaEngine)

	// 6. Initialize Fiber App
	app := fiber.New(fiber.Config{
		AppName: "Proofa Industrial API (Go)",
	})

	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Root and Health Check
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Proofa Industrial API is running. Use /v1 for API endpoints.")
	})
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendStatus(200)
	})

	v1 := app.Group("/v1")

	v1.Post("/auth/register", handler.Register)
	v1.Post("/registry/upload", handler.Upload)
	v1.Post("/proofa/calculate", handler.Calculate)
	v1.Post("/proofa/calculate", handler.Calculate)
	v1.Get("/proofa/certificate/:id", handler.GetCertificate)
	v1.Get("/debug/state", handler.DebugState)

	log.Printf("Starting Proofa Industrial API on port 8080...")
	log.Printf("Routes available:")
	log.Printf("  - GET  /")
	log.Printf("  - GET  /health")
	log.Printf("  - POST /v1/auth/register")
	log.Printf("  - POST /v1/registry/upload")
	log.Printf("  - POST /v1/proofa/calculate")
	log.Printf("  - GET  /v1/proofa/certificate/:id")

	log.Fatal(app.Listen(":8080"))
}
