"use server";

import { IJobs } from "@/types/jobs.interface";

/**
 * Fetches all jobs from the backend API.
 * Leverages Next.js server-side fetch for caching.
 */
export async function getJobs(): Promise<IJobs[]> {
  // noStore(); // Use this if you want to explicitly prevent caching (e.g., for development)

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    console.error("API_BASE_URL is not defined in environment variables.");
    return [];
  }

  try {
    // The 'fetch' call is automatically memoized by Next.js in Server Components
    const response = await fetch(`${baseUrl}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Control caching behavior: revalidate every hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // Log the error for debugging on the server
      console.error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`,
      );
      // In a real app, you might want to throw an error to be caught by an error boundary
      // For now, we'll return an empty array to prevent the page from crashing.
      return [];
    }

    const jobs: IJobs[] = await response.json();
    return jobs;
  } catch (error) {
    console.error("An error occurred while fetching jobs:", error);
    return [];
  }
}
