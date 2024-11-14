// Elementor configuration
const ElementorProFrontendConfig = {
    ajaxurl: '/ajax',
    nonce: '1f123bf993',
    urls: {
        assets: '/assets/',
        rest: '/api/'
    },
    shareButtonsNetworks: {
        facebook: {title: 'Facebook', has_counter: true},
        twitter: {title: 'Twitter'},
        linkedin: {title: 'LinkedIn', has_counter: true}
        // ... other social networks
    },
    kit: {
        active_breakpoints: ['viewport_mobile', 'viewport_tablet'],
        global_image_lightbox: 'yes',
        lightbox_enable_counter: 'yes',
        lightbox_enable_fullscreen: 'yes'
    }
}; 