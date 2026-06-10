/**
 * Strips HTML tags and returns a truncated plain text version.
 * This is optimized to avoid DOM manipulation, making it faster and SSR-friendly.
 */
export function getPreviewText(html: string, maxLength: number = 150): string {
  if (!html) return ''
  
  // 1. Remove script and style elements
  let text = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
  
  // 2. Remove all other HTML tags
  text = text.replace(/<[^>]+>/g, ' ')
  
  // 3. Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim()
  
  // 4. Decode common HTML entities
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"'
  }
  
  text = text.replace(/&[a-z0-9#]+;/gi, (match) => entities[match] || match)
  
  if (text.length <= maxLength) return text
  
  return text.slice(0, maxLength).trim() + '...'
}
