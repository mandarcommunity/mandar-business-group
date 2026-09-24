import { Response } from 'express';
import * as advertisementService from '../services/advertisement.service';
import { checkModeration } from '../services/moderation.service';

export const createAdvertisement = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;
      const isClean = await checkModeration([title || "", description || ""]);
      if (!isClean) return res.status(400).json({ success: false, message: "Your content contains restricted words and violates our guidelines." });
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const adData = req.body;
    const ad = await advertisementService.createAdvertisement(userId, adData);

    res.status(201).json({
      success: true,
      message: 'Advertisement created successfully',
      data: ad
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyAdvertisements = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const ads = await advertisementService.getMyAdvertisements(userId);
    res.json({ success: true, data: ads });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllAdvertisements = async (req: any, res: Response) => {
  try {
    const ads = await advertisementService.getAllAdvertisements();
    res.json({ success: true, data: ads });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdvertisementById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const ad = await advertisementService.getAdvertisementById(id);
    res.json({ success: true, data: ad });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAdvertisement = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await advertisementService.deleteAdvertisement(userId, id);
    res.json({ success: true, message: 'Advertisement deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdvertisement = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    console.log("UPDATE AD RECEIVED BODY:", { ...req.body, base64Image: req.body.base64Image ? "PRESENT" : "MISSING" });
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const updatedAd = await advertisementService.updateAdvertisementService(userId, id, req.body);
    res.json({ success: true, message: 'Advertisement updated successfully', data: updatedAd });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleLike = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = await advertisementService.toggleLike(userId, id);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyLikes = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const likes = await advertisementService.getLikesForUser(userId);
    res.json({ success: true, data: likes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { comment, parentId } = req.body;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!comment) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const result = await advertisementService.addComment(userId, id, comment, parentId);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getComments = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await advertisementService.getComments(id);
    res.json({ success: true, data: comments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
