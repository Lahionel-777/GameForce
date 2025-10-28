// =========================================
// PRODUCTOS-FILTROS-V2.JS - SISTEMA COMPLETO REESCRITO
// TechStore Pro - Filtros y Búsqueda Avanzada
// Versión 2.0 - Sin conflictos de variables
// =========================================

console.log('🔍 Cargando sistema de filtros v2.0...');

/**
 * ========================================
 * CLASE PRINCIPAL DEL SISTEMA DE FILTROS
 * ========================================
 * 
 * Usando una clase eliminamos problemas de variables globales/locales
 */
class ProductFilterSystem {
    constructor() {
        // Estado del sistema
        this.filters = {
            search: '',
            category: '',
            priceRange: '',
            sortBy: 'name'
        };
        
        // Arrays de productos
        this.allProducts = [];
        this.filteredProducts = [];
        
        // Referencias DOM
        this.elements = {};
        
        // Configuración
        this.searchDelay = 500;
        this.searchTimeout = null;
        
        console.log('🚀 Sistema de filtros v2.0 inicializado');
    }
    
    /**
     * ========================================
     * INICIALIZACIÓN PRINCIPAL
     * ========================================
     */
    init() {
        console.log('🔧 Iniciando sistema de filtros v2.0...');
        
        this.findElements();
        this.loadProducts();
        this.setupEventListeners();
        this.showAllProducts();
        this.createDebugTools();
        
        console.log('✅ Sistema de filtros v2.0 listo!');
    }
    
    /**
     * ========================================
     * ENCONTRAR ELEMENTOS DEL DOM
     * ========================================
     */
    findElements() {
        this.elements = {
            searchInput: document.getElementById('search-input'),
            categoryFilter: document.getElementById('category-filter'),
            priceFilter: document.getElementById('price-filter'),
            sortFilter: document.getElementById('sort-filter'),
            productsGrid: document.getElementById('products-grid')
        };
        
        // Verificar que todos los elementos existan
        const missing = [];
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                missing.push(key);
            }
        });
        
        if (missing.length > 0) {
            console.error('❌ Elementos faltantes:', missing);
        } else {
            console.log('✅ Todos los elementos DOM encontrados');
        }
    }
    
    /**
     * ========================================
     * CARGAR PRODUCTOS DE LA PÁGINA
     * ========================================
     */
    loadProducts() {
        const productCards = document.querySelectorAll('.product-card');
        this.allProducts = [];
        
        productCards.forEach((card, index) => {
            const product = this.extractProductData(card, index);
            if (product) {
                this.allProducts.push(product);
            }
        });
        
        this.filteredProducts = [...this.allProducts];
        console.log(`📦 ${this.allProducts.length} productos cargados`);
    }
    
    /**
     * ========================================
     * EXTRAER DATOS DE PRODUCTO
     * ========================================
     */
    extractProductData(card, index) {
        try {
            const title = card.querySelector('h3')?.textContent?.trim() || `Producto ${index + 1}`;
            const priceText = card.querySelector('.text-2xl')?.textContent?.replace(/[^0-9]/g, '') || '0';
            const price = parseInt(priceText) || 0;
            const description = card.querySelector('p')?.textContent?.trim() || 'Sin descripción';
            
            return {
                id: `product-${index}`,
                title: title,
                price: price,
                description: description,
                category: this.determineCategory(title.toLowerCase()),
                brand: this.determineBrand(title.toLowerCase()),
                element: card,
                originalIndex: index
            };
        } catch (error) {
            console.warn('⚠️ Error procesando producto:', error);
            return null;
        }
    }
    
    /**
     * ========================================
     * DETERMINAR CATEGORÍA Y MARCA
     * ========================================
     */
    determineCategory(title) {
        if (title.includes('laptop') || title.includes('macbook') || title.includes('dell')) {
            return 'Metroidvania';
        } else if (title.includes('iphone') || title.includes('samsung') || title.includes('galaxy')) {
            return 'Aventura';
        } else if (title.includes('nvidia') || title.includes('amd') || title.includes('ryzen') || title.includes('rtx')) {
            return 'RPG';
        } else if (title.includes('airpods') || title.includes('silla')) {
            return 'accesorios';
        }
        return 'otros';
    }
    
    determineBrand(title) {
        const brands = ['apple', 'samsung', 'dell', 'nvidia', 'amd'];
        for (const brand of brands) {
            if (title.includes(brand)) return brand;
        }
        return 'otros';
    }
    
    /**
     * ========================================
     * CONFIGURAR EVENT LISTENERS
     * ========================================
     */
    setupEventListeners() {
        // Búsqueda con debounce
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.filters.search = e.target.value.toLowerCase().trim();
                    this.applyFilters();
                }, this.searchDelay);
            });
        }
        
        // Filtro por categoría
        if (this.elements.categoryFilter) {
            this.elements.categoryFilter.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.applyFilters();
                console.log('Categoría cambiada a:', e.target.value);
            });
        }
        
        // Filtro por precio
        if (this.elements.priceFilter) {
            this.elements.priceFilter.addEventListener('change', (e) => {
                this.filters.priceRange = e.target.value;
                this.applyFilters();
                console.log('Precio cambiado a:', e.target.value);
            });
        }
        
        // Filtro por ordenamiento
        if (this.elements.sortFilter) {
            this.elements.sortFilter.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.applyFilters();
                console.log('Ordenamiento cambiado a:', e.target.value);
            });
        }
        
        console.log('✅ Event listeners configurados');
    }
    
    /**
     * ========================================
     * APLICAR TODOS LOS FILTROS
     * ========================================
     */
    applyFilters() {
        console.log('🔍 Aplicando filtros v2.0:', this.filters);
        
        // Empezar con todos los productos
        let filtered = [...this.allProducts];
        
        // Aplicar búsqueda
        if (this.filters.search) {
            filtered = this.filterBySearch(filtered);
        }
        
        // Aplicar categoría
        if (this.filters.category) {
            filtered = this.filterByCategory(filtered);
        }
        
        // Aplicar precio
        if (this.filters.priceRange) {
            filtered = this.filterByPrice(filtered);
        }
        
        // Aplicar ordenamiento
        filtered = this.sortProducts(filtered);
        
        // Actualizar resultados
        this.filteredProducts = filtered;
        this.updateDisplay();
        
        console.log(`✅ ${filtered.length} productos después de filtros`);
    }
    
    /**
     * ========================================
     * FILTROS INDIVIDUALES
     * ========================================
     */
    filterBySearch(products) {
        const searchTerm = this.filters.search;
        return products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    filterByCategory(products) {
        return products.filter(product => product.category === this.filters.category);
    }
    
    filterByPrice(products) {
        const range = this.filters.priceRange;
        return products.filter(product => {
            const price = product.price;
            switch (range) {
                case '0-500000':
                    return price <= 500000;
                case '500000-1500000':
                    return price > 500000 && price <= 1500000;
                case '1500000-3000000':
                    return price > 1500000 && price <= 3000000;
                case '3000000+':
                    return price > 3000000;
                default:
                    return true;
            }
        });
    }
    
    sortProducts(products) {
        const sortBy = this.filters.sortBy;
        const sorted = [...products];
        
        switch (sortBy) {
            case 'name':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
                return sorted.reverse();
            case 'relevance':
            default:
                return sorted;
        }
    }
    
    /**
     * ========================================
     * ACTUALIZAR VISUALIZACIÓN
     * ========================================
     */
    updateDisplay() {
        // Ocultar todos los productos primero
        this.allProducts.forEach(product => {
            if (product.element) {
                product.element.style.display = 'none';
                product.element.style.opacity = '0';
            }
        });
        
        // Mostrar productos filtrados con animación
        if (this.filteredProducts.length > 0) {
            this.filteredProducts.forEach((product, index) => {
                if (product.element) {
                    setTimeout(() => {
                        product.element.style.display = 'block';
                        product.element.style.opacity = '1';
                        product.element.style.transform = 'scale(1)';
                        product.element.style.transition = 'all 0.3s ease';
                    }, index * 50);
                }
            });
            this.hideNoResultsMessage();
        } else {
            this.showNoResultsMessage();
        }
        
        this.updateCounter();
    }
    
    /**
     * ========================================
     * MOSTRAR TODOS LOS PRODUCTOS
     * ========================================
     */
    showAllProducts() {
        this.allProducts.forEach(product => {
            if (product.element) {
                product.element.style.display = 'block';
                product.element.style.opacity = '1';
                product.element.style.transform = 'scale(1)';
                product.element.style.transition = 'all 0.3s ease';
            }
        });
        this.hideNoResultsMessage();
        this.updateCounter();
    }
    
    /**
     * ========================================
     * MENSAJE SIN RESULTADOS
     * ========================================
     */
    showNoResultsMessage() {
        let message = document.getElementById('no-results-v2');
        if (!message && this.elements.productsGrid) {
            message = document.createElement('div');
            message.id = 'no-results-v2';
            message.className = 'col-span-full text-center py-12';
            message.innerHTML = `
                <div class="max-w-md mx-auto">
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">No encontramos productos</h3>
                    <p class="text-gray-600 mb-6">Intenta cambiar los filtros o buscar con otros términos</p>
                    <button onclick="filterSystem.clearAllFilters()" 
                            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        🔄 Limpiar Filtros
                    </button>
                </div>
            `;
            this.elements.productsGrid.appendChild(message);
        }
        if (message) message.style.display = 'block';
    }
    
    hideNoResultsMessage() {
        const message = document.getElementById('no-results-v2');
        if (message) message.style.display = 'none';
    }
    
    /**
     * ========================================
     * CONTADOR DE RESULTADOS
     * ========================================
     */
    updateCounter() {
        let counter = document.getElementById('results-counter-v2');
        if (!counter && this.elements.productsGrid) {
            counter = document.createElement('div');
            counter.id = 'results-counter-v2';
            this.elements.productsGrid.parentNode.insertBefore(counter, this.elements.productsGrid);
        }
        
        if (counter) {
            const count = this.filteredProducts.length;
            const total = this.allProducts.length;
            
            if (count === total) {
                counter.textContent = `Mostrando todos los ${total} productos`;
                counter.className = 'text-gray-600 text-sm mb-4';
            } else {
                counter.textContent = `${count} de ${total} productos encontrados`;
                counter.className = 'text-blue-600 font-semibold text-sm mb-4';
            }
        }
    }
    
    /**
     * ========================================
     * LIMPIAR TODOS LOS FILTROS
     * ========================================
     */
    clearAllFilters() {
        this.filters = {
            search: '',
            category: '',
            priceRange: '',
            sortBy: 'name'
        };
        
        // Limpiar elementos DOM
        if (this.elements.searchInput) this.elements.searchInput.value = '';
        if (this.elements.categoryFilter) this.elements.categoryFilter.value = '';
        if (this.elements.priceFilter) this.elements.priceFilter.value = '';
        if (this.elements.sortFilter) this.elements.sortFilter.value = 'name';
        
        this.showAllProducts();
        console.log('🔄 Filtros limpiados');
    }
    
    /**
     * ========================================
     * HERRAMIENTAS DE DEBUG
     * ========================================
     */
    createDebugTools() {
        window.filterSystemDebug = {
            getState: () => ({
                filters: this.filters,
                totalProducts: this.allProducts.length,
                filteredProducts: this.filteredProducts.length,
                allProducts: this.allProducts
            }),
            
            testSearch: (term) => {
                if (this.elements.searchInput) {
                    this.elements.searchInput.value = term;
                    this.filters.search = term.toLowerCase();
                    this.applyFilters();
                }
            },
            
            showAll: () => {
                this.clearAllFilters();
            },
            
            diagnose: () => {
                console.log('🔍 DIAGNÓSTICO v2.0:');
                this.allProducts.forEach((product, index) => {
                    if (product.element) {
                        const styles = getComputedStyle(product.element);
                        console.log(`Producto ${index + 1} (${product.title}):`, {
                            display: styles.display,
                            opacity: styles.opacity
                        });
                    }
                });
            }
        };
    }
}

/**
 * ========================================
 * INICIALIZACIÓN AUTOMÁTICA
 * ========================================
 */
let filterSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de filtros solo una vez
    if (!window.filterSystemInitialized) {
        window.filterSystemInitialized = true;

        filterSystem = new ProductFilterSystem();
        filterSystem.init();

        // Exponer globalmente
        window.filterSystem = filterSystem;

        console.log('🎉 Sistema de filtros v2.0 completamente inicializado');
    }
});

console.log('📦 Archivo productos-filtros-v2.js cargado');
