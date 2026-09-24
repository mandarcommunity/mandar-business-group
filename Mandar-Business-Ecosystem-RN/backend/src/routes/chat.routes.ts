// @ts-nocheck
import express from "express";
import { getMyChats, getOrCreateChat, getChatMessages, sendMessage, markChatAsRead, updateChatState, clearChat, deleteMessages, reportChat } from "../controllers/chat.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getMyChats);
router.post("/", protect, getOrCreateChat);
router.get("/:chatId/messages", protect, getChatMessages);
router.post("/:chatId/messages", protect, sendMessage);

router.post("/:chatId/read", protect, markChatAsRead);

router.post("/:chatId/state", protect, updateChatState);
router.post("/:chatId/clear", protect, clearChat);
router.post("/:chatId/messages/delete", protect, deleteMessages);
router.post("/:chatId/report", protect, reportChat);

export default router;
