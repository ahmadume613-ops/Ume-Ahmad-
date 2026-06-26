import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const IS_VERCEL = !!process.env.VERCEL;
const SUBMISSIONS_FILE = IS_VERCEL 
  ? path.join("/tmp", "submissions.json")
  : path.join(process.cwd(), "submissions.json");

// Ensure submission database file exists on startup
if (IS_VERCEL) {
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    const originalSubmissions = path.join(process.cwd(), "submissions.json");
    if (fs.existsSync(originalSubmissions)) {
      try {
        fs.copyFileSync(originalSubmissions, SUBMISSIONS_FILE);
      } catch (err) {
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify({ bookings: [], messages: [] }, null, 2));
      }
    } else {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify({ bookings: [], messages: [] }, null, 2));
    }
  }
} else {
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify({ bookings: [], messages: [] }, null, 2));
  }
}

app.use(express.json());

// Helper to verify admin credentials
function verifyAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const password = req.headers["x-admin-password"];
  const adminPassword = process.env.ADMIN_PASSWORD || "admin786@";
  
  if (password === adminPassword) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized admin access" });
  }
}

// POST: Admin Login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin786@";
  
  if (password === adminPassword) {
    res.status(200).json({ success: true, message: "Authentication successful" });
  } else {
    res.status(401).json({ success: false, error: "Incorrect admin credentials" });
  }
});

// Helper to read submissions
function readSubmissions() {
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading submissions file:", error);
    return { bookings: [], messages: [] };
  }
}

// Helper to write submissions
function writeSubmissions(data: any) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to submissions file:", error);
  }
}

// Course names mapping for rich UI/logging
const COURSE_NAMES: Record<string, string> = {
  "norani-qaida": "Norani Qaida (Beginner foundation)",
  "tajweed-course": "Full Tajweed Ul Quran",
  "quran-memorization": "Quran Memorization (Hifz)",
  "islamic-studies": "Islamic Studies for Kids & Youth",
  "arabic-language": "Arabic Language & Grammar",
  "female-tutor": "Private Female Quran Tutor",
};

// 1. POST: Book Free Trial
app.post("/api/book-trial", async (req, res) => {
  const { name, email, phone, country, courseId, preferredTime, preferredPlatform, studentsCount, notes } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone number are required" });
  }

  const submissions = readSubmissions();
  const newBooking = {
    id: "b_" + Date.now(),
    name,
    email,
    phone,
    country: country || "Not Specified",
    courseId,
    preferredTime,
    preferredPlatform,
    studentsCount,
    notes: notes || "",
    status: "Pending",
    dateCreated: new Date().toISOString(),
  };

  submissions.bookings.unshift(newBooking);
  writeSubmissions(submissions);

  console.log(`✉️ Local Registration Saved: ${name} (${studentsCount}) for course ${COURSE_NAMES[courseId] || courseId}.`);

  res.status(200).json({ success: true, message: "Trial booked successfully!", data: newBooking });
});

// 2. POST: Contact Message
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, preferredPlatform, studentsCount, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const submissions = readSubmissions();
  const newMessage = {
    id: "msg_" + Date.now(),
    name,
    email,
    subject: subject || "No Subject",
    preferredPlatform: preferredPlatform || "Zoom",
    studentsCount: studentsCount || "1 Student",
    message,
    dateCreated: new Date().toISOString(),
  };

  submissions.messages.unshift(newMessage);
  writeSubmissions(submissions);

  console.log(`✉️ Local Contact Inquiry Saved: ${subject} (${name}).`);

  res.status(200).json({ success: true, message: "Contact message recorded!", data: newMessage });
});

// 3. GET: Fetch all submissions
app.get("/api/submissions", verifyAdmin, (req, res) => {
  res.status(200).json(readSubmissions());
});

// 4. POST: Update booking status
app.post("/api/submissions/update-booking-status", verifyAdmin, (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) {
    return res.status(400).json({ error: "Missing id or status" });
  }

  const submissions = readSubmissions();
  submissions.bookings = submissions.bookings.map((b: any) => {
    if (b.id === id) {
      return { ...b, status };
    }
    return b;
  });

  writeSubmissions(submissions);
  res.status(200).json({ success: true, message: "Status updated" });
});

// 5. POST: Delete booking
app.post("/api/submissions/delete-booking", verifyAdmin, (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  const submissions = readSubmissions();
  submissions.bookings = submissions.bookings.filter((b: any) => b.id !== id);
  writeSubmissions(submissions);
  res.status(200).json({ success: true, message: "Booking deleted" });
});

// 6. POST: Delete contact message
app.post("/api/submissions/delete-message", verifyAdmin, (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  const submissions = readSubmissions();
  submissions.messages = submissions.messages.filter((m: any) => m.id !== id);
  writeSubmissions(submissions);
  res.status(200).json({ success: true, message: "Message deleted" });
});

// Integrations & Dev Server handling
async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, "index.html"));

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!IS_VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Full-stack Server running at http://localhost:${PORT}`);
    });
  }
}

if (!IS_VERCEL) {
  startServer();
}

export default app;
