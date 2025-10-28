// product-url-handler.js - Manejo de parámetros URL y carga dinámica con imágenes Unsplash

document.addEventListener('DOMContentLoaded', function () {
    console.log('🔗 Sistema de URL cargado');

    const productId = getProductIdFromURL();

    if (productId) {
        console.log(`📱 Producto solicitado: ${productId}`);
        loadProductData(productId);
    } else {
        console.log('📱 Producto por defecto');
        loadProductData('macbook-pro-16');
    }
});

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(`🔍 URL detectada: ${productId || 'ninguno'}`);
    return productId;
}

function loadProductData(productId) {
    console.log(`📄 Cargando: ${productId}`);

    const products = {
        'HK-1': {
            name: 'Hollow knight',
            shortDesc: 'Explora un reino subterráneo lleno de misterios, enfréntate a poderosos enemigos y descubre secretos ocultos en Hollow Knight.',
            price: '$15,99',
            originalPrice: '19,99',
            images: {
                main: '../assets/imagens/hollow-knight.jpg',
                gallery: [
                    '../assets/imagens/hollow-knight.jpg',
                    'https://i.ytimg.com/vi/U8Wz-VwX5dw/maxresdefault.jpg',
                    'https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1617763465032-T3M2QQ4KMOTWS3EW7FC8/false_knight.jpg',
                    'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_500/ncom/software/switch/70010000003208/93309648ca2cf8d7a269da8f3deb386833497d857e8344d339caf3f81fc8a2f1',
                ]
            },
            category: 'Metroidvania'
        },
        'GOW-2': {
            name: 'God Of War Ragnarök',
            shortDesc: 'Una épica aventura de acción y mitología nórdica protagonizada por Kratos y su hijo Atreus.',
            price: '$59.49',
            originalPrice: '$69.99',
            images: {
                main: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
                gallery: [
                    'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
                    'https://alfabetajuega.com/hero/2024/11/god-of-war-ragnarok-portada.jpg?width=1200',
                    'https://i.insider.com/5ad0b795146e711b008b4958?width=1125&format=jpeg',
                    'https://alfabetajuega.com/hero/2020/10/God-of-War-4.jpg?width=768&aspect_ratio=16:9&format=nowebp'
                ]
            },
            category: 'Aventura'
        },
        'ER-3': {
            name: 'Elden Ring',
            shortDesc: 'Un vasto RPG de fantasía oscura con exploración libre y combates',
            price: '$52.49',
            originalPrice: '$59.99',
            images: {
                main: 'https://i.blogs.es/c0b150/1024_2000/450_1000.jpeg',
                gallery: [
                    'https://i.blogs.es/c0b150/1024_2000/450_1000.jpeg',
                    'https://assetsio.gnwcdn.com/-1636033727589.jpg?width=414&quality=70&format=jpg&auto=webp',
                    'https://static.bandainamcoent.eu/high/elden-ring/elden-ring/03-news/Starter_Guide/Elden_Ring_game_screen.jpg',
                    'https://www.dsogaming.com/wp-content/uploads/2022/01/Elden-Ring-new-screenshots-1.jpg'
                ]
            },
            category: 'RPG'
        },
        'ZLOZ-4': {
            name: 'The Legend of Zelda: Tears of the Kingdom',
            shortDesc: 'Embárcate en una épica aventura en un mundo abierto lleno de misterio y fantasía en Hyrule',
            price: '$69.49',
            originalPrice: '$79.99',
            images: {
                main: 'https://i.blogs.es/309d15/the-legend-of-zelda-tears-of-the-kingdom-vale-la-pena-resena/1366_2000.jpeg',
                gallery: [
                    'https://i.blogs.es/309d15/the-legend-of-zelda-tears-of-the-kingdom-vale-la-pena-resena/1366_2000.jpeg',
                    'https://i.ytimg.com/vi/wW7jkBJ_yK0/maxresdefault.jpg',
                    'https://media-assets.wired.it/photos/645e080f7d70a16895b999a2/16:9/w_2560%2Cc_limit/Zelda-Tears-Of-The-Kingdom-Culture-TotK_3rd_54.jpg',
                    'https://www.gamereactor.de/media/71/legendzelda_4017183.jpg'
                ]
            },
            category: 'Aventura'
        },
    };

    const product = products[productId];
    if (!product) {
        console.log('❌ Producto no encontrado, usando default');
        return;
    }

    // Actualizar título principal (dentro de main)
    const titleElement = document.querySelector('main h1');
    if (titleElement) {
        titleElement.textContent = product.name;
        console.log(`✅ Título actualizado: ${product.name}`);
    } else {
        console.error('❌ No se encontró el título principal');
    }

    // Actualizar descripción
    const descElement = document.querySelector('main h1 + p');
    if (descElement) {
        descElement.textContent = product.shortDesc;
        console.log(`✅ Descripción actualizada`);
    }

    // Actualizar precio principal
    const priceElement = document.querySelector('.text-4xl.font-bold.text-purple-600');
    if (priceElement) {
        priceElement.textContent = product.price;
        console.log(`✅ Precio actualizado: ${product.price}`);
    }

    // Actualizar precio original
    const originalPriceElement = document.querySelector('.text-xl.text-gray-500.line-through');
    if (originalPriceElement) {
        originalPriceElement.textContent = product.originalPrice;
        console.log(`✅ Precio original actualizado: ${product.originalPrice}`);
    }

    // Actualizar breadcrumb
    const breadcrumbElement = document.querySelector('nav.text-sm span.text-gray-900');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = product.name;
        console.log(`✅ Breadcrumb actualizado: ${product.name}`);
    }

    // NUEVO: Actualizar imagen principal
    updateMainImage(product.images.main, product.name);

    // NUEVO: Actualizar galería de imágenes
    updateImageGallery(product.images.gallery, product.name);

    // Actualizar título de página
    document.title = `${product.name} - TechStore Pro`;

    console.log(`🎉 COMPLETADO: ${product.name}`);
}

// NUEVA FUNCIÓN: Actualizar imagen principal
function updateMainImage(imageSrc, productName) {
    const mainImageContainer = document.getElementById('main-image');
    if (mainImageContainer) {
        // Limpiar contenido actual
        mainImageContainer.innerHTML = '';

        // Crear nueva imagen
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = productName;
        img.className = 'w-full h-full object-cover rounded-xl';
        img.loading = 'lazy';

        img.onerror = function () {
            // Fallback si la imagen no carga
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'w-full h-full flex items-center justify-center bg-gray-200 rounded-xl';
            fallback.innerHTML = '<span class="text-6xl">💻</span>';
            mainImageContainer.appendChild(fallback);
        };

        mainImageContainer.appendChild(img);

        // Mantener el badge de descuento
        const discountBadge = document.createElement('div');
        discountBadge.className = 'absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold';
        discountBadge.textContent = '-15%';
        mainImageContainer.appendChild(discountBadge);

        console.log(`✅ Imagen principal actualizada: ${imageSrc}`);
    }
}

// NUEVA FUNCIÓN: Actualizar galería de imágenes
function updateImageGallery(images, productName) {
    const thumbnails = document.querySelectorAll('.thumbnail-image');

    thumbnails.forEach((thumbnail, index) => {
        if (images[index]) {
            // Limpiar contenido actual
            thumbnail.innerHTML = '';

            // Crear nueva imagen miniatura
            const img = document.createElement('img');
            img.src = images[index];
            img.alt = `${productName} vista ${index + 1}`;
            img.className = 'w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity';
            img.loading = 'lazy';

            img.onerror = function () {
                // Fallback si la imagen no carga
                this.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'text-2xl';
                fallback.textContent = '💻';
                thumbnail.appendChild(fallback);
            };

            thumbnail.appendChild(img);

            // Agregar evento click para cambiar imagen principal
            thumbnail.addEventListener('click', function () {
                updateMainImage(images[index], productName);

                // Actualizar estado activo de thumbnails
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('ring-2', 'ring-blue-500');
                    thumb.classList.add('opacity-70');
                });

                this.classList.add('ring-2', 'ring-blue-500');
                this.classList.remove('opacity-70');
            });

            // Marcar la primera imagen como activa
            if (index === 0) {
                thumbnail.classList.add('ring-2', 'ring-blue-500');
                thumbnail.classList.remove('opacity-70');
            }
        }
    });

    console.log(`✅ Galería actualizada con ${images.length} imágenes`);
}