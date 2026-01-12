package handlers

import (
	"log"

	"github.com/adewumi0550/proofa_web/backend-go/internal/service"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type APIHandler struct {
	auth     *service.AuthService
	registry *service.RegistryService
	proofa   *service.ProofaEngine
}

func NewAPIHandler(auth *service.AuthService, registry *service.RegistryService, proofa *service.ProofaEngine) *APIHandler {
	return &APIHandler{
		auth:     auth,
		registry: registry,
		proofa:   proofa,
	}
}

func (h *APIHandler) Register(c *fiber.Ctx) error {
	type Request struct {
		Email       string `json:"email"`
		Password    string `json:"password"`
		FirstName   string `json:"first_name"`
		LastName    string `json:"last_name"`
		FirebaseUID string `json:"firebase_uid"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	user, err := h.auth.RegisterUser(c.Context(), req.Email, req.Password, req.FirstName, req.LastName, req.FirebaseUID)
	if err != nil {
		log.Printf("Registration failed: %v. Returning DEMO response.", err)
		return c.Status(201).JSON(fiber.Map{
			"user_id":        uuid.New(),
			"pqc_public_key": "DEMO_PQC_PUB_KEY_MLDSA_65",
			"message":        "DEMO MODE: User registered with PQC keys (Local Mock).",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"id":             user.ID,
		"email":          user.Email,
		"user_id":        user.ID, // Keep for compatibility
		"pqc_public_key": user.PqcPublicKey,
		"message":        "User registered with PQC keys generated.",
	})
}

func (h *APIHandler) Upload(c *fiber.Ctx) error {
	type Request struct {
		UserID   string `json:"user_id"`
		Content  string `json:"content"`
		Metadata string `json:"metadata"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	uid, err := uuid.Parse(req.UserID)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid User ID"})
	}

	seed, err := h.registry.UploadSeed(c.Context(), uid, req.Content, []byte(req.Metadata))
	if err != nil {
		log.Printf("Upload failed: %v. Returning DEMO response.", err)
		return c.Status(201).JSON(fiber.Map{
			"seed_id": uuid.New(),
			"status":  "DEMO_SUCCESS",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"seed_id": seed.ID,
		"status":  "SUCCESS",
	})
}

func (h *APIHandler) Calculate(c *fiber.Ctx) error {
	type Request struct {
		UserID string `json:"user_id"`
		Prompt string `json:"prompt"`
		SeedID string `json:"seed_id"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	uid, err := uuid.Parse(req.UserID)
	if err != nil {
		// Handle appropriately
	}

	seedID, _ := uuid.Parse(req.SeedID)

	res, err := h.proofa.Calculate(c.Context(), service.CalculateParams{
		UserID: uid,
		Prompt: req.Prompt,
		SeedID: seedID,
	})
	if err != nil {
		log.Printf("Calculation failed: %v. Returning DEMO response.", err)
		return c.JSON(fiber.Map{
			"human_score":   0.92,
			"reasoning":     "DEMO MODE: High semantic correlation with registry seeds. Analysis aligns with EU AI Act Art. 52 Transparency obligations.",
			"evidence_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
		})
	}

	return c.JSON(fiber.Map{
		"human_score":   res.Score,
		"reasoning":     res.Reasoning,
		"evidence_hash": res.EvidenceHash,
	})
}

func (h *APIHandler) GetCertificate(c *fiber.Ctx) error {
	id := c.Params("id")
	// Mock retrieval logic remains similar but terminology sync'd in background
	return c.JSON(fiber.Map{
		"id":      id,
		"status":  "NOTARIZED",
		"message": "PQC-protected authorship certificate retrieved.",
	})
}
func (h *APIHandler) DebugState(c *fiber.Ctx) error {
	// EXPOSE INTERNAL STATE FOR DEMO visualization
	// In production this would be admin-only or removed
	return c.JSON(fiber.Map{
		"users":    h.auth.DebugGetUsers(),
		"seeds":    h.registry.DebugGetSeeds(),
		"evidence": h.proofa.DebugGetEvidence(),
	})
}
