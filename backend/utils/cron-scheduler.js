import Cron from "../models/cron.model.js";
import cron from "node-cron";

const scheduledJobs = new Map();

// Utility function to validate cron expressions
const isValidCron = (value) => {
  return typeof value === "string" && cron.validate(value);
};

// Load and schedule all jobs from DB on startup
const loadAndScheduleJobs = async () => {
  try {
    const crons = await Cron.find().populate("postId");

    crons.forEach((cronEntry) => {
      const { cron_value, postId, _id } = cronEntry;

      if (!isValidCron(cron_value)) {
        console.warn(
          `Skipping invalid cron_value for post ${postId || "unknown"}:`,
          cron_value
        );
        return;
      }

      const jobId = _id.toString();

      // Prevent duplicating jobs if already scheduled
      if (scheduledJobs.has(jobId)) {
        console.log(`Job already scheduled for cron ID: ${jobId}`);
        return;
      }

      const job = cron.schedule(cron_value, () => {
        console.log(
          `Running job for post: ${postId?.title || "Untitled Post"}`
        );
        // Add your job logic here
      });

      scheduledJobs.set(jobId, job);
      console.log(
        `Scheduled job for post: ${postId?.title || "Untitled Post"}`
      );
    });
  } catch (error) {
    console.error("Error loading and scheduling cron jobs:", error);
  }
};

// Schedule a new single job after creating a new post/cron entry
const scheduleNewJob = (cronEntry, post) => {
  try {
    const jobId = cronEntry._id.toString();
    const cron_value = cronEntry.cron_value;

    if (!isValidCron(cron_value)) {
      console.warn(
        `Invalid cron expression for post ${post.title}: ${cron_value}`
      );
      return;
    }

    if (scheduledJobs.has(jobId)) {
      console.log(`Job already scheduled for cron ID: ${jobId}`);
      return;
    }

    const job = cron.schedule(cron_value, () => {
      console.log(`Running job for post: ${post.title}`);
      // Your job logic here
    });

    scheduledJobs.set(jobId, job);
    console.log(`New job scheduled for post: ${post.title}`);
  } catch (error) {
    console.error("Error scheduling new job:", error);
  }
};

export { loadAndScheduleJobs, scheduleNewJob };
