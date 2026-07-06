function formatText(text) {
  
  if (!text) return "";
  
  return text
    
    .replace(
      /\*\*_(.*?)_\*\*/g,
      "<strong><u>$1</u></strong>"
    )
    
    .replace(
      /_\*\*(.*?)\*\*_/g,
      "<strong><u>$1</u></strong>"
    )
    
    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    )
    
    .replace(
      /_(.*?)_/g,
      "<u>$1</u>"
    )
    
    .replace(
      /\n\n/g,
      "<br><br>"
    )
    
    .replace(
      /\n/g,
      "<br>"
    );
  
}