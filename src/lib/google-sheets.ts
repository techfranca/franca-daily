import { google } from "googleapis";
import { DailyReport } from "@/types";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getGoogleSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
}

const userToSheetMap: Record<string, string> = {
  "Gabriel": "Gabriel",
  "Bruna": "Bruna",
  "Guilherme": "Guilherme",
  "Leonardo": "Leonardo",
  "Davidson": "Davidson",
};

export async function saveDailyReport(report: DailyReport) {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const sheetName = userToSheetMap[report.user] || "Davidson";

    const values = [
      [
        report.date,
        report.time,
        report.question1,
        report.question2,
        report.question3,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:E`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar no Google Sheets:", error);
    throw new Error("Falha ao salvar daily report");
  }
}