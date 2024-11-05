// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";

// Define the POST handler for the file upload
export async function POST(request: NextRequest, response: Response) {
  // Parse the incoming form data
  const formData = await request.formData();

  // Get the file from the form data
  const file = formData.get("file") as File;

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json(
      ServerResponse.BadRequest(undefined, `Файл не получен`),
    );
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);

  try {
    const filePath = path.join(process.cwd(), "files/" + filename);
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(filePath, buffer);

    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
