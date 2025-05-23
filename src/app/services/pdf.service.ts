import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  generatePortfolioPdf(portfolio: Portfolio): void {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 10;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(portfolio.fullName, pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 2;
    
    // About Me section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('About Me', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // Split text to handle wrapping
    const aboutMeLines = doc.splitTextToSize(portfolio.aboutMe, pageWidth - (2 * margin));
    doc.text(aboutMeLines, margin, yPos);
    yPos += (aboutMeLines.length * lineHeight) + 10;
    
    // Skills section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Skills', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const skills = portfolio.skills.join(', ');
    const skillsLines = doc.splitTextToSize(skills, pageWidth - (2 * margin));
    doc.text(skillsLines, margin, yPos);
    yPos += (skillsLines.length * lineHeight) + 10;
    
    // Projects section
    if (portfolio.projects && portfolio.projects.length > 0) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Projects', margin, yPos);
      yPos += lineHeight;
      
      doc.setFontSize(12);
      
      portfolio.projects.forEach(project => {
        // Check if we need a new page
        if (yPos > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFont('helvetica', 'bold');
        doc.text(project.title, margin, yPos);
        yPos += lineHeight;
        
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(project.description, pageWidth - (2 * margin));
        doc.text(descLines, margin, yPos);
        yPos += (descLines.length * lineHeight) + 5;
      });
      
      yPos += 5;
    }
    
    // Achievements section
    if (portfolio.achievements) {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Achievements', margin, yPos);
      yPos += lineHeight;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const achievementLines = doc.splitTextToSize(portfolio.achievements, pageWidth - (2 * margin));
      doc.text(achievementLines, margin, yPos);
    }
    
    // Save the PDF
    doc.save(`${portfolio.fullName.replace(/\s+/g, '_')}_Portfolio.pdf`);
  }
}