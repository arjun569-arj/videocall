import { chatClient } from "../utils/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = await chatClient.createToken();
    return res.status(201).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (err) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
