<?php

/**
 * Plugin Name:       Blog Post
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            https://github.com/KantaPaul
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blog-post
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if (!defined('BLOG_POST_PLUGIN_FILE')) {
    define('BLOG_POST_PLUGIN_FILE', __FILE__);
}
define('BLOG_POST_HELPER_ABS_PATH', dirname(BLOG_POST_PLUGIN_FILE) . '/');

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_blog_post_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action('init', 'create_block_blog_post_block_init');

if (file_exists(BLOG_POST_HELPER_ABS_PATH . 'includes/functions.php')) {
    include_once BLOG_POST_HELPER_ABS_PATH . 'includes/functions.php';
}

function loadTextdomain()
{
    load_plugin_textdomain('blog-post', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'loadTextdomain');