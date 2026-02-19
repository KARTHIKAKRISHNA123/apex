import React from 'react';

// Import all templates
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
// ADDED DEEDY IMPORT
import DeedyTemplate from './templates/DeedyResumeTemplate'; 

const ResumePreview = React.forwardRef(({ data }, ref) => {
  // Extract template name and accent color from data, with fallbacks
  const templateType = data?.template || 'modern'; 
  const accentColor = data?.accent_color || '#000000'; // Default black

  // Function to determine which template to render
  const renderTemplate = () => {
    switch (templateType) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      // ADDED DEEDY CASE
      case "deedy":
        return <DeedyTemplate data={data} accentColor={accentColor} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    // The wrapper div ensures the PDF scale and sizing are uniform across all templates
    <div 
      id="resume-preview-content" 
      ref={ref} 
      className="w-full h-full shadow-2xl overflow-hidden bg-white" 
      style={{ height: '297mm' }}
    >
      {renderTemplate()}
    </div>
  );
});

export default ResumePreview;