// backend/src/middleware/sanitize.js
console.log('🧹 Inicializando middleware de sanitización personalizado');

const stripHtmlTags = (value) => {
  if (typeof value !== 'string') return value;
  // Quitar tags HTML
  let clean = value.replace(/<[^>]*>/g, ' ');
  // Quitar null bytes
  clean = clean.replace(/\0/g, '');
  // Quitar caracteres peligrosos comunes (puedes ajustar la lista)
  clean = clean.replace(/[{}$;]/g, '');
  // Normalizar espacios
  clean = clean.replace(/\s+/g, ' ').trim();
  return clean;
};

/**
 * Sanitizar recursivamente un objeto
 */
const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    const sanitized = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            console.log(`⚠️  Propiedad peligrosa removida: ${key}`);
            continue;
        }
        if (key.startsWith('$')) {
            console.log(`⚠️  Operador MongoDB removido: ${key}`);
            continue;
        }

        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
        } else if (typeof value === 'string') {
            // *** Aquí se hace la limpieza de HTML/texto ***
            sanitized[key] = stripHtmlTags(value);
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
};

const sanitizeInput = (req, res, next) => {
    if (req.body) req.body = sanitizeObject(req.body);
    if (req.query) req.query = sanitizeObject(req.query);
    if (req.params) req.params = sanitizeObject(req.params);
    next();
};

const preventSQLInjection = (req, res, next) => {
    const checkForSQL = (obj) => {
        const sqlPatterns = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b)/gi,
            /(--|\;|\/\*|\*\/)/g,
            /(\bOR\b.*=.*)/gi,
            /(\bAND\b.*=.*)/gi
        ];
        const jsonStr = JSON.stringify(obj || {});
        return sqlPatterns.some(p => p.test(jsonStr));
    };

    if (req.body && checkForSQL(req.body)) {
        console.log('🚨 Intento de SQL Injection detectado');
        return res.status(400).json({
            success: false,
            error: 'Petición sospechosa',
            message: 'Se detectaron patrones de inyección SQL'
        });
    }

    next();
};

module.exports = {
    sanitizeInput,
    preventSQLInjection
};

console.log('✅ Middleware de sanitización personalizado exportado');