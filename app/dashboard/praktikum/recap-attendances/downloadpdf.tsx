"use client";

import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DownloadPDFClient() {
  const downloadPDF = async () => {
    const element = document.getElementById("recap-attendances");
    if (!element) {
      console.error("Element not found for PDF generation.");
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    // A4 size dimensions
    const pageWidth = 210; // mm
    const pageHeight = 297; // mm

    // Calculate image dimensions to maintain aspect ratio
    const imgWidth = pageWidth - 20; // Leave 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Center the image vertically on the page
    const xOffset = (pageWidth - imgWidth) / 2;
    const yOffset = (pageHeight - imgHeight) / 2;

    // Add the image to the PDF
    pdf.addImage(imageData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

    // Save the PDF
    pdf.save("attendance-recap.pdf");
  };

  useEffect(() => {
    downloadPDF();
  }, []); // Runs once when the component mounts

  return null; // No visible UI
}
