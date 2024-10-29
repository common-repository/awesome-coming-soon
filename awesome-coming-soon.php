<?php
/**
 * Plugin Name: Awesome Coming Soon - Coming Soon & Maintenance Mode
 * Plugin URI: https://acsplugin.com/
 * Description: Create a customizable coming soon page for your WordPress site with easy-to-use settings and stylish themes.
 * Version: 2.0.1
 * Author: Alii Raja
 * Author URI: https://acsplugin.com/
 * Text Domain: awesome-coming-soon
 * Domain Path: /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ACS_VERSION', '2.0.1');
define('ACS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ACS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ACS_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('ACS_PLUGIN_FILE', __FILE__);

// Autoloader
spl_autoload_register(function ($class) {
    $prefix = 'ACS\\';
    $base_dir = ACS_PLUGIN_DIR . 'includes/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Initialize the plugin
function acs_init() {
    new ACS\Core\Plugin();
}
add_action('plugins_loaded', 'acs_init');

// Activation hook
register_activation_hook(__FILE__, ['ACS\Core\Activator', 'activate']);

// Deactivation hook
register_deactivation_hook(__FILE__, ['ACS\Core\Deactivator', 'deactivate']);

// Add settings link on plugin page
add_filter('plugin_action_links_' . ACS_PLUGIN_BASENAME, 'acs_add_settings_link');

function acs_add_settings_link($links) {
    $settings_link = '<a href="admin.php?page=awesome-coming-soon-settings">' . esc_html__('Settings', 'awesome-coming-soon') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}




if ( ! function_exists( 'acs_fs' ) ) {
    // Create a helper function for easy SDK access.
    function acs_fs() {
        global $acs_fs;

        if ( ! isset( $acs_fs ) ) {
            // Include Freemius SDK.
            require_once ACS_PLUGIN_DIR . '/vendor/freemius/start.php';

            $acs_fs = fs_dynamic_init( array(
                'id'                  => '16450',
                'slug'                => 'awesome-coming-soon',
                'premium_slug'        => 'awesome-coming-soon-pro',
                'type'                => 'plugin',
                'public_key'          => 'pk_7563dc33d5db94c2b07bf09e7ff6a',
                'is_premium'          => false,
                'premium_suffix'      => 'PRO',
                // If your plugin is a serviceware, set this option to false.
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'menu'                => array(
                    'slug'           => 'awesome-coming-soon-settings',
                    'contact'        => false,
                    'support'        => false,
                ),
            ) );
        }

        return $acs_fs;
    }

    // Init Freemius.
    acs_fs();
    // Signal that SDK was initiated.
    do_action( 'acs_fs_loaded' );
}
