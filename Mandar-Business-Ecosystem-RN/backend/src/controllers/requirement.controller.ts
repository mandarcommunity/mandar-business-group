import { checkModeration } from "../services/moderation.service";
import { Response } from "express";
import {
  createRequirementService,
  getMyRequirementsService,
  getAllRequirementsService,
  updateRequirementService,
  updateRequirementStatusService,
  deleteRequirementService
} from "../services/requirement.service";

/* CREATE REQUIREMENT */
export const createRequirement = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;
      const isClean = await checkModeration([title || "", description || ""]);
      if (!isClean) return res.status(400).json({ success: false, message: "Your content contains restricted words and violates our guidelines." });
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const requirement = await createRequirementService(userId, req.body);
    res.status(201).json({ success: true, data: requirement });
  } catch (error: any) {
    console.error("Create Requirement Error:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to create requirement" });
  }
};

/* GET MY REQUIREMENTS */
export const getMyRequirements = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const requirements = await getMyRequirementsService(userId);
    res.status(200).json({ success: true, data: requirements });
  } catch (error: any) {
    console.error("Get My Requirements Error:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to fetch requirements" });
  }
};

/* GET ALL REQUIREMENTS (LEADS) */
export const getAllRequirements = async (req: any, res: Response): Promise<void> => {
  try {
    const requirements = await getAllRequirementsService();
    res.status(200).json({ success: true, data: requirements });
  } catch (error: any) {
    console.error("Get All Requirements Error:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to fetch leads" });
  }
};

/* UPDATE REQUIREMENT */
export const updateRequirement = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const updated = await updateRequirementService(userId, id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Update Requirement Error:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to update requirement" });
  }
};

/* UPDATE REQUIREMENT STATUS */
export const updateRequirementStatus = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ success: false, message: "Status is required" });
      return;
    }

    const updated = await updateRequirementStatusService(userId, id, status);
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Update Requirement Status Error:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to update requirement status" });
  }
};

/* DELETE REQUIREMENT */
export const deleteRequirement = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { id } = req.params;

    await deleteRequirementService(userId, id);
    res.status(200).json({ success: true, message: "Requirement deleted successfully" });
  } catch (error: any) {
    console.error("Delete Requirement Error:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to delete requirement" });
  }
};
