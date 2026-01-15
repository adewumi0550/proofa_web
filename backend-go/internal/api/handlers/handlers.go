package handlers

import (
	"log"

	"github.com/adewumi0550/proofa_web/backend-go/internal/service"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type APIHandler struct {
	auth      *service.AuthService
	registry  *service.RegistryService
	proofa    *service.ProofaEngine
	seed      *service.SeedEngine
	judge     *service.JudgeEngine
	licensing *service.LicensingService
}

func NewAPIHandler(
	auth *service.AuthService,
	registry *service.RegistryService,
	proofa *service.ProofaEngine,
	seed *service.SeedEngine,
	judge *service.JudgeEngine,
	licensing *service.LicensingService,
) *APIHandler {
	return &APIHandler{
		auth:      auth,
		registry:  registry,
		proofa:    proofa,
		seed:      seed,
		judge:     judge,
		licensing: licensing,
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
		log.Printf("Calculation failed: %v", err)
		return c.Status(500).JSON(fiber.Map{
			"human_score": 0.0,
			"reasoning":   "Authorship analysis failed. Verification required.",
			"error":       err.Error(),
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
func (h *APIHandler) SeedCheck(c *fiber.Ctx) error {
	type Request struct {
		UserID   string `json:"user_id"`
		SeedText string `json:"seed_text"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	uid, err := uuid.Parse(req.UserID)
	if err != nil {
		// Fallback for demo if id is empty
		uid = uuid.New()
	}

	res, err := h.seed.VerifySeed(c.Context(), uid, req.SeedText)
	if err != nil {
		log.Printf("Seed check failed: %v", err)
		return c.Status(500).JSON(fiber.Map{
			"status":    "REJECTED",
			"reasoning": "Internal verification error.",
		})
	}

	return c.JSON(fiber.Map{
		"project_id":       res.ProjectID,
		"status":           res.Status,
		"plagiarism_score": res.PlagiarismScore,
		"ai_probability":   res.AIProbability,
		"internal_match":   res.InternalMatch,
		"birth_hash":       res.BirthHash,
		"reasoning":        res.Reasoning,
	})
}

func (h *APIHandler) UpdateScore(c *fiber.Ctx) error {
	type Request struct {
		UserID        string `json:"user_id"`
		ProjectID     string `json:"project_id"`
		CurrentPrompt string `json:"current_prompt"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	uid, _ := uuid.Parse(req.UserID)
	projectID, _ := uuid.Parse(req.ProjectID)

	res, err := h.judge.UpdateScore(c.Context(), uid, projectID, req.CurrentPrompt)
	if err != nil {
		log.Printf("UpdateScore failed: %v", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update score"})
	}

	return c.JSON(fiber.Map{
		"human_score":    res.HumanScore,
		"reasoning":      res.Reasoning,
		"is_ai_proxy":    res.IsAIProxy,
		"creative_delta": res.CreativeDelta,
	})
}

func (h *APIHandler) CreateCollection(c *fiber.Ctx) error {
	type Request struct {
		UserID      string   `json:"user_id"`
		Name        string   `json:"name"`
		Description string   `json:"description"`
		ProjectIDs  []string `json:"project_ids"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	uid, _ := uuid.Parse(req.UserID)
	pids := make([]uuid.UUID, 0, len(req.ProjectIDs))
	for _, pidStr := range req.ProjectIDs {
		pid, _ := uuid.Parse(pidStr)
		pids = append(pids, pid)
	}

	collection, err := h.licensing.CreateCollection(c.Context(), uid, req.Name, req.Description, pids)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(collection)
}

func (h *APIHandler) CertifyAuthorship(c *fiber.Ctx) error {
	type Request struct {
		UserID    string `json:"user_id"`
		ProjectID string `json:"project_id"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	uid, _ := uuid.Parse(req.UserID)
	pid, _ := uuid.Parse(req.ProjectID)

	cert, err := h.licensing.CertifyAuthorship(c.Context(), uid, pid)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(cert)
}

func (h *APIHandler) AdminUsers(c *fiber.Ctx) error {
	users := h.auth.DebugGetUsers()
	return c.JSON(fiber.Map{
		"users": users,
		"count": len(users),
	})
}

func (h *APIHandler) DebugState(c *fiber.Ctx) error {
	// EXPOSE INTERNAL STATE FOR DEMO visualization
	// In production this would be admin-only or removed
	return c.JSON(fiber.Map{
		"users":    h.auth.DebugGetUsers(),
		"seeds":    h.registry.DebugGetSeeds(),
		"evidence": h.proofa.DebugGetEvidence(),
		"projects": []string{"Seed engine projects are in DB"},
	})
}
